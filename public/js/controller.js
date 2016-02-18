angular.module("NodeAngular",[])
.controller("ClientFunctions",function($scope){
	$scope.socket = io();
})