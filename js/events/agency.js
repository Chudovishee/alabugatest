"use strict";
define([
	"views/messages", "views/actions", "queue",
	"actions/agency"
], function(
	messages, actions, queue,
	AgencyAction
){

/**
 * Событие "Доступно рекрутинговое агенство"
 */
var AgencyEvent = function(){
	this.new = true;
}

AgencyEvent.prototype = {
	do: function(){
	//сообщает о первом появлении
		if( this.new ){
			messages.text( "Можно заключить договор с рекрутинговым агенством" )
			this.new = false;
		}
	//создает действие
		actions.append( new AgencyAction() );
	},
	before: function(){
	//прокидывает себя в следующий день
		queue.append( this );
	}

};

return AgencyEvent;

})