angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope, AesData, $timeout, $http, CryptoManager, RequestService) {

        //console.log('inn')
        //$http.get('js/backup.json').then(function(response) {
        //    console.log(response.data.assets)
        //    $scope.assets = response.data.assets;
        //})

        RequestService.getAES().then(function (response) {
           if (angular.isDefined(response.data.c)) {
                if (AesData.setData(CryptoManager.decrypt(response.data.c))) {
                    //var assetsObj = AesData.getData();
                    //angular.isDefined(assetsObj) && angular.isObject(assetsObj)
                    //    ? $scope.assets = assetsObj
                    //    : console.error('Problems with reading assets data!');
                }
            }
        }, function (data) {

        });
    })

    .controller('LoginCtrl', function ($scope, $state, AccessData, AesData, $http, RequestService, CryptoManager) {

        //
        //$http({method: 'POST',
        //    url:'/authenticate',
        //    data: {"username": "s.boychuk@bvblogic.com", "password":"15011992"},
        //    headers: {
        //            'Content-Type': 'text/plain;charset=UTF-8'
        //    }}).then(function(data) {
        //    console.log(data)
        //})

        $scope.signIn = function (user) {
            RequestService.singIn(user).then(function(response) {
                if (angular.isDefined(response.data.user) && AccessData.setData(response.data.user))
                    if (CryptoManager.generateKey('15011992', response.data.user.uuid)) {
                        $state.go('tab.assets');
                    }
            });
        };
    })


    .controller('AssetDetailCtrl', function ($scope, $state, $stateParams, $http, $filter, AesData, CryptoManager, RequestService) {
        $scope.saveButton = {
          'button-stable': 'Save Changes',
          'button-balanced': 'Saved'
        };
        $scope.buttonStatus = 'button-stable';

        //$http.get('js/backup.json').then(function(response) {
        //    console.log(response.data.assets)
        //    $scope.form = response.data.assets[$stateParams.id];
        //});
        var aesData = AesData.getData()
        $scope.form = angular.isDefined($stateParams.id) ?  aesData.assets[$stateParams.id] : {};



        $scope.saveAES = function() {
            //if (angular.equals({}, $scope.form)) return;
            //var isNewForm = angular.isUndefined($scope.form.uuid);
            //if (isNewForm) {
            //    aesData.assets.push(completeNewAsset($scope.form));
            //}
            //console.log($scope.form);
            //RequestService.setAES(CryptoManager.encrypt(aesData)).then(function(response) {
            //    buttonTimer();
                $state.go('tab.assets');
            //}, function(data) {
            //    console.error('Error saving data');
            //})
            //
            //buttonTimer();
        }

        function completeNewAsset(formObj) {
            formObj.uuid = Math.random().toString(36).substring(6);
            formObj.createdAt = $filter('date')(new Date(), 'yyyy-MM-dd HH-mm-ss');
            formObj.updatedAt = $filter('date')(new Date(), 'yyyy-MM-dd HH-mm-ss');
            formObj.versions = createVersion(formObj.versions);
            formObj.type = convertType(formObj.type);
            return formObj;
        };

        function createVersion(versions) {
            var versions = angular.isUndefined(versions) ? {} : versions;
            versions[Math.random().toString(36).substring(6)] = {
                "payload": {
                    "username": "",
                    "password": "",
                    "passphrase": "",
                    "notes": ""
                },
                "createdAt": $filter('date')(new Date(), 'yyyy-MM-dd HH-mm-ss'),
                "createdFrom": "0.0.0.0",
            };
            return versions;
        }

        function convertType(type) {
           return angular.isArray(type) ? type.join(',') : type.split(',');
        }

        function buttonTimer() {
            $scope.buttonStatus = 'button-balanced'
            $timeout(function() {
                $scope.buttonStatus = 'button-stable';
            }, 2000);
        };
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            someSettings: true
        };
    });
