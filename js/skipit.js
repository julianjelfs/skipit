require(['$api/models', 'js/genres'], function(models, genres) {
    'use strict';

    models.player.addEventListener('change', function(){
        var skipExplicit = $('#explicit').is(':checked');

        if(skipExplicit && this.track.explicit) {
            $('<div>skipping to next track because ' + this.track.name + ' contains naughty words</div>').appendTo('div.trace');
            this.skipToNextTrack();
        }

    });

    alert(genres.list.length);

});
