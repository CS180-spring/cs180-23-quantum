#include "collections.h"
#include "documents.h"
#include "databases.h"
#include <iostream>

int main() {
  //Create a new database
  Database db("vehicles");

  //Create collections
  db.create_Collection("Cars");
  //Collection with name Cars already exists thus error should be outputted
  db.create_Collection("Cars");
  db.create_Collection("Airplane");

  //Lookup collection Airplane
  Collection coll = db.lookup("Airplane");
  //Create a document in collection Airplane
  coll.create_Document(3, "BOEING 777");
  //Read the document, should output "BOEING 777"
  coll.read_Document(3);
  //Update the document
  coll.update_Document(3, "New Airplane");
  //Check to see if update happened
  coll.read_Document(3); 
  //Delete the document
  coll.delete_Document(3);
  //Check to see if delete happened
  coll.read_Document(3);
}