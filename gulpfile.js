const gulp = require('gulp');
const sass= require('gulp-sass')(require('sass'));// gulp sass convert gulp sass to gulp css
const cssnano = require('gulp-cssnano'); //this is compressing the css into one line
const rev = require('gulp-rev'); //this is for renaming the files with time stamps
const uglify = require('gulp-uglify-es').default; //to minify the javascript
const imagemin = require('gulp-imagemin'); //npm install gulp-imagemin@6.0.0
const del = require('del');
// gulp uses tasks to execute

gulp.task('css', function(done){
    console.log('minifying css ...');
    gulp.src('./assets/sass/**/*.scss') // '**' means all the files/folders/sub folders inside sass, '*.scss' means all the files with extension .scss need to be compressed
    .pipe(sass()) // to convert scss to css
    .pipe(cssnano()) //convert them to one line css
    .pipe(gulp.dest('./assets.css'));

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({//manifest is a object with key value pair, having <original file name> : original-<timestamp>
        cwd: 'public', //current working directory
        merge: true //if a name already exists, then dont change it and merge it with original exisitng files
    } ))
    .pipe(gulp.dest('./public/assets'));
    done();
})

// to test type command gulp css

gulp.task('js', function(done){
    console.log('minifying js...');
     gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
});


gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)') //'+......' is a regular expression(regex)
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


// empty the public/assets directory
gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets');
    done();
});