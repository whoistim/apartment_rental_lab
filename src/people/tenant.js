var Person = require("./person");

function Tenant(name, contact) {
  // inherits name contact from Person
Person.call(this,name, contact);
  // tennant has 'array' of references
this.references= [];

}

// Set prototype and constructor
Tenant.prototype = new Person();
Tenant.prototype.constructor = Tenant;

Tenant.prototype.addReference = function(reference){
  // add reference to references. Reference must be of type Person
	if(reference instanceof Person){
this.references.push(reference);
	}
};

Tenant.prototype.removeReference = function(reference) {
  // remove reference from references.
	var i = this.references.indexOf(reference);
	if((reference instanceof Person) && (i !== -1)){
	this.references.splice(i,1);
	}
};

module.exports = Tenant;
