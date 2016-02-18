angular.module("NodeAngular",[])
.controller("ClientFunctions",function($scope){
	$scope.socket = io.connect('http://localhost:3000');
	$scope.titulo = "Chat con Node & sovcket";
})


