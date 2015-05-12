var app = angular.module('app', []);

app.controller('MainCtrl', function (data) {
    var vm = this;
    vm.departments = {};
    var allUsers = data.getUsers();
    var allGames = data.getGames();
    
    var maleCount = 0, femaleCount = 0;
    for(var i = 0; i < allUsers.length; i++) {
        if(allUsers[i].sex === 'M') {
            maleCount++;
        } else {
            femaleCount++;
        }

        if(vm.departments[allUsers[i].department] === undefined) {
            vm.departments[allUsers[i].department] = { totalUsers: 1, remaining:  1};
        } else {
            vm.departments[allUsers[i].department].totalUsers++;
            vm.departments[allUsers[i].department].remaining++;
        }
    }
    var dept;
    for(var i=0; i < allGames.length; i++) {
        if(allGames[i].winner.length > 0) {
            if(allGames[i].winner === allGames[i].player1) {
                dept = getDepartment(allGames[i].player2, allUsers);
            } else {
                dept = getDepartment(allGames[i].player1, allUsers);
            }
            
            vm.departments[dept].remaining--;
        }
    }
    
    vm.maleCount = maleCount;
    vm.femaleCount = femaleCount;
});

function getDepartment(player, allUsers) {
    for(var i = 0; i < allUsers.length; i++) {
        if(allUsers[i]._id === player) {
            console.log(allUsers[i]);
            return allUsers[i].department;
        }
    }
}
app.service('data', function ($window, $http) {
    var service = {
        getUsers: getUsers,
        getGames: getGames,
        saveWinner: saveWinner
    };

    return service;

    function getUsers() {
        return $window.data.allUsers;
    }

    function getGames() {
        return $window.data.allGames;
    }

    function saveWinner(game) {
        return $http.put('/games/' + game._id, game);
            
    };
});

app.directive('game', function (data, $location) {
    var allGames = data.getGames();
    var allUsers = data.getUsers();

    return {
        restrict: 'E',
        templateUrl: 'js/game.template.html',
        replace: true,
        scope: true,
        link: function (scope, elem, attr) {
            var params = $location.search();
            var gameId = attr.gameId;

            if(params && params.isAdmin) {
                scope.isAdmin = true;
            }

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

            scope.saveWinner = function(userId) {
                var parentParts;
                scope.game.winner = userId;
                data.saveWinner(scope.game)
                    .then(function(response) {
                        // parentParts = game.parentId.split('-');
                        // var parentGame = allGames[parentParts[0]];
                        // if(parentParts[1] === '1') {
                        //     parentGame.player1 = userId;
                        // } else {
                        //     parentGame.player2 = userId;
                        // }
                    });
            };
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


jsPlumb.ready(function() {
    var j = jsPlumb.getInstance({
        Container:"container"
     
    });

    j.importDefaults({
        PaintStyle : {
        lineWidth:3,
        strokeStyle: 'rgba(241, 158, 88, 0.5)'
        },
        Connector:[ "Flowchart"],
        Anchors:["Right", "Left"],
        Endpoints : [ [ "Dot", { radius:3 } ], [ "Dot", { radius:3 } ] ],
        EndpointStyles : [{ fillStyle:"#F58020" }, { fillStyle:"#F58020" }]
    });

    j.connect({ source:'game1', target:'game9' });
    j.connect({ source:'game2', target:'game10' });
    j.connect({ source:'game3', target:'game11' });
    j.connect({ source:'game9', target:'game12' });
    j.connect({ source:'game4', target:'game12' });
    j.connect({ source:'game5', target:'game13' });
    j.connect({ source:'game6', target:'game13' });
    j.connect({ source:'game10', target:'game14' });
    j.connect({ source:'game7', target:'game14' });
    j.connect({ source:'game11', target:'game15' });
    j.connect({ source:'game8', target:'game15' });
    j.connect({ source:'game12', target:'game16' });
    j.connect({ source:'game13', target:'game16' });
    j.connect({ source:'game14', target:'game17' });
    j.connect({ source:'game15', target:'game17' });
    j.connect({ source:'game16', target:'game18' });
    j.connect({ source:'game17', target:'game18' });
});