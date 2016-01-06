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

        var params = {
            key: apiKey,
            sid: systemId,
            d: date,
            t: time,

            v1: solarWatt,
            v3: consumptionWatt,
            v4: consumptionWattHour
        };

        if (solarWattHour != 0) {
            params.v2 = solarWattHour;
        }

        var query = querystring.stringify(params);


        var options =  {
            url: 'http://pvoutput.org/service/r2/addstatus.jsp?' + query
        };

        request.get(options, function (err, httpResponse, body) {
            callback(httpResponse.statusCode, body, options.url);
        });
    };

}

module.exports = PvoutputAPI;