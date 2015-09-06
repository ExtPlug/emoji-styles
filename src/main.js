define(function (require, exports, module) {

  const Plugin = require('extplug/Plugin');
  const emoji = require('plug/util/emoji');
  const { around } = require('meld');
  const $ = require('jquery');

  const SHEET_URL = 'https://extplug.github.io/emoji-styles/img/';
  const SELECTOR = 'span.emoji-inner:not(.gemoji-plug)';
  const STYLES = [ 'apple', 'twitter', 'google', 'emojione' ];

  const EmojiStyles = Plugin.extend({
    name: 'Emoji Styles',
    description: 'Choose between Apple/Twitter/Google style emoji.',

    style: {
      '.extplug-emoji-style-twitter': {
        [SELECTOR]: {
          'background-image': `url(${SHEET_URL}sheet_twitter_64.png)`
        }
      },
      '.extplug-emoji-style-google': {
        [SELECTOR]: {
          'background-image': `url(${SHEET_URL}sheet_google_64.png)`
        }
      },
      '.extplug-emoji-style-emojione': {
        [SELECTOR]: {
          'background-image': `url(${SHEET_URL}sheet_emojione_64.png)`
        }
      }
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
        default: 'apple'
      }
    },

    commands: {
      emojistyle: 'setStyle'
    },

    enable() {
      this.listenTo(this.settings, 'change:style', this.onChange);
      this.onChange()
    },

    disable() {
      if (this.advice) {
        this.advice.remove();
      }
    },

    setStyle(className) {
      if (STYLES.indexOf(className) > -1) {
        this.settings.set('style', className);
      }
      else {
        API.chatLog(`Emoji style should be one of ${STYLES.join(', ')}`);
      }
    },

    onChange() {
      if (this.advice) {
        this.advice.remove();
      }

      let className = this.settings.get('style');
      $('body')
        .removeClass(STYLES.map(name => `extplug-emoji-style-${name}`).join(' '))
        .addClass(`extplug-emoji-style-${className}`);

      if (className !== 'apple') {
        // remove variation argument for sheets without variation emoji images
        this.advice = around(emoji, 'replacement', joinpoint => {
          return joinpoint.proceedApply(joinpoint.args.slice(0, 3));
        });
      }
    }
  });

  module.exports = EmojiStyles;

});
