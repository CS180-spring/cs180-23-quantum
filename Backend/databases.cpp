#include "databases.h"
#include <sys/stat.h>
#include <direct.h>
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
  return this->collections;
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
  coll.setParent(getName());
  // coll.setParentName(this->name);
  // cout << this->name << endl;
  collections.push_back(coll);
  string glob_dirname = "All_Databases" + string("/") + this->name + string("/") + string(name);
  int status = _mkdir(glob_dirname.c_str());
  cout << "Collection with name " << name << " created successfully." << endl;
  return;
}

//UPDATE Collection
void Database::update_Collection(string name, string newName) {
  // Find Collection with specified name
  for (Collection & coll : collections) {
    if (coll.getName() == name) {
      coll.setName(newName);
      string dirname = "All_Databases" + string("/") + string(this->name) + string("/") + string(name);
      string newdirname = "All_Databases" + string("/") + string(this->name) + string("/") + string(newName);
      rename(dirname.c_str(), newdirname.c_str());
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
      string dirname = "All_Databases" + string("/") + string(this->name) + string("/") + string(name);
      _rmdir(dirname.c_str());
      collections.erase(collections.begin()+i);
      cout << "Erased collection " << name << "!" << endl;
      return;
    }
    i++;
  }
  cout << "Error: Collection with name " << name << " does not exist." << endl;
}

//Helper functions
Collection& Database::lookup (string name){
  for (Collection &coll : collections) {
    if (coll.getName() == name) {
      return coll;
    }
  }
  throw std::runtime_error("Database not found");
  // cout << "Collection not found." << endl;
  // return c;
}
void Database::read() {
  for (auto i : collections) {
    cout << i.getName() << " ";
  }
  cout << endl;
  return;
}