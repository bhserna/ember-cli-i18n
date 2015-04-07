/* globals requirejs, require */

import Ember from 'ember';
import config from '../config/environment';

if (window.QUnit) {
  var keys = Ember.keys;

  var locales, defaultLocale;
  module('ember-cli-i18n', {
    setup: function() {
      var localRegExp = new RegExp(config.modulePrefix + '/locales/(.+)');
      var match, moduleName;

      locales = {};

      for (moduleName in requirejs.entries) {
        if (match = moduleName.match(localRegExp)) {
          locales[match[1]] = require(moduleName)['default'];
        }
      }

      defaultLocale = locales[config.APP.defaultLocale];
    }
  });

  test('default locale exists', function(assert) {
    assert.ok(Ember.isPresent(config.APP.defaultLocale, 'default locale is defined'));
    assert.ok(typeof defaultLocale === 'object', 'default locale exist');
  });

  test('locales all contain the same keys', function(assert) {
    var knownLocales = keys(locales);
    if (knownLocales.length === 1) {
      expect(0);
      return;
    }

    for (var i = 0, l = knownLocales.length; i < l; i++) {
      var currentLocale = locales[knownLocales[i]];

      if (currentLocale === defaultLocale) {
        continue;
      }

      for (var translationKey in defaultLocale) {
        assert.ok(currentLocale[translationKey], '`' + translationKey + '` should exist in the `' + knownLocales[i] + '` locale.');
      }
    }
  });
}
