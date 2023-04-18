#include "collections.h"

using namespace std;

Collection::Collection(string name_, Database parentDB_) {
  name = name_;
  vector<Document> docs;
  documents = docs;
  parentDB = parentDB_;
}

Collection::Collection(string name_, vector<Document> documents_, Database parentDB_){
  name = name_;
  documents = documents_;
  parentDB = parentDB_;
}

//Getter functions
string Collection::getName() {
  return name;
}

vector<Document> Collection::getDocuments() {
  return documents;
}

Database Collection::getParentDB(){
  return parentDB;
}


//Setter functions
void Collection::setName(string name_) {
  name = name_;
}

// CUD operations
//CREATE Collection
void create_Collection(string name, Database parentDB) {
  // Check if Collection with same name already exists
  for (Collection & collection : parentDB.getCollections()) {
    if (collection.getName() == name) {
      cout << "Error: collection with name " << name << " already exists." << endl;
      return;
    }
  }
  // Create new Collection if otherwise
  vector<Document> documents;
  Collection c(name, documents, parentDB);
  parentDB.getCollections().push_back(c);
  cout << "Collection with name " << name << " created successfully." << endl;
  return;
}

//UPDATE Collection
void update_Collection(string name, Database parentDB) {
  // Find Collection with specified name
  for (Collection & collection : parentDB.getCollections()) {
    if (collection.getName() == name) {
      collection.setName(name);
      cout << "Collection renamed to " << name << " successfully." << endl;
      return;
    }
  }
  cout << "Error: Collection with name " << name << " not found." << endl;
}

//DELETE Collection
void delete_Collection(string name, Database parentDB) {
  // Delete Collection with specified name
  for (auto it = parentDB.getCollections().begin(); it != parentDB.getCollections().end(); ++it) {
    if (it->getName() == name) {
      parentDB.getCollections().erase(it);
      cout << "Collection with name " << name << " deleted successfully." << endl;
      return;
    }
  }
  cout << "Error: Collection with name " << name << " not found." << endl;
}