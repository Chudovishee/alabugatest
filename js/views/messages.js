"use strict";
define(function(){

/**
 * Блок с сообщениями
 */
var Messages = function(){
	this.element = document.querySelector( "#messages" );
}
Messages.prototype = {
	text: function( msg ){
		var text = document.createElement( "div" );
		text.classList.add( "console-message" );
		text.appendChild( document.createTextNode( msg ) );

		this.element.appendChild( text );
		//проскроливаем вниз
		this.element.scrollTop = this.element.scrollHeight;
	},
}
return new Messages();

})