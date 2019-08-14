var getMatchIds = require('./matchid');
var rowReader = require('./fileReader.js').rowReader;

function extract(delivery, result, matchIds) {
    const id = delivery[0];
    const runs = delivery[15];
    const wides = delivery[10];
    const batsman = delivery[6];
    const superOver = delivery[9];
    if (matchIds.includes(id)) {
        if (!result.hasOwnProperty(batsman)) {
            result[batsman] = {
                "totalrun": 0,
                "balls": 0
            };
        }
        if (superOver == '0')
            result[batsman]["totalrun"] += parseInt(runs);
        if (wides == '0' && superOver == '0') {
            result[batsman]["balls"] += 1;
        }
    }
    return result;
}

function transform(result) {
    for (let player in result) {
        if (result[player]["totalrun"] < 200)
            delete result[player];
    }
    var calculatedStrike = {};
    for (let player in result) {
        calculatedStrike[player] = (result[player]["totalrun"] / result[player]["balls"]) * 100;
    }
    return calculatedStrike;
}

function shortingResult(result) {

    var shortedArray = [];
    for (let player in result) {
        shortedArray.push([player, result[player]])
    }
    shortedArray.sort(function (a, b) {
        return a[1] - b[1];
    });
    return shortedArray;
}

function output(result) {
    for (let i = (result.length - 6); i < result.length; i++) {
        console.log(result[i]);
    }
}

async function getFile() {
    let matchIdsIn2013 = [];
    let result = {};
    let filePath = "/mnt/c/Users/vidit budania/Downloads/ipl-project/deliveries.csv";
    matchIdsIn2013 = await getMatchIds.file(2013);
    //console.log(matchIdsIn2013)
    await rowReader(filePath, extract, result, matchIdsIn2013);
    var allStrikeRates = transform(result);
    var shortedStrikeRate = shortingResult(allStrikeRates)
    output(shortedStrikeRate);
}
getFile();