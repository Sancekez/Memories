'use strict';

// ---------packages
const gulp = require('gulp'),
	path = require('path'),
	fs = require('fs'),
	browserSync = require("browser-sync"),
	reload = browserSync.reload,
	plumber = require('gulp-plumber'),
	changed = require('gulp-changed'),
	runSequence = require('gulp4-run-sequence'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	cssmin = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer');

var onError = require("./onError");
var route = require("./route")();

var scssSourceFilesBasePath = path.join(route.main.src, 'scss')
var scssSourceFiles = path.join(fs.realpathSync(scssSourceFilesBasePath), '*.scss')

/* gulp.task('style:gen', function (callback) {
	var cssDestination = path.dirname(scssSourceFiles)
	return gulp
		.src(scssSourceFiles)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(changed(cssDestination, { extension: '.css' }))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			overrideBrowserslis: ['last 4 versions'],
			cascade: false
		}))
		.pipe(cssmin())
		.pipe(cleanCSS({ debug: true, }, (details) => {

		})) 
		.pipe(gulp.dest(route.build.styles))
		.on('end', browserSync.reload);
}); */

gulp.task('style:gen', function (callback) {
	var cssDestination = path.dirname(scssSourceFiles)
	console.log(scssSourceFiles)
	return gulp
		.src(scssSourceFiles)
		.pipe(plumber({
			errorHandler: onError
		}))
		//.pipe(changedInPlace())
		//.pipe(changed(route.build.styles, { extension: '.css' }))

		.pipe(changed(cssDestination, { extension: '.css' }))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			//overrideBrowserslis: ['last 18 versions'],
			cascade: false
		}))
		.pipe(cssmin({ processImport: false }))
		.pipe(gulp.dest(route.build.styles))
		.on('end', browserSync.reload);
});

gulp.task('style:build', function (cb) {
	runSequence('style:gen', cb);
});
