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

    $scope.m.getFilteredUsers = function () {
        console.log(!$scope.m.users);
        if (!$scope.m.users)
            return [];
        return $scope.m.users.filter(function (a) {
            return !$scope.searchText || (a.email && a.email.toLowerCase().includes($scope.searchText.toLowerCase()))
        }) || [];
    };

    $scope.sort = function (propName) {
        if (!$scope.sortOrder)
            $scope.sortOrder = true;
        else
            $scope.sortOrder = !$scope.sortOrder;
        $scope.m.users = $scope.m.users.sort(function (a, b) {
            return sort(a[propName], b[propName], $scope.sortOrder);
        });
    }

    function sort(a, b, order) {
        if (a && b && a.toLowerCase && b.toLowerCase) {
            a = a.toLowerCase();
            b = b.toLowerCase();
        }
        if (a === b)
            ret = 0;
        else if (a < b) {
            ret = order ? - 1 : 1;
        }
        else
            ret = order ? 1 : -1;

        //console.log(a + ' ' + b + ' ' + order + ' ' + ret);
        return ret;
    }
});
