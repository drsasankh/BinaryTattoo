BinaryTattooApp.controller('pendingReportsController', function pendingReportsController($scope, $http, $rootScope, blockUI) {
    $scope.m = {};
    $scope.m.getReport = function () {
        var params = {
            "pageSize": 0,
            "pageNo": 0,
            "sortedBy": "string",
            "sortOrder": "string",
            "showAll": true
        }
        var myBlockUI = blockUI.instances.get('getpendingreports');
        myBlockUI.start();
        $http.post($rootScope.UATurl + "UserReport/GetPendingReports", params).then(
            function successCallback(response) {
                //console.log(response.data)
                myBlockUI.stop();
                $scope.m.reports = response.data;

            },
            function erroCallback(response) {
                myBlockUI.stop();
                console.log(response.data)

            });

    }
    $scope.m.init = function () {
        $scope.m.getReport();
    }

    $scope.m.init();

    $scope.m.getFilteredData = function () {
        if (!$scope.m.reports)
            return [];
        return $scope.m.reports.data.filter(function (a) { return !$scope.searchText || (a.firstName && a.firstName.toLowerCase().includes($scope.searchText.toLowerCase())) }) || [];
    };

    // $scope.m.getReport();
});


BinaryTattooApp.controller('publishedReportsController', function publishedReportsController($scope, $http, $rootScope, blockUI) {
    $scope.m = {};

    $scope.m.getReport = function () {
        var params = {
            "pageSize": 0,
            "pageNo": 0,
            "sortedBy": "string",
            "sortOrder": "string",
            "showAll": true
        }


        var myBlockUI = blockUI.instances.get('getpublishedreports');
        myBlockUI.start();
        $http.post($rootScope.UATurl + "UserReport/GetPublishedReports", params).then(
            function successCallback(response) {
                //console.log(response.data)
                myBlockUI.stop();
                $scope.m.reports = response.data.data;

            },
            function erroCallback(response) {
                myBlockUI.stop();
                console.log(response.data)

            })

    }
    $scope.m.init = function () {
        $scope.m.getReport();
    }

    $scope.m.init();
    // $scope.m.getReport();

    $scope.m.getFilteredData = function () {
        if (!$scope.m.reports)
            return [];
        return $scope.m.reports.filter(function (a) {
            return !$scope.searchText || (a.firstName && a.firstName.toLowerCase().includes($scope.searchText.toLowerCase()))
        }) || [];
    };
});
