BinaryTattooApp.controller('usersController', function usersController($scope, $rootScope, $http, blockUI) {
    $scope.m = {};

    $scope.m.getUserAccount = function () {
        var myBlockUI = blockUI.instances.get('getusers');
        myBlockUI.start();
        $http.get($rootScope.UATurl + "UserAccount/GetAll").then(
            function successCallback(response) {
                myBlockUI.stop();
                console.log(response.data)
                $scope.m.users = response.data;

            },
            function erroCallback(response) {
                myBlockUI.stop();
                console.log(response.data)

            })
    }
    $scope.m.getUserAccount();


});
