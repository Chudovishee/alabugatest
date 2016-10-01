"use sctrict";
define([
	"views/messages", "views/actions", "views/persons", "views/info"
], function(
	messages, actions, persons, info
){

/**
 * Игровая очередь
 */

var EventQueue = function(){
	this.queue = [];
	this.last = false;
}

EventQueue.prototype = {
	/**
	 * очищает
	 */
	clear: function(){
		this.queue = [];
		info.clear();
	},
	/**
	 * Добавить событие в очердь
	 * @param {Event}	event		Событие
	 * @param {integer}	[offset]	Смещение события относительно текущего момента. Ноль это следующий день Должно быть натуральным числом. Если не указано, то считается нулем
	 * @param {number}	[prio]		Приоритет события. Сперва выполяются события с наибольшим приоритетом. События с одинаковым приоритетом могут выполниться в любом порядке.
	 */
	append: function( event, offset, prio ){
		var step;

		if( !offset ) offset = 0;
		if( !prio ) prio = 0;

		step = this.queue[ offset ] || ( this.queue[ offset ] = [] );

		step.push({
			prio: prio,
			event: event,
		});
	},
	/**
	 * Следующий шаг.
	 * На каждом шаге, если до этого были шаги, то выполняется метод before у всех событий в порядки, заданном приоритетом,
	 * затем выполяется метод do, так же в порядке приоритета.
	 * Если какой-либо вызов do вернет false, то вызовы остановятся, информация не будет обновлена.
	 */
	shift: function(){
		var self = this,
			step,
			breaked = false;

		if( this.last ){
			this.last.forEach(function( event ){
				event.event.before();
			})
		}

		actions.clear();

		if( step = this.queue.shift() ){

			step.sort(function( a, b ){
				if( a.prio > b.prio ) return -1;
				if( a.prio < b.prio ) return 1;
				return 0;
			})

			for( var i = 0; i < step.length; i++ ){
				if( step[i].event.do() === false ){
					breaked = true;
					break;
				}
			}
			if( !breaked ){
				persons.refresh();
				info.days++;
				info.refresh();
			}
		}
		this.last = step;
	}
};

return new EventQueue();

})