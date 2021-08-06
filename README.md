Плагины и библиотеки:
=============================

1. Select2
	Плагин Select2 был изменен
	Modified: select2Mod.min.js
	Original: select2.min.js
	http://stackoverflow.com/a/19984020

2. Звуковая дорожка:
	 http://wavesurfer-js.org/

3. Выбор дат:
	 https://jqueryui.com/datepicker/

4. Сортировка таблиц:
	 https://datatables.net/

5. jQuery, jQueryUI


Общая информация:
=============================

1. Открытие попапов:
	<a href="#testPopup" class="popupopen">Registration</a>

	Обязательно указывать: класс '.popupopen', атрибут href.
	Пример (клик на Registartion): http://difiz.com/works/bypass/register.html

2. Вывод уведомлений:
	<a href="#" class="sendReport" data-report="We'll send the results on Difiz.com@gmail.com">Report</a>
	Внизу должен быть блок: <div id="report"></div>

3. Общие стили для input, checkbox, select, tooltip и т.п.: http://difiz.com/works/bypass/common.html

4. Общие стили элементов личного кабинета: http://difiz.com/works/bypass/common_account.html

5. Сортировка ячеек таблицы может проводиться через data-атрибут:
		<td data-order="0.79870000">80%</td>

6. Установка даты в datepicker происходит через value, в таком формате (можно использовать и другие):
		value="5 Mar, 2016"

7. Выпадающее меню в шапке работает тут:
	http://difiz.com/works/bypass/statistics.html

8. Переключатели такого типа: 		
	https://www.dropbox.com/s/y1xx4h81cmx96ks/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82%202016-04-02%2001.29.25.png?dl=0

	Они работают на скрытых checkbox/ radio. Если нужен именно переключатель: ставьте тип radio, и одинаковый name.
	Если нужен множественный выбор - ставьте checkbox.
	Ну и для бэкэнда очень удобно получается - все данные в инпутах хранятся.

9. Выпадающий тултип с аудио-дорожкой работает тут:  ./statistics.html
Первая таблица, строка MTC:

https://www.dropbox.com/s/27c68hawzfj6ysp/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82%202016-03-27%2019.59.13.png?dl=0


10. Работа по тегам
Все интересное находится в selectTags.js
Используется select2, который я чуть кастомизировал.
В начале находится объект, которой записываются данные по каждому из select'ов:
var choiceValues = {};

Сам объект:
https://www.dropbox.com/s/g12atcgqefum9p2/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82%202016-04-04%2000.27.28.png?dl=0

При клике на плюс/ минус изменения вносятся в объект.

В прицнипе, в 130 строчках не заблудитесь :)

11. Если надо вносить изменения в CSS обязательно создайте новый файл и подключите после main.css.
	main.css трогать нельзя пока я работаю над версткой и багами.

12. Тоже самое и по js.


13. Добавил редактирование в таблице и лоудинг при клике на "Test Connection"
voip_settings.html

14. Поправил календари
statistics.html

15. Инициализация сортировки таблиц:
$(".sorting_table").dataTable({
	paging: false,
	searching: false,
	lengthChange: false,
	info: false,
	pagingType: "simple_numbers",
	iDisplayLength: 3,
	"order": [[0, "asc"]],
	'aoColumnDefs': [
		{
			'bSortable': false,
			'aTargets': ['nosort']
		}
	]
});

Только по-хорошему делайте не для всех .sorting_table, а лишь для свежедобавленных.

16. Функция раскрытия таблицы:
openTableContent('.-results')

Вместо .-result можно любой другой селектор или сгенерированную таблицу


17. По аудио: проверяйте data-id - они должны быть уникальны и связаны с внутренней .waveform

18. Селект с попапом теперь работает так: <select class="selectmultiply" data-selectMult="id1" data-popup="#livesearch"
	data-popup - это id попапа, который откроется.
