
angular.module('angie.tabs', [

]).directive('ngTabs', ['$compile', function ($compile) {

    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        template: '\
            <div class="ng-tabs__tabs">\
                <div class="ng-tabs__tab"\
                    tabindex="0"\
                    ng-repeat="tab in tabs"\
                    ng-class="{\'ng-tabs__tab--active\': tab.active}"\
                    ng-click="selectTab($index)">{{ tab.heading }}</div>\
            </div>\
            <div class="ng-tabs__panels" ng-transclude></div>\
        ',
        controller: function ($scope, $element) {
            this.tabs = [];

            this.addTab = function (tabScope) {
                this.tabs.push(tabScope);
            };

            this.removeTab = function (index) {
                this.tabs.splice(index, 1);
            };

            this.selectTab = function (index) {
                this.tabs.forEach(function (tabScope, tabIndex) {
                    tabScope.active = tabIndex === index;
                });
            };
        },
        link: function ($scope, $element, attributes, ngTabsController) {
            $scope.tabs = ngTabsController.tabs;

            $scope.selectTab = function (index) {
                ngTabsController.selectTab(index);
            };
        }
    };
}]).directive('ngTab', ['$timeout', '$compile', function ($timeout, $compile) {

    return {
        restrict: 'E',
        transclude: true,
        require: '^^ngTabs',
        scope: {
            heading: '=',
            disabled: '='
        },
        template: '<div class="ng-tabs__panel" ng-show="active" ng-transclude></div>',
        link:  function ($scope, $element, attributes, ngTabsController) {
            $scope.active = 'active' in attributes;
            ngTabsController.addTab($scope);

            var noActive = ngTabsController.tabs.every(function (tabScope) {
                return !tabScope.active;
            });

            if (noActive) {
                ngTabsController.selectTab(0);
            }

            // $scope.$watch('active', function (active) {
            //     $element.toggleClass('ng-tabs__panel--active', !!active);
            // });
        }
    }
}]);