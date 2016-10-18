'use strict';

const PROD = !!(require('yargs').argv.production);
let site = require('./site');
const gulp = require('gulp');
const browser = require('browser-sync');
const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');
require('./handlebars-helper')(Handlebars);

// load metalsmith plugin
const $ = {
    plumber:      require('gulp-plumber'),
    sourcemaps:   require('gulp-sourcemaps'),
    sass:         require('gulp-sass'),
    uglify:       require('gulp-uglify'),
    cssnano:      require('gulp-cssnano'),
    autoprefixer: require('gulp-autoprefixer'),
    inlineSource: require('gulp-inline-source'),
    babel:        require('gulp-babel'),
    concat:       require('gulp-concat')
};

const MetalSmithProductionPlugins = [
    'metalsmith-html-minifier'
];

function reloadSiteConfig(done) {
    delete require.cache[require.resolve('./site.js')];
    site = require('./site');
    done();
}

// task build metalsmith
function metalsmith(done) {
    let ms = new Metalsmith(process.cwd());

    ms.clean(false);
    ms.source(site.contentRoot);
    ms.destination(site.buildRoot);
    ms.metadata(site.metadata ? site.metadata : {});

    // load cac metalsmith addon + options
    Object.keys(site.metalsmith).forEach(pluginName => {
        // load plugin đúng theo dev hoặc prod mode
        if (MetalSmithProductionPlugins.indexOf(pluginName) == 0 && !PROD)
            return;

        let options = site.metalsmith[pluginName];
        if (options._enable !== undefined) {
            if (options._enable == false)
                return;
            delete options._enable;
        }
        let plugin = require(pluginName);

        // một số config thêm cho base metalsmith tùy theo plugin
        switch (pluginName) {
            case 'metalsmith-matters':
                // disable front matter nếu sữ dụng metalsmith-matters
                ms.frontmatter(false);
                ms.use(plugin(options));
                break;
            case 'metalsmith-html-minifier':
                ms.use(plugin('*.html', options));
                break;
            default:
                ms.use(plugin(options));
        }
    });

    ms.build(function (err) {
        if (err) {
            console.log(err);
            done(err);
        } else
            done();
    });
}

/**
 * build site's sass file, xử lý autoprefixer
 * tạo source map nếu ở chế độ debug
 * ở chế độ production apply các plugin: uncss, cssnano, autoprefixer
 */
function sass() {
    let task = gulp.src(`${site.styleRoot}/**/*.{scss,sass}`)
        .pipe($.plumber());
    if (!PROD)
        task = task.pipe($.sourcemaps.init());

    if (site.style.sass) {
        let sassConfig = Object.assign({}, site.style.sass);
        sassConfig.outputStyle = 'expanded';
        task = task.pipe($.sass(sassConfig).on('error', $.sass.logError));
        if (site.style.autoprefixer)
            task = task.pipe($.autoprefixer(site.style.autoprefixer));
    }

    if (PROD) {
       task = task.pipe($.cssnano({autoprefixer: false}));
    } else {
        task = task.pipe($.sourcemaps.write());
    }
    return task.pipe(gulp.dest(`${site.buildRoot}/css`))
        .pipe(browser.reload({stream: true}));
}

/**
 * xử lý script của site
 * nếu ở chế độ debug thì tạo source map
 * nếu ở chế độ production thì minify
 * concat script thành app.js nếu ${site.script.concat} == true
 */
function script() {
    const IS_CONCAT = site.script.concat && site.script.concat === true;
    let concatName = 'app.js';
    if (site.script.concatName !== undefined && typeof(site.script.concatName) === 'string')
        concatName = site.script.concatName;
    let task = gulp.src(site.script.files)
        .pipe($.plumber());
    if (!PROD)
        task = task.pipe($.sourcemaps.init());

    // babel es6 -> es5
    task = task.pipe($.babel({presets: ['es2015'], compact: false}));

    if (IS_CONCAT)
        task = task.pipe($.concat(concatName));

    if (PROD) {
        task = task.pipe($.uglify().on('error', e => {
            console.log(e);
        }));
    } else {
        task = task.pipe($.sourcemaps.write());
    }
    return task.pipe(gulp.dest(`${site.buildRoot}/js`));
}

/**
 * Inline css, js task
 */
function inlineSource(done) {
    if (!PROD) {
        console.log('development mode, skipping inlineSource');
        return done();
    }
    return gulp.src(`${site.buildRoot}/**/*.html`)
        .pipe($.inlineSource({
            rootpath:      site.buildRoot,
            ignore:        ['svg', 'png'],
            compress:      false,
            swallowErrors: false
        }))
        .pipe(gulp.dest(file => {
            return file.base;
        }));
}

// copy moi thu trong thu muc ${site.assetRoot} sang ${site.buildRoot}
function asset() {
    return gulp.src(`${site.assetRoot}/**/*`)
        .pipe($.plumber())
        .pipe(gulp.dest(site.buildRoot));
}

// tạo local server host nội dung của ${site.buildRoot}
function server(done) {
    browser.init({
        server: site.buildRoot,
        port:   site.port
    });
    done();
}

function serverForApp(done) {
    browser.init({
        server: site.buildRoot,
        ui:     false,
        open:   false
    });
    done();
}

// Xóa ${buildRoot} (metalsmith tự động xóa)
// build metalsmith, sass, javascript, image
// copy tất cả qua ${buildRoot}
gulp.task('build', gulp.series(metalsmith, gulp.parallel(asset, script, sass), inlineSource));

function reload(done) {
    browser.reload();
    done();
}

function watch() {
    gulp.watch(['site.js'], gulp.series(reloadSiteConfig, 'build', reload));

    gulp.watch(`${site.assetRoot}/**/*`, gulp.series(asset, reload));      // watch asset
    gulp.watch(`${site.styleRoot}/**/*.{scss,sass}`, sass);                // watch style
    gulp.watch(`${site.scriptRoot}/**/*.js`, gulp.series(script, reload)); // watch script
    gulp.watch([
        `${site.contentRoot}/**/*`,
        `${site.layoutRoot}/**/*`
    ], gulp.series(metalsmith, inlineSource, reload));
}

// Build the site, run the server, and watch for file changes
gulp.task('default', gulp.series('build', server, watch));
gulp.task('app-watch', gulp.series('build', serverForApp, watch));