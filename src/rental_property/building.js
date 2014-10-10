// "use strict"

function Building(address) {
  // building has an address
this.address = address;
  // and array of units
this.units = [];
this.manager = null;
}

Building.prototype.setManager = function(person) {
  // set this.manager to person. Person needs to be of type Manager.
  //
  // we can't use `instanceof` here because requiring the Manager
  // class in this file would create a circular dependency. therefore,
  // we're giving you this `if` statement for free.  in most other
  // cases you can use `instanceof` to check the class of something.
  if (person.constructor.name === "Manager") {
this.manager= person;  }
};

Building.prototype.getManager = function(){
  // return this.manager 
return (this.manager);
};

Building.prototype.addTenant = function(unit, tenant) {
  // add tenant but check to make sure there
  // is a manager first and a tenant has 2 references
  // Note that tenenat does not belong to Building, but to Unit
  var isManager = (unit.building.manager!== null);
  //for the unit passed-in, if its building's manager is not null, then isManager is true.
  var areReferences = (tenant.references.length>=2);
  //for the tenant passed-in, if its refs is at least 2, then areReferences is true.

  if((isManager && areReferences) && (this.units.indexOf(unit)!== -1) &&
    unit.available()){
    unit.tenant=tenant;

  }
};

Building.prototype.removeTenant = function(unit, tenant) {
  // remove tenant. below tests for:
if(this.manager &&//this building's manager not equal to null.
  this.units.indexOf(unit)!==-1 &&//this building's unit array includes the passed in unit
  unit.tenant === tenant){//the passed-in unit's tenant matches the passed-in tenant
    unit.tenant=null;//if all true, reset the tenant to "null". Out on yer butt.
}

};

Building.prototype.availableUnits = function(){
  // return units available. remember- the test puts  units in the building's unit array.
  var vacantUnits = [];
  this.units.forEach(function(taco){//taco is the unit tested for availability
    if (taco.available()) {
      vacantUnits.push(taco);
    } 
  }
  );
  //available() each taco-unit to see if true, then add to vacantUnits.
  return(vacantUnits);  // ...
};

Building.prototype.rentedUnits = function(){
  // return rented units
  var fullUnits = [];
  this.units.forEach(function(taco2){//looks at each unit in this building and
    //for each it tests to see if the unit "taco2" is available. If not (!), then it adds
    //the taco2 to the fullUnits array.
    if (!taco2.available()) {
      fullUnits.push(taco2);
    }
  });
  return(fullUnits);//passes back to rentedUnits() an array of the rented units.
};

module.exports = Building;
