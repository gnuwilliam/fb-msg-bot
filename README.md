# Facebook Messenger Bot

Simple bootstrap to allow integration between Node.js and Facebook Messenger's API

## Usage

Simply define your VERIFY_TOKEN and PROFILE_TOKEN keys in `conf.js` and run with `npm install; npm start`

Send your page a message and the bot should respond "Hey! Welcome!"

Messenger Platform documentation: https://developers.facebook.com/docs/messenger-platform

## Message methods

`sendMessage`: Allow you to manually send a message to the end user. Expect `receiver` (string) and `msg` (string) as params.

### Example

```js
var messages = require('./lib/messages');

messages.sendMessage(sender, 'Hey! Welcome!');
```

---

`quickReply`: Send a custom message to the user with buttons containing possible replies. Expect `receiver` (string), `msg` (string) and `options` (array) as params.

### Example

```js
var messages = require('./lib/messages'),
    options = [
        {
            content_type: "text",
            title: "Red",
            payload: "You chose Red!"
        },
        {
            content_type: "text",
            title: "Blue",
            payload: "You chose Blue!"
        }
    ];

messages.quickReply(sender, 'Favorite color?', options);
```

## Improvements

- bot typing support