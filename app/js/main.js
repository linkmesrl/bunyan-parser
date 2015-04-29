'use strict';

angular.module('bunyanParser', [])
.run(function(){
    console.log('Im alive!');
})
.directive('onReadFile', function ($parse) {
    return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
                
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
})
.controller('LoggerCtrl', function($scope){
    $scope.showContent = function(content){
        var formatted = content.replace(/\}/g,'},');
        formatted = '[' + formatted.substring(0, formatted.lastIndexOf(',')) + ']';
        console.log(JSON.parse(formatted));
        $scope.logs = JSON.parse(formatted);
    };
});
