BinaryTattooApp.controller('accountController', function accountController($scope,$rootScope,$http) {
  $scope.m = {};
  $http.get($rootScope.UATurl + "UserAccount/GetProfile").then(
    function successCallback(response) {
      console.log(response.data)
      $scope.m.profile = response.data;
    },
    function erroCallback(response) {
      console.log(response.data)
    })

    $scope.m.saveChanges = function() {
      $http.post($rootScope.UATurl + "UserAccount/UpdateProfile", $scope.m.profile).then(
        function successCallback(response) {
          console.log(response.data)
          //$scope.m.profile = response.data;
        },
        function erroCallback(response) {
          console.log(response.data)
        })
    }

    $scope.m.deleteProfile = function() {
      
    }
});
