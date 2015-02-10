/**
 * angular-sofa-full-page-view - v0.1.0 - Tue Feb 10 2015 15:07:13 GMT+0100 (CET)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (angular) {
angular.module('sofa-full-page-view.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('sofa-full-page-view.tpl.html',
    '<div class="sofa-full-page-view" ng-class="{\'sofa-full-page-view--active\': active}">\n' +
    '    <button class="sofa-full-page-view__close" ng-click="closeFullPageView($event)"></button>\n' +
    '    <div class="sofa-full-page-view__content" ng-transclude></div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('sofa.fullPageView', ['sofa-full-page-view.tpl.html'])

    .directive('sofaFullPageView', function () {

        'use strict';

        return {
            restrict: 'E',
            controller: function () {

            },
            link: function ($scope, $element, attrs) {
                var onOpen  = $scope.$eval(attrs.onOpen);
                var onClose = $scope.$eval(attrs.onClose);

                $scope.openFullPageView = function (e) {
                    e.preventDefault();
                    if (angular.isFunction(onOpen)) {
                        onOpen($scope);
                    }
                    $scope.active = true;
                };
                $scope.closeFullPageView = function (e) {
                    e.preventDefault();
                    if (angular.isFunction(onClose)) {
                        onClose($scope);
                    }
                    $scope.active = false;
                };

                $scope.$on('$destroy', function () {
                    $scope.cloneElement.remove();
                });
            }
        };
    })
    .directive('sofaFullPageViewClone', ['$window', function ($window) {
        'use strict';

        return {
            restrict: 'E',
            require: '^sofaFullPageView',
            replace: true,
            transclude: true,
            templateUrl: 'sofa-full-page-view.tpl.html',
            compile: function () {
                return function ($scope, $element) {
                    angular.element($window.document.body).prepend($element);
                    $scope.active = false;
                    $scope.cloneElement = $element;
                    $element.css('height', $window.innerHeight + 'px');

                    // orientationchange will not work for android, so we use the resize event
                    $window.addEventListener('resize', function () {
                        $element.css('height', $window.innerHeight + 'px');
                    });
                };
            }
        };
    }])
    .directive('sofaFullPageViewOriginal', function () {
        'use strict';

        return {
            restrict: 'E',
            require: '^sofaFullPageView',
            link: function ($scope, $element) {
                $scope.originalElement = $element;
            }
        };
    });
}(angular));
