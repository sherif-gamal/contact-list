var mainModule = angular.module("MainModule", []);

mainModule.controller("AppCtrl", ['$scope', '$http', function($scope, $http) {
    $http.get('/contactlist').then(function(response) {
        $scope.people = response.data;
    }, function(err) {
        console.log("There was an error")
    });

    $scope.addContact = function() {
        $http.post('/contactlist', $scope.contact).then(function(response) {
            showMessage("Contact Added Successfully");
            $scope.people.push(response.data);
        }, function(err) {
            showMessage("There was an error");
        });
    };
    $scope.removeContact = function(id) {
        $http.delete('/contactlist/' + id).then(function(response) {
            showMessage("Contact Deleted Successfully");
            $scope.people.pop();
        }, function(err) {
            showMessage("There was an error");
        });
    };

    $scope.updateContact = function(person) {
        console.log(person);
        $http.put('/contactlist/' + person._id, person).then(function(response) {
            showMessage("Contact Updated Successfully");
        }, function(err) {
            showMessage("There was an error");
        });
    }
}]);

var showMessage = function(message) {
    $("#notice").text(message);
    $("#notice").show();
    setTimeout(function() {
        $("#notice").hide();
    }, 4000);
}