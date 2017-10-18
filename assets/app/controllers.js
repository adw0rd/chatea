var API_PREFIX = 'http://json.smappi.org/adw0rd/chatea/';

function MainCtrl ($http) {
    var vm = this;
    vm.check_rooms = function(){
        $http.get(API_PREFIX + 'getRooms').then(function (response) {
            vm.rooms = response.data;
        });
    }
    vm.add_room = function(){
        $http.get(API_PREFIX + 'addRoom?args=' + vm.roomname).then(function(response) {
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
        $http.get(API_PREFIX + 'getRoom?args=' + vm.roomname).then(function (response) {
            vm.data = response.data;
        });
    };

    $interval(vm.get_data, 10000);

    vm.add_comment = function() {
        if (vm.message && vm.nickname && vm.data){
            args = 'addItem?args=' + vm.roomname + ',' + vm.nickname + ',' + vm.message
            $http.get(API_PREFIX + args).then(function(response) {
                if (response.data) {
                    vm.get_data()
                    $("#nickname").attr('disabled', true)
                    vm.message = "";
                }
            });
        }
    }
}

angular
    .module('chatea')
    .controller('RoomCtrl', RoomCtrl)
    .controller('MainCtrl', MainCtrl);
