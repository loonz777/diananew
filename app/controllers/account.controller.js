(function () {
    angular
        .module('DianaWeb')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['UserService', '$rootScope'];
    function AccountController(UserService, $rootScope) {
        var vm = this;

        vm.user = null;
        initController();

        function initController() {
            loadCurrentUser();
            console.log(vm.user);
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }
    }
})();