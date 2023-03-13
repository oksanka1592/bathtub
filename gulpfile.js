

const { src, dest, watch, parallel, series } = require('gulp');

const scss         = require('gulp-sass')(require('sass'));
const concat       = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify       = require('gulp-uglify');
const imagemin     = require('gulp-imagemin');
const browserSync  = require('browser-sync').create();
const del          = require('del');


function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'docs/'
    },
    notify: false,
    // browser: "google chrome"
  })
}

function styles() {
  return src('docs/scss/style.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true,
    }))
    .pipe(dest('docs/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
    'docs/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('docs/js'))
    .pipe(browserSync.stream())
}

function images() {
  return src('docs/images/**/*.*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('dist/images'))
}


function build() {
  return src([
    'docs/**/*.html',
    'docs/css/style.min.css',
    'docs/js/main.min.js'
  ], { base: 'docs' })
    .pipe(dest('dist'))
}

function cleanDist() {
  return del('dist')
}

function watching() {
  watch(['docs/scss/**/*.scss'], styles);
  watch(['docs/js/**/*.js', '!docs/js/main.min.js'], scripts);
  watch(['docs/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
// exports.build = build;
exports.build = series(cleanDist, images, build);
exports.cleanDist = cleanDist;
exports.images = images;

exports.default = parallel(styles, scripts, browsersync, watching);