// A simple module with no dependencies
angular.module("mainModule", ['ngRoute','myController'])
  .controller("todoController", function ($scope,$http,$location)
  {

    // Simple Post request for updating todo
    $scope.deleteTodo = function(id){
      var Data = {"id":id};
      $http({
        method: 'POST',
        data:  Data,
        headers: { 'Content-Type': 'application/json' },
        url: 'https://test-demom.herokuapp.com/api/deletetodo'
      }).then(function (res) {
           $location.path('/');
        }, function (res) {
          console.log(res);
        });
    };

    // Simple GET request example:
    $http({
      method: 'GET',
      url: 'https://test-demom.herokuapp.com/api/alltodo'
    }).then(function successCallback(res) {
        //console.log(response.data);
         $scope.allData = res.data;
      }, function errorCallback(res) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

  })
  .config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'templates/todo.html',
        controller: 'todoController'
      }).
      when('/addtodo', {
        templateUrl: 'templates/addtodo.html',
        controller: 'addTodoController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);