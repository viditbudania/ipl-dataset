var matchData = require('./fileReader.js');

function teamWonPerYear(years, seasonPerYear) {
    // var seasonPerYear = {};
    const year = years[1];
    const team = years[10];
    if (year != "season")
        if (seasonPerYear.hasOwnProperty(year)) {
            if (seasonPerYear[year].hasOwnProperty(team)) {
                seasonPerYear[year][team]++;
            } else {
                seasonPerYear[year][team] = 1;
            }
        } else {
            seasonPerYear[year] = {};
            seasonPerYear[year][team] = 1;
        }

}
async function execute() {
    var result = {};
    let filePath = "matches.csv"
    let p = await matchData.rowReader(filePath, teamWonPerYear, result);
    console.log(p);
}
execute();




/*
var fs = require('fs');
var csv = require('fast-csv');

function teamWonPerYear() {
    var seasonPerYear = {};
    fs.createReadStream('matches.csv')
        .pipe(csv.parse())
        .on('data', function (years) {
            //console.log(years);
            const year = years[1];
            const team = years[10];
            if (year != "season")
                if (seasonPerYear.hasOwnProperty(year)) {
                    if (seasonPerYear[year].hasOwnProperty(team)) {
                        seasonPerYear[year][team]++;
                    } else {
                        seasonPerYear[year][team] = 1;
                    }
                } else {
                    seasonPerYear[year] = {};
                    seasonPerYear[year][team] = 1;
                }

        })
        .on('end', function (years) {
            console.log(seasonPerYear);
        });
}
teamWonPerYear();*/