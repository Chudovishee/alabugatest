"use strict";
define( [ "queue" ], function( queue ){

/**
 * Прототип действия, которое может совершить пользователь
 */
var Action = function( event ){
	this.event = event;
}

Action.prototype = {
	/**
	 * Этот метод будет вызван при нажатии на кнопку действия.
	 * Он должен вернуть обещание, после resolve которого действие будет считаться завершенным
	 */
	do: function(){
		queue.shift();
		return Promise.resolve();
	},
}

return Action;

})