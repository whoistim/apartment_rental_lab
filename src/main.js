"use strict"
var menu = require('node-menu');
var app = require('./app.js');

var building = new app.Building("Waterfront Tower");
var people = [];
people.push(new app.Person("Anna", "765-4321"));
people.push(new app.Person("Barb", "765-4321"));
people.push(new app.Person("Cindy", "765-4321"));
people.push(new app.Person("Daisy", "765-4321"));
var john = new app.Manager("John", "700-4321");
building.setManager(john);
people.push(john);
var devin = new app.Tenant("Devin", "765-1234");
devin.addReference(new app.Person("Carl", "415 3536 222"));
devin.addReference(new app.Person("Steve", "415 1111 222"));
people.push(devin);
people.push(new app.Tenant("Fred", "744-1234"));
var bob = new app.Tenant("Bob", "765-1234");
bob.addReference(new app.Person("Carl", "415 3536 222"));
bob.addReference(new app.Person("Steve", "415 1111 222"));
people.push(bob);

building.units.push(new app.Unit("12", building, 400, 2000));
building.units.push(new app.Unit("13", building, 800, 3000));
building.units.push(new app.Unit("14", building, 1800, 4500));
//helpler functions
var findPeep = function(name){
  for(var i=0;i<people.length;i++){
    var currentPerson = people[i];
    if (name == currentPerson.name){
      // console.log(currentPerson);
      return currentPerson;
    }
  }
};



var getUnit = function(unit_number){  
  for(var i=0;i<building.units.length;i++){
    var currentUnit = building.units[i];
    if (unit_number == currentUnit.number){
      // console.log("Moving into unit " + currentUnit.number);
      return currentUnit;
    }
  }
};

var findUnitByTenant = function(tenant_name) {
  for(var i=0;i<building.units.length;i++){
    var currentUnit = building.units[i];
     console.log("Pre check " + currentUnit.tenant);
    if (tenant_name == currentUnit.tenant.name){
      console.log(currentUnit.tenant.name + " is the deadbeat.")
      return currentUnit;
    }
  }

}


// --------------------------------
menu.addDelimiter('-', 40, building.address + " rental app");


menu.addItem('Add manager', 
  function(name, contact) {
    var aManager = new app.Manager(name, contact);
    aManager.addBuilding(building);
    building.setManager(aManager);
    people.push(aManager);
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Add tenant', 
  function(name, contact) {
    people.push(new app.Tenant(name, contact));
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Show tenants:', 
  function() {
    for (var i = 0; i <= people.length; i++) {
      if (people[i] instanceof app.Tenant){
        console.log("\n" + people[i].name + " " + people[i].contact);
        var references = people[i].references;
        if(!references) {continue;}
        for (var j = references.length - 1; j >= 0; j--) {
          console.log("-> Reference: " + references[j].name + " " + references[j].contact);
        };
      }
    }
  }
);

menu.addItem('Show managers:', 
  function() {
    for (var i = 0; i <= people.length; i++) {
      if (people[i] instanceof app.Manager){
        console.log("\n" + people[i].name + " " + people[i].contact);
      }
    }
  }
);

menu.addItem('Add unit', 
  function(number, sqft, rent) {
    var aUnit = new app.Unit(number, building, sqft, rent);
    building.units.push(aUnit);
  },
  null, 
  [{'name': 'number', 'type': 'string'},
    {'name': 'sqft', 'type': 'numeric'}, 
    {'name': 'rent', 'type': 'numeric'}]
);

menu.addItem('Show all units', 
  function() {
    for(var i = building.units.length - 1; i >= 0; i--) {
      console.log(" tenant: " + building.units[i].tenant +
      			  " num: " + building.units[i].number + 
                  " sqft: " + building.units[i].sqft +
                  " rent: $" + building.units[i].rent);
    }
  }  
);

menu.addItem('(try me) Show available units', 
  function() {
var aUnits = building.availableUnits();
aUnits.forEach(function(u){
  console.log(u);
});
}
  );
     


menu.addItem('(try me) Add tenant reference', 
  function(tenant_name, ref_name, ref_contact) {
    //if tenant is in people, then create a person from ref. then pass 
    //if tenant not found return error messge.
    people.forEach(function(person){
      if (person.name == tenant_name && person instanceof app.Tenant) {
        person.addReference(new app.Person(ref_name, ref_contact));
      }
      else {
        console.log("Bad Reference");
      }
    });
       // Note: Don't create a new Tenant. Pick a name of exiting tenant.
      // Find the corresponding tenant object and add reference. Reference
      // is a new Person object.
    },
    null, 
    [{'name': 'tenant_name', 'type': 'string'},
    {'name': 'ref_name', 'type': 'string'},
    {'name': 'ref_contact', 'type': 'string'}] 
);

menu.addItem('(try me) Move tenant in unit', 
  function(unit_number, tenant_name) {
    // getUnit(unit_number);
      // console.log("Unit #" + getUnit(unit_number).number);
    building.addTenant(getUnit(unit_number),findPeep(tenant_name));
      // find tenant and unit objects, use building's addTenant() function.
      console.log(findPeep(tenant_name).name  + " moved into " + getUnit(unit_number).number);
    },
    null, 
    [{'name': 'unit_number', 'type': 'string'},
    {'name': 'tenant_name', 'type': 'string'}] 
);

menu.addItem('(I break sometimes) Evict tenant', 
  function(tenant_name) {
      // Similar to above, use building's removeTenant() function.

      var evictUnit = findUnitByTenant(tenant_name);
      console.log(evictUnit.number + " is the unit where " + tenant_name + " is crashing.");
    building.removeTenant(evictUnit,findPeep(tenant_name));

      console.log(tenant_name + " was moved out of " + evictUnit.number);
    },
    null, 
    [{'name': 'tenant_name', 'type': 'string'}] 
);

menu.addItem('(Try Me Now) Show total sqft rented', 
  function() {
    var freeSqFt = [];
    var totalSqFt = 0;
    freeSqFt = building.rentedUnits();
    freeSqFt.forEach(function (taco){
totalSqFt += taco.sqft;

    });
    console.log("Total rented Square Feet = " +totalSqFt);
      // console.log(building.rentedUnits());
    } 
);

menu.addItem('(implement me) Show total yearly income', 
  function() {
    var rentCheck = [];
    var totalRent = 0;
    rentCheck = building.rentedUnits();
    rentCheck.forEach(function (taco){
totalRent += (12*(taco.rent));

    });
    console.log("Total rent  = " +totalRent);

      // Note: only rented units produce income
      // console.log("Implement me.");
    } 
);

menu.addItem('(Add your own feature ...)', 
  function() {
      console.log("Implement a feature that you find is useful");
    } 
);

// *******************************
menu.addDelimiter('*', 40);

menu.start();