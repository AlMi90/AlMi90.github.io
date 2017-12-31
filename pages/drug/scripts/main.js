
'use strict';

$( document ).ready( main )

var	$letters	= $('.letters');

var	objectLetters= {
	'letters'	: {
		'$d'		: $('.letters__letter-d'),
		'$r'		: $('.letters__letter-r'),
		'$u'		: $('.letters__letter-u'),
		'$g'		: $('.letters__letter-g'),
		'$cursor'	: $('.letters__letter-cursor'),
	},
	'functions'	: {
		'show'		: function ( key, time ) {
			console.log(key);
		}
	}
};

function main() {
	var delay = 1;
	setTimeout(function() {
		addBlink( objectLetters.letters.$cursor );
		for (var key in objectLetters.letters) {
			delay++;
			setDelay(objectLetters.letters, key, delay)
		};
		addBlink( objectLetters.letters );
	}, 1000)
	setTimeout(function() {
		setInterval(function() {
			for (var key in objectLetters.letters) {
				objectLetters.letters[key].addClass('glitch');
			}
		}, 2000)
		setInterval(function() {
			for (var key in objectLetters.letters) {
				objectLetters.letters[key].removeClass('glitch');
			}
		}, 2300)
	}, 7000)

}



function setDelay( array, key, delay ) {
	setTimeout(function() {
		array[key].addClass('show');
	}, delay*1000);
}
function addBlink( obj ) {
	$(obj).addClass('blink');
}