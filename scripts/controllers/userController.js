BinaryTattooApp.controller('usersController', function usersController($scope, $rootScope, $http, blockUI) {
  $scope.m = {};

  $scope.m.getUserAccount = function() {
    $http.get($rootScope.UATurl + "UserAccount/GetAll").then(
      function successCallback(response) {
        console.log(response.data)
        $scope.m.users = response.data;

      },
      function erroCallback(response) {
        console.log(response.data)

      })
  }
  $scope.m.getUserAccount();


});
