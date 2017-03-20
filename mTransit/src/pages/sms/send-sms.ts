// Twilio Credentials 
var accountSid = 'AC9b6f2ff05983a8b535433b078903b2e4'; 
var authToken = '85aa464bcffd521a2a09ca66c64591f1'; 
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
 
client.messages.create({ 
    to: "+15147067272", 
    from: "+14387933164", 
    body: "This is the ship that made the Kessel Run in fourteen parsecs?", 
}, function(err, message) { 
    console.log(message.sid); 
});