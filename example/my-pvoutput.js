var PVoutputAPI = require('pvoutput-nodejs');

var pvoutput = new PVoutputAPI({
    debug: false,

    apiKey: "xxx",
    systemId: "xxx"
});

// Example sending data
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

// Example: get status
pvoutput.getStatus().then(function(results) {
    console.log(results);
})
.catch(function(err) {
    console.log(err);
});

//Example: get outputs
pvoutput.getOutput().then(function(results) {
    console.log(results);
})
.catch(function(err) {
    console.log(err);
});
