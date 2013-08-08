module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/* (c) Jonathan Gotti - licence: https://github.com/malko/d.js/LICENCE.txt @version 0.0.0*/\n'
			},
			build: {
				src: 'lib/D.js',
				dest: 'lib/D.min.js'
			}
		},
		mochacli: {
			options: {
				require: ['chai'],
				reporter: 'spec',
				timeout: 300
			},
			src: { options: {files: 'tests/d-src*.js'}},
			min: { options: {files: 'tests/d-min*.js'}}
		},
		version: {
			options: {
				prefix:'@version\\s*'
			},
			defaults: {
				src:['lib/D.js', 'lib/D.min.js']
			}
		},
		jsdoc:{
			dist: {
				src: ['lib/D.js', 'test/*.js'],
				options: {
					destination: 'docs'
				}
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-mocha-cli');
	grunt.loadNpmTasks('grunt-version');
	grunt.loadNpmTasks('grunt-jsdoc');

	// Default task(s).
	grunt.registerTask('default', ['build']);
	grunt.registerTask('test', ['mochacli']);
	grunt.registerTask('build', ['uglify','version','mochacli']);

};