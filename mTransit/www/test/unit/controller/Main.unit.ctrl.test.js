describe('Unit: ContainerContactCtrl', function() {
// Load the module with ContainerContactCtrl, add your module name in here!
beforeEach(module('starter'));

var ctrl, scope;

// inject the $controller and $rootScope services
// in the beforeEach block
beforeEach(inject(function($controller, $rootScope) {

// create a new scope that's a child of the $rootScope
scope = $rootScope.$new();

// create the controller
ctrl = $controller('ContainerContactCtrl', {
$scope: scope
});
}));
it('should do this and that',
function() {
expect(scope.title).toEqual("Kontakt");
});
})