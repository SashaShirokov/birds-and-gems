let gulp = require("gulp");
let watch = require("gulp-watch");
let browserSync = require("browser-sync").create();

gulp.task("watch", function() {

    browserSync.init({
        notify: false,
        server: {
            baseDir: "assets"
        }
    });

    watch("./assets/index.html", function() {
        browserSync.reload();
    });

    watch("./assets/styles/**/*.css", function() {
        gulp.start("cssInject");
    });

    watch("./assets/scripts/**/*.js", function() {
        gulp.start("scriptsRefresh");
    });
});

gulp.task("cssInject", ["styles"], function() {
    return gulp.src("./assets/temp/styles/style.css")
    .pipe(browserSync.stream());
});

gulp.task("scriptsRefresh", ["scripts"], function() {
    browserSync.reload();
});
