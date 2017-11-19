(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

$(function () {
	var timeInMsOpen,
		timeInMsClose = Date.parse("May 20, 2019"),
		timeInMsRemainder,
		seconds,
		minutes,
		houres,
		day,
		yers,
		$seconds = $(".main__seconds"),
		$minutes = $(".main__minutes"),
		$houres = $(".main__hours"),
		$day = $(".main__days"),
		$yers = $(".main__yers");

	var timer = setInterval(function() {
		timeInMsOpen = Date.now();
		timeInMsRemainder = timeInMsClose - timeInMsOpen;
		seconds = parseInt(timeInMsRemainder/1000)%60;
		minutes = parseInt(timeInMsRemainder/60000)%60;
		houres = parseInt(timeInMsRemainder/3600000)%24;
		day = parseInt(timeInMsRemainder/86400000)%365;
		yers = parseInt(timeInMsRemainder/31536000000);
		$seconds.find(".time__numb").html(seconds);
		$minutes.find(".time__numb").html(minutes);
		$houres.find(".time__numb").html(houres);
		$day.find(".time__numb").html(day);
		$yers.find(".time__numb").html(yers);
		$seconds.find(".time__text").sklonenie( seconds, "секунда", "секунды", "секунд");

		$minutes.find(".time__text").sklonenie( minutes, "минута", "минуты", "минут");
		$houres.find(".time__text").sklonenie( houres, "час", "часа", "часов");
		$day.find(".time__text").sklonenie( day, "день", "дня", "дней");
		$yers.find(".time__text").sklonenie( yers, "год", "года", "года");
	}, 1000);




})
},{}]},{},[1])

//# sourceMappingURL=main.js.map
