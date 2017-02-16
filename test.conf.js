<?xml version="1.0" encoding="utf-8"?>
<body>
	<caption>test</caption>
	<content>
	<![CDATA[
		// 载入插件 {{{
		var gulp = require('gulp'),
			less = require('gulp-less'),//less编译
			min_css = require('gulp-minify-css'),//压缩css
			plumber = require('gulp-plumber');//防止watch出错退出
			rename = require('gulp-rename'),//重命名
			changed = require('gulp-changed'); //真正修改过的文件才能通过管道
			livereload = require('gulp-livereload');//刷新浏览器
		//}}}

		// less {{{
		gulp.task('less', function() {
			gulp.src('../app/background/files/*.less')
				.pipe(plumber())
				.pipe(less())
				.pipe(min_css({compatibility:'ie7'}))
				.pipe(rename(function(path) {
					path.basename += '.min'
				}))
				.pipe(changed('../app/background/css/'))
				.pipe(gulp.dest('../app/background/css/'))
				.pipe(livereload({auto:false}));
		});
		//}}}
		gulp.task('html', function() {
			gulp.src('../app/background/*.html')
				.pipe(livereload({auto:false}));
		});

		// wathc{{{
		gulp.task('watch', function() {
			livereload.listen();
			gulp.watch('../app/background/files/*.less', ['less']);
			gulp.watch('../app/background/*.html', ['html']);
		});
		//}}}

		gulp.task('default', ['watch']);
	]]>
	</content>
</body>
