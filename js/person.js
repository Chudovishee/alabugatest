"use strict";
/**
 * Генератор персон, в файле person-data.js данные с вариантами имен для различных полов
 */
define( [ "person-data" ], function( data ){

var Person = function(){
	this.sex = ( Math.random() > 0.5 ) ? "male" : "female";	
	this.name = data.firstName[this.sex][ Math.floor( Math.random()*data.firstName[this.sex].length ) ] +
				" " + data.secondName[ Math.floor( Math.random()*data.secondName.length ) ];

    this.age = Math.round( Math.random()*82 + 18 );
    /** зарплата */
    this.payment = Math.round( Math.random()*90000 + 10000 );
    this.education = this.name + " education string";
    this.description = this.name + " description string";
    /**
     * массив в ответами человека на впоросы. 
     * Каждый элемент
     * @param {string}	text	текст ответа
     * @param {boolean}	display	флаг, TRUE если ответ получен и доступен для просомтра
     */
    this.answers = [];
    /** очки или ценность персоны */
    this.score = Math.round( Math.random()*100 -50 );
    /** если TRUE, то резюме этой персоны отклонено */
    this.refused = false;
	
	for( var i = 0; i < 50; i++ ){
	    this.answers[i] = {
	    	text: this.name + "answer for question " + i,
	    	display: false,
	    }
	}
}

return Person;

})