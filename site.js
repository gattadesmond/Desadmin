const site = {
    port:        8088,        // cổng server local sẻ sử dụng
    contentRoot: './content', // thư mục chứa content file cho metalsmith
    buildRoot:   './build',   // thư mục chứa output của metalsmith
    layoutRoot:  './layout',  // thư mục layout của handlebars

    // thư mục chứa style của site, sẽ build vào ${buildRoot}/css/
    styleRoot: './style',

    // thư mục chứa style của site, sẽ build vào ${buildRoot}/js/
    scriptRoot: './script',

    // thư mục chứa các script, css, fonts, image của vendor
    // tât cả sẽ được copy (giữ nguyên câu trúc) qua ${buildRoot}
    // ở chế độ production cũng sẽ không minify
    assetRoot: './asset',

    //thư mục chứa tất các các file json chứa dữ liệu dùng chung, không định nghĩa được trong file .md
    //gồm 3 file json chính
    //global.json chứa thông tin chung về website
    //menu.json chứa thông tin về menu của website
    //footer.json chứa thông tin về footer của website
    metadataRoot : './content/metadata'



};

site.script = {
    concat:     true,     // concat == true sẽ nhập các file script lại thành 1 file duy nhất
    concatName: 'app.js', // tên của file script sau khi nhập, mặc định là app.js
    files:      [
        // thêm các file script của site ở đây
        // muốn concat đúng thứ tự thì phải define path
        `${site.scriptRoot}/!(app).js` // các file có tên khác 'app.js'
    ]
};

site.style = {
    sass:         {
        // đường dẫn tơi các thư viện sass, có thể load bằng @import
        includePaths: [
            // 'bower_components/foundation-sites/scss',
            // 'bower_components/motion-ui/src'
        ]
    },
    autoprefixer: {
        browsers: ['last 2 version', '> 1%' ,'ios 7']
    }
};

// define và config các plugin của metalsmith
site.metalsmith = {
    'metalsmith-metadata-directory': {
      'directory': `${site.metadataRoot}/**/*.json`
    },

    'metalsmith-drafts':        {
        '_enable': false
    },
    'metalsmith-matters':       {
        '_enable': true,
        'delims':  ['---json', '---'],
        'options': {
            'lang': 'json'
        }
    },

    'metalsmith-markdown':      {
        '_enable':     true,
        'smartypants': true,
        'smartLists':  true,
        'gfm':         true,
        'tables':      true
    },
    
  

    'metalsmith-collections':   {
        '_enable': true,
         // collection theo file pattern + test limit
        'blog':    {
            'pattern': 'blog/**/*.html',
            'sortBy':  'date',
            'reverse': true,
        },
         // collection theo key trong metadata `"collection": "baiviet"`
        'baiviet': {
            'sortBy':  'date',
            'reverse': true
        }
    },

    //'metalsmith-pagination':    {
    //    '_enable': true,
    //    'collections.blog':    {
    //        'perPage':   1,
    //        'layout':    'blog-list.html',
    //        'first':     'blog/index.html',
    //        'path':      'blog/:num/index.html',
    //        'noPageOne': true,
    //        'pageMetadata': {
    //          'title': 'Title of metalsmith-pagination file site.js'
    //        }
    //    },
    //},

    'metalsmith-permalinks':    {
        '_enable':  true,
        // default config
        'pattern':  ':slug',
        'relative': false,
        // config rieng cho 1 collection
        linksets:   [{
            match:   {collection: 'blog'},
            pattern: 'blog/:slug'
        }]
    },

    'metalsmith-layouts':       {
        '_enable':   true,
        'engine':    'handlebars',
        'directory': `${site.layoutRoot}`,
        'partials':  `${site.layoutRoot}/partial`
    },

    'metalsmith-html-minifier': {
        '_enable':               false,
        'removeAttributeQuotes': false,
        'keepClosingSlash':      true,
        'removeRedundantAttributes': false
    }
};

module.exports = site;
