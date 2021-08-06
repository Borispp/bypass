'use strict';

var datepicker__updateDatepicker;

$('.jrange span').on('click', function () {
  return $(this).parent().find('input').focus();
});

$('body').on('click', function (e) {
  var $target;
  $target = $(e.target);
  if (!($target.closest(".jrange").length || $target.hasClass('ui-corner-all'))) {
    return $('.jrange div').hide();
  }
});

$.datepicker._defaults.onAfterUpdate = null;

datepicker__updateDatepicker = $.datepicker._updateDatepicker;

$.datepicker._updateDatepicker = function (inst) {
  var input, onAfterUpdate;

  setTimeout(function () {
    var $jrange = $('.jrange');

    [].forEach.call($jrange, function (el) {
      var $el = $(el);
      var $selected = $el.find('.date-range-selected');
      var count = $selected.length;

      $($selected[0]).addClass('date-range-first');
      $($selected[count - 1]).addClass('date-range-last');
    });
  }, 4);

  datepicker__updateDatepicker.call(this, inst);
  onAfterUpdate = this._get(inst, 'onAfterUpdate');
  if (onAfterUpdate) {
    input = void 0;
  }
  if (inst.input) {
    input = inst.input[0];
  } else {
    input = null;
  }
  onAfterUpdate.apply(input, [inst.input ? inst.input.val() : '', inst]);
};

$(function () {
  var cur, prv;
  cur = -1;
  prv = -1;
  if ($('.jrange div').length) {
    $('.jrange div').each(function (i, el) {
      $(el).datepicker({
        showButtonPanel: true,
        beforeShowDay: function beforeShowDay(date) {
          return [true, date.getTime() >= Math.min(prv, cur) && date.getTime() <= Math.max(prv, cur) ? 'date-range-selected' : ''];
        },
        onSelect: function onSelect(dateText, inst) {
          var d1, d2, date;
          d1 = void 0;
          d2 = void 0;
          prv = cur;
          cur = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay).getTime();
          if (prv === -1 || prv === cur) {
            prv = cur;
            $(el).prev().val(dateText);
            $(el).prev().data('date', $.datepicker.formatDate('yy-mm-dd', new Date(prv), {}));
            $.datepicker.regional['en'].changeDate($.datepicker.formatDate('yy-mm-dd', new Date(prv), {}));
          } else {
            d1 = $.datepicker.formatDate($.datepicker.regional['en'].dateFormatFrom, new Date(Math.min(prv, cur)), {});
            d2 = $.datepicker.formatDate($.datepicker.regional['en'].dateFormat, new Date(Math.max(prv, cur)), {});
            $(el).prev().val(d1 + ' - ' + d2);
            date = $.datepicker.formatDate('yy-mm-dd', new Date(Math.min(prv, cur)), {}) + ' to ' + $.datepicker.formatDate('yy-mm-dd', new Date(Math.max(prv, cur)), {});
            $(el).prev().data('date', date);
            $.datepicker.regional['en'].changeDate(date);
          }
        },
        onChangeMonthYear: function onChangeMonthYear(year, month, inst) {},
        onAfterUpdate: function onAfterUpdate(inst) {}
      }).position({
        my: 'left top',
        at: 'left bottom',
        of: $(el).parent().find('input')
      }).hide();
    });

    $('.jrange input').on('focus', function (e) {
      var d, error, v;
      v = this.value;
      d = void 0;
      try {
        if (v.indexOf(' - ') > -1) {
          d = v.split(' - ');
          prv = $.datepicker.parseDate($.datepicker.regional['en'].dateFormat, d[0]).getTime();
          cur = $.datepicker.parseDate($.datepicker.regional['en'].dateFormat, d[1]).getTime();
        } else if (v.length > 0) {
          prv = cur = $.datepicker.parseDate($.datepicker.regional['en'].dateFormat, v).getTime();
        }
      } catch (error) {
        e = error;
        cur = prv = -1;
      }
      if (cur > -1) {
        $('.jrange div').datepicker('setDate', new Date(cur));
      }
      $('.jrange div').datepicker('refresh').show();
    });
  }
});