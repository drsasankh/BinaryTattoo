var BinaryTattooApp = angular.module('BinaryTattooApp', ['ngRoute', 'LocalStorageModule', 'ui.bootstrap']);

BinaryTattooApp.controller('mainController', function mainController($scope, localStorageService, $location, $route) {
  $scope.m = {};
  $scope.m.step = 0;
  $scope.$route = $route;

  $scope.$on('$routeChangeStart', function(next, current) {
    if (!localStorageService.get("token")) {
      $location.path('/login');
    }
  })
  $scope.$on('$routeChangeSuccess', function(next, current) {
    window.scrollTo(0, 0);

    if (current.controller == "loginController") {
      $scope.m.viewbackground = "logged-out-background";
    } else $scope.m.viewbackground = "logged-in-background";
  })
  $scope.logout = function() {
    localStorageService.clearAll();
    $location.path('/login');
  }

});

BinaryTattooApp.run(function($rootScope, localStorageService, $location) {
  $rootScope.UATurl = "http://sangeet302.ddns.net/api/";

  $rootScope.ageGroup = [
    'Less than 13', '13-17', '18-24', '25-34', '35-44', '45-64', '65+'
  ]

  $rootScope.goto = function(path) {
    $location.path(path);
  }
})

BinaryTattooApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html',
      controller: 'homeController',
      activetab: 'home'
    })
    .when('/login', {
      templateUrl: 'templates/login.html',
      controller: 'loginController',
      activetab: 'login'
    })
    .when('/business', {
      templateUrl: 'templates/login.html',
      controller: 'loginController',
      activetab: 'business'
    })
    .when('/account', {
      templateUrl: 'templates/account.html',
      controller: 'accountController',
      activetab: 'account'
    })
    .when('/admin', {
      templateUrl: 'templates/admin.html',
      controller: 'adminController',
      activetab: 'admin'
    })
    .when('/report/:reportid', {
      templateUrl: 'templates/report.html',
      controller: 'reportController',
      activetab: 'home'
    })
    .when('/view-report/:reportid', {
      templateUrl: 'templates/view-report.html',
      controller: 'viewReportController',
      activetab: 'home'
    })


  // if (window.history && window.history.pushState) {
  //   $locationProvider.html5Mode({
  //     enabled: true,
  //     requireBase: false
  //   });
  // }

}]);
BinaryTattooApp.factory('$debounce', function($timeout, $q) {
  return function(func, wait, immediate) {
    var timeout;
    var deferred = $q.defer();
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) {
          deferred.resolve(func.apply(context, args));
          deferred = $q.defer();
        }
      };
      var callNow = immediate && !timeout;
      if (timeout) {
        $timeout.cancel(timeout);
      }
      timeout = $timeout(later, wait);
      if (callNow) {
        deferred.resolve(func.apply(context, args));
        deferred = $q.defer();
      }
      return deferred.promise;
    };
  };
});

BinaryTattooApp.config([
  "$httpProvider",
  function($httpProvider) {

    $httpProvider.interceptors.push(function($q, $location, localStorageService) {
      return {
        'request': function(config) {
          config.headers = config.headers || {};
          var token = localStorageService.get("token");
          if (token) {
            config.headers.Authorization = 'Bearer ' + token;
          }
          return config;
        },
        'responseError': function(response) {
          if (response.status === 401 || response.status === 403) {
            localStorageService.clearAll()
            $location.path('/login');
          }
          return $q.reject(response);
        }
      };
    });
  }
])

BinaryTattooApp.config(['$qProvider', function($qProvider) {
  $qProvider.errorOnUnhandledRejections(false);
}]);

BinaryTattooApp.directive('uibModalWindow', function(){
  return {
    restrict: 'EA',
    link: function(scope, element) {
      $(".modal-dialog").draggable();
    }
  }
})

.directive('stopEvent', function () {
      return {
          restrict: 'A',
          link: function (scope, element, attr) {
              if(attr && attr.stopEvent)
                  element.bind(attr.stopEvent, function (e) {
                      e.stopPropagation();
                  });
          }
      };
   });
