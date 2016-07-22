var myApp = angular.module('myController',[]);


//------------Add todo controller---------------------

myApp.controller('addTodoController', function($scope,$http,$location) {

  // Simple Post request for updating todo
  $scope.formSubmit = function(des){
    var getData = {"des":des};
    $http({
      method: 'POST',
      data:  getData,
      headers: { 'Content-Type': 'application/json' },
      url: 'http://localhost:5000/api/addtodo'
    }).then(function (res) {
      $location.path('/');
         
      }, function (res) {
        console.log(res);
      });
	};

});

//----------Delete todo controller------------------
 
myApp.controller('deleteTodoController', function($scope,$http,$location) {

  // Simple Post request for updating todo
  $scope.deleteTodo = function(id){
    var Data = {"id":id};
    $scope.Data = Data;
    /*$http({
      method: 'POST',
      data:  Data,
      headers: { 'Content-Type': 'application/json' },
      url: 'http://localhost:3000/api/deletetodo'
    }).then(function (res) {
      $location.path('/');
         
      }, function (res) {
        console.log(res);
      });*/
  };

});