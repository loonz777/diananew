(function () {
    angular
        .module('DianaWeb')
        .directive('body', [function() {
            return {
                restrict: 'E',
                link: function (scope, element, attrs) {
                    scope.$on('body:class:add', function (e, name) {
                        element.addClass(name);
                    });
                    scope.$on('body:class:remove', function (e, name) {
                        element.removeClass(name);
                    });
                    scope.$on('body:class:removeAll', function (e) {
                        element.removeAttr('class');
                    });
                    return;
                }
            };
        }]);
})();