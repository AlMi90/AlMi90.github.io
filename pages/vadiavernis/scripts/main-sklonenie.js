(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function( $ ) {
	$.fn.sklonenie = function(number, xx1, xx2_xx4, xx5_xx0) {
		$this = $(this);
		var intNumber = parseInt(number);

		if (number >= 5 && number <= 20) {
			$this.html(xx5_xx0);
		}
		else if ((number - 1)%10 == 0) {
			$this.html(xx1);
		}
		else if ((number - 2)%10 == 0 || (number - 3)%10 == 0 || (number - 4)%10 == 0) {
			$this.html(xx2_xx4);
		}
		else {
			$this.html(xx5_xx0);
		}
	};
})(jQuery);
},{}]},{},[1])

//# sourceMappingURL=main-sklonenie.js.map
