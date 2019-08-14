var matcheFile = require('./matchid');
var matchData = require('./fileReader.js');

function extraRunPerTeam(delivery, extraRunsIn2016, matchIdOf2016) {

    const id = delivery[0];
    const extrarun = delivery[16];
    const team = delivery[3];
    if (matchIdOf2016 != "bowling_team")
        if (matchIdOf2016.includes(id)) {
            if (extraRunsIn2016.hasOwnProperty(team)) {
                extraRunsIn2016[team] += parseInt(extrarun);

            } else {
                extraRunsIn2016[team] = parseInt(extrarun);
            }
        }
    // return extraRunsIn2016;
}
async function getFile() {
    var matchIdOf2016 = [];
    var result = {};
    let filePath = "deliveries.csv";
    matchIdOf2016 = await matcheFile.file(2016);
    var p = await matchData.rowReader(filePath, extraRunPerTeam, result, matchIdOf2016);
    console.log(p);
}
getFile();










/*
var fs = require('fs');
var csv = require('fast-csv');
var matcheFile = require('./matchid');

function extraRunPerTeam(season) {
    var extraRunsIn2016 = {};
    fs.createReadStream('deliveries.csv')
        .pipe(csv.parse())
        .on('data', function (delivery) {
            // console.log(delivery);
            const id = delivery[0];
            const extrarun = delivery[16];
            const team = delivery[3];
            if (season != "bowling_team")
                if (season.indexOf(id) !== -1  ) {
                    if (extraRunsIn2016.hasOwnProperty(team)) {
                        extraRunsIn2016[team] += parseInt(extrarun);
                    } else {
                        extraRunsIn2016[team] = parseInt(extrarun);
                    }
                }
        })
        .on('end', function (data) {
            console.log(extraRunsIn2016);
        });
}
async function getFile() {
    var season = [];
    season = await matcheFile.file(2016);
    extraRunPerTeam(season);
}
getFile();
*/