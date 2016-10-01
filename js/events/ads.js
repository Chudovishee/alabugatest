"use strict";
define([
	"views/messages", "views/actions", "queue",
	"actions/ads"
], function(
	messages, actions, queue,
	AdsAction
){

/**
 * Событие "Доступно подача объявления"
 */
var AdsEvent = function(){
	this.new = true;
}

AdsEvent.prototype = {
	do: function(){
	//если лоявилось первый раз, то сообщает об этом
		if( this.new ){
			messages.text( "Можно подать объявление в газету" )
			this.new = false;
		}
	//добавляет дейтсвие
		actions.append( new AdsAction() );
	},
	before: function(){
	//и прокидывает себя на следующий ход
		queue.append( this );
	}

};

return AdsEvent;

})