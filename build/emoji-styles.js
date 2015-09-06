

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define('extplug/emoji-styles/main',['require','exports','module','extplug/Plugin','plug/util/emoji','meld','jquery'],function (require, exports, module) {

  var Plugin = require('extplug/Plugin');
  var emoji = require('plug/util/emoji');

  var _require = require('meld');

  var around = _require.around;

  var $ = require('jquery');

  var SHEET_URL = 'https://extplug.github.io/emoji-styles/img/';
  var SELECTOR = 'span.emoji-inner:not(.gemoji-plug)';
  var STYLES = ['apple', 'twitter', 'google', 'emojione'];

  var EmojiStyles = Plugin.extend({
    name: 'Emoji Styles',
    description: 'Choose between Apple/Twitter/Google style emoji.',

    style: {
      '.extplug-emoji-style-twitter': _defineProperty({}, SELECTOR, {
        'background-image': 'url(' + SHEET_URL + 'sheet_twitter_64.png)'
      }),
      '.extplug-emoji-style-google': _defineProperty({}, SELECTOR, {
        'background-image': 'url(' + SHEET_URL + 'sheet_google_64.png)'
      }),
      '.extplug-emoji-style-emojione': _defineProperty({}, SELECTOR, {
        'background-image': 'url(' + SHEET_URL + 'sheet_emojione_64.png)'
      })
    },

    settings: {
      style: {
        type: 'dropdown',
        label: 'Emoji Style',
        options: {
          apple: 'Apple',
          twitter: 'Twitter',
          google: 'Google Hangouts',
          emojione: 'EmojiOne'
        },
        'default': 'apple'
      }
    },

    commands: {
      emojistyle: 'setStyle'
    },

    enable: function enable() {
      this.listenTo(this.settings, 'change:style', this.onChange);
      this.onChange();
    },

    disable: function disable() {
      if (this.advice) {
        this.advice.remove();
      }
    },

    setStyle: function setStyle(className) {
      if (STYLES.indexOf(className) > -1) {
        this.settings.set('style', className);
      } else {
        API.chatLog('Emoji style should be one of ' + STYLES.join(', '));
      }
    },

    onChange: function onChange() {
      if (this.advice) {
        this.advice.remove();
      }

      var className = this.settings.get('style');
      $('body').removeClass(STYLES.map(function (name) {
        return 'extplug-emoji-style-' + name;
      }).join(' ')).addClass('extplug-emoji-style-' + className);

      if (className !== 'apple') {
        // remove variation argument for sheets without variation emoji images
        this.advice = around(emoji, 'replacement', function (joinpoint) {
          return joinpoint.proceedApply(joinpoint.args.slice(0, 3));
        });
      }
    }
  });

  module.exports = EmojiStyles;
});
