var Person = require("./person");
var Building = require("../rental_property/building");

function Manager(name, contact) {
this.name = name;
this.contact = contact;
this.buildings =[];

}

// function newClass(name,contact){
//   this.name = name
//   this.contact = contact
//   Manager.apply(this,arguments)
// }

// var myInstance = new newClass("Elie", "123-456-7890")

Manager.prototype = new Person();
Manager.prototype.constructor = Manager;
// Set prototype and constructor

Manager.prototype.addBuilding = function(building) {
  // check if building is an INSTANCEOF a Building
  if(building instanceof Building){
    this.buildings.push(building);

}
  return this;
};

Manager.prototype.removeBuilding = function(building) {
  // remove building
  var i = this.buildings.indexOf(building);
  if((building instanceof Building) && (i !==-1)){
    this.buildings.splice(i, 1);
  }

    return this;
};

module.exports = Manager;