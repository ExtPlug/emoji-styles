define(function (require, exports, module) {

  const Plugin = require('extplug/Plugin');

  const SHEET_URL = 'https://extplug.github.io/emoji-styles/img/';
  const SELECTOR = 'span.emoji-inner:not(.gemoji-plug)'
  const STYLES = [ 'apple', 'twitter', 'google', 'emojione' ]

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
      style: { default: 'apple' }
    },

    commands: {
      emojistyle: 'setStyle'
    },

    enable() {
      this.listenTo(this.settings, 'change:style', this.onChange);
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
      let className = this.settings.get('style');
      $('body')
        .removeClass(STYLES.map(name => `extplug-emoji-style-${name}`).join(' '))
        .addClass(`extplug-emoji-style-${className}`);
    }
  });

  module.exports = EmojiStyles;

});
