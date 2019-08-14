var fs = require('fs');
var csv = require('fast-csv');
var matcheFile = require('./matchid');

function top10bowler(matchId2015) {
    var playerName = {};
    var economyRatesPerBowler2015 = {};
    var economyRatesPerBowler2015Sorted = [];
    fs.createReadStream('deliveries.csv')
        .pipe(csv.parse())
        .on('data', function (deliveries) {
            //console.log(deliveries);
            const id = deliveries[0];
            const bowler = deliveries[8];
            const wides = deliveries[10];
            const noballs = deliveries[13];
            const totalruns = deliveries[17];
            if (matchId2015[0].indexOf(id) !== -1 /*(id >= parseInt(matchId2015[0])) && (id <= parseInt(matchId2015[matchId2015.length - 1]))*/ ) {

                if (!playerName.hasOwnProperty(bowler)) {
                    playerName[bowler] = {
                        "run": 0,
                        "count": 0
                    };
                }
                playerName[bowler]["run"] += parseInt(totalruns);
                if (wides == '0' && noballs == '0') {
                    playerName[bowler]["count"] += 1;
                }

            }

        })

        .on('end', function (data) {

            for (let player in playerName) {
                if (!economyRatesPerBowler2015.hasOwnProperty(playerName.player)) {
                    economyRatesPerBowler2015[player] = ((parseInt(playerName[player]["run"]) / parseInt(playerName[player]["count"])) * 6);
                }
            }
            for (let economy in economyRatesPerBowler2015) {
                economyRatesPerBowler2015Sorted.push([economy, economyRatesPerBowler2015[economy]]);
            }

            economyRatesPerBowler2015Sorted.sort(function (a, b) {
                return a[1] - b[1];
            });
            for (let i = 0; i < 10; i++) {
                console.log(economyRatesPerBowler2015Sorted[i]);
                // console.log(economyRatesPerBowler2015);
            }
        });
}
async function getfile() {
    var matchId2015 = [];
    matchId2015 = await matcheFile.file(2015);
    top10bowler(matchId2015);
}
getfile();