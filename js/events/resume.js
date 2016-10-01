"use strict";
define([
	"views/messages", "views/actions", "views/persons", "queue",
	"actions/interview", "actions/recruite", "actions/refuse",
	"person"
], function(
	messages, actions, persons, queue,
	InterviewAction, RecruiteAction, RefuseAction,
	Person
){

/**
 * Событие "Новое резюме"
 */
var ResumeEvent = function(){
	this.person = new Person();
	this.new = true;
}
ResumeEvent.prototype = {
	do: function(){
		//при первом появлении сообщает об этом
		if( this.new ){
			messages.text( "Доступно новое резюме: " + this.person.name )
			persons.append( this.person );
			this.new = false;
		}
		//создает действия: нанять, отказать и провести собеседование
		actions.append( new InterviewAction( this ) );
		actions.append( new RecruiteAction( this ) );
		actions.append( new RefuseAction( this ) );
	},
	before: function(){
	//если персоне не отказано, то прокидывает себя в следующий день
		if( !this.person.refused ){
			queue.append( this );
		}
	}

};

return ResumeEvent;

})