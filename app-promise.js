const yargs = require('yargs');
const axios = require('axios');

//In order for this application to work please sign up on forecast.io and obtain a free API key and place it on the URL below

const argv = yargs
    .options({
        a: {
            demand : true,
            alias: 'address',
            describe: 'Address to fetch the weather',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddr = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}`;

axios.get(geocodeURL).then((response)=>{
    if(response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/ENTER YOUR OWN API KEY/${lat},${lng}`
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL);
}).then((response)=>{
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`Its currently ${temperature}\nIt feels like ${apparentTemperature}`);
}).catch((e)=>{
    if(e.code === 'ENOTFOUND'){
        console.log('unable to connect to api servers.')
    } else {
        console.log(e.message);
    }
});