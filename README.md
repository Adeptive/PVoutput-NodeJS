# PVoutput-NodeJS
PVoutput nodejs project to send data to pvoutput.
Based on http://pvoutput.org/help.html#api-getting-started

## Installation
```bash
npm install https://github.com/CONNCTED/PVoutput-NodeJS --save
```

## Usage
### Create a new file 'my-pvoutput.js'
```javascript
var PVoutputAPI = require('pvoutput-nodejs');

var pvoutput = new PVoutputAPI({
    debug: false,

    apiKey: "xxx",
    systemId: "xxx"
});

module.exports = pvoutput;
```

### In another nodejs file
```javascript
var pvoutput = require('./my-pvoutput');

var timestamp = 1451936700000;
var solarWatt = 6000;
var solarWattHour = 400;
var consumptionWatt = 12000;
var consumptionWattHour = 650;

pvoutput.send(timestamp, solarWatt, solarWattHour, consumptionWatt, consumptionWattHour, function(statusCode, body) {
    console.log(body);   
});
```