'use strict';

describe('sofa.fullPageView', function () {

    var element, $compile, $rootScope,
        Event = window.Event, document = window.document;

    beforeEach(module('sofa.fullPageView'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should fire open and close events', function (done) {
        $rootScope.testValue = 1;
        $rootScope.onOpen = function($scope) {
           expect($scope.testValue).toEqual(1); 
        };
        $rootScope.onClose = function($scope) {
           expect($scope.testValue).toEqual(1); 
           done();
        };
        element = $compile('<sofa-full-page-view on-close="onClose" on-open="onOopen"></sofa-full-page-view>')($rootScope);
        $rootScope.$digest();

        $rootScope.openFullPageView(new Event('test'));
        $rootScope.closeFullPageView(new Event('test'));
    });

    describe('sofa.fullPageView.sofa.fullPageViewClone', function() {

        beforeEach(function() {
            $compile('<sofa-full-page-view><sofa-full-page-view-clone>Hello</sofa-full-page-view-clone></sofa-full-page-view>')($rootScope);
            $rootScope.$digest();
        });

        it('should transclude content', function () {
            // as angular loses the reference to the directive's DOM element, 
            // when we use a directive that uses replace
            element = angular.element(
                    document.querySelector('.sofa-full-page-view__content'));

            expect(element.html())
                .toEqual('<span class="ng-scope">Hello</span>');
        });

        it('should toggle classes when opened', function() {
           element = angular.element(
                        document.querySelector('.sofa-full-page-view'));

            $rootScope.openFullPageView(new Event('test'));
            $rootScope.$digest();
            expect(element.hasClass('sofa-full-page-view--active'))
                .toEqual(true);
        });

        it('should toggle classes when closed', function() {
           element = angular.element(
                        document.querySelector('.sofa-full-page-view'));

            $rootScope.openFullPageView(new Event('test'));
            $rootScope.closeFullPageView(new Event('test'));
            $rootScope.$digest();
            expect(element.hasClass('sofa-full-page-view--active'))
                .toEqual(false);
        });

        it('should set its site correctly', function() {
            element = document.querySelector('.sofa-full-page-view');
            expect(element.style.height).toEqual(window.innerHeight + 'px');
        });

        it('should resize itself correctly', function() {
            element = document.querySelector('.sofa-full-page-view');
            window.innerHeight = 600;
            window.dispatchEvent(new Event('resize'));
            expect(element.style.height).toEqual(600 + 'px');
        });
    });

    describe('sofa.FullPageView.FullPageViewOriginal', function() {
        it('should have the original element in $scope', function() {
            $compile('<sofa-full-page-view><sofa-full-page-view-original>Hello</sofa-full-page-view-original></sofa-full-page-view>')($rootScope);
            $rootScope.$digest();

            expect($rootScope.originalElement.html()).toEqual('Hello');
        });
    });

});
