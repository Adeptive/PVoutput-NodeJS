var request = require('request');
var rp = require('request-promise');
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

        request.get(options, function(err, httpResponse, body) {
            callback(httpResponse.statusCode, body, options.url);
        });
    };

    /*
     * Get status of PV installation
     *
     * Returns results:
     *
     * Date yyyymmdd    2016-06-1120100830
     * Time hh:mm   19:0714:10
     * Energy Generation    number  watt hours  12936
     * Power Generation number  watt    202
     * Energy Consumption   number  watt hours  19832
     * Power Consumption    number  watt    459
     * Efficiency   number  kWh/kW  5.280
     * Temperature  decimal celsius 15.3
     * Voltage  decimal volts   240.1
     */
    this.getStatus = function() {
        var params = {
            key: apiKey,
            sid: systemId,
        };

        var query = querystring.stringify(params);

        var url = 'http://pvoutput.org/service/r2/getstatus.jsp?' + query;

        return rp({
            uri: url,
            simple: false
        }).then(function(body) {
            var results = body.split(',');
            results = filterNanValues(results);

            return {
                date: moment(results[0]).toDate(),
                time: results[1],
                energyGeneration: parseInt(results[2]),
                powerGeneration: parseInt(results[3]),
                energyConsumption: parseInt(results[4]),
                powerConsumption: parseInt(results[5]),
                efficiency: parseFloat(results[6]),
                temperature: parseFloat(results[7]),
                voltage: parseFloat(results[8])
            };
        })
        .catch(function(err) {
            return err;
        });

    };

    /*
     * Get output of PV installation
     *
     * Returns results:
     *
     * Date yyyymmdd    2016-06-1120110327
     * Energy Generated number  watt hours  4413
     * Efficiency   number  kWh/kW  0.460
     * Energy Exported  number  watt hours  0
     * Energy Used  number  watt hours  21859
     * Peak Power   number  watts   2070
     * Peak Time    19:21hh:mm  11:00
     * Condition    -.textShowers
     * Min. Temperature number  degrees celsius -3
     * Max. Temperature number  degrees celsius 6
     * Peak Energy Import   number  watt hours  4220
     * Off-Peak Energy Import   number  watt hours  7308
     * Shoulder Energy Import   number  watt hours  2030
     * High-Shoulder Energy Import  number  watt hours  3888')
     */
    this.getOutput = function() {
        var params = {
            key: apiKey,
            sid: systemId,
        };

        var query = querystring.stringify(params);

        var url = 'http://pvoutput.org/service/r2/getoutput.jsp?' + query;

        return rp({
            uri: url,
            simple: false
        }).then(function(body) {
            var dayOutputs = body.split(';');
            return dayOutputs.map(function(day) {
                var dayValues = day.split(',');
                dayValues = filterNanValues(dayValues);
                return {
                    date: moment(dayValues[0]).toDate(),
                    energyGenerated: parseInt(dayValues[1]),
                    efficiency: parseFloat(dayValues[2]),
                    energyExported: parseInt(dayValues[3]),
                    energyUsed: parseInt(dayValues[4]),
                    peakPower: parseInt(dayValues[5]),
                    peakTime: dayValues[6],
                    condition: dayValues[7],
                    minTemperature: parseFloat(dayValues[8]),
                    maxTemperature: parseFloat(dayValues[9]),
                    peakEnergyImport: parseInt(dayValues[10]),
                    offPeakEnergyImport: parseInt(dayValues[11]),
                    shoulderEnergyImport: parseInt(dayValues[12]),
                    highShoulderEnergyImport: parseInt(dayValues[13]),
                };
            });

        })
        .catch(function(err) {
            return err;
        });

    };

}

function filterNanValues(results) {
    return results.map(function(result) {
        if (result === 'NaN') {
            return undefined;
        }
        return result;
    });
}

module.exports = PvoutputAPI;
