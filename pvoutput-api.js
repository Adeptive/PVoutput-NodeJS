var request = require('request');
var querystring = require('querystring');
var moment = require('moment');

function PvoutputAPI(settings) {

    var apiKey = settings.apiKey;
    var systemId = settings.systemId;

    this.debug = settings.debug || false;

    this.send = function(timestamp, solarWatt, solarWattHour, consumptionWatt, consumptionWattHour, callback) {
        var timestamp = moment(timestamp);
        var date = timestamp.format('YYYYMMDD');
        var time = timestamp.format('HH:mm');

        var query = querystring.stringify({
            key: apiKey,
            sid: systemId,
            d: date,
            t: time,

            v1: solarWatt,
            v2: solarWattHour,
            v3: consumptionWatt,
            v4: consumptionWattHour
        });

        var options =  {
            url: 'http://pvoutput.org/service/r2/addstatus.jsp?' + query
        };

        request.get(options, function (err, httpResponse, body) {
            callback(httpResponse.statusCode, body, options.url);
        });
    };

}

module.exports = PvoutputAPI;