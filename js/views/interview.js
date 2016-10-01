"use strict";
define([ "views/person-info" ],function( PersonInfo ){

/**
 * Собеседование. Сделано на бае отобраени инфораии о пользователе.
 * Счетчик не дает задать больше 10 вопросов.
 */
var Interview = function(){
	PersonInfo.call( this, document.querySelector( "#interview" ) );
}

Interview.prototype = Object.create( PersonInfo.prototype );
Interview.prototype.constructor = Interview;

/**
 * Закрытие выбросит resolve или reject если они доступны
 * @param {boolean} fail если TRUE, то будет вызван reject
 */
Interview.prototype.close = function( fail ){
	PersonInfo.prototype.close.apply( this, arguments );
	if( fail && this.reject ){
		this.reject();
	}
	else if( this.resolve ){
		this.resolve();
	}

	delete this.resolve;
	delete this.reject;

}
/**
 * Очистка
 */
Interview.prototype.clear = function(){
	PersonInfo.prototype.clear.apply( this, arguments );
	this.counter = 0;
};
/**
 * открывает окно и начинает собеседование
 * @param {Person} person	персона, проходящая собеседование
 * @return {Promise}		Обещаение, будет resolve или reject при закрытии окна
 */
Interview.prototype.do = function( person ){
	var self = this,
		block, question, answer, button,
		element = this.element;

	PersonInfo.prototype.open.apply( this, arguments );

	return new Promise(function( resolve, reject ){
		self.resolve = resolve;
		self.reject = reject;
	})
}
/**
 * Добавляем к базовому рендеру кнопку "Задать вопрос"
 * @param {Object}	answer			Ответ на вопрос в виде структуры из поля answers у Person
 * @param {string}	answer.text		текст
 * @param {boolean}	answer.display	Флаг видимости
 * @return {Element}				результат - DOM Element
 */
Interview.prototype._renderAnswer = function( answer ){
	var element;

	if( answer.display ){
		element = document.createElement( "div" );
		element.classList.add( "answer" );
		element.appendChild( document.createTextNode( answer.text ) );
	}
	else{
		element = document.createElement( "button" );
		element.appendChild( document.createTextNode( "Задать" ) );
		element.addEventListener( "click", this._questionHandler( answer ) );
	}
	
	return element;
}
/**
 * Обработчки надатия кнопки "Задать вопрос".
 * Внутки проверка, если задано 10 вопросов, то все кнопки блокируются
 * @param {Object}	answer			Ответ на вопрос в виде структуры из поля answers у Person
 * @param {string}	answer.text		текст
 * @param {boolean}	answer.display	Флаг видимости
 */
Interview.prototype._questionHandler = function( answer ){
	var self = this;

	return function( e ){
		e.target.parentNode.appendChild( document.createTextNode( answer.text ) );
		answer.display = true;
		e.target.remove();

		self.counter++;

		if( self.counter > 10 ){
			[].forEach.call( self.questions.querySelectorAll( "button" ), function( button ){
				button.setAttribute( "disabled", true );
			})
		}
	}
}
return new Interview();
})