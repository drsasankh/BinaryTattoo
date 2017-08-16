BinaryTattooApp.controller('loginController',
    function loginController($scope, $rootScope, $http, $location, localStorageService, blockUI) {

    $scope.m = {};
    $scope.m.step = 0;
    $scope.m.emailSubscription = true;
    
    if (localStorageService.get("token")) {
        $location.path("/");
    }
    $scope.m.login = function () {
        var myBlockUI = blockUI.instances.get('login');
        myBlockUI.start();
        
        $scope.m.loginInfo = {
            "UserName": $scope.m.email,
            "Password": $scope.m.password
        }
        //  $location.path("/")
        $http.post($rootScope.UATurl + "UserAccount/Authenticate", $scope.m.loginInfo)
            .then(function successCallback(response) {
                myBlockUI.stop();
                localStorageService.set("token", response.data.token);
                console.log(localStorageService.get("token"));
                $location.path("/");
            },
            function errorCallback(response) {
                myBlockUI.stop();
                console.log(response.data);
            }
            );
    }
    $scope.m.register = function () {

        var myBlockUI = blockUI.instances.get('register');
        myBlockUI.start();

        $scope.m.registerInfo = {
            "password": $scope.m.registrationpassword,
            "email": $scope.m.registrationemail,
            "emailSubscription": $scope.m.emailSubscription
        }
        $http.post($rootScope.UATurl + "UserAccount/Register", $scope.m.registerInfo)
            .then(function successCallback(response) {
                myBlockUI.stop();
                $scope.m.email = $scope.m.registrationemail;
                $scope.m.password = $scope.m.registrationpassword;
                $scope.m.login();
            },
            function errorCallback(response) {
                //alert(response.data);
                myBlockUI.stop();
                $scope.error = response.data;
            }
            );
    }

});
