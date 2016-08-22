angular.module('starter.services', [])

    .factory('RequestService', function($http, AccessData) {
        var baseUrl = 'https://test.lifesafe.co/api';
        var authPath = '/authenticate';
        var aesPath = '/backup';
        //$http.defaults.headers.get = { 'x-username': "123",
        //                   'x-token':"321",
        //                   'Content-Type':'application/json'};
        return {
            tokHeader: angular.isDefined(AccessData.user) ? AccessData.user.tok : "",
            singIn: function (data) {
                return $http.post(baseUrl+authPath, data);
            },
            getAES: function() {
                return $http.get(baseUrl+aesPath, {"headers": {'X-CSRFToken': 'application/x-www-form-urlencoded'}});
            },
            setAES: function() {
                return $http.post(baseUrl+aesPath, {"headers": {"apikey": this.tokHeader}});
            }
        };
    })

    .factory('AesData', function() {
        var aesData = {};
        return {
            getData: function () {
                if (angular.isDefined(aesData) && aesData.length > 0) {

                }
                return aesData;
            },
            setData: function(decodedData) {
                if (angular.isString(decodedData)) {
                    return true;
                }
                return false;
            }
        };
    })

    .factory('AccessData', function() {
        var accessData = {};
        return {
            getData: function (dataType) {
                if (angular.isDefined(accessData[dataType]))
                    return accessData[dataType];
                return accessData;
            },
            setData: function(userData) {
                if (angular.isObject(userData)) {
                    angular.forEach(userData, function(value, key) {
                        accessData[key] = value;
                    });
                    return true;
                }
                return false;
            }
        };
    })

    .factory('Chats', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
        }];

        return {
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    });
