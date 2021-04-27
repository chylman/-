const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify")
const rename = require("gulp-rename");
const svgstore = require("gulp-svgstore");
const del = require("del");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
  return gulp.src("source/scss/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("build/css"))
    .pipe(postcss([csso()]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

//HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"))
    .pipe(sync.stream());
};

exports.html = html;

//Scripts

const scripts = () => {
  return gulp.src("source/js/*.js")
    .pipe(uglify())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
};

exports.scripts = scripts;

//Images

const images = () => {
  return gulp.src("source/image/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({progressive:true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/image"))
};

exports.images = images;

// WebP

const createWebp = () => {
  return gulp.src("source/image/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/image"))
};

exports.createWebp = createWebp;

//Clean

const clean = () => {
  return del("build")
};

exports.clean = clean;


//Sprite

const sprite = () => {
  return gulp.src("source/image/icon/*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/image"));
};

exports.sprite = sprite;

//Copy

const copy = (done) => {
  return gulp.src([
    "source/fonts/*.{woff,woff2,ttf}",
    "source/*.ico",
    // "source/image/**/*.{jpg,png,svg}",
    "source/css/*.css"
  ], {
    base: "source"
  })

    .pipe(gulp.dest("build"));
};

exports.copy = copy;


// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/scss/**/*.scss", gulp.series("styles"));
  gulp.watch("source/js/*.js", gulp.series("scripts"));
  gulp.watch("source/*.html").on("change", gulp.series("html"));
  gulp.watch("source/*.html").on("change", sync.reload);
};

//Build

const build = gulp.series (
  clean,
  gulp.parallel (
    styles,
    html,
    scripts,
    sprite,
    images,
    createWebp,
    copy
  ));

exports.build = build;

exports.default = gulp.series (
  clean,
  gulp.parallel (
    styles,
    html,
    scripts,
    images,
    sprite,
    createWebp,
    copy
  ),
  gulp.series (
    server,
    watcher
  ));
