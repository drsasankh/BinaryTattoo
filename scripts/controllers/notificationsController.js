BinaryTattooApp.controller('notificationsController', function notificationsController($scope) {
  $scope.m = {};
  $scope.m.step = 0;
  $scope.m.emailKey = 1;
  $scope.m.nickNameKey = 1;
  $scope.m.reportCollection = [];
  $scope.m.report = {};
  $scope.m.report.emailAddresses = [];
  $scope.m.report.nickNames = [];
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

  // $scope.m.report =  {
  //    "reportId": "string",
  //    "userId": "string",
  //    "reportType": "string",
  //    "firstName": "string",
  //    "lastName": "string",
  //    "ageGroup": "string",
  //    "emailAddresses": [
  //      "string"
  //    ],
  //    "employer": "string",
  //    "faceBookHandle": "string",
  //    "twitterHandle": "string",
  //    "instagramHandle": "string",
  //    "linkedInHandle": "string",
  //    "nickNames": [
  //      "string"
  //    ],
  //    "cityResidence": "string",
  //    "cityGrewIn": "string",
  //    "highSchoolAttended": "string",
  //    "postSecondaryEducation": "string",
  //    "pastEmployer": "string",
  //    "personalWebsiteURL": "string",
  //    "linkedInPage": "string",
  //    "isRecurring": true,
  //    "recurringInterval": 0,
  //    "recurringTimeFrame": 0,
  //    "expecationsWithEmployee": "string",
  //    "expecationsOutsideCompany": "string",
  //    "dateRequested": "2017-06-29T03:22:28.923Z",
  //    "dateSearched": "2017-06-29T03:22:28.923Z",
  //    "expectedRunDate": "2017-06-29T03:22:28.923Z",
  //    "dateUpdated": "2017-06-29T03:22:28.923Z",
  //    "isDeleted": true,
  //    "reportStatus": "string",
  //    "noOfCriticalIssues": 0,
  //    "noOfPotentialRisks": 0,
  //    "noOfHighlights": 0,
  //    "reportPayment": {
  //      "paymentId": "string",
  //      "approved": true,
  //      "amount": 0
  //    }
  //  }
});
