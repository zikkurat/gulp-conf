<?xml version="1.0" encoding="utf-8"?>
<body>
	<caption>Test</caption>
	<content>
	<![CDATA[
		// 载入插件 {{{
		var gulp = require('gulp'),
			less = require('gulp-less'),//less编译
			min_css = require('gulp-minify-css'),//压缩css
			uglify = require('gulp-uglify'),//转换、压缩JS
			concat = require('gulp-concat'),//合并文件
			rename = require('gulp-rename'),//重命名
			html_min = require('gulp-htmlmin'),//压缩html
			plumber = require('gulp-plumber');//防止watch出错退出
			sourcemaps = require('gulp-sourcemaps');//源映射
			livereload = require('gulp-livereload');//刷新浏览器
		//}}}

		var xxx = 0;
		// less {{{
		gulp.task('less', function() {
			gulp.src('../test/source/main.less')
				.pipe(changed('../test/', {
				    extension: '.html'
				}))
				.pipe(plumber())
				.pipe(less())
				.pipe(min_css({compatibility:'ie7'}))
				.pipe(rename(function(path) {
					xxx++;
					console.log('---------   '+xxx+'   ---------');
					console.log(path.basename + path.extname);
					path.basename += '.min'
				}))
				.pipe(gulp.dest('../test/'));
				//.pipe(livereload({auto:false}));
		});
		//}}}

		// uglify {{{
		gulp.task('uglify', function() {
		    gulp.src('../test/source/*.js')
				.pipe(plumber())
				.pipe(sourcemaps.init())
		        .pipe(uglify({
		            preserveComments: 'some'
		        }))
		        .pipe(rename(function(path) {
					path.basename += '.min';
		        }))
				//.pipe(sourcemaps.write(paths.js.map))
				.pipe(gulp.dest('../test/'))
		});
		//}}}

		// wathc{{{
		gulp.task('watch', function() {
			//livereload.listen();
			gulp.watch('../test/source/*.less', ['less']);
			gulp.watch('../test/source/*.js', ['uglify']);
		});
		//}}}

		gulp.task('default', ['watch']);
	]]>
	</content>
</body>
