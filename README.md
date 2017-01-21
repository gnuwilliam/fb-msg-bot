# Facebook Messenger Bot

Simple bootstrap to allow integration between Node.js and Facebook Messenger's API

## Usage

Simply define your VERIFY_TOKEN and PROFILE_TOKEN keys in `conf.js` and run with `npm install; npm start`

Send your page a message and the bot should respond "Hey! Welcome!"

Messenger Platform documentation: https://developers.facebook.com/docs/messenger-platform

## Message methods

`sendMessage`: Allow you to manually send a message to the end user. Take `receiver` and `msg` as params

### Example

```js
var messages = require('./lib/messages');

messages.sendMessage(sender, 'Hey! Welcome!');
```

## Improvements

- `quick_reply` support
- bot typing support