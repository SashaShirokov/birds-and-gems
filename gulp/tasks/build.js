let gulp = require("gulp");
let imagemin = require("gulp-imagemin");
let del = require("del");
let usemin = require("gulp-usemin");
let rev = require("gulp-rev");
let cssnano = require("gulp-cssnano");
let uglify = require("gulp-uglify");
let browserSync = require("browser-sync").create();

gulp.task("previewDocs", function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "docs"
        }
    });
})

gulp.task("deleteDocsFolder", function() {
    return del("./docs");
})

gulp.task("optimizeImages", ["deleteDocsFolder"], function() {
    return gulp.src("./assets/images/**/*")
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest("./docs/images"));
});

gulp.task("sounds", ["deleteDocsFolder"], function() {
    return gulp.src("./assets/sounds/**/*")
        .pipe(gulp.dest("./docs/sounds"));
})

gulp.task("usemin", ["deleteDocsFolder"], function() {
    return gulp.src("./assets/index.html")
    .pipe(usemin({
        css: [function() {return rev()}, function() {return cssnano()}],
        js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest("./docs"))
})

gulp.task("build", ["deleteDocsFolder", "sounds", "optimizeImages", "usemin"]);
