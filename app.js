const request = require('request');
const yargs = require('yargs');

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

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}`,
    json: true
}, (error,response,body) => {
    if(error){
        console.log('Unable to connect to Google servers. Please check that you are connected to the internet.');
    } else if(body.status === 'ZERO_RESULTS'){
        console.log('Invalid address!');
    } else if(body.status === 'OK'){
        console.log(`Address: ${body.results[0].formatted_address}`);
        console.log(`lat: ${body.results[0].geometry.location.lat}`);
        console.log(`lng: ${body.results[0].geometry.location.lng}`);
    }
});