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
  $scope.homeTeamId = 0;
  $scope.awayTeamId = 0;
  $scope.homeUsers = [];
  $scope.awayUsers = [];

  $scope.numbers = [1, 2];

  $scope.$watch('homeTeamId', (newValue, oldValue) => {
    if (newValue !== oldValue) {
      Team.getUsers({teamId: newValue}, (users) => {
        $scope.homeUsers = users
      });
    }
  });

  $scope.$watch('awayTeamId', (newValue, oldValue) => {
    if (newValue !== oldValue) {
      Team.getUsers({teamId: newValue}, (users) => {
        $scope.awayUsers = users
      });
    }
  });
}]);
