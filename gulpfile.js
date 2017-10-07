var	gulp			=	require('gulp'),
    browserSync		=	require('browser-sync'),
    notify			=	require("gulp-notify"),
    del             =   require('del'),
    sass			=	require('gulp-sass'),
    rename			=	require('gulp-rename'),
    autoprefixer	=	require('gulp-autoprefixer'),
    cleanCSS		=	require('gulp-clean-css'),
    concat			=	require('gulp-concat'),
    uglify			=	require('gulp-uglify'),
    spritesmith		=	require('gulp.spritesmith');


gulp.task('browser-sync', function() {
    browserSync({
        server: {baseDir: 'app'},
        notify: false
    });
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('sass', function() {
    return gulp.src('app/sass/*.sass')
        .pipe(sass().on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer({browsers: ['last 30 versions']}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/lightslider/dist/js/lightslider.min.js',
        'bower_components/mixitup/build/jquery.mixitup.min.js',
        'app/js/common.js'
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('watch', ['sass', 'scripts', 'browser-sync'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/common.js',['scripts'], browserSync.reload);
});

gulp.task('sprite', function() {
    var spriteData = gulp.src('app/img/icons/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.sass',
            imgPath: '../img/sprite.png',
            cssFormat: 'sass',
            padding: 5
        }));
    var imgStream = spriteData.img.pipe(gulp.dest('app/img/'));
    var cssStream = spriteData.css.pipe(gulp.dest('app/sass/basis/'));
    return (imgStream, cssStream);
});

gulp.task('default', ['watch']);

gulp.task('build', ['clean', 'sass', 'scripts'], function() {

    gulp.src(['app/css/styles.min.css'])
        .pipe(gulp.dest('dist/css'));

    gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'));

    gulp.src('app/js/scripts.min.js')
        .pipe(gulp.dest('dist/js'));

    gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

});
