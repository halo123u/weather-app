const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=%20226E%20122%20st%20NewYork',
    json: true
},(error,response,body) =>{
    console.log(JSON.stringify(body, undefined, 2));
});