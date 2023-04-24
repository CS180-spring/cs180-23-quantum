#include "collections.h"
#include "documents.h"
#include "databases.h"
#include "mastercontainer.h"
#include <iostream>

int main() {
  // Create "Master Container" which holds all Databases
  MasterContainer m;

  // Create a Database called Vehicles
  m.create_Database("Vehicles");
  
  // Create another databse called Hello
  m.create_Database("Hello");
  //Rename Hello database to Bye
  m.update_Database("Hello", "Bye");

  //Create multiple collections within Vehicles
  m.lookup("Vehicles").create_Collection("Cars");
  m.lookup("Vehicles").create_Collection("Planes");
  m.lookup("Vehicles").create_Collection("Train");
  m.lookup("Vehicles").create_Collection("Subway");

  // Rename the collection "Cars" to "Boats"
  m.lookup("Vehicles").update_Collection("Cars", "Boats");
  
  //Delete the train collection
  m.lookup("Vehicles").delete_Collection("Train");

  //m.readAll_Database();
  //m.lookup("Vehicles").read();
  
  
  // Create a few documents inside of the "Planes" collection
  string field1 = "{\"model\":\"BOEING 777\"}";
  
  m.lookup("Vehicles").lookup("Planes").create_Document(1, field1);
  m.lookup("Vehicles").lookup("Planes").create_Document(2, field1);
  m.lookup("Vehicles").lookup("Planes").create_Document(3, field1);
  
  // Delete Document 3
  m.lookup("Vehicles").lookup("Planes").delete_Document(3);
  // Can't delete the same document twice
  m.lookup("Vehicles").lookup("Planes").delete_Document(3);

  // Update a document with a valid ID. 
  string field2 = "{\"model\":\"AIRBUS 100\"}";
  m.lookup("Vehicles").lookup("Planes").update_Document(2, field2);

  // Delete a collection, which destroys all documents in it as well.
  // Uncomment if needed
  // m.lookup("Vehicles").delete_Collection("Boats");

  // Update the name of the database
  m.update_Database("Vehicles", "Transport");
  
  return 0;
}