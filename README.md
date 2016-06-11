# PVoutput-NodeJS
PVoutput nodejs project to interact with the pvoutput API.
Based on http://pvoutput.org/help.html#api-getting-started

## Installation
```bash
npm install pvoutput-nodejs --save
```

## Usage
```javascript
var PVoutputAPI = require('pvoutput-nodejs');

var pvoutput = new PVoutputAPI({
    debug: false,

    apiKey: 'xxx',
    systemId: 'xxx'
});
```

### Sending Output to PVOutput
```javascript
var timestamp = 1451936700000;
var solarWatt = 6000;
var solarWattHour = 400;
var consumptionWatt = 12000;
var consumptionWattHour = 650;

pvoutput.send(timestamp, solarWatt, solarWattHour, consumptionWatt, consumptionWattHour, function(statusCode, body) {
    console.log(body);
});
```

### Getting Status
```javascript
pvoutput.getStatus().then(function(results) {
    console.log(results);

    /* returns
    { date: Sat Jun 11 2016 00:00:00 GMT+0200 (CEST),
    time: '18:30',
    energyGeneration: 3900,
    powerGeneration: 1381,
    energyConsumption: NaN,
    powerConsumption: NaN,
    efficiency: 0.511,
    temperature: NaN,
    voltage: 136.6 }
    */
})
.catch(function(err) {
    console.log(err);
});
```

### Getting Outputs
```javascript
pvoutput.getOutputs().then(function(results) {
    console.log(results);
    
    /* returns:
    [ { date: Sat Jun 11 2016 00:00:00 GMT+0200 (CEST),
        energyGenerated: 3900,
        efficiency: 1.444,
        energyExported: 0,
        energyUsed: 0,
        peakPower: 2219,
        peakTime: '16:50',
        condition: 'Cloudy',
        minTemperature: NaN,
        maxTemperature: NaN,
        peakEnergyImport: NaN,
        offPeakEnergyImport: NaN,
        shoulderEnergyImport: NaN,
        highShoulderEnergyImport: NaN },
    { date: Fri Jun 10 2016 00:00:00 GMT+0200 (CEST),
        energyGenerated: 4200,
        efficiency: 1.556,
        energyExported: 0,
        energyUsed: 0,
        peakPower: NaN,
        peakTime: undefined,
        condition: 'Fine',
        minTemperature: NaN,
        maxTemperature: NaN,
        peakEnergyImport: NaN,
        offPeakEnergyImport: NaN,
        shoulderEnergyImport: NaN,
        highShoulderEnergyImport: NaN } ]
    */
})
.catch(function(err) {
    console.log(err);
});
```
