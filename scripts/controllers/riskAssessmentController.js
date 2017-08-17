BinaryTattooApp.controller('riskAssessmentsController', function riskAssessmentsController($scope, $rootScope, $http, $debounce, blockUI) {
    $scope.m = {};
    $scope.m.selectedGetAssessmentFor = null;
    $scope.m.assessment = {}

    var myBlockUI = blockUI.instances.get('getriskassessment');
    myBlockUI.start();

    $http.get($rootScope.UATurl + "DomainValues/GetAssessmentFor").then(
        function successCallback(response) {
            console.log(response.data)
            $scope.m.GetAssessmentFor = response.data;
            $scope.m.selectedGetAssessmentFor = $scope.m.GetAssessmentFor[0].value;
        },
        function erroCallback(response) {
            console.log(response.data)
        })
    $http.get($rootScope.UATurl + "DomainValues/GetAssessmentPointType").then(
        function successCallback(response) {
            console.log(response.data)
            $scope.m.GetAssessmentPointType = response.data;
        },
        function erroCallback(response) {
            console.log(response.data)
        })
    $http.get($rootScope.UATurl + "DomainValues/GetAssessmentPointRiskLevels").then(
        function successCallback(response) {
            console.log(response.data)
            $scope.m.GetAssessmentPointRiskLevels = response.data;
        },
        function erroCallback(response) {
            console.log(response.data)
        })
    myBlockUI.stop();

    $scope.m.getAllAssessments = function () {
        
        var myBlockUI = blockUI.instances.get('getriskassessment');
        myBlockUI.start();
        $http.get($rootScope.UATurl + "RiskAssessmentSetting/GetAll/" + $scope.m.selectedGetAssessmentFor).then(
            function successCallback(response) {
                //  console.log("all assessments" + response.data)
                myBlockUI.stop();
                $scope.m.ListAssessments = response.data;
            },
            function erroCallback(response) {
                myBlockUI.stop();
                console.log(response.data)
            })
    }


    $scope.m.UpdateAssessment = function () {
        console.log('update');
        // $http.post($rootScope.UATurl + "RiskAssessmentSetting/Update", $scope.m.assessment).then(
        //   function successCallback(response) {
        //     console.log(response.data)
        //
        //     //$scope.m.ListAssessments = response.data;
        //     $scope.m.selectedRiskAssessment = response.data.data.assessmentId;
        //     alert($scope.m.selectedRiskAssessment)
        //     $scope.m.getAllAssessments();
        //   },
        //   function erroCallback(response) {
        //     console.log(response.data)
        //   })
    }

    $scope.$watch('m.selectedGetAssessmentFor', function (newValue, oldValue) {
        $scope.m.getAllAssessments();
        $scope.m.selectedRiskAssessment == null
    })

    $scope.$watch('m.ListAssessments', function (newValue, oldValue) {
        if ($scope.m.selectedRiskAssessment != null)
            console.log('change!' + $scope.m.selectedRiskAssessment)
        angular.forEach(newValue, function (value, key) {
            if ($scope.m.selectedRiskAssessment == value.assessmentId) {
                console.log(value);
                console.log('found!')
                $http.post($rootScope.UATurl + "RiskAssessmentSetting/Update", value).then(
                    function successCallback(response) {
                        console.log(response.data)

                        //$scope.m.ListAssessments = response.data;
                        // $scope.m.selectedRiskAssessment = response.data.data.assessmentId;
                        // alert($scope.m.selectedRiskAssessment)
                        // $scope.m.getAllAssessments();
                    },
                    function erroCallback(response) {
                        console.log(response.data)
                    })
            }

        })
    }, true)

    $scope.m.addRiskAssessment = function () {
        $scope.m.assessment = {
            "assessmentFor": $scope.m.selectedGetAssessmentFor
        }

        var myBlockUI = blockUI.instances.get('addRiskAssessment');
        myBlockUI.start();
        $http.post($rootScope.UATurl + "RiskAssessmentSetting/Update", $scope.m.assessment).then(
            function successCallback(response) {
                myBlockUI.stop();
                console.log(response.data)

                //$scope.m.ListAssessments = response.data;
                $scope.m.selectedRiskAssessment = response.data.data.assessmentId;
                //  alert($scope.m.selectedRiskAssessment)
                $scope.m.getAllAssessments();
            },
            function erroCallback(response) {
                myBlockUI.stop();
                console.log(response.data)
            })

    }


    $scope.m.deleteRiskAssessment = function (assessmentId) {
        $scope.m.assessment = {
            "assessmentId": assessmentId,
            "isDeleted": true
        }

        var myBlockUI = blockUI.instances.get('deleteRiskAssessment');
        myBlockUI.start();
        console.log($scope.m.assessment)
        if (confirm('Are you sure you want to delete this?')) {
            $http.post($rootScope.UATurl + "RiskAssessmentSetting/delete/" + assessmentId).then(
                function successCallback(response) {
                    myBlockUI.stop();
                    console.log("all assessments")
                    console.log(response.data)
                    //$scope.m.ListAssessments = response.data;

                    $scope.m.getAllAssessments();
                    if ($scope.m.ListAssessments.length > 0)
                        $scope.m.selectedRiskAssessment = $scope.m.ListAssessments[0].assessmentId;

                },
                function erroCallback(response) {
                    myBlockUI.stop();
                    console.log(response.data)
                })

        }

    }

    //
    //
    // $http.post($rootScope.UATurl + "RiskAssessmentSetting/Update",  $scope.m.assessment).then(
    //   function successCallback(response) {
    //     console.log("all assessments" + response.data)
    //     $scope.m.ListAssessments = response.data;
    //   },
    //   function erroCallback(response) {
    //     console.log(response.data)
    //   })
    //

});
