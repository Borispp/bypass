'use strict';

//
// Combobox of JQuery UI
// ==================================================================================
//
var $inputBox;
var ifSelect = false;

(function ($) {
  $.widget('custom.combobox', {
    _create: function _create() {
      this.wrapper = $('<span>').addClass('custom-combobox').insertAfter(this.element);
      this.element.hide();
      this._createAutocomplete();
      this._createShowAllButton();
    },
    _createAutocomplete: function _createAutocomplete() {
      var selected, value;
      selected = this.element.children(':selected');
      value = selected.val() ? selected.text() : '';
      this.input = $('<input>').appendTo(this.wrapper).val(value).attr('title', '').addClass('custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left').autocomplete({
        delay: 0,
        minLength: 0,
        source: $.proxy(this, '_source')
      }).tooltip({
        tooltipClass: 'ui-state-highlight'
      });
      this._on(this.input, {
        autocompleteselect: function autocompleteselect(event, ui) {
          ui.item.option.selected = true;
          this._trigger('select', event, {
            item: ui.item.option
          });
        },
        autocompletechange: '_removeIfInvalid'
      });
    },
    _createShowAllButton: function _createShowAllButton() {
      var input, wasOpen;
      input = this.input;
      wasOpen = false;
      $('<a>').attr({ 'tabIndex': -1, 'href': '#livesearch' }).appendTo(this.wrapper).button({
        icons: {
          primary: 'ui-icon-triangle-1-s'
        },
        text: false
      }).removeClass('ui-corner-all').addClass('custom-combobox-toggle ui-corner-right').mousedown(function () {
        wasOpen = input.autocomplete('widget').is(':visible');
      }).click(function () {
        // input.focus();
        // if (wasOpen) {
        //   return;
        // }
        // input.autocomplete('search', '');

        var openPopup = $(this).attr('href');
        $inputBox = $(this).prev('.custom-combobox-input');
        ifSelect = false;

        $('#overlay_white').removeClass('-hide');
        clearInterval(timePopup);
        $(openPopup).removeClass('-popupdn');;
        $(openPopup).addClass('-popupshow');
        $('body').addClass('popup_active');
      });
    },
    _source: function _source(request, response) {
      var matcher;
      matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), 'i');
      response(this.element.children('option').map(function () {
        var text;
        text = $(this).text();
        if (this.value && (!request.term || matcher.test(text))) {
          return {
            label: text,
            value: text,
            option: this
          };
        }
      }));
    },
    _removeIfInvalid: function _removeIfInvalid(event, ui) {
      var valid, value, valueLowerCase;
      if (ui.item) {
        return;
      }
      value = this.input.val();
      valueLowerCase = value.toLowerCase();
      valid = false;
      this.element.children('option').each(function () {
        if ($(this).text().toLowerCase() === valueLowerCase) {
          this.selected = valid = true;
          return false;
        }
      });
      if (valid) {
        return;
      }
      this.element.val('');
      this._delay(function () {
        this.input.tooltip('close').attr('title', '');
      }, 2500);
      this.input.autocomplete('instance').term = '';
    },
    _destroy: function _destroy() {
      this.wrapper.remove();
      this.element.show();
    }
  });
})(jQuery);

$('.combobox').on('autocompleteopen', function (event, ui) {
  var lp, position, tp;
  // console.log($(this).width());
  $('.ui-autocomplete.ui-widget-content').css({ 'width': $(this).width() + 4 + 'px' });

  $(this).addClass('m-open');
  position = $(this).offset();
  // tp = position.top - 61;
  lp = position.left - 50;

  $('.ui-autocomplete').css({
    left: lp + 'px'
  });
});

$('.combobox').on('autocompleteclose', function (event, ui) {
  $(this).removeClass('m-open');
});