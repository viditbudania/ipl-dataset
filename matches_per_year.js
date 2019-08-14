var matchData = require('./fileReader.js');

function matchesPerYear(match, matchePerYear) {
    // var matchePerYear = {};
    const season = match[1];
    if (season != "season")
        if (matchePerYear.hasOwnProperty(season)) {
            matchePerYear[season]++;
        } else {
            matchePerYear[season] = 1;
        }

}
async function execute() {
    var result = {};
    const filePath = "matches.csv"
    let p = await matchData.rowReader(filePath, matchesPerYear, result);
    console.log(p);
}
execute();


/*
var fs = require('fs');
var csv = require('fast-csv');

function matchesPerYear() {
    var matchePerYear = {};
    fs.createReadStream('matches.csv')
        .pipe(csv.parse())
        .on('data', function (match) {
            const season = match[1];
            //console.log(match);
            if (season != "season")
                if (matchePerYear.hasOwnProperty(season)) {
                    matchePerYear[season]++;
                } else {
                    matchePerYear[season] = 1;
                }

        })
        .on('end', function (data) {
            console.log(matchePerYear);
        });
}
matchesPerYear();*/