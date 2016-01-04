var pvoutput = require('./my-pvoutput');
var moment = require('moment');

var now = moment().utc().valueOf();

var timestamp = now;

var solarWatt = 6000;
var solarWattHour = 400;
var consumptionWatt = 12000;
var consumptionWattHour = 650;

pvoutput.send(timestamp, solarWatt, solarWattHour, consumptionWatt, consumptionWattHour, function(statusCode, body) {
    console.log(body);
});