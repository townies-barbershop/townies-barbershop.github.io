import gulp from 'gulp';
import { spawn } from 'child_process';
import concat from 'gulp-concat';
import htmlmin from 'gulp-htmlmin';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import terser from 'gulp-terser';
import postcss from 'gulp-postcss';
import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';
import cssnano from 'cssnano';
import removeComments from 'postcss-discard-comments';
import { default as log } from 'fancy-log';

// Dev
export const cssDev = () => gulp.src('./_css/townies.scss')
    .pipe(sass({
      includePaths: [
        './_css',
        './node_modules/bootstrap/scss',
      ],
    })
    .on('error', sass.logError))
    .pipe(gulp.dest('./css'));

export const cssWatch = () => gulp.watch('./_css/**/*.scss', cssDev);

export const jsDev = () => gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.min.js'
  ])
  .pipe(concat('script.js'))
  .pipe(gulp.dest('js'));

export const jsWatch = () => gulp.watch('./_js/**/*.js', jsDev);

export const htmlServe = () => {
  const eleventy = spawn('npx', ['@11ty/eleventy', '--serve']);

  const htmlLogger = function(buffer) {
    buffer.toString()
      .split(/\n/)
      .forEach(function(message) {
        log('11ty: ' + message);
      });
  };

  eleventy.stdout.on('data', htmlLogger);
  eleventy.stderr.on('data', htmlLogger);
}

// Prod
export const cssProd = () => gulp.src('./_css/townies.scss')
    .pipe(sass({
      includePaths: [
        './_css',
        './node_modules/bootstrap/scss',
      ],
    })
    .on('error', sass.logError))
    .pipe(postcss([purgeCSSPlugin({
        content: [
          '_site/index.html',
          '_site/appointments.html',
          '_site/barbers.html',
        ]
      }),
      removeComments({ removeAll: true }),
      cssnano()
    ]))
    .pipe(gulp.dest('./_site/css'));

export const jsProd = () => gulp.src([
      './node_modules/bootstrap/dist/js/bootstrap.min.js'
    ])
    .pipe(concat('script.js'))
    .pipe(terser({
      toplevel: true,
      format: {
        comments: false
      }
    }))
    .pipe(gulp.dest('_site/js'));

export const htmlBuild = (gulpCallback) => {
  const eleventy = spawn('npx', ['@11ty/eleventy']);

  const htmlLogger = function(buffer) {
    buffer.toString()
      .split(/\n/)
      .forEach(function(message) {
        log('11ty: ' + message);
      });
  };

  eleventy.stdout.on('data', htmlLogger);
  eleventy.stderr.on('data', htmlLogger);

  eleventy.on('exit', gulpCallback);
}

export const dev = gulp.series(cssDev, gulp.parallel(htmlServe, cssWatch));
export const build = gulp.series(htmlBuild, cssProd, jsProd);

export default dev;
