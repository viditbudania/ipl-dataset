var fs = require('fs');
var csv = require('fast-csv');

function rowReader(filePath, cb, result, optionalDS) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv.parse())
            .on('data', function (row) {
                cb(row, result, optionalDS)
            })
            .on('end', function () {
                resolve(result);
            });
    })
}

module.exports.rowReader = rowReader;