"use strict";
define(function(){

/**
 * информация о персоне
 */

var PersonInfo = function( element ){
	var self = this;

	this.element = element
	this.name = element.querySelector( ".name" );
	this.info = element.querySelector( ".detail" );
	this.questions = element.querySelector( ".questions" );

	//обработка кнопки "закрыть"
	element.querySelector( ".exit button" ).addEventListener( "click", function(){
		self.close();
	})
	this.close();
}

PersonInfo.prototype = {
	/**
	 * очистка: стираем имя, инфу и все ответы с фопросами
	 */
	clear: function(){
		while( this.name.firstChild ){
			this.name.firstChild.remove();
		}
		while( this.info.firstChild ){
			this.info.firstChild.remove();
		}
		while( this.questions.firstChild ){
			this.questions.firstChild.remove();
		}

		this.close();
	},
	/**
	 * вспомогательный рендер информации о персоне
	 * @param {Person} person	персона
	 */
	_renderInfo: function( person ){
		var self = this;

		[
			{ label: "Возраст:", 				value: person.age },
			{ label: "Навыки и обраование:", 	value: person.education },
			{ label: "Ожидаемая зарплата:", 	value: person.payment },
			{ label: "Описание:", 				value: person.description }
		].forEach(function( info ){
			var block = document.createElement( "div" ),
				label = document.createElement( "span" ),
				value = document.createElement( "span" );

			block.classList.add( "block" );
			label.classList.add( "label" );
			value.classList.add( "value" );

			label.appendChild( document.createTextNode( info.label ) );
			value.appendChild( document.createTextNode( info.value ) );

			block.appendChild( label );
			block.appendChild( value );
			self.info.appendChild( block );
		})
	},
	/**
	 * Закрытие, элемент просто скрывается
	 */
	close: function(){
		this.element.classList.remove( "show" );
		this.element.classList.add( "hide" );
	},
	/**
	 * Открытие окна и рендер информации о персоне в него
	 * @param {Person} person	персона
	 */
	open: function( person ){
		var self = this,
			block,
			element = this.element;

		this.clear();

		this._renderInfo( person );
		this.name.appendChild( document.createTextNode( person.name ) );

		person.answers.forEach(function( answer, index ){
			block = document.createElement( "div" );
			block.classList.add( "block" );

			block.appendChild( self._renderQuestion({ text: "question " + index }) );
			block.appendChild( self._renderAnswer( answer ) );

			self.questions.appendChild( block );
		})
		this.element.classList.add( "show" );
		this.element.classList.remove( "hide" );
	},
	/**
	 * Рендер вопроса
	 */
	_renderQuestion: function( question ){
		var element = document.createElement( "div" );
		element.classList.add( "question" );
		element.appendChild( document.createTextNode( question.text ) );

		return element;
	},
	/**
	 * рендер ответа
	 * @param {Object}	answer			Ответ на вопрос в виде структуры из поля answers у Person
 	 * @param {string}	answer.text		текст
     * @param {boolean}	answer.display	Флаг видимости 
	 */
	_renderAnswer: function( answer ){
		var element = document.createElement( "div" );
		element.classList.add( "answer" );
		
		if( answer.display ){	
			element.appendChild( document.createTextNode( answer.text ) );
		}
		else{
			element.appendChild( document.createTextNode( "Не задавался" ) );
		}		
		return element;
	}
}

return PersonInfo;
})