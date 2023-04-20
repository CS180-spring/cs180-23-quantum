#include "databases.h"
#include <vector>
using namespace std;

Database::Database(string name_){
  name = name_;
  vector<Collection> collections_;
  collections = collections_;
}

Database::Database(string name_, vector<Collection> collections_){
  name = name_;
  collections = collections_;
}

//Getter functions
string Database::getName() {
  return name;
}

vector<Collection> Database::getCollections(){
  return collections;
}

//Setter functions
void Database::setName(string name_) {
  name = name_;
}

// CUD operations
//CREATE Collection
void Database::create_Collection(string name) {
  // Check if Collection with same name already exists
  for (Collection & coll : collections) {
    if (coll.getName() == name) {
      cout << "Error: collection with name " << name << " already exists." << endl;
      return;
    }
  }
  // Create new Databas if otherwise
  Collection coll(name);
  collections.push_back(coll);
  cout << "Collection with name " << name << " created successfully." << endl;
  return;
}

//UPDATE Collection
void Database::update_Collection(string name, string newName) {
  // Find Collection with specified name
  for (Collection & coll : collections) {
    if (coll.getName() == name) {
      coll.setName(newName);
      cout << "Collection renamed to " << newName << " successfully." << endl;
      return;
    }
  }
  cout << "Error: Collection with name " << name << " does not exist." << endl;
}

//DELETE Collection
void Database::delete_Collection(string name) {
  // Delete Collection with specified name
  int i = 0;
  for (Collection & coll : collections) {
    if (coll.getName() == name) {
      collections.erase(collections.begin()+i);
      cout << "Erased collection " << coll.getName() << endl;
      return;
    }
    i++;
  }
  cout << "Error: Collection with name " << name << " does not exist." << endl;
}

//Helper functions
Collection Database::lookup (string name){
  for (Collection coll : collections) {
    if (coll.getName() == name) {
      return coll;
    }
  } 
}

