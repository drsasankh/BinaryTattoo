BinaryTattooApp.controller('pendingReportsController', function pendingReportsController($scope, $http, $rootScope) {
  $scope.m = {};

  $scope.m.getReport = function() {
    var params = {
      "pageSize": 0,
      "pageNo": 0,
      "sortedBy": "string",
      "sortOrder": "string",
      "showAll": true
    }
    $http.post($rootScope.UATurl + "UserReport/GetPendingReports", params).then(
      function successCallback(response) {
        //console.log(response.data)
        $scope.m.reports = response.data;

      },
      function erroCallback(response) {
        console.log(response.data)

      })

  }
  $scope.m.init = function() {
    $scope.m.getReport();
  }

  $scope.m.init();

  // $scope.m.getReport();
});


BinaryTattooApp.controller('publishedReportsController', function publishedReportsController($scope, $http, $rootScope) {
  $scope.m = {};

  $scope.m.getReport = function() {
    var params = {
      "pageSize": 0,
      "pageNo": 0,
      "sortedBy": "string",
      "sortOrder": "string",
      "showAll": true
    }
    $http.post($rootScope.UATurl + "UserReport/GetPublishedReports", params).then(
      function successCallback(response) {
        //console.log(response.data)
        $scope.m.reports = response.data.data;

      },
      function erroCallback(response) {
        console.log(response.data)

      })

  }
  $scope.m.init = function() {
    $scope.m.getReport();
  }

  $scope.m.init();
  // $scope.m.getReport();
});
