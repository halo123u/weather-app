const request = require('request');

//In order for this application to work please sign up on forecast.io and obtain a free API key and place it on the URL below
 
 var getWeather = (lat,lng, callback)=> {
        request({
        url : `https://api.darksky.net/forecast/PLEASE INSERT YOUR API KEY HERE/${lat},${lng}`,
        json: true   
    }, (error,response,body) =>{
        if(!error && response.statusCode === 200){
        callback(undefined,{
           temperature: body.currently.temperature,
           apparentTemperature : body.currently.apparentTemperature
        });
        } else {
            callback('unable to fetch the weather');
        }
    }

    )
 };
 module.exports.getWeather = getWeather;