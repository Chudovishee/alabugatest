"use strict";
define([
	"queue", "views/messages", "views/info",
	"actions/action",
	"events/resume"
], function(
	queue, messages, info,
	Action,
	ResumeEvent
){

/**
 * Действие "Нанять рекрутинговое агенство"
 */
var AgencyAction = function(){
	Action.apply( this, arguments )
}

AgencyAction.prototype = Object.create( Action.prototype );
AgencyAction.prototype.constructor = AgencyAction;

AgencyAction.prototype.text = "Нанять рекрутинговое агенство";

AgencyAction.prototype.do = function(){
	messages.text( "Вы наняли рекрутинговое агенство" );

	info.agency++;
	queue.append( new ResumeEvent(), 3 );
	queue.append( new ResumeEvent(), 3 );
	queue.append( new ResumeEvent(), 3 );

	return Action.prototype.do.apply( this, arguments );
}

return AgencyAction;

})