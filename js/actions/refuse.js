"use strict";
define([
	"views/messages",
	"actions/action"
], function(
	messages,
	Action
){
/**
 * Действие "Отказать"
 */

var RefuseAction = function( queue ){
	Action.apply( this, arguments );

	this.text = "Отказать " + this.event.person.name;
}

RefuseAction.prototype = Object.create( Action.prototype );
RefuseAction.prototype.constructor = RefuseAction;

RefuseAction.prototype.do = function( scene ){
	messages.text( "Вы отказали " + this.event.person.name );
	this.event.person.refused = true;

	return Action.prototype.do.apply( this, arguments );
}

return RefuseAction;

})