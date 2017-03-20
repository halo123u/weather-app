const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=%20226E%20122%20st%20NewYork',
    json: true
},(error,response,body) =>{
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`lat: ${body.results[0].geometry.location.lat}`);
    console.log(`lng: ${body.results[0].geometry.location.lng}`);
});