#include "collections.h"
#include "documents.h"
#include "databases.h"
#include "mastercontainer.h"
#include <iostream>
#include <sys/stat.h>
#include <direct.h>
#include <fstream>

//For testing at the moment
#include <cassert>

int main() {
  
  
  // ********************************************************************************************

  // Create "Master Container" which holds all Databases
  MasterContainer m;

  // Create a Database called Vehicles
  m.create_Database("Vehicles");
  m.create_Database("Hello");

  /* Create Collections in the Vehicles Database.
    - m.lookup() returns a database, where we can then create collections in
    - We can also do .lookup() on a Collection, which will allow us to create Documents in
  */
  m.lookup("Vehicles").create_Collection("Cars");
  m.lookup("Vehicles").create_Collection("Planes");
  m.lookup("Vehicles").create_Collection("Train");
  m.lookup("Vehicles").create_Collection("Subway");

  // Rename the collection "Cars" to "Boats"
  m.lookup("Vehicles").update_Collection("Cars", "Boats");

  // Create a few documents inside of the "Planes" collection

  m.lookup("Vehicles").lookup("Planes").create_Document(1, "BOEING 777");
  m.lookup("Vehicles").lookup("Planes").create_Document(2, "AIRBUS 100");

  // Delete Document 2
  m.lookup("Vehicles").lookup("Planes").delete_Document(2);

  // Update a document with a valid ID. 
  m.lookup("Vehicles").lookup("Planes").update_Document(1, "Airplane");
  m.lookup("Vehicles").lookup("Planes").update_Document(2, "testfails");

  // Delete a collection, which destroys all documents in it as well.
  m.lookup("Vehicles").delete_Collection("Boats");

  // Update the name of the database
  m.update_Database("Vehicles", "Transport");
  // Delete the database "Hello", which was created earlier
  m.delete_Database("Hello");


  // ********************************************************************************************

  return 0;
}