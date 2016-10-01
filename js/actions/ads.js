"use strict";
define([
	"queue", "views/messages",
	"actions/action",
	"events/resume"
], function(
	queue, messages,
	Action,
	ResumeEvent
){

/**
 * действие "Подать объявление в газету"
 */
var AdsAction = function(){
	Action.apply( this, arguments )
}

AdsAction.prototype = Object.create( Action.prototype );
AdsAction.prototype.constructor = AdsAction;

AdsAction.prototype.text = "Подать объявление в газету";

AdsAction.prototype.do = function(){
	messages.text( "Вы подали объявление о найме в газету." );

	queue.append( new ResumeEvent() );
	queue.append( new ResumeEvent() );
	
	return Action.prototype.do.apply( this, arguments );
}

return AdsAction;

})