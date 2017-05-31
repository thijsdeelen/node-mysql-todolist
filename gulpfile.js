//
// Gulpfile waarmee je, naast heel veel andere zaken, een SonarQube.com analyse kunt genereren.
// 
// Installeer gulp via 'npm install gulp' (zie package.json).
// In package.json staat een script-regel om een analyse te genereren.
// Voer deze uit via 'gulp sonarqube' of via npm run sonar'. 
// Het resultaat van je analyse zie je - wanneer je een account hebt - 
// op https://sonarqube.com. 
//
var gulp = require('gulp');
var sonarqubeScanner = require('sonarqube-scanner');
var runSequence = require('run-sequence');

//
// Task om Sonar analyse te genereren.
// Voer deze uit via 'gulp sonarqube' of via npm run sonar'.
//
gulp.task('sonarqube', function(callback) {
    //
    // Info over instellingen van sonarqubeScanner: 
    // https://docs.sonarqube.org/display/SONAR/Analysis+Parameters
    //
    // ----------------------------------------------------
    sonarqubeScanner({
        serverUrl: "https://sonarqube.com",
        options: {
            "sonar.organization": "avansinformaticabreda",
            "sonar.projectKey": "avansinformaticabreda:master",
            "sonar.login": "9ff8119ecea9f6c15d6c461a62dcc2d8db3439e1",
            "sonar.projectName": "node-todolist",
            "sonar.working.directory": "./.sonar",
            "sonar.exclusions": "gulpfile.js, .gitignore, *.md, *.yml, *.sql, *.txt, node_modules/**",
            "sonar.verbose": "true"
        }
    }, callback);
});

//
// Default gulp task, moet altijd aanwezig zijn.
//
gulp.task('default', function() {
    runSequence('sonarqube');
});