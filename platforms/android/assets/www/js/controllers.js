angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope, RequestService, AesData, $timeout, $http) {

        //RequestService.getAES().then(function(response) {
        //    //if (angular.isDefined(response.data.c)) {
            //    //    if (!AesData.setData(response.data.c)) {
        //    //
        //    //    }
        //    //}
        //}, function(data) {
        //
        //})
        console.log('inn')
        $http.get('js/backup.json').then(function(response) {
            console.log(response.data.assets)
            $scope.assets = response.data.assets;
        })
    })

    .controller('LoginCtrl', function ($scope, $state, RequestService, AccessData) {
        $scope.signIn = function (user) {
            $state.go('tab.assets');
            //RequestService.singIn(user).then(function(response) {
            //    if(angular.isDefined(response.data.user) && AccessData.setData(response.data.user))
            //        $state.go('tab.home');
            //}, function(data) {
            //    //alert(data);
            //
            //});

        };
    })


    .controller('AssetDetailCtrl', function ($scope, $stateParams, $http) {
        $scope.saveButton = {
          'button-stable': 'Save Changes',
          'button-balanced': 'Saved'
        };
        $scope.buttonStatus = 'button-stable';

        console.log('AssetDetailCtrl', $stateParams.id);

        $http.get('js/backup.json').then(function(response) {
            console.log(response.data.assets)
            $scope.form = response.data.assets[$stateParams.id];
        });

        $scope.saveAES = function() {
            //RequestService.setAES().then(function(response) {
            //
            //}, function(data) {
            //
            //})

            buttonTimer();
        }

        function buttonTimer() {
            $scope.buttonStatus = 'button-balanced'
            $timeout(function() {
                $scope.buttonStatus = 'button-stable';
            }, 2000);
        }
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            someSettings: true
        };
    });
