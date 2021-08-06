'use strict';

//
// Init select2 to 2 custom selections
// ==================================================================================
//

var choiceValues = {};

var showComboboxPopup = function showComboboxPopup() {
	$('body').find('.list').on('click', function () {
		ifSelect = true;

		$('body').addClass('-hide_dropdown');
		var openPopup = $(this).attr('href');
		$inputBox = $(this).closest('.select2').prev('.selectmultiply');

		$('#overlay_white').removeClass('-hide');

		clearInterval(timePopup);
		$(openPopup).removeClass('-popupdn');;
		$(openPopup).addClass('-popupshow');
		$('body').addClass('popup_active');
	});
};

function selectMultiplyInit() {

	if ($('.selectmultiply').length) {
		var $selectMult = $('[data-selectMult]');

		[].forEach.call($selectMult, function (el) {
			var $el = $(el);
			var elId = $el.context.dataset.selectmult;

			choiceValues[elId] = {};

			$el.select2().on("select2:select", function (evt) {
				var element = evt.params.data.element;
				var $element = $(element);

				$element.detach();
				$(this).append($element);
				$(this).trigger("change");
			}).on('select2:open', function (e) {
				var mt = $el.next().height();
				$('.select2-dropdown--below').css({ 'margin-top': -mt + 52 + 'px' });
			}).on('change', function () {
				var placeholder = $el.attr('placeholder');
				var $input = $el.next().find('.select2-search__field');
				var $choice = $el.next().find('.select2-selection__choice');

				$input.attr('placeholder', placeholder);

				for (var i = 0; i < $choice.length; i++) {
					var choiceTitle = $($choice[i]).attr('title');

					if (!choiceValues[elId][choiceTitle]) {
						choiceValues[elId][choiceTitle] = 1;
					}

					$($choice[i]).append('<div class="selection--counter counter"><a class="plus" data-key="' + choiceTitle + '">+</a><a class="minus" data-key="' + choiceTitle + '">&ndash;</a><p class="counter_text" id="' + choiceTitle + '">' + choiceValues[elId][choiceTitle] + '</p></div>');
					$($choice[i]).append('<span class="counterWrap"><span class="counterNum">' + choiceValues[elId][choiceTitle] + '</span></span>');
				}

				$choice.on('click', function () {
					$('body').addClass('-hide_dropdown');
				});

				$input.on('click', function () {
					$('body').removeClass('-hide_dropdown');
				});

				$el.next().find('.plus').on('click', function (e) {
					e.preventDefault();
					console.log(choiceValues);
					var $this = $(this);

					var $text = $this.siblings('.counter_text');
					var $count = $this.parent().next().find('.counterNum');
					var count = +$text.text() + 1;

					var choiceKey = $this.data('key');
					choiceValues[elId][choiceKey] = count;
					$text.html(count);
					$count.html(count);
				});

				$el.next().find('.minus').on('click', function (e) {
					e.preventDefault();
					console.log(choiceValues);
					var $this = $(this);

					var $text = $this.siblings('.counter_text');
					var $count = $this.parent().next().find('.counterNum');
					var count = +$text.text() - 1;

					$text.html(count);
					$count.html(count);
					var choiceKey = $this.data('key');
					choiceValues[elId][choiceKey] = count;

					if (count == 0) {
						choiceValues[elId][choiceKey] = 0;

						var currentArr = $el.val();
						var removePosition = currentArr.indexOf(choiceKey);
						currentArr.splice(removePosition, 1);
						$el.val(currentArr).trigger("change");
						$('body').addClass('-hide_dropdown');
					}
				});
				showComboboxPopup();
			}).data('select2').$container.addClass("fake-select_list--span");

			setTimeout(function () {
				showComboboxPopup();
			}, 4);

			var placeholder = $el.attr('placeholder');
			var $input = $el.next().find('.select2-search__field');
			var $choice = $el.next().find('.select2-selection__choice');

			$input.attr('placeholder', placeholder);
		});
	}

	$('.selectmultiply').each(function (i, el) {
		var dataPopup = $(el).data('popup');

		$(el).next('.select2').find('.select2-search--inline').append('<a href="' + dataPopup + '" class="list"></span>');
	});
}

$('.select2-search__field').on('click', function () {
	$('body').removeClass('-hide_dropdown');
});

if ($('.fake-select_default').length) {
	$('.fake-select_default').select2({
		minimumResultsForSearch: -1
	}).data('select2').$container.addClass("fake-select_default--span");
}