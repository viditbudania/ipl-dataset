var fs = require('fs');
var csv = require('fast-csv');
var matcheFile = require('./matchid');

function runPerBatsman(matchIdof2015) {
    var playerName = {};
    fs.createReadStream('deliveries.csv')
        .pipe(csv.parse())
        .on('data', function (balls) {
            const id = balls[0];
            const runs = balls[15];
            const player = balls[6];
            if (matchIdof2015.indexOf(id) !== -1 /*(id >= parseInt(matchIdof2015[0])) && (id <= parseInt(matchIdof2015[matchIdof2015.length - 1]))*/ ) {
                if (playerName.hasOwnProperty(player)) {
                    playerName[player] += parseInt(runs);
                } else {
                    playerName[player] = parseInt(runs);
                }
            }
        })
        .on('end', function (data) {
            var arrayofbatsman = [];
            for (let player in playerName) {
                arrayofbatsman.push([player, playerName[player]]);
            }

            arrayofbatsman.sort(function (a, b) {
                return a[1] - b[1];
            });
            console.log("Man of the 2015 ipl matchIdof2015 is " + arrayofbatsman[arrayofbatsman.length - 1][0] + " with " + arrayofbatsman[arrayofbatsman.length - 1][1] + " runs.");
        });
}
async function getFile() {
    var matchIdof2015 = [];
    matchIdof2015 = await matcheFile.file(2015);
    runPerBatsman(matchIdof2015);
}
getFile();