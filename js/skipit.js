require([
    '$api/models',
], function(models) {
    'use strict';

    models.player.addEventListener('change', function(){
        var skipExplicit = $('#explicit').is(':checked');

        if(skipExplicit && this.track.explicit) {
            $('<div>skipping to next track because ' + this.track.name + ' contains naughty words</div>').appendTo('div.trace');
            this.skipToNextTrack();
        }

    });
});
