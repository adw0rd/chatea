var API_PREFIX = 'http://json.smappi.org/adw0rd/chatea/';

function MainCtrl ($http) {
    var vm = this;
    $http.get(API_PREFIX + 'getRooms').then(function (response) {
        vm.rooms = response.data;
    });
}

angular
    .module('chatea')
    .controller('MainCtrl', MainCtrl);
