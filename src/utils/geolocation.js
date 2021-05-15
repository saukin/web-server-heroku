const request = require('postman-request')

function getMapURLFromName(location) {
    return `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiZDRuY2VyIiwiYSI6ImNrb2t2aWlmbTAzMGsycXF2YjZiczRubDkifQ.-jXhlp4nfdMPN8M919R1Tg`;
}

const geolocation = (location, callback) => {
    let url = getMapURLFromName(location);
    console.log(url);
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback("Some tough error occured", undefined);
        } else if (body.features.length === 0) {
            callback("Bad request or server bug", undefined);
        } else {
            let coord = body.features[0].center;
            // callback(`${coord[1]},${coord[0]}`);
            // console.log(`+++${coord[1]},${coord[0]}`)
            callback(undefined, {
                lat: coord[1],
                long: coord[0],
                loc: body.features[0].place_name
            })
        }
    })
}

module.exports = geolocation;