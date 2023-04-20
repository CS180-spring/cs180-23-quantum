#include "collections.h"
#include "documents.h"
#include "databases.h"
#include <iostream>
//For testing at the moment
#include <cassert>

int main() {
  //Create a new database
  // Database db("vehicles");

  // //Create collections
  // db.create_Collection("Cars");
  // //Collection with name Cars already exists thus error should be outputted
  // db.create_Collection("Cars");
  // db.create_Collection("Airplane");

  // //Lookup collection Airplane
  // Collection coll = db.lookup("Airplane");
  // //Create a document in collection Airplane
  // coll.create_Document(3, "BOEING 777");
  // //Read the document, should output "BOEING 777"
  // coll.read_Document(3);
  // //Update the document
  // coll.update_Document(3, "New Airplane");
  // //Check to see if update happened
  // coll.read_Document(3); 
  // //Delete the document
  // coll.delete_Document(3);
  // //Check to see if delete happened
  // coll.read_Document(3);



  
  // Testing the Document class
  Document doc1(1);
  assert(doc1.getId() == 1);
  assert(doc1.getContent() == "");

  Document doc2(2, "This is some content.");
  assert(doc2.getId() == 2);
  assert(doc2.getContent() == "This is some content.");

  doc1.setId(3);
  assert(doc1.getId() == 3);

  doc1.setContent("New content");
  assert(doc1.getContent() == "New content");



  
  // Testing the Collection class
  Collection col1("col1");
  assert(col1.getName() == "col1");
  assert(col1.getDocuments().size() == 0);

  Document doc4(4, "This is document 4.");
  col1.create_Document(4, "This is document 4.");
  assert(col1.getDocuments().size() == 1);

  col1.create_Document(5, "This is document 5.");
  assert(col1.getDocuments().size() == 2);

  col1.create_Document(4, "This is another version of document 4.");
  assert(col1.getDocuments().size() == 2);

  col1.update_Document(4, "This is the updated version of document 4.");
  Document updated_doc = col1.lookup(4);
  assert(updated_doc.getContent() == "This is the updated version of document 4.");

  col1.delete_Document(5);
  assert(col1.getDocuments().size() == 1);

  col1.delete_Document(3);
  assert(col1.getDocuments().size() == 1);

  col1.read_Document(4);
  assert(col1.lookup(4).getContent() == "This is the updated version of document 4.");



  
  //Testing the Database class
  Database db1("TestDB");
  assert(db1.getName() == "TestDB");

  // Test Collection creation and getter function
  db1.create_Collection("Collection1");
  vector<Collection> collections = db1.getCollections();
  assert(collections.size() == 1);
  assert(collections[0].getName() == "Collection1");

  // Test Collection renaming
  db1.update_Collection("Collection1", "Collection2");
  collections = db1.getCollections();
  assert(collections.size() == 1);
  assert(collections[0].getName() == "Collection2");

  // Test Collection deletion
  db1.delete_Collection("Collection2");
  collections = db1.getCollections();
  assert(collections.size() == 0);

  cout << "All tests passed successfully!" << endl;

  return 0;
}
