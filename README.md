### Hướng dẫn sử dụng source EasyWeb

**Cài đặt**
1. clone project (mặc định là branch master)
* click ```EWH-install.bat``` or run ```npm install```
* run ```bower install``` (nếu project sử dụng bower để quản lý frontend library như sass, less,...)

**PreView Local**: Sử dụng một trong các câu lệnh dưới để chạy và kiểm tra website trên máy cá nhân

  - click ```EWH-rundemo.bat``` or run ```npm run watch```      
  - Có thể tham khảo thêm các  lệnh dưới
     - ```npm run watch-prod``` // chạy và kiểm tra website trước khi upload lên server
     - ```npm run build```      // build để chạy máy cá nhân
     - ```npm run build-prod``` // build để chạy trên server

#### Cấu hình mặc định của EasyWebHub framework
```js
const site = {
    port:        8080,        // cổng server local sẻ sử dụng
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
```
#### Cấu hình nâng cao dành cho front-end devs
  - **build javascript**

```js
site.script = {
    concat: true, // concat == true sẽ nhập các file script lại thành 1 file duy nhất
    concatName: 'app.js',
    files:  [
        // // jquery
        // 'bower_components/jquery/dist/jquery.js',

        // // core foundation
        // 'bower_components/foundation-sites/js/foundation.core.js',
        // 'bower_components/foundation-sites/js/foundation.util.*.js',

        // thêm các file script của site ở đây
        // muốn concat đúng thứ tự thì phải define path
        `${site.scriptRoot}/!(app).js` // các file có tên khác 'app.js'
    ]
};
```

- **Build style css, sass**
```js
site.style = {
    sass:         {
        // đường dẫn tơi các thư viện sass, có thể load bằng @import
        includePaths: [
            'bower_components/foundation-sites/scss'
        ]
    },
    autoprefixer: {
        browsers: ['last 2 versions', 'IE >= 9']
    }
};
```
