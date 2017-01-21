//- require essentials
var request = require('request');

var conf = require('../conf');

//- send message to receiver
var sendMessage = function (receiver, msg) {
    var payload = { text: msg };

    request(
        {
            url: conf.FB_MESSAGE_URL,
            method: 'POST',
            qs: {
                access_token: process.env.PROFILE_TOKEN || conf.PROFILE_TOKEN
            },
            json: {
                recipient: { id: receiver },
                message: payload
            }
        },
        function (error, response) {
            if (error) console.log('Error sending message: ', error);
            if (response.body.error) console.log('Error: ', response.body.error);
        }
    );
}

module.exports = {
    sendMessage: sendMessage
};
