function homeCtrl($scope){

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
            var re = new RegExp($scope.genreFilter, "gi");
            filtered = [];
            for(var i= 0, l=lc.length; i<l; i++) {
                if(re.test(lc[i])){
                    filtered.push(lc[i]);
                }
            }
            return filtered;
        }

        function trace(str){
            $scope.$apply(function(){
                $scope.trace = str;
            });
        }

        function reportNaughty(trackName) {
            trace('skipping to next track because ' + trackName + ' contains naughty words');
        }

        function getGenres(artistUri) {
            return models.Artist.fromURI(artistUri).load('genres');
        }

        models.player.addEventListener('change', function(){
            var player = this,
                trackName = player.track.name;

            document.getElementById("track-image").style.backgroundImage = 'url(' + player.track.imageForSize(100) + ')';

            if($scope.skipExplicit && player.track.explicit) {
                reportNaughty(trackName);
                player.skipToNextTrack();
            }

            //look up the artist genre
            getGenres(player.track.artists[0]).done(function(artist){
                $scope.$apply(function(){
                    $scope.artistGenres = artist.genres.join(', ');
                    $scope.trackSummary = player.track.name + ' by ' + artist.name;
                });
                for(var i= 0, l=artist.genres.length; i<l; i++) {
                    var genre = artist.genres[i].toLowerCase();
                    if(filtered.indexOf(genre) >= 0) {
                        trace('skipping to next track because artist ' + artist.name + ' is associated with filtered genre ' + genre);
                        player.skipToNextTrack();
                        break;
                    }
                }
            });
        });

        $scope.$apply();

    });

};

var app = angular.module('SK', []);




