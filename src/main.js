define(function (require, exports, module) {

  const Plugin = require('extplug/Plugin');

  const EmojiStyles = Plugin.extend({
    name: 'Emoji Styles',
    description: 'Choose between Apple/Twitter/Google style emoji.',

    enable() {
      // code to start your plugin
    },

    disable() {
      // code to undo what you did in enable()
    }
  });

  module.exports = EmojiStyles;

});
