import gulp from 'gulp';
import { spawn } from 'child_process';
import concat from 'gulp-concat';
import htmlmin from 'gulp-htmlmin';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import uglify from 'gulp-uglify';
import postcss from 'gulp-postcss';
import { postcssPlugin as uncss } from 'uncss';
import cssnano from 'cssnano';
import { default as log } from 'fancy-log';

// Compile SASS.
export const css = () => gulp.src('./_css/townies.scss')
    .pipe(sass({
      includePaths: [
        './_css',
        './node_modules/foundation-sites/scss',
      ],
      //outputStyle: 'compressed'
    })
    .on('error', sass.logError))
    .pipe(postcss([uncss({
        csspath: '_site/css/townies.css',
        html: [
          '_site/index.html',
          '_site/appointments.html',
          '_site/barbers.html',
        ],
      }), cssnano()]))
    .pipe(gulp.dest('./css'));

export const cssWatch = () => gulp.watch('./_css/**/*.scss', ['css']);

// Compile JS.
export const js = () => gulp.src([
    './node_modules/foundation-sites/dist/js/foundation.js',
  ])
    .pipe(concat('townies.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'));

export const jsWatch = () => gulp.watch('./_js/**/*.js', ['js']);

export const htmlMinify = () => gulp.src('_site/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('_site'));

export const jekyll = (gulpCallback) => {
  const jekyll = spawn('bundle', ['exec', 'jekyll', 'build']);

  const jekyllLogger = function(buffer) {
    buffer.toString()
      .split(/\n/)
      .forEach(function(message) {
        log('Jekyll: ' + message);
      });
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);

  jekyll.on('exit', gulpCallback);
}

export const jekyllServe = () => {
  const jekyll = spawn('bundle', ['exec', 'jekyll', 'serve']);

  const jekyllLogger = function(buffer) {
    buffer.toString()
      .split(/\n/)
      .forEach(function(message) {
        log('Jekyll: ' + message);
      });
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
}

export const dev = gulp.series(css, js, jekyllServe, cssWatch, jsWatch);

export const build = gulp.series(css, js, jekyll, htmlMinify);

export default dev;
