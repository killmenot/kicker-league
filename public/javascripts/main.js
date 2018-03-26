'use strict';

$(() => {
  $('#datepicker').datetimepicker({
    format: 'L'
  });
});

angular.module('ngLeague', ['ngResource'])
.factory('Team', ['$resource', ($resource) => {
  return $resource('/api/v1/teams/:teamId', null, {
    getUsers: {
      method: 'GET',
      url: '/api/v1/teams/:teamId/users',
      isArray: true
    }
  });
}])
.controller('GameEditController', ['$scope', 'Team', ($scope, Team) => {
  $scope.homePlayers = [];
  $scope.awayPlayers = [];
  $scope.numbers = [1, 2];
  $scope.homeTeamId = '0';
  $scope.awayTeamId = '0';

  const assignHandler = {
    single,
    double
  }

  function getHomeUsers(teamId) {
    Team.getUsers({teamId: teamId}, (users) => {
      $scope.homeUsers = users;
    });
  }

  function getAwayUsers(teamId) {
    Team.getUsers({teamId: teamId}, (users) => {
      $scope.awayUsers = users;
    });
  }

  function double(index, homePlayerIds, awayPlayerIds) {
    homePlayerIds.forEach((x, i) => {
      $scope.homePlayers[index] = $scope.homePlayers[index] || []
      $scope.homePlayers[index][i] = {
        id: x
      };
    });

    awayPlayerIds.forEach((x, i) => {
      $scope.awayPlayers[index] = $scope.awayPlayers[index] || []
      $scope.awayPlayers[index][i] = {
        id: x
      };
    });
  }

  function single(index, homePlayerIds, awayPlayerIds) {
    $scope.homePlayers[index] = {
      id: homePlayerIds[0]
    };
    $scope.awayPlayers[index] = {
      id: awayPlayerIds[0]
    };
  }

  $scope.init = (homeId, awayId) => {
    const homeTeamId = parseInt(homeId, 10)
    const awayTeamId = parseInt(awayId, 10)

    if (homeTeamId) {
      $scope.homeTeamId = homeTeamId.toString();
      getHomeUsers(homeTeamId);
    }

    if (awayTeamId) {
      $scope.awayTeamId = awayTeamId.toString();
      getAwayUsers(awayTeamId);
    }
  };

  $scope.assignPlayers = (index, homeIds, awayIds, type) => {
    const homePlayerIds = homeIds.split(',').map(x => parseInt(x, 10));
    const awayPlayerIds = awayIds.split(',').map(x => parseInt(x, 10));


    assignHandler[type](index, homePlayerIds, awayPlayerIds);
  };

  $scope.$watch('homeTeamId', (newValue, oldValue) => {
    if (newValue !== oldValue) {
      getHomeUsers(newValue)
    }
  });

  $scope.$watch('awayTeamId', (newValue, oldValue) => {
    if (newValue !== oldValue) {
      getAwayUsers(newValue);
    }
  });
}]);
