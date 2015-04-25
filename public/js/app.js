var app = angular.module('app', []);

app.controller('MainCtrl', function (data) {
    var vm = this;
    vm.departments = {};
    var allUsers = data.getUsers();
    for(var i = 0; i < allUsers.length; i++) {
        if(vm.departments[allUsers[i].department] === undefined) {
            vm.departments[allUsers[i].department] = 1;
        } else {
            vm.departments[allUsers[i].department]++;
        }
    }
    console.log(vm.departments);
});

app.service('data', function ($window) {
    var service = {
        getUsers: getUsers,
        getGames: getGames
    };

    return service;

    function getUsers() {
        return $window.data.allUsers;
    }

    function getGames() {
        return $window.data.allGames;
    }
});

app.directive('game', function (data) {
    var allGames = data.getGames();
    var allUsers = data.getUsers();

    return {
        restrict: 'E',
        templateUrl: 'js/game.template.html',
        replace: true,
        scope: true,
        link: function (scope, elem, attr) {
            var gameId = attr.gameId;
            for(var i =0; i< allGames.length; i++) {
                if(allGames[i]._id === gameId) {
                    scope.game = allGames[i];
                    break;
                }
            }
            if(scope.game.player1.indexOf('#') === 0) {
                scope.player1 = {name: "Winner of #" + scope.game.player1.slice(1), imageUrl: 'images/mm.png'};
            }
            if(scope.game.player2.indexOf('#') === 0) {
                scope.player2 = {name: "Winner of #" + scope.game.player2.slice(1), imageUrl: 'images/mm.png'};
            }

            for(var i=0; i< allUsers.length; i ++) {
                if(scope.game.player1 === allUsers[i]._id) {
                    scope.player1 = allUsers[i];
                }
                if(scope.game.player2 === allUsers[i]._id) {
                    scope.player2 = allUsers[i];
                }

            }
        }
        
    }
});

app.directive('player', function () {
    return {
        restrict: 'E',
        scope: {
            player: '=playerInfo'
        },
        templateUrl: 'js/player.template.html'
    }
})