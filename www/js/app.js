// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

    .run(function ($ionicPlatform) {

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })
                    .then(function(result) {
                        if(!result) {
                            ionic.Platform.exitApp();
                        }
                    });
                }
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

        $httpProvider.defaults.headers.common = {};
          $httpProvider.defaults.headers.post = {};
          $httpProvider.defaults.headers.put = {};
          $httpProvider.defaults.headers.patch = {};

        //$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        //
        //$httpProvider.defaults.useXDomain = true;
        //$httpProvider.defaults.headers.common = {'apikey':'3ad6caab-9ae4-4f63-906a-88ce82cb692a'};
        //  $httpProvider.defaults.headers.post = {};
        //  $httpProvider.defaults.headers.put = {};
        //$httpProvider.defaults.headers.get = {'apikey':'3ad6caab-9ae4-4f63-906a-88ce82cb692a'};
        ////delete $httpProvider.defaults.headers.common['X-Requested-With'];
        //  $httpProvider.defaults.headers.patch = {'apikey':'3ad6caab-9ae4-4f63-906a-88ce82cb692a'};
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // login state
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('tab.assets', {
                url: '/assets',
                views: {
                    'tab-assets': {
                        templateUrl: 'templates/tab-assets.html',
                        controller: 'DashCtrl'
                    }
                }
            })

            .state('tab.asset-new', {
                url: '/asset/new',
                views: {
                    'tab-assets': {
                        templateUrl: 'templates/tab-new-asset.html',
                        controller: 'AssetDetailCtrl'
                    }
                }
            })

            .state('tab.asset-detail', {
                url: '/assets/:id',
                views: {
                    'tab-assets': {
                        templateUrl: 'templates/tab-asset-item.html',
                        controller: 'AssetDetailCtrl'
                    }
                }
            })

            //.state('tab.chat-detail', {
            //    url: '/chats/:chatId',
            //    views: {
            //        'tab-chats': {
            //            templateUrl: 'templates/chat-detail.html',
            //            controller: 'ChatDetailCtrl'
            //        }
            //    }
            //})

            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

    });
