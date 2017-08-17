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

    $scope.sortByName = function () {
        if (!$scope.sortOrder)
            $scope.sortOrder = true;
        else
            $scope.sortOrder = !$scope.sortOrder;
        $scope.m.reports.data = $scope.m.reports.data.sort(function (a, b) {
            return sort(a.firstName, b.firstName, $scope.sortOrder);
        });
    }

    $scope.sortByType = function () {
        if (!$scope.sortOrder)
            $scope.sortOrder = true;
        else
            $scope.sortOrder = !$scope.sortOrder;
        $scope.m.reports.data = $scope.m.reports.data.sort(function (a, b) {
            return sort(a.reportType, b.reportType, $scope.sortOrder);
        });
    }

    $scope.sortByDate = function () {
        if (!$scope.sortOrder)
            $scope.sortOrder = true;
        else
            $scope.sortOrder = !$scope.sortOrder;
        $scope.m.reports.data = $scope.m.reports.data.sort(function (a, b) {
            return sort(a.expectedRunDate, b.expectedRunDate, $scope.sortOrder);
        });
    }

    // $scope.m.getReport();
    function sort(a, b, order) {
        if (a === b)
            return 0;
        else if (a < b && order) {
            return - 1;
        }
        else
            return 1;
    }
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

    $scope.sortByName = function () {
        if (!$scope.sortOrder)
            $scope.sortOrder = true;
        else
            $scope.sortOrder = !$scope.sortOrder;
        $scope.m.reports = $scope.m.reports.sort(function (a, b) {
            return sort(a.firstName, b.firstName, $scope.sortOrder);
        });
    }

    $scope.sortByType = function () {
        if (!$scope.sortOrder)
            $scope.sortOrder = true;
        else
            $scope.sortOrder = !$scope.sortOrder;
        $scope.m.reports = $scope.m.reports.sort(function (a, b) {
            return sort(a.reportType, b.reportType, $scope.sortOrder);
        });
    }

    $scope.sortByDate = function () {
        if (!$scope.sortOrder)
            $scope.sortOrder = true;
        else
            $scope.sortOrder = !$scope.sortOrder;
        $scope.m.reports = $scope.m.reports.sort(function (a, b) {
            return sort(a.expectedRunDate, b.expectedRunDate, $scope.sortOrder);
        });
    }

    function sort(a, b, order) {
        if (a === b)
            return 0;
        else if (a < b && order) {
            return - 1;
        }
        else
            return 1;
    }
});
