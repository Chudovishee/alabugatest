"use strict";
define( function(){
/**
 * Отображение информации о текущем ходе
 */
var Info = function(){
	this.element = document.querySelector( "#if" );
	this.daysElement = document.querySelector( ".value.days" );
	this.agencyElement = document.querySelector( ".value.agency" );
	this.totalElement = document.querySelector( ".value.total" );
	
	this.clear();
}

Info.prototype = {
	/**
	 * Очистка
	 */
	clear: function(){
		this.days = 0;
		this.agency = 0;
		this.total = 0;
		this.refresh();
	},
	/**
	 * Обновление
	 */
	refresh: function(){
		this.total = 1000 * this.days + 10000 * this.agency;

		this.daysElement.innerText= this.days;
		this.agencyElement.innerText= this.agency;
		this.totalElement.innerText= this.total;
	}
};

return new Info();

})