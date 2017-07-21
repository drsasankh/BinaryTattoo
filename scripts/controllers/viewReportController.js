BinaryTattooApp.controller('viewReportController', function viewReportController($scope, $http, $rootScope, $location, $uibModal, $route, $routeParams) {
  $scope.m = {};
  $scope.m.report;
  $scope.m.overviewNumbers = {};
  $scope.m.overviewNumbers.privacy = [];
  $scope.m.overviewNumbers.dataAndPersonal = [];
  $scope.m.overviewNumbers.identityConfusion = [];
  $scope.m.overviewNumbers.locationInformation = [];
  $scope.m.overviewNumbers.socialNetwork = [];

  $scope.m.analyzeOverview = function() {
    angular.forEach($scope.m.report.userReportGoogleSearchItems, function(value, key) {
      angular.forEach(value.riskAssessments, function(value, key) {
        if ()
        $scope.m.overviewNumbers.privacy = [];
        $scope.m.overviewNumbers.dataAndPersonal = [];
        $scope.m.overviewNumbers.identityConfusion = [];
        $scope.m.overviewNumbers.locationInformation = [];
        $scope.m.overviewNumbers.socialNetwork = [];
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
