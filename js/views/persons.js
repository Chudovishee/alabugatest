"use strict";
define( [ "views/person-info" ], function( Info ){

/**
 * Список персон, резбме которых были получены
 */
var Persons = function(){
	this.element = document.querySelector( "#persons" );
	this.info = new Info( document.querySelector( "#person-info" ) );

	this.persons = [];
}

Persons.prototype = {
	/**
	 * Добавить в список персону
	 * @param {Person}	person	персона
	 */
	append: function( person ){
		this.persons.push( person );
	},
	/**
	 * очищает список
	 */
	clear: function(){
		while( this.element.firstChild ){
			this.element.firstChild.remove();
		}
	},
	/**
	 * перерисоввает список
	 */
	refresh: function(){
		var self = this,
			block, button, refuse;

		this.clear();

		this.persons.forEach(function( person ){
			block = document.createElement( "div" );
			button = document.createElement( "button" );

			block.classList.add( "block" );
			button.classList.add( "button" );

			button.appendChild( document.createTextNode( "Просмотреть" ) );
			block.appendChild( button );
			block.appendChild( document.createTextNode( person.name ) );

			//метка для тех кому отказали
			if( person.refused ){
				refuse = document.createElement( "span" );
				refuse.classList.add( "refuse" );
				refuse.appendChild( document.createTextNode( "Отказано" ) );

				block.appendChild( refuse );
			}

			//обработчик кнопки "Просомотр"
			button.addEventListener( "click", function(){
				self.info.open( person  );
			})

			self.element.appendChild( block );
		})
	}
};

return new Persons();

})