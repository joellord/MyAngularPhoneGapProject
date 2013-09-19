var app = angular.module("app", []).config(function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login.html',
        controller: 'LoginController'
    });
    
    $routeProvider.when('/home', {
        templateUrl: 'home.html',
        controller: 'HomeController'
    });
    
    $routeProvider.otherwise({redirectTo: '/login'});
});

app.factory("AuthenticationService", function($location) {
    return {
        login: function(credentials) {
            if(credentials.username === "ralph") {
                if(navigator === undefined) {
                    alert("Navigator is undefined");
                }
                navigator.notification.vibrate(1000);
                navigator.notification.beep(3);
                setTimeout(function() {
                    navigator.notification.alert("Wake Up !");
                }, 10000);
                $location.path('/home');
            }
        },
        logout: function() {
            $location.path('/login');
        }
    };
});


app.controller('LoginController', function($scope, AuthenticationService) {
    $scope.credentials = {username: "", password: ""};
    
    $scope.login = function() {
        AuthenticationService.login($scope.credentials);
    }
});

app.controller('HomeController', function($scope, AuthenticationService) {
    $scope.title = "Home";
    $scope.message = "Mouse over these images to see a directive at work.";
    
    $scope.logout = function() {
        AuthenticationService.logout();
    }
});

app.directive('showsMessageWhenHovered', function() {
    return {
        restrict: "A",      //A=Attribute, C=Class name, E=Element <superman></superman>, M=HTML Comment
        link: function(scope, element, attributes) {
            var originalMessage = scope.message;
            element.bind('mouseover', function() {
                scope.message = attributes.message;
                scope.$apply();
            });
            element.bind('mouseout', function() {
                scope.message = originalMessage;
                scope.$apply();
            });
        }
    };
});
