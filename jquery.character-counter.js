/**
 * jQuery Character Counter
 *
 * Character Counter is a simple, Twitter style character counter.
 *
 * https://github.com/dtisgodsson/jquery-character-counter
 * https://github.com/briancsinger/jquery-character-counter
 *
 * @author Greg Kuwaye
 * @license MIT
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  }
}(function ($) {
  $.fn.characterCounter = function (options) {
    var defaults;

    defaults = {
        exceeded: false,
        counterSelector: false,
        limit: 150,
        min: 0,
        counterWrapper: 'span',
        counterCssClass: 'counter',
        counterFormat: '%1',
        counterExceededCssClass: 'exceeded',
        onExceed: function (count) {},
        onDeceed: function (count) {},
        customFields: {},
        silentMode: false
    };

    options = $.extend({}, defaults, options);

    return this.each(function () {
      if (!options.counterSelector) {
        $(this).after(generateCounter());
      }
      bindEvents(this);
      checkCount(this);
    });

    function customFields(params) {
      var html = '';

      for (var i in params) {
        html += ' ' + i + '="' + params[i] + '"';
      }

      return html;
    }

    function generateCounter() {
      var classString = options.counterCssClass;

      if (options.customFields.class) {
        classString += ' ' + options.customFields.class;
        delete options.customFields['class'];
      }

      return '<' + options.counterWrapper + customFields(options.customFields) + ' class="' + classString + '"></' + options.counterWrapper + '>';
    }

    function renderText(count) {
      return options.counterFormat.replace(/%1/, count);
    }

    function checkCount(element) {
      var characterCount = $(element).val().length;
      var remaining = options.limit - characterCount;
      var counter = options.counterSelector ? $(options.counterSelector) : $(element).next("." + options.counterCssClass);

      if (remaining < 0 || characterCount < options.min) {
        counter.addClass(options.counterExceededCssClass);
        options.exceeded = true;
        options.onExceed(characterCount);
      } else {
        if (options.exceeded) {
          counter.removeClass(options.counterExceededCssClass);
          options.onDeceed(characterCount);
          options.exceeded = false;
        }
      }

      if (!options.silentMode) {
        counter.html(renderText(remaining));
      }

      $(element).trigger($.Event('character-counter.change', {
        characterCounter: {
          total: characterCount,
          remaining: remaining
        }
      }));
    };

    function bindEvents(element) {
      $(element)
          .bind('keyup', function () {
            checkCount(element);
          })
          .bind('paste', function () {
            var self = this;
            setTimeout(function () {
              checkCount(self);
            }, 0);
          });
    }
  };
}));
