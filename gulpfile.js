var SCSS_DIR = 'src/assets/site/scss/';
var SASS_ALL = SCSS_DIR + 'all.scss';

var gulp = require('gulp');

// Generates the Sass import file used to create all.css
gulp.task('sass-gen', () => {
  var glob = require('glob');
  var imports = ['/* Generated at ' + new Date().toISOString() + ' */', '@import "reset.scss";'];

  return glob(
    SCSS_DIR + '**/*.scss',
    {
      ignore: [SCSS_DIR + 'all.scss', SCSS_DIR + 'mixins.scss', SCSS_DIR + 'reset.scss', SCSS_DIR + 'variables.scss'],
    },
    (err, files) => {
      for (var i = 0; i < files.length; i++) {
        imports.push('@import "' + files[i].replace(SCSS_DIR, '') + '";');
      }

      var fs = require('fs');
      fs.writeFileSync(SASS_ALL, imports.join('\r\n'));
    },
  );
});

// Creates all.css and all.min.css
gulp.task('sass', gulp.series('sass-gen', () => {
  var sass = require('gulp-sass');
  var cssmin = require('gulp-cssmin');
  var header = require('gulp-header');
  var rename = require('gulp-rename');
  var banner = '/* Generated at ' + new Date().toISOString() + '.  Do not edit. */\r\n';
  return gulp
    .src(SASS_ALL)
    .pipe(sass())
    .pipe(header(banner))
    .pipe(gulp.dest('src/assets/site/css'))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner))
    .pipe(gulp.dest('src/assets/site/css'))
    .on('error', console.log);
}));

gulp.task('watch', () => {
  gulp.watch([SCSS_DIR + '**/*.scss', '!all.scss'], gulp.series('sass'));
});
