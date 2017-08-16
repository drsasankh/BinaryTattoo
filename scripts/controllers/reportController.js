BinaryTattooApp.controller('reportController', function reportController($scope, $http, $rootScope, $location, $uibModal, $route, $routeParams) {
    $scope.m = {};
    $scope.m.report;
    $scope.m.userReportGoogleSearchItems;
    $scope.m.userReportGoogleImageSearchItems;
    $scope.m.userReportTweetsSearchItems;
    $scope.m.tempRiskAssessments = [];
    $http.get($rootScope.UATurl + "DomainValues/ReportItemFeedbackType").then(
        function successCallback(response) {
            console.log(response.data)
            $scope.m.reportItemFeedbackType = response.data;

        },
        function erroCallback(response) {
            console.log(response.data)
        })
    $scope.m.saveReport = function () {
        var myBlockUI = blockUI.instances.get('savereport');
        myBlockUI.start();
        $http.post($rootScope.UATurl + "UserReport/UpdateReport", $scope.m.report).then(
            function successCallback(response) {
                myBlockUI.stop();
                console.log(response.data)

            },
            function erroCallback(response) {
                myBlockUI.stop();
                console.log(response.data)

            })
    }
    $scope.m.publishReport = function () {
        var myBlockUI = blockUI.instances.get('savereport');
        myBlockUI.start();
        if (confirm('Are you sure to publish the report?')) {
            $scope.m.report.reportStatus = 'Complete';
            $http.post($rootScope.UATurl + "UserReport/UpdateReport", $scope.m.report).then(
                function successCallback(response) {
                    myBlockUI.stop();
                    console.log(response.data)
                    $location.path('/');
                },
                function erroCallback(response) {
                    myBlockUI.stop();
                    console.log(response.data)

                })
        }
    }
    console.log($scope.m.report)
    $scope.m.getReport = function () {
        $http.get($rootScope.UATurl + "UserReport/GetReport/" + $routeParams.reportid).then(
            function successCallback(response) {
                console.log(response.data)
                $scope.m.report = response.data;
                if ($scope.m.report.userReportProfessionalAlignment == null) {
                    $scope.m.report.userReportProfessionalAlignment = {};
                }
                if ($scope.m.report.userReportGoogleSearchItems == null || $scope.m.report.userReportGoogleSearchItems.length == 0) {
                    $scope.m.report.userReportGoogleSearchItems = [];
                    $scope.m.populateGoogleSearch();
                }
                if ($scope.m.report.userReportGoogleImageSearchItems == null || $scope.m.report.userReportGoogleImageSearchItems.length == 0) {
                    $scope.m.report.userReportGoogleImageSearchItems = [];
                    $scope.m.populateGoogleImageSearch();
                }
                if ($scope.m.report.userReportTweetsSearchItems == null || $scope.m.report.userReportTweetsSearchItems.length == 0) {
                    $scope.m.report.userReportTweetsSearchItems = [];
                    $scope.m.populateTweetSearch();
                }
                if ($scope.m.report.userReportTwitterUserSearchItems == null || $scope.m.report.userReportTwitterUserSearchItems.length == 0) {
                    $scope.m.report.userReportTwitterUserSearchItems = [];
                    $scope.m.populateTwitterSearch();
                }

            },
            function erroCallback(response) {
                console.log(response.data)
            })
    }

    $scope.m.getRiskAssessmentFor = function () {
        $http.get($rootScope.UATurl + "DomainValues/GetAssessmentFor", {
            'cache': true
        }).then(
            function successCallback(response) {
                console.log(response.data)
                $scope.m.GetAssessmentFor = response.data;
                $scope.m.selectedRiskAssessment = $scope.m.GetAssessmentFor[0].value;
            },
            function erroCallback(response) {
                console.log(response.data)
            })
    }


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


    $scope.m.getAllAssessments = function (type, index) {
        $http.get($rootScope.UATurl + "RiskAssessmentSetting/GetAll/" + $scope.m.selectedRiskAssessment).then(
            function successCallback(response) {
                console.log(response.data)
                $scope.m.ListAssessments = response.data;
                $scope.m.loadRiskData(type, index);
            },
            function erroCallback(response) {
                console.log(response.data)
            })
    }


    $scope.m.init = function () {
        $scope.m.getReport();
        $scope.m.getRiskAssessmentFor();
        //$scope.m.getAllAssessments();

    }

    $scope.m.changeTwitter = function () {
        $scope.m.report.userReportTwitterUserSearchItems = [];        
        var myBlockUI = blockUI.instances.get('changetwitter');
        myBlockUI.start();
        $scope.m.populateTwitterSearch().finally(function () {
            myBlockUI.stop();
        });
    }
    $scope.m.populateGoogleSearch = function () {

        $http.get($rootScope.UATurl + "SocialMedia/GetGoogleResults/" + $scope.m.report.firstName + " " + $scope.m.report.lastName).then(
            function successCallback(response) {
                console.log(response.data)
                $scope.m.googleSearchResults = response.data;
                angular.forEach($scope.m.googleSearchResults.items, function (value, key) {
                    var tempGoogleSearchItem = {
                        "googleImage": {
                            "title": value.title,
                            "htmlTitle": value.htmlTitle,
                            "link": value.link,
                            "snippet": value.snippet,
                            "htmlSnippet": value.htmlSnippet
                        }
                    }
                    if (key < 3)
                        $scope.m.report.userReportGoogleSearchItems.push(tempGoogleSearchItem)

                })
                console.log("afterpush")
                console.log($scope.m.report)
            },
            function erroCallback(response) {
                console.log(response.data)
            })
    }
    $scope.m.deleteGoogleSearch = function (index) {
        if (confirm('Are you sure you want to delete?')) {
            $scope.m.report.userReportGoogleSearchItems.splice(index, 1);
        }
    }
    $scope.m.populateGoogleSearchModal = function (index) {
        $scope.m.googleSearchResultsModal = {};
        return $http.get($rootScope.UATurl + "SocialMedia/GetGoogleResults/" + $scope.m.report.firstName + " " + $scope.m.report.lastName).then(
            function successCallback(response) {
                console.log(response.data)
                $scope.m.googleSearchResultsModal = response.data;

            },
            function erroCallback(response) {
                console.log(response.data)
            })

    }
    $scope.m.addGoogleSearchModal = function (result) {
        angular.forEach($scope.m.googleSearchResultsModal.items, function (value, key) {
            var tempGoogleSearchItem = {
                "googleImage": {
                    "title": value.title,
                    "htmlTitle": value.htmlTitle,
                    "link": value.link,
                    "snippet": value.snippet,
                    "htmlSnippet": value.htmlSnippet
                }
            }
            if (value.selected)
                $scope.m.report.userReportGoogleSearchItems.push(tempGoogleSearchItem)

        })
        modalInstance.dismiss('cancel');
    }
    $scope.m.populateGoogleImageSearch = function () {
        $http.get($rootScope.UATurl + "SocialMedia/GetGoogleImageResults/" + $scope.m.report.firstName + " " + $scope.m.report.lastName).then(
            function successCallback(response) {
                console.log(response.data)
                $scope.m.googleImageSearchResults = response.data;
                angular.forEach($scope.m.googleImageSearchResults.items, function (value, key) {
                    var tempGoogleSearchItem = {
                        "googleImage": {
                            "title": value.title,
                            "htmlTitle": value.htmlTitle,
                            "link": value.link,
                            "snippet": value.snippet,
                            "htmlSnippet": value.htmlSnippet,
                            "mime": value.mime,
                            "image": {
                                "contextLink": value.image.contextLink,
                                "thumbnailLink": value.image.thumbnailLink,
                                "height": value.image.height,
                                "width": value.image.width,
                                "byteSize": value.image.byteSize,
                                "thumbnailHeight": value.image.thumbnailHeight,
                                "thumbnailWidth": value.image.thumbnailWidth
                            }
                        }
                    }
                    if (key < 3)
                        $scope.m.report.userReportGoogleImageSearchItems.push(tempGoogleSearchItem)

                })

            },
            function erroCallback(response) {
                console.log(response.data)
            })
    }
    $scope.m.deleteGoogleImageSearch = function (index) {
        if (confirm('Are you sure you want to delete?')) {
            $scope.m.report.userReportGoogleImageSearchItems.splice(index, 1);
        }
    }
    $scope.m.populateGoogleImageSearchModal = function (index) {
        return $http.get($rootScope.UATurl + "SocialMedia/GetGoogleImageResults/" + $scope.m.report.firstName + " " + $scope.m.report.lastName).then(
            function successCallback(response) {
                console.log(response.data)
                $scope.m.googleImageSearchResultsModal = response.data;

            },
            function erroCallback(response) {
                console.log(response.data)
            })
    }
    $scope.m.addGoogleImageSearchModal = function (result) {
        angular.forEach($scope.m.googleImageSearchResultsModal.items, function (value, key) {
            var tempGoogleSearchItem = {
                "googleImage": {
                    "title": value.title,
                    "htmlTitle": value.htmlTitle,
                    "link": value.link,
                    "snippet": value.snippet,
                    "htmlSnippet": value.htmlSnippet
                }
            }
            if (value.selected)
                $scope.m.report.userReportGoogleImageSearchItems.push(tempGoogleSearchItem)

        })
        modalInstance.dismiss('cancel');
    }
    $scope.m.populateTwitterSearch = function () {
        return $http.get($rootScope.UATurl + "SocialMedia/GetTwitterResults/" + $scope.m.report.twitterHandle).then(
            function successCallback(response) {
                console.log(response.data)
                $scope.m.twitterResults = response.data;
                console.log("twitter");
                angular.forEach($scope.m.twitterResults, function (value, key) {
                    console.log("pushing")
                    console.log(value)
                    var str = value.profileImageUrl;
                    var res = str.replace('_normal', '');
                    var temp = {
                        "userTweet": {
                            "description": value.description,
                            "email": value.email,
                            "favouritesCount": value.favouritesCount,
                            "followersCount": value.followersCount,
                            "friendsCount": value.friendsCount,
                            "id": value.id,
                            "listedCount": value.listedCount,
                            "location": value.location,
                            "name": value.name,
                            "profileBackgroundImageUrl": value.profileBackgroundImageUrl,
                            "profileBannerUrl": value.profileBannerUrl,
                            "profileImageUrl": res,
                            "screenName": value.screenName
                        }
                    }

                    $scope.m.report.userReportTwitterUserSearchItems.push(temp);

                })


            },
            function erroCallback(response) {
                console.log(response.data)
            })
    }
    $scope.m.deleteTwitterSearch = function (index) {
        if (confirm('Are you sure you want to delete?')) {
            $scope.m.report.userReportTwitterUserSearchItems.splice(index, 1);
        }
    }
    $scope.m.populateTwitterSearchModal = function (index) {
        var myBlockUI = blockUI.instances.get('twittersearch');
        myBlockUI.start();
        $http.get($rootScope.UATurl + "SocialMedia/GetTwitterResults/" + $scope.m.twitterConfusionSearchInput).then(
            function successCallback(response) {
                myBlockUI.stop();
                console.log(response.data)
                $scope.m.twitterResultsModal = response.data;
                angular.forEach($scope.m.twitterResultsModal, function (value, key) {
                    console.log(value.profileImageUrl);
                    var str = value.profileImageUrl;
                    value.profileImageUrl = str.replace('_normal', '');
                })
                console.log("twitter");
            },
            function erroCallback(response) {
                myBlockUI.stop();
                console.log(response.data)
            })
    }
    $scope.m.addTwitterSearch = function (result) {
        angular.forEach($scope.m.twitterResultsModal, function (value, key) {

            var str = value.profileImageUrl;
            var res = str.replace('_normal', '');
            var temp = {
                "userTweet": {
                    "description": value.description,
                    "email": value.email,
                    "favouritesCount": value.favouritesCount,
                    "followersCount": value.followersCount,
                    "friendsCount": value.friendsCount,
                    "id": value.id,
                    "listedCount": value.listedCount,
                    "location": value.location,
                    "name": value.name,
                    "profileBackgroundImageUrl": value.profileBackgroundImageUrl,
                    "profileBannerUrl": value.profileBannerUrl,
                    "profileImageUrl": res,
                    "screenName": value.screenName
                }
            }
            if (value.selected)
                $scope.m.report.userReportTwitterUserSearchItems.push(temp)

        })
        modalInstance.dismiss('cancel');
    }
    $scope.m.populateTweetSearch = function () {
        $http.get($rootScope.UATurl + "SocialMedia/GetUserTweets/" + $scope.m.report.twitterHandle).then(
            function successCallback(response) {
                console.log(response.data)
                $scope.m.tweetResults = response.data;
                angular.forEach($scope.m.tweetResults, function (value, key) {
                    var temp = {
                        "userTweet": {
                            "id": value.id,
                            "source": value.source,
                            "text": value.text,
                            "language": value.language,
                            "fullText": value.fullText,
                            "retweetCount": value.retweetCount,
                            "isRetweeted": value.isRetweeted,
                            "urls": value.urls
                        }
                    }

                    if (key < 3)
                        $scope.m.report.userReportTweetsSearchItems.push(temp)

                })

                console.log("afterpush")
                console.log($scope.m.report)
            },
            function erroCallback(response) {
                console.log(response.data)
            })
    }
    $scope.m.deleteTweetSearch = function (index) {
        if (confirm('Are you sure you want to delete?')) {
            $scope.m.report.userReportTweetsSearchItems.splice(index, 1);
        }
    }
    $scope.m.populateTweetSearchhModal = function (index) {
        return $http.get($rootScope.UATurl + "SocialMedia/GetUserTweets/" + $scope.m.report.twitterHandle).then(
            function successCallback(response) {
                console.log(response.data)
                $scope.m.tweetResultsModal = response.data;

            },
            function erroCallback(response) {
                console.log(response.data)
            })

    }
    $scope.m.addTweetSearch = function (result) {
        angular.forEach($scope.m.tweetResultsModal, function (value, key) {
            var temp = {
                "userTweet": {
                    "id": value.id,
                    "source": value.source,
                    "text": value.text,
                    "language": value.language,
                    "fullText": value.fullText,
                    "retweetCount": value.retweetCount,
                    "isRetweeted": value.isRetweeted,
                    "urls": value.urls
                }
            }

            if (value.selected)
                $scope.m.report.userReportTweetsSearchItems.push(temp)

        })

        modalInstance.dismiss('cancel');
    }
    $scope.m.init();
    var modalInstance;
    $scope.m.openGoogleSearchModal = function () {
        modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'googleModal.html',

            size: 'lg',
            scope: $scope,
            resolve: {
                items: function () {
                    return $scope.values;
                }
            }
        });
        
        var myBlockUI = blockUI.instances.get('googlesearch');
        myBlockUI.start();
        $scope.m.populateGoogleSearchModal().finally(function () {
            myBlockUI.stop();
        });
        
    }
    $scope.m.openGoogleImageSearchModal = function () {
        modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'googleImageModal.html',

            size: 'lg',
            scope: $scope,
            resolve: {
                items: function () {
                    return $scope.values;
                }
            }
        });

        var myBlockUI = blockUI.instances.get('googlesearchimage');
        myBlockUI.start();
        $scope.m.populateGoogleImageSearchModal().finally(function () {
            myBlockUI.stop();
        });
        
    }
    $scope.m.openConfusionTwitterModal = function () {
        modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'twitterModal.html',

            size: 'lg',
            scope: $scope,
            resolve: {
                items: function () {
                    return $scope.values;
                }
            }
        });
    }
    $scope.m.openTweetModal = function () {
        modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'tweetModal.html',

            size: 'lg',
            scope: $scope,
            resolve: {
                items: function () {
                    return $scope.values;
                }
            }
        });

        var myBlockUI = blockUI.instances.get('openTweetModal');
        myBlockUI.start();
        $scope.m.populateTweetSearchhModal().finally(function () {
            myBlockUI.stop();
        });
    }
    $scope.m.cancel = function () {
        modalInstance.dismiss('cancel');
        $scope.m.type = '';
        $scope.m.index = null;
    };

    $scope.m.addRiskAssessmentModal = function (type, index) {
        $scope.m.tempRiskAssessments = [];
        modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'addRiskAssessmentModal.html',
            size: 'lg',
            scope: $scope,
            resolve: {
                items: function () {
                    return $scope.values;
                }
            }

        });
        $scope.m.type = type;
        $scope.m.index = index;
        $scope.m.getAllAssessments(type, index);
        //  $scope.m.populateTweetSearchhModal();
    }


    $scope.$watch('m.selectedRiskAssessment', function (newValue, oldValue) {
        $scope.m.getAllAssessments();
        //$scope.m.selectedRiskAssessment == null
        $scope.m.checkRiskChanges();
    })

    $scope.m.checkRiskChanges = function (input) {
        var found = false;
        console.log($scope.m.ListAssessments)
        angular.forEach($scope.m.ListAssessments, function (value, key) {
            //    console.log('looping ' + key)
            //  console.log(value)
            if (value.selected) {
                if ($scope.m.tempRiskAssessments.length == 0) {
                    console.log('PUSHED')
                    $scope.m.tempRiskAssessments.push(value);
                } else {

                    angular.forEach($scope.m.tempRiskAssessments, function (newValue, key) {
                        if (newValue.assessmentId == value.assessmentId) {
                            console.log('sending in assessmentID' + value.assessmentID)
                            console.log('values in assessmentID' + newValue.assessmentID)
                            console.log('overwritten')
                            $scope.m.tempRiskAssessments[key] = value;
                            found = true;
                        }
                    })
                    if (!found) {
                        console.log('PUSHED')
                        $scope.m.tempRiskAssessments.push(value);

                    }
                }


                console.log('tempriskitems:');
                console.log($scope.m.tempRiskAssessments);
            }
            found = false;
        })
    }

    $scope.m.loadRiskData = function (type) {
        angular.forEach($scope.m.ListAssessments, function (value, key) {
            // console.log(value);
            //   console.log(key);
            //   //  console.log($scope.m.ListAssessments[key]);
            angular.forEach($scope.m.tempRiskAssessments, function (newValue, newkey) {

                if (value.assessmentId == newValue.assessmentId) {
                    $scope.m.ListAssessments[key] = $scope.m.tempRiskAssessments[newkey];
                }
            })
        })
    }
    $scope.m.saveRiskData = function (type, index) {
        $scope.m.checkRiskChanges();
        console.log('tempriskass')
        console.log($scope.m.tempRiskAssessments)
        angular.forEach($scope.m.tempRiskAssessments, function (value, key) {
            if (!value.selected)
                $scope.m.tempRiskAssessments.splice(key, 1);
        })
        if (type == 'google') {
            $scope.m.report.userReportGoogleSearchItems[index].riskAssessments = $scope.m.tempRiskAssessments;
        }
        if (type == 'googleImage') {

            $scope.m.report.userReportGoogleImageSearchItems[index].riskAssessments = $scope.m.tempRiskAssessments;
        }
        if (type == 'twitter') {

            $scope.m.report.userReportTwitterUserSearchItems[index].riskAssessments = $scope.m.tempRiskAssessments;
        }
        if (type == 'tweet') {

            $scope.m.report.userReportTweetsSearchItems[index].riskAssessments = $scope.m.tempRiskAssessments;
        }
        if (type == 'facebook') {

            $scope.m.report.userReportFacebookItems[index].riskAssessments = $scope.m.tempRiskAssessments;
        }
        //  $scope.m.saveReport();
        modalInstance.dismiss('cancel');
        $scope.m.tempRiskAssessments = [];
        $scope.m.type = '';
        $scope.m.index = null;
        console.log($scope.m.report)
    }

    $scope.m.editRiskAssessmentModal = function (type, index) {
        $scope.m.tempRiskAssessments = [];
        if (type == 'google') {

            console.log('google')
            $scope.m.tempRiskAssessments = $scope.m.report.userReportGoogleSearchItems[index].riskAssessments;
        }
        if (type == 'googleImage') {

            $scope.m.tempRiskAssessments = $scope.m.report.userReportGoogleImageSearchItems[index].riskAssessments;
        }
        if (type == 'twitter') {

            $scope.m.tempRiskAssessments = $scope.m.report.userReportTwitterUserSearchItems[index].riskAssessments;
        }
        if (type == 'tweet') {

            $scope.m.tempRiskAssessments = $scope.m.report.userReportTweetsSearchItems[index].riskAssessments;
        }
        if (type == 'facebook') {
            $scope.m.tempRiskAssessments = $scope.m.report.userReportFacebookItems[index].riskAssessments;
        }
        console.log('started')
        console.log($scope.m.tempRiskAssessments);
        angular.forEach($scope.m.tempRiskAssessments, function (value, key) {
            value.selected = true
        })
        modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'addRiskAssessmentModal.html',
            size: 'lg',
            scope: $scope,
            resolve: {
                items: function () {
                    return $scope.values;
                }
            }

        });
        $scope.m.type = type;
        $scope.m.index = index;
        $scope.m.getAllAssessments(type, index);
    }
    $scope.m.deleteRiskAssessmentModal = function (type, index) {
        if (confirm('Are you sure you wish to delete all?')) {
            if (type == 'google') {
                console.log('google')
                $scope.m.report.userReportGoogleSearchItems[index].riskAssessments = [];
            }
            if (type == 'googleImage') {

                $scope.m.report.userReportGoogleImageSearchItems[index].riskAssessments = [];
            }
            if (type == 'twitter') {

                $scope.m.report.userReportTwitterUserSearchItems[index].riskAssessments = [];
            }
            if (type == 'tweet') {

                $scope.m.report.userReportTweetsSearchItems[index].riskAssessments = [];
            }
            if (type == 'facebook') {
                $scope.m.report.userReportFacebookItems[index].riskAssessments = [];
            }
        }
    }

    // $scope.m.getReport();
    //
    // $ctrl.open = function (size, parentSelector) {
    //  var parentElem = parentSelector ?
    //    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    //  var modalInstance = $uibModal.open({
    //    animation: $ctrl.animationsEnabled,
    //    ariaLabelledBy: 'modal-title',
    //    ariaDescribedBy: 'modal-body',
    //    templateUrl: 'myModalContent.html',
    //    controller: 'ModalInstanceCtrl',
    //    controllerAs: '$ctrl',
    //    size: size,
    //    appendTo: parentElem,
    //    resolve: {
    //      items: function () {
    //        return $ctrl.items;
    //      }
    //    }
    //  });
});
