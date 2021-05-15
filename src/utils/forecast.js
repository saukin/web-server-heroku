const request = require('postman-request');
const chalk = require('chalk');

function getMeteoURL(lat, long) {
    return `http://api.weatherstack.com/forecast?access_key=f5613a2080db88aafc1a3328334e0c83&query=${lat},${long}`
}

function printForecast(data) {
    console.log(chalk.green.inverse(`Weather forecast for ${data.location.name} :`));
    for (let [key,value] of Object.entries(data.forecast)) {
        // console.log(key);
        for (const[item, val] of Object.entries(value)) {
            console.log(chalk.green(`${item} : ${val}`));
        }
    }
}


const forecast = (lat, long, callback) => {
    console.log(`--- ${lat}, ${long}`);
    const url = getMeteoURL(lat, long);
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback("Some tough error occured in forecast request", undefined);
        } else if (body.error) {
            callback("Bad request or server bug in forecast request", undefined);
        } else {
            printForecast(body);
            callback(undefined, body.forecast);
        }
    })
}


module.exports = forecast;