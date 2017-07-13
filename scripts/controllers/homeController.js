BinaryTattooApp.controller('homeController', function homeController($scope, $http, $rootScope, $location, localStorageService) {
  $scope.m = {};
  $scope.m.newReport = false;
  $scope.m.reportType = null;
  $scope.m.step = 0;
  $scope.m.emailKey = 1;
  $scope.m.nickNameKey = 1;
  $scope.m.reportCollection = [];
  $scope.m.report = {};
  $scope.m.Reports = {};
  $scope.m.report.emailAddresses = [];
  $scope.m.report.nickNames = [];


  $scope.m.requestNewReport = function() {
    $scope.m.newReport = true;
    $scope.m.reportType = null;
  }
  $scope.m.getPublishedReport = function() {
    var params = {
      "pageSize": 0,
      "pageNo": 0,
      "sortedBy": "string",
      "sortOrder": "string",
      "showAll": true
    }
    $http.post($rootScope.UATurl + "UserReport/GetMyPublishedReports", params).then(
      function successCallback(response) {
        //console.log(response.data)
        $scope.m.publishedReports = response.data;

      },
      function erroCallback(response) {
        console.log(response.data)

      }
    )
  }
  $scope.m.getPendingReport = function() {
    var params = {
      "pageSize": 0,
      "pageNo": 0,
      "sortedBy": "string",
      "sortOrder": "string",
      "showAll": true
    }
    $http.post($rootScope.UATurl + "UserReport/GetMyPendingReports", params).then(
      function successCallback(response) {
        console.log(response.data);
        $scope.m.Reports = response.data.data;

      },
      function erroCallback(response) {
        console.log(response.data)

      }
    )
  }

  $scope.m.init = function() {
    $scope.m.getPendingReport();
    $scope.m.getPublishedReport();
  }

  $scope.m.init();

  $scope.m.requestReport = function(reportType) {

    if (confirm('Popup modal for payment')) {


      if (reportType == "Standard") {

        $http.post($rootScope.UATurl + "UserReport/RequestStandardReport", $scope.m.report).then(
          function successCallback(response) {
            console.log(response.data);


            $scope.m.init();
            $scope.m.newReport = false;
            $scope.m.reportType = null;
          },
          function erroCallback(response) {
            console.log(response.data)

          })

      }

      if (reportType == "Detailed") {

        $http.post($rootScope.UATurl + "UserReport/RequestDetailedReport", $scope.m.report).then(
          function successCallback(response) {
            console.log(response.data);


            $scope.m.init();
            $scope.m.newReport = false;
            $scope.m.reportType = null;
          },
          function erroCallback(response) {
            console.log(response.data)

          })

      }

      if (reportType == "Professional") {
        $http.post($rootScope.UATurl + "UserReport/RequestProfessionalReport", $scope.m.report).then(
          function successCallback(response) {
            console.log(response.data);

            $scope.m.init();

            $scope.m.newReport = false;
            $scope.m.reportType = null;
          },
          function erroCallback(response) {
            console.log(response.data)

          })
      }

    }
  }

  $scope.m.report.createEmail = function(n) {
    var array = [];
    for (var i = 0; i < n; i++)
      array.push(i);
    return array;
  };

  $scope.m.report.deleteEmail = function(n) {
    $scope.m.emailKey--;
    $scope.m.report.emailAddresses.splice(n, 1);
    $scope.m.report.createEmail($scope.m.emailKey);
  }

  $scope.m.report.createNickname = function(n) {
    var array = [];
    for (var i = 0; i < n; i++)
      array.push(i);
    return array;
  };

  $scope.m.report.deleteNickname = function(n) {
    $scope.m.nickNameKey--;
    $scope.m.report.nickNames.splice(n, 1);
    $scope.m.report.createNickname($scope.m.nickNameKey);
  }
  // 
  // $scope.m.gotoReport = function(report) {
  //   //  $rootScope.report = report;
  //   localStorageService.set("report", report);
  //   console.log(localStorageService.get("report"));
  //   $location.path('/report/1');
  // }


  $scope.m.deleteReport = function(reportId) {
    if (confirm('Are you sure you want to delete the report?')) {

      $http.post($rootScope.UATurl + "UserReport/Delete/" + reportId).then(
        function successCallback(response) {
          console.log(response.data)
          $scope.m.init();
        //  $scope.m.publishedReports = response.data;

        },
        function erroCallback(response) {
          console.log(response.data)

        }
      )
    }
  }
});
