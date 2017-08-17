BinaryTattooApp.controller('viewReportController', function viewReportController($scope, $http, $rootScope, $location, $uibModal, $route, $routeParams, blockUI) {
  $scope.m = {};
  $scope.m.report;
  $scope.m.blocks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  $scope.m.overviewNumbers = {};
  $scope.m.overviewNumbers.privacySetting= [0,0,0];
  $scope.m.overviewNumbers.personalInformation= [0,0,0];
  $scope.m.overviewNumbers.identityConfusion= [0,0,0];
  $scope.m.overviewNumbers.location= [0,0,0];
  $scope.m.overviewNumbers.socialNetwork= [0,0,0];
  $scope.m.overviewNumbers.dataSecurity= [0,0,0];

  $scope.m.analyzeOverview = function() {
    angular.forEach($scope.m.report.userReportGoogleSearchItems, function(value, key) {
      angular.forEach(value.riskAssessments, function(value, key) {
        // if ()
        console.log(  $scope.m.overviewNumbers.privacySetting);
        if (!value.isDeleted) {
          if (value.privacySetting.selected) {
            switch (value.privacySetting.riskLevel) {
              case "Critical Issue":
                $scope.m.overviewNumbers.privacySetting[0]++;
              case "Potential Risk":
                $scope.m.overviewNumbers.privacySetting[1]++;
              case "Highlight":
                $scope.m.overviewNumbers.privacySetting[2]++;
            }
          }
          if (value.dataSecurity.selected) {
            switch (value.dataSecurity.riskLevel) {
              case "Critical Issue":
                $scope.m.overviewNumbers.dataSecurity[0]++;
              case "Potential Risk":
                $scope.m.overviewNumbers.dataSecurity[1]++;
              case "Highlight":
                $scope.m.overviewNumbers.dataSecurity[2]++;
            }
            // $scope.m.overviewNumbers.dataSecurity = [];
          }
          if (value.socialNetwork.selected) {
            switch (value.socialNetwork.riskLevel) {
              case "Critical Issue":
                $scope.m.overviewNumbers.socialNetwork[0]++;
              case "Potential Risk":
                $scope.m.overviewNumbers.socialNetwork[1]++;
              case "Highlight":
                $scope.m.overviewNumbers.socialNetwork[2]++;
            }
            // $scope.m.overviewNumbers.socialNetwork = [];
          }
          if (value.personalInformation.selected) {
            switch (value.personalInformation.riskLevel) {
              case "Critical Issue":
                $scope.m.overviewNumbers.personalInformation[0]++;
              case "Potential Risk":
                $scope.m.overviewNumbers.personalInformation[1]++;
              case "Highlight":
                $scope.m.overviewNumbers.personalInformation[2]++;
            }
            // $scope.m.overviewNumbers.personalInformation = [];
          }
          if (value.identityConfusion.selected) {
            switch (value.identityConfusion.riskLevel) {
              case "Critical Issue":
                $scope.m.overviewNumbers.identityConfusion[0]++;
              case "Potential Risk":
                $scope.m.overviewNumbers.identityConfusion[1]++;
              case "Highlight":
                $scope.m.overviewNumbers.identityConfusion[2]++;
            }
            // $scope.m.overviewNumbers.identityConfusion = [];
          }
          if (value.location.selected) {
            switch (value.location.riskLevel) {
              case "Critical Issue":
                $scope.m.overviewNumbers.location[0]++;
              case "Potential Risk":
                $scope.m.overviewNumbers.location[1]++;
              case "Highlight":
                $scope.m.overviewNumbers.location[2]++;
            }
            //  $scope.m.overviewNumbers.locationInformation = [];
          }
        }
      })
    })

    angular.forEach($scope.m.report.userReportGoogleImageSearchItems, function(value, key) {

    })

    angular.forEach($scope.m.report.userReportTweetsSearchItems, function(value, key) {

    })

    angular.forEach($scope.m.report.userReportTwitterUserSearchItems, function(value, key) {

    })

    angular.forEach($scope.m.report.userReportFacebookItems, function(value, key) {

    })

  }
  $scope.m.getReport = function() {
    $http.get($rootScope.UATurl + "UserReport/GetReport/" + $routeParams.reportid).then(
      function successCallback(response) {
        console.log(response.data)
        $scope.m.report = response.data;
        $scope.m.analyzeOverview();
      },
      function erroCallback(response) {
        console.log(response.data)
      })
  }

  $scope.m.init = function() {

    $scope.m.getReport();
  }

  $scope.m.init();
});
