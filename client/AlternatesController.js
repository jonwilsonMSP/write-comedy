angular.module('comedyApp').controller('AlternatesController', ['$http', '$location', '$localStorage', function($http, $location, $localStorage){
    var vm = this;


    vm.pageData = $localStorage.prevPageData;
    console.log(vm.pageData);


}]);