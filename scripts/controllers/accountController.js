BinaryTattooApp.controller('accountController', function accountController($scope, $rootScope, $http, blockUI) {
    $scope.uib = {};
    $scope.uib.save = /(UserAccount\/UpdateProfile)/;
    $scope.m = {};
    var myBlockUI = blockUI.instances.get('getaccount');
    myBlockUI.start();
    $http.get($rootScope.UATurl + "UserAccount/GetProfile").then(
        function successCallback(response) {
            myBlockUI.stop();
            console.log(response.data)
            $scope.m.profile = response.data;
        },
        function erroCallback(response) {
            myBlockUI.stop();
            console.log(response.data)
        })

    $scope.m.saveChanges = function () {
        var myBlockUI = blockUI.instances.get('save');
        myBlockUI.start();
        $http.post($rootScope.UATurl + "UserAccount/UpdateProfile", $scope.m.profile).then(
            function successCallback(response) {
                myBlockUI.stop();
                console.log(response.data)
                //$scope.m.profile = response.data;
            },
            function erroCallback(response) {
                myBlockUI.stop();
                console.log(response.data)
            })
    }

    $scope.m.deleteProfile = function () {

    }
});
