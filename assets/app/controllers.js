var API_PREFIX = 'https://json.smappi.org/adw0rd/chatea/';
// var API_PREFIX = 'http://chatea.loc/api/';

function MainCtrl ($http) {
    var vm = this;
    vm.context = {};
    vm.checkRooms = function() {
        $http.get(API_PREFIX + 'getRooms').then(function (response) {
            vm.rooms = response.data;
        });
    }
    vm.addRoom = function(){
        $http.get(API_PREFIX + 'addRoom', {params: vm.context}).then(function (response) {
            if (response.data) {
                vm.checkRooms();
            }
        });
    }
    vm.checkRooms();
}

function RoomCtrl($http, $interval, $stateParams) {
    var vm = this;
    vm.data = {}
    vm.roomname = $stateParams.name;
    vm.context = {roomname: vm.roomname}
    vm.getData = function () {
        $http.get(API_PREFIX + 'getRoom', {params: {roomname: vm.roomname}}).then(function (response) {
            vm.data = response.data;
        });
    };

    $interval(vm.getData, 10000);
    vm.getData();

    vm.addComment = function () {
        if (vm.context.message && vm.context.nickname && vm.data.name) {
            $http.get(API_PREFIX + 'addItem', {params: vm.context}).then(function (response) {
                if (response.data) {
                    vm.getData();
                    vm.context.message = "";
                    $("#nickname").attr('disabled', true);
                }
            });
        }
    }
}

angular
    .module('chatea')
    .controller('RoomCtrl', RoomCtrl)
    .controller('MainCtrl', MainCtrl);
