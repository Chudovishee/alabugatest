"use strict";
define([
	"queue", "views/messages",
	"actions/action",
	"events/end"
], function(
	queue, messages,
	Action,
	EndEvent
){

/**
 * Действие "Нанять"
 */
var RecruiteAction = function(){
	Action.apply( this, arguments );
	//event должен содержать персону
	this.text = "Нанять " + this.event.person.name;
}

RecruiteAction.prototype = Object.create( Action.prototype );
RecruiteAction.prototype.constructor = RecruiteAction;

RecruiteAction.prototype.do = function(){
	//отображаем скрытый рейтинг нанятой персоны и создаем событие END с низким приоритетом, которе на следующем ходу закроет игру
	messages.text( "Вы наняли " + this.event.person.name + ". Его рейтинг: " + this.event.person.score );
	queue.append( new EndEvent(), 0, -2 );

	return Action.prototype.do.apply( this, arguments );
}

return RecruiteAction;

})