"use strict";
define([
	"views/messages", "views/actions", "views/info", "queue",
	"actions/ads"
], function(
	messages, actions, info, queue,
	AdsAction
){

/**
 * Событие "конец игры"
 */
var EndEvent = function(){
}

EndEvent.prototype = {
	do: function(){
	/**
	 * это событие очищает ранее созданные действия, чтобы это коректно отработало следует назначить этому событию низкий приоритет,
	 * так чтобы оно выполнилось последним
	 */
		messages.text( "Конец игры. Дней прошло: " + info.days + ", рекрутинговое агенство нанято: " + info.agency + ", итого расходов: " + info.total );
		actions.clear();
		return false;
	},
	before: function(){}
};

return EndEvent;

})