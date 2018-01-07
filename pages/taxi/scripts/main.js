(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

'use strict';
	$(function(){
		$("#phone").mask("+375(99) 999-99-99");
	});
ymaps.ready(init);

function init() {



	var PRICE_FOR_KM = 0.5,	// Цена за 1 км
		priceTrip,			// Цена итоговая
		PRICE_CAR = 1.5;	// Цена посадки

		// Переменная содержащая форму ввода маршрута
	var	form,
		// Переменная содержащая экземпляр Якарты
		myMap,
		// Коллекция геообъектов.
		thisGeoObjectCollection,
		// Массив инпутов с адресами маршрута
		$routeAddressesInput = [],
		// Массив адресов маршрута getRouteAddresses()
		routeAddresses = [],
		// Массив всех поисковых подсказок inputValidation()
		suggestView = [],
		// Массив одной поисковой подсказки inputValidation()
		suggestViewArr = [],
		// Кнопка отправки формы (Заказ такси)
		submit = document.querySelector('.inputs__submit'),
		// Переменная формы
		form				= document.querySelector('#form'),
		// Данные маршрута
		// Адресс
		$routeAddressesInput	= $('.address__input-address'),
		// Дом
		$routeHouseInput	= $('.address__input-house'),
		// Переменная автозаполнения адресов
		$suggestViewAdressHint,
		// Активный маршрут
		activeRoute,
		// Переменные данных о маршруте растояние и время в пути
		$tripDistans = $('.trip__length'),
		$tripTime = $('.trip__time'),
		$tripPrice = $('.trip__price'),
		// Элементы выбора автомобиля
		$carChoice = $('.car__choice'),
		// Переменная выбранного автомобиля
		autoChoice = 'Седан',
		// Кнопка показа меню комментирования и выбора доп. опций
		$moreButton = $('.more__url'),
		// Меню комментариев и тд.
		$moreMenu = $('.more__menu'),
		// Элементы доп. опции
		$moreOption = $('.more__option');

	// При нажатии на кнопку омментариев и тд.
	$($moreButton).on('click', function() {
		$($moreMenu).toggleClass('active');
	});

	// При нажатии на выбор автомобиля
	$($carChoice).on('click', function() {
		$($carChoice).removeClass('active')
		$(this).addClass('active')
		autoChoice = $(this).attr('data-name')
	});

	// При нажатии на доп. опции
	$($moreOption).on('click', function() {
		$(this).toggleClass('active');
	});


	// При вводе в строку адреса
	$($routeAddressesInput).on("input", function() {
		// Получаем в массив suggestView все поисковые подсказки
		inputValidation(this.value);
		// Если что-то введено в строку адреса
		if (this.value.length > 0) {
			// Удаляем все подсказки
			$(".hints__hint").remove();
			// Показываем меня подсказок и добавляем их
			$(this).parent(".address__address").parent(".address").find(".hints").show().append(function(index, value) {

				var result = "",			// Результат выводимый на экран(автозаполнение)
					suggestViewAdress,		// Результат записывающийся в value
					suggestViewAdressDesc,	// Подпись к suggestViewAdress(область, страна)
					dataAddress;			// Дата атрибут

				for (var i = 0; i < suggestView.length; i++) {
					// Обнуляем массив всех поисковых подсказок
					suggestViewArr.splice(0, suggestViewArr.length);
					// Разделяем всех поисковых подсказок по знаку ","
					suggestViewArr = suggestView[i].split(',');

					// Обнуляем подпись к suggestViewAdress(область, страна)
					suggestViewAdressDesc = "";

					// Перебираем все подсказки выданные на введенные данные
					for (var j = 0; j < suggestViewArr.length; j++) {
						// С помощью условных операторов наполняем переменные
						// suggestViewAdressDesc - подпись адреса (город, область, страна)
						// suggestViewAdress - основной адрес (улица)
						if(j == suggestViewArr.length - 1) {
							suggestViewAdressDesc += suggestViewArr[j];
						}
						else if (j != 0) {
							suggestViewAdressDesc += suggestViewArr[j] + ", " ;
						}
						else{
							suggestViewAdress = suggestViewArr[j];
						}
					}
					dataAddress = 'val:'+suggestViewAdress+';address:'+suggestView[i];
					result += '<li class="hints__hint" data-address="' + dataAddress + '">' + suggestViewAdress + '<br><span class= \"hints__hint-desc\">' + suggestViewAdressDesc + '.<span></li>';
				}
				return result;
			})
		//
		$suggestViewAdressHint = $(".hints__hint");
		$($suggestViewAdressHint).on('click', function(){
			var ObjAdressForInput = stringToObj(this);
			$(this)
					// Скрываем подсказки адресов и добавляем выбранный адрес в строку поиска
					.parent(".address__hints")
					.hide()
					.parent(".address")
					.find(".address__input-address")
					.val(ObjAdressForInput.val)
					.attr('data-address', ObjAdressForInput.address);

					if (checkForRouteEntry($routeAddressesInput)) {
						routeingInMap();
						submitActive();
					}
		})
		}
		// Если ничего не введено в строку адреса
		else {
			$(".hints__hint").remove();
		}
	});

	$($routeHouseInput).on("input", function() {
		if (checkForRouteEntry($routeAddressesInput)) {
			routeingInMap();
			submitActive();
		}
	});

	// проверка введения всего маршрута
	function checkForRouteEntry($inputs){
		var result = true;
		for (var i = 0; i < $inputs.length; i++) {
			if($($inputs[i]).attr('data-address') == undefined) {
				result = false;
			}
		}
		return result;
	}
	// Активация кнопки отправки формы (Заказать такси)
	function submitActive() {
		submit.disabled = false;
		submit.classList.add('active');
	}
	// Перевод строки в объект
	function stringToObj(obj) {
		var string = $(obj).attr('data-address');
		var arr = [],
			obj = [],
			arrSplit = [];

		arr = string.split(';');
		for (var i = 0; i < arr.length; i++) {
			arrSplit = arr[i].split(':');
			obj[arrSplit[0]] = arrSplit[1];
		}
		return obj;
	}

	// Функция добавления поисковых подсказок по value
	function inputValidation(value) {
		ymaps.suggest(value, {
			boundedBy:[[54.565521,30.309393],[54.454647, 30.502341]],
			provider: {
					suggest:(function(request, options){
					return ymaps.suggest("Беларусь, Витебская область, Орша," + request);
			})}
		}).then(function (items) {
			suggestView.splice(0, suggestView.length);
			for (var i = 0; i < items.length; i++) {
				suggestView[i]= items[i].displayName;
			}
		});
	};

	// Функция получения всех адресов введенных в инпуты поиска
	function getRouteAddresses() {
		var address = [];
		for (var i = 0; i < $routeAddressesInput.length; i++) {
			console.log($($routeAddressesInput[i]).val());
			address[i]= $($routeAddressesInput[i]).val() + ", " + $($routeHouseInput[i]).val() + ", Орша, Витебская область, Беларусь";
			//address[i]= $($routeAddressesInput[i]).attr('data-address');
		}
		return address;
	};

	// Функция добавления маршрута на карту, она же удаляет предыдущее маршруты
	// с помощью функции myGeoObjects.removeAll()
	function showRoute(value, callback) {
		ymaps.route(value, {
			boundedBy:[[54.565521,30.309393],[54.454647, 30.502341]],
		}).then(
			function (route) {
				thisGeoObjectCollection.removeAll();
				thisGeoObjectCollection.add(route);
				myMap.geoObjects.add(thisGeoObjectCollection);
				var routeDataLength = (route.getLength()/1000).toFixed(2);
				var routeDataTime =  Math.ceil(route.getTime()/60);
				callback(routeDataLength, routeDataTime);
			},
			function (error) {
				alert('Возникла ошибка: ' + error.message);
			}
		);
	};

	// Отображение длинны и времени маршрута
	function tripData(length, time) {
		console.log(1);
		priceTrip = Math.ceil(PRICE_FOR_KM * length + PRICE_CAR);
/*		$($tripDistans).html('Растояние: ~ ' + length + ' км');
		$($tripTime).html('В пути: ~ ' + time + ' минут');*/
		$($tripPrice).html('стоимость ~ ' + priceTrip + ' руб.');
	};

	// Создаем экземпляр Якарты
	myMap = new ymaps.Map('YMapsID', {
		center: [54.510741, 30.429586],
		zoom: 15,
		controls: []
	});

	// Создаем коллекцию геообъектов(в данном случае маршрутов)
	// для более удобного редактирования в дальнейшем
	thisGeoObjectCollection = new ymaps.GeoObjectCollection({}, {
		preset: "islands#redCircleIcon",
		strokeWidth: 4,
		geodesic: true
	});

	// Показ маршрута на карте
	function routeingInMap() {
		// Получаем адреса для маршрута
		routeAddresses = getRouteAddresses();

		// Отображаем маршрут на карте
		showRoute(routeAddresses, function(length, time) {
			tripData(length, time);
		});
	};

	// При нажатии на сабмит проихойдет построение маршрута(если он есть),
	// с помощью функции showRoute(), в которую передается массив где:
	// [0] - точка отправления, [>0] - точк(а/и) направления.
	form.onsubmit = function () {
		routeingInMap()
	};
}
},{}]},{},[1])

//# sourceMappingURL=main.js.map
