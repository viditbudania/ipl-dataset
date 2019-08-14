var fs = require('fs');
var csv = require('fast-csv');
exports.file = function (year) {
    var season = [];
    return new Promise(function (resolve, reject) {
        fs.createReadStream('matches.csv')
            .pipe(csv.parse())
            .on('data', function (data) {
                if (data[1] == year) {
                    season.push(data[0]);
                }
            })
            .on('end', function (data) {
                // console.log('Read finished');
                resolve(season);
            });
    });
};