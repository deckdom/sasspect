const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('default', function() {
  return gulp.src('sasspect.scss')
    .pipe(sass());
});