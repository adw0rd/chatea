var API_PREFIX = 'https://json.smappi.org/adw0rd/chatea/';
// var API_PREFIX = 'http://chatea.loc/api/';

function MainCtrl ($http, $timeout, $scope) {
    var vm = this;
    vm.rooms = [];
    vm.context = {};
    vm.checkRooms = function() {
        $http.get(API_PREFIX + 'getRooms').then(function (response) {
            vm.rooms = response.data;
        });
    }
    vm.addRoom = function () {
        $http.post(API_PREFIX + 'addRoom', vm.context).then(function (response) {
            if (response.data) {
                vm.checkRooms();
            }
        });
    }
    $timeout(function () {
        $scope.$watch('ctrl.rooms', (rooms, old) => {
            if (!rooms.length && !old.length)
                vm.checkRooms();
        });
    }, 1000)
    vm.checkRooms();
}

function RoomCtrl($http, $interval, $stateParams) {
    var vm = this;
    vm.data = {}
    vm.roomid = $stateParams.id;
    vm.context = {roomid: vm.roomid}
    vm.getData = function () {
        $http.get(API_PREFIX + 'getRoom', {params: {roomid: vm.roomid}}).then(function (response) {
            vm.data = response.data;
        });
    };

    $interval(vm.getData, 10000);
    vm.getData();

    vm.addComment = function () {
        if (vm.context.message && vm.context.nickname && vm.data.name) {
            $http.post(API_PREFIX + 'addItem', vm.context).then(function (response) {
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
