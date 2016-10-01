"use strict";
define(function(){
	
/**
 * Отображение доступных действий
 */
var Actions = function(){
	this.element = document.querySelector( "#actions" );
}
Actions.prototype = {
	/**
	 * очистка
	 */
	clear: function(){
		while( this.element.firstChild ){
			this.element.firstChild.remove();
		}
	},
	/**
	 * Добавление
	 * @param {Action} action действие
	 */
	append: function( action ){
		var self = this,
			button = document.createElement( "button" );

		button.classList.add( "actions-button" );
		button.appendChild( document.createTextNode( action.text ) );

		button.addEventListener( "click", this._actionHandler( action ) );

		this.element.appendChild( button );
	},
	/**
	 * отключение всех кнопок действий
	 */
	_disableActions: function(){
		[].forEach.call( this.element.querySelectorAll( ".actions-button" ), function( button ){
			button.setAttribute( "disabled", true );	
		});
	},
	/**
	 * Включение всех кнопок
	 */
	_enableActions: function(){
		[].forEach.call( this.element.querySelectorAll( ".actions-button" ), function( button ){
			button.removeAttribute( "disabled");	
		});
	},
	/**
	 * Обработчик нажатия на кнопку действия
	 * Выключает все кнопки и включает их только после resolve дуйствия
	 * @param {Action} действие
	 */
	_actionHandler: function( action ){
		var self = this;

		return function(){
			self._disableActions();

			action.do( self ).then(function(){
				self._enableActions();
			})
		}
	}
}
return new Actions();

})