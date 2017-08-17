BinaryTattooApp.controller('userAccountsController', function userAccountsController($scope, $http, $rootScope, blockUI) {
    $scope.m = {};

    $http.get($rootScope.UATurl + "DomainValues/GetUserRoles").then(
        function successCallback(response) {
            //console.log(response.data)
            $scope.m.userRoles = response.data;

        },
        function erroCallback(response) {
            console.log(response.data)

        })
    $scope.m.getUserAccount = function () {
        
        var myBlockUI = blockUI.instances.get('getuseraccounts');
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


    $scope.m.saveUserAccount = function (user) {
        console.log(user);
        $scope.m.saveUser = {
            "userId": user.userId,
            "userType": user.userType
        }

        var myBlockUI = blockUI.instances.get('saveuseraccount');
        myBlockUI.start();
        $http.post($rootScope.UATurl + "UserAccount/ChangeUserRole", $scope.m.saveUser).then(
            function successCallback(response) {
                myBlockUI.stop();
                console.log(response.data)

            },
            function erroCallback(response) {
                myBlockUI.stop();
                console.log(response.data)

            })
    }


    $scope.m.getUserAccount();

    $scope.m.getFilteredAccounts = function () {
        console.log(!$scope.m.users);
        if (!$scope.m.users)
            return [];
        return $scope.m.users.filter(function (a) {
            return !$scope.searchText || (a.email && a.email.toLowerCase().includes($scope.searchText.toLowerCase()))
        }) || [];
    };

});
