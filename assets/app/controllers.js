var API_PREFIX = 'http://json.smappi.org/adw0rd/chatea/';

function MainCtrl ($http) {
    var vm = this;
    vm.rooms = $http.get(API_PREFIX + 'getRooms').then(function (response) {
        console.log('ROOMS', response);
    });
}

angular
    .module('chatea')
    .controller('MainCtrl', MainCtrl);
