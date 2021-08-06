'use strict';

$('.reviews--controls a').on('click', function (e) {
	e.preventDefault();
	var openBlockquote = $(this).attr('href');
	$('.reviews--controls a').removeClass('active');
	$('.reviews--blockuote').addClass('-hide');

	$(this).addClass('active');
	$(openBlockquote).removeClass('-hide');
});

var timePopup;

$('a.popupopen').on('click', function (e) {
	e.preventDefault();
	var openPopup = $(this).attr('href');

	if ($(this).hasClass('openWhite')) {
		$('#overlay_white').removeClass('-hide');
	} else {
		$('#overlay').removeClass('-hide');
	}

	clearInterval(timePopup);
	$(openPopup).removeClass('-popupdn');;
	$(openPopup).addClass('-popupshow');
	$('body').addClass('popup_active');
});

var popupClose = function popupClose(e) {
	e.preventDefault();

	$('#overlay').addClass('-hide');
	$('#overlay_white').addClass('-hide');
	$('.-popupshow').addClass('-popupdown');

	timePopup = setTimeout(function () {
		$('.popup').addClass('-popupdn');
		$('.popup').removeClass('-popupdown');
		$('.popup').removeClass('-popupshow');
		setTimeout(function () {
			$('.popup').removeClass('-popupdn');
		}, 150);
	}, 150);
	$('body').removeClass('popup_active');
};

$('#overlay, .close, .close_white, #overlay_white').on('click', function (e) {
	popupClose(e);
});

$(document).keyup(function (e) {
	if (e.keyCode == 27) {
		popupClose(e);
	}
});

$('.switch_panels li:not(.right) a').on('click', function (e) {
	e.preventDefault();

	var $panel = $(e.currentTarget);
	var $panelLi = $panel.closest('li');

	if (!$panelLi.hasClass('right')) {
		var $panelUl = $panel.closest('ul');
		var $panels = $panel.closest('ul').find('a');

		var switchPanel = $panel.attr('href');

		$panels.map(function (i, el) {
			$($(el).attr('href')).addClass('-hide');
		});

		$(switchPanel).removeClass('-hide');

		$panels.parent().removeClass('active');
		$panel.parent().addClass('active');
	}
});

(function () {
	if ($(".sorting_table").length > 0) {
		return $(".sorting_table").dataTable({
			paging: false,
			searching: false,
			lengthChange: false,
			info: false,
			pagingType: "simple_numbers",
			iDisplayLength: 3,
			"order": [[0, "asc"]],
			'aoColumnDefs': [{
				'bSortable': false,
				'aTargets': ['nosort']
			}]
		});
	}
})();

function initSlider() {
	var $slider = $('.slider');

	[].forEach.call($slider, function (el, i) {
		var $el = $(el);
		var data = $el.data('options');

		var $slider_values = $el.next();
		var step = data.max / data.step;

		for (var _i = 1; _i < step + 1; _i++) {
			var active = '';
			var last = '';
			var baseWidth = 100 / (step - 1) + '%';
			var baseMargin = -100 / (step - 1) / 2 + '%';

			if (data.value == _i) {
				active = 'active';
			} else {
				active = '';
			}
			if (step == _i) {
				last = 'right: -' + baseWidth;
			} else {
				last = '';
			}

			$slider_values.css({ 'margin-left': baseMargin });
			$slider_values.append('<p style="width: ' + baseWidth + '; ' + last + '" class="' + active + '"><span>' + _i * data.step + '</span></p>');
		}

		$slider_values.on('click', function (e) {
			var val = $(e.target).text();
			$el.slider('value', +val);
		});

		$el.slider({
			range: 'min',
			value: data.value,
			step: data.step,
			min: data.min,
			max: data.max,
			slide: function (_this) {
				return function (event, ui) {
					$slider_values.empty();

					for (var _i2 = 1; _i2 < step + 1; _i2++) {
						var active = '';
						var last = '';
						var baseWidth = 100 / (step - 1) + '%';
						var baseMargin = -100 / (step - 1) / 2 + '%';

						if (ui.value == _i2) {
							active = 'active';
						} else {
							active = '';
						}
						if (step == _i2) {
							last = 'right: -' + baseWidth;
						} else {
							last = '';
						}

						$slider_values.css({ 'margin-left': baseMargin });
						$slider_values.append('<p style="width: ' + baseWidth + '; ' + last + '" class="' + active + '"><span>' + _i2 * data.step + '</span></p>');
					}
				};
			}(this),

			change: function (_this) {
				return function (event, ui) {
					$slider_values.empty();

					for (var _i3 = 1; _i3 < step + 1; _i3++) {
						var active = '';
						var last = '';
						var baseWidth = 100 / (step - 1) + '%';
						var baseMargin = -100 / (step - 1) / 2 + '%';

						if (ui.value == _i3) {
							active = 'active';
						} else {
							active = '';
						}
						if (step == _i3) {
							last = 'right: -' + baseWidth;
						} else {
							last = '';
						}

						$slider_values.css({ 'margin-left': baseMargin });
						$slider_values.append('<p style="width: ' + baseWidth + '; ' + last + '" class="' + active + '"><span>' + _i3 * data.step + '</span></p>');
					}
				};
			}(this)
		});
	});
}

var searchInTable = function searchInTable(child, _this) {
	var filter = $(_this).val(),
	    count = 0;

	$(".voip_settings--table_wrapper tr td:nth-child(" + child + ")").each(function () {
		if ($(this).text().search(new RegExp(filter, "i")) < 0) {
			$(this).parent().fadeOut(150);
			$(this).removeClass('visibleLink');
		} else {
			$(this).parent().show();
			$(this).addClass('visibleLink');
			count++;
		}
	});
};
$('#searchPrefixes').keyup(function () {
	searchInTable(2, this);
});
$('#searchTemplate').keyup(function () {
	searchInTable(1, this);
});

//
// Search focus
// ==================================================================================
//

$('.search input').on('focus', function () {
	$(this).parent().addClass('-active');
}).on('blur', function () {
	$(this).parent().removeClass('-active');
});

$('.faq--wrapper aside h3 a').on('click', function (e) {
	e.preventDefault();
	if ($(this).parent().hasClass('-open')) {
		$('.faq--wrapper h3').removeClass('-open');
	} else {
		$('.faq--wrapper h3').removeClass('-open');
		$(this).parent().addClass('-open');

		var $links = $(this).parent().next().find('a');
		$('.faq--wrapper aside ul li a').removeClass('-active');
		$($links[0]).addClass('-active');
		var faqId = $($links[0]).data('id');
		$('.faq--item').addClass('-hide');
		$(faqId).removeClass('-hide');
	}
});

$('.faq--wrapper aside ul li a').on('click', function (e) {
	e.preventDefault();
	$('.faq--wrapper aside ul li a').removeClass('-active');
	$(this).addClass('-active');
	var faqId = $(this).data('id');
	$('.faq--item').addClass('-hide');
	$(faqId).removeClass('-hide');
});

$('.voip_settings--table #selectall').change(function () {
	if (this.checked) {
		$('.voip_settings--table_wrapper input[type="checkbox"]').prop("checked", true);
	} else {
		$('.voip_settings--table_wrapper input[type="checkbox"]').prop("checked", false);
	}
});

$('.run_all').on('click', function (e) {
	if ($(this).parent().find('.run_all').prop('checked')) {
		$(this).closest('.radio_buttons').find('input').prop('checked', true);
	} else {
		$(this).closest('.radio_buttons').find('input').prop('checked', false);
	}
});

$('.test_buttons .radio_buttons .radio_button').on('change', function () {
	var summ = 0;
	var $buttons = $(this).closest('.radio_buttons');
	var $radio_buttons = $buttons.find('.radio_button');

	$radio_buttons.each(function (i, el) {
		if (el.checked) {
			summ++;
		}
	});

	if (summ == $radio_buttons.length) {
		$buttons.find('input').prop('checked', true);
	} else {
		$buttons.find('.run_all').prop('checked', false);
	}
});

var openTableContent = function (table) {
	$(table).find('tbody tr td:first-child a').on('click', function (e) {
		e.preventDefault();
		var $this = $(this);

		var $tr = $this.closest('tr');
		var $table = $this.closest('table');
		var $tableStatusButtons = $this.closest('.tabs').find('.radio_buttons');

		if ($tr.hasClass('-opened')) {
			$this.closest('tr').removeClass('-opened');
		} else {
			$table.find('tr').removeClass('-opened');
			$tr.addClass('-opened');
		}

		if (!$table.find('.-opened').length) {
			$tableStatusButtons.find('p input').prop('checked', false);
			$tableStatusButtons.find('p:first-child input').prop('checked', true);
		}
	});
}('.-results');

$('.radio_buttons.-list label').on('click', function () {
	var type = $(this).data('id');
	var $tr = $(this).closest('.tabs').find('.panels tbody tr');

	if (type == 'detailed') {
		$tr.addClass('-opened');
	} else {
		$tr.removeClass('-opened');
	}
});

$('.statistics_item .open').on('click', function (e) {
	e.preventDefault();
	$(this).parent().addClass('-show');
});

$('.sendReport').on('click', function (e) {
	e.preventDefault();
	var msg = $(this).data('report');
	$('#report').html(msg);
	$('#report').addClass('-show');
	setTimeout(function () {
		$('#report').removeClass('-show');
	}, 2500);
});

$('.sms_test_edit .button').on('click', function (e) {
	e.preventDefault();
	var $parent = $(this).closest('div');
	$parent.find('.show_text').addClass('-hide');
	$parent.find('.edit_form').removeClass('-hide');
});

function createWave($audio) {
	[].forEach.call($audio, function (el) {

		var $el = $(el);
		var id = $el.data('id');
		var color = $el.data('color');
		var progress = $el.data('progress');
		var audio = $el.data('audio');

		var wavesurfer = WaveSurfer.create({
			container: id,
			waveColor: color,
			progressColor: progress,
			barWidth: '1',
			height: '30',
			cursorWidth: '0'
		});

		wavesurfer.on('finish', function () {
			wavesurfer.stop();
		});

		wavesurfer.load(audio);

		$el.find('a').on('click', function () {
			wavesurfer.play();
		});
	});
}

$('.-rating_block ol li').on('mouseenter', function (e) {
	var $audio = $(this).find('.audio');
	createWave($audio);
});

$('.-rating_block ol li').on('mouseleave', function (e) {
	$(this).find('.waveform').empty();
});

$('.properties a').on('click', function (e) {
	e.preventDefault();

	if ($(this).hasClass('-active')) {
		$(this).removeClass('-active');
		$($(this).attr('href')).addClass('-hide');
	} else {
		$(this).addClass('-active');
		$($(this).attr('href')).removeClass('-hide');
	}
});

$('.voip_settings--table input[type="checkbox"]').change(function () {
	var $checkboxes = $(this).closest('.voip_settings--table').find('input[type="checkbox"]');
	var checked = 0;

	$checkboxes.each(function (i, el) {
		if (el.checked) {
			checked++;
			$(this).closest('.voip_settings--table').find('.-delete').removeClass('-hide');
		}
	});

	if (!checked) {
		$(this).closest('.voip_settings--table').find('.-delete').addClass('-hide');
	}
});

var initHeight = function initHeight() {
	var windowHeight = $(window).height();
	var unloggedHeight = windowHeight - 390;
	var loggedHeight = windowHeight - 500;

	$('.register, .faq').css({ 'min-height': unloggedHeight + 'px' });
	$('#login_stats').next().css({ 'min-height': loggedHeight + 'px' });
};

initHeight();

$(window).on('resize', function () {
	initHeight();
});

$('.openStat').on('click', function () {
	var id = $(this).data('id');

	$('.statistics').addClass('-hide');
	$(id).removeClass('-hide');
});

$('.sendReport').on('click', function () {
	$('.hideOnSend').addClass('-hide');
	$('.showOnSend').removeClass('-hide');
});

$('#launchTest').on('click', function (e) {
	e.preventDefault();

	$('.testLoadingHide').addClass('-hide');
	$('.testLoading').removeClass('-hide');

	// $('.loading-progress').css()

	var i = 0;

	var loadingInterval = setInterval(function () {
		i++;
		if (i > 100) {
			clearInterval(loadingInterval);
			$('.loading').addClass('-hide');
			$('.showTable').removeClass('-hide');
			$('.tests_header').addClass('-hide');
			$('.testLoadingResult').removeClass('-hide');
		}
		$('.loading-progress').css({ 'width': i + '%' });
	}, 120);
});

$('.table--controls .edit').on('click', function (e) {
	e.preventDefault();
	$(this).closest('tr').find('.voip_settings--edit_hide').addClass('-hide');
	$(this).closest('tr').find('.voip_settings--edit_show').removeClass('-hide');
});

$('.voip_settings--save').on('click', function (e) {
	e.preventDefault();
	$(this).closest('tr').find('.voip_settings--edit_hide').removeClass('-hide');
	$(this).closest('tr').find('.voip_settings--edit_show').addClass('-hide');
});

$('.test_connection').on('click', function (e) {
	e.preventDefault();
	$(this).addClass('-hide');
	$(this).next().removeClass('-hide');
});