"use strict";
define([
	"queue", "views/messages", "views/interview",
	"actions/action",
	"events/resume",
], function(
	queue, messages, interview,
	Action,
	ResumeEvent
){

/**
 * Действие "собеседование"
 */
var InterviewAction = function(){
	Action.apply( this, arguments )
	//event, который это запускает, должен содержать поле person
	this.text = "Провести собеседовение с " + this.event.person.name;
}

InterviewAction.prototype = Object.create( Action.prototype );
InterviewAction.prototype.constructor = InterviewAction;


InterviewAction.prototype.do = function(){
	var self = this;

	/**
	 * Создаем окно с опросником и только после его закрытия резолвимся
	 */
	return interview.do( this.event.person ).then(function(){
		messages.text( "Вы провели собеседование" );
		return Action.prototype.do.call( self );
	});

	
}

return InterviewAction;

})