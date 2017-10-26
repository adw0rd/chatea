var API_PREFIX = 'https://json.smappi.org/adw0rd/chatea/';
// var API_PREFIX = 'http://chatea.loc/api/';

function MainCtrl ($http) {
    var vm = this;
    vm.check_rooms = function(){
        $http.get(API_PREFIX + 'getRooms').then(function (response) {
            vm.rooms = response.data;
        });
    }
    vm.add_room = function(){
        $http.get(API_PREFIX + 'addRoom', {roomname: vm.roomname}).then(function(response) {
            if (response.data) {
                vm.check_rooms()
            }
        });
    }
    vm.check_rooms();
}

function RoomCtrl($http, $interval, $stateParams) {
    var vm = this;
    vm.roomname = $stateParams.name;
    vm.get_data = function(){
        $http.get(API_PREFIX + 'getRoom', {roomname: vm.roomname}).then(function (response) {
            vm.data = response.data;
        });
    };

    $interval(vm.get_data, 10000);
    vm.get_data();

    vm.add_comment = function() {
        if (vm.message && vm.nickname && vm.data){
            $http.get(API_PREFIX, {roomname: vm.roomname, nickname: vm.nickname, message: vm.message}).then(function(response) {
                if (response.data) {
                    vm.get_data()
                    vm.message = "";
                    $("#nickname").attr('disabled', true)
                }
            });
        }
    }
}

angular
    .module('chatea')
    .controller('RoomCtrl', RoomCtrl)
    .controller('MainCtrl', MainCtrl);
