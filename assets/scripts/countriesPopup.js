'use strict';

//
// Countries
// ==================================================================================
//
$('.countries a').on('click', function (e) {
	e.preventDefault();
	popupClose(e);

	// let select = $(this).text();
	var select = $(this).data('operator');

	if (ifSelect == true) {
		var selectArray = $inputBox.val();
		selectArray ? selectArray.push(select) : selectArray = select;

		$inputBox.val(selectArray).trigger("change");
	} else {
		$inputBox.val(select);
	}
});

var countriesData = {};

[].forEach.call($('.countries h4'), function (el) {
	countriesData[$(el).data('id')] = 1;
});

$('#searchOperator').keyup(function () {
	var filter = $(this).val(),
	    count = 0;

	$(".countries ul li a").each(function () {

		if ($(this).text().search(new RegExp(filter, "i")) < 0) {
			$(this).fadeOut(250);
			$(this).removeClass('visibleLink');
		} else {
			$(this).show();
			$(this).addClass('visibleLink');
			count++;
		}
	});

	for (var el in countriesData) {
		var countryLength = $('.countries').find('[data-id="' + el + '"].visibleLink').length;
		if (countryLength == 0) {
			$('h4[data-id="' + el + '"]').addClass('hideHeadline');
		} else {
			$('h4[data-id="' + el + '"]').removeClass('hideHeadline');
		}
	}
});

function initSelects() {
	$(function () {
		$('.comboboxselect').combobox();
		[].forEach.call($('.comboboxselect'), function (el, i) {
			var placeholder = $(el).attr('placeholder');
			$(el).next().find('.custom-combobox-input').attr('placeholder', placeholder);
		});
	});

	[].forEach.call($('.selectmultiply'), function (el, i) {
		var placeholder = $(el).attr('placeholder');
		$('.selectmultiply').next().find('.select2-search__field').attr('placeholder', placeholder);
	});

	selectMultiplyInit();
	initSlider();

	$('.fake-select_default--span').on('click', function () {
		$('.select2-container--open .select2-dropdown').addClass('default_dropdown').removeClass('list_dropdown');
	});
	$('.fake-select_list--span').on('click', function () {
		$('.select2-container--open .select2-dropdown').removeClass('default_dropdown').addClass('list_dropdown');
	});
}

initSelects();