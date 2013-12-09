function homeCtrl($scope){

    $scope.trace = [];
    $scope.skipExplicit = false;



    require(['$api/models', 'js/genres'], function(models, genres) {
        'use strict';

        var filtered = [];
        var lc = [];
        angular.forEach(genres.list, function(g){
            lc.push(g.toLowerCase());
        });

        $scope.filtered = function(){
            if($scope.genreFilter == null) return;
            var words = $scope.genreFilter.toLowerCase().split(' ');
            filtered = [];
            for(var i= 0, l=lc.length; i<l; i++) {
                for(var a= 0, b=words.length; a<b; a++) {
                    if(lc[i].indexOf(words[a]) >= 0) {
                        filtered.push(lc[i]);
                    }
                }
            }
            return filtered;
        }

        function trace(str){
            $scope.$apply(function(){
                $scope.trace.push(str);
            });
        }

        function reportNaughty(trackName) {
            trace('skipping to next track because ' + trackName + ' contains naughty words');
        }

        function reportGenre(artistUri) {
            models.Artist.fromURI(artistUri).load('genres').done(function(artist) {
                trace('genres: ' + JSON.stringify(artist.genres));
            });
        }

        models.player.addEventListener('change', function(){

            if($scope.skipExplicit && this.track.explicit) {
                reportNaughty(this.track.name);
                this.skipToNextTrack();
            }

            //look up the artist genre
            reportGenre(this.track.artists[0]);
        });

        $scope.$apply();

    });

};

var app = angular.module('SK', []);




