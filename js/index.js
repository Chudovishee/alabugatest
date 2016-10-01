"use strict";

require.config({
    paths: {
        lib:  "../lib",
    },
});

require([
    "queue",
    "events/ads", "events/agency", "events/resume", "events/end"
], function(
    queue,
    Ads, Agency, Resume, End
){


/**
 * начинаем игру,  помещаем в очередь газету, агенство, одно резюме и конец игры через 30 ходов.
 */
queue.append( new Ads() );
queue.append( new Agency() );
queue.append( new Resume() );
//приоритет -1, у всех остальных по умолчанию 0
queue.append( new End(), 30, -1 );

//запускаем
queue.shift();

});