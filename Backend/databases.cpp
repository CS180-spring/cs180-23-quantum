#include "databases.h"
#include <filesystem>

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
  // Create new Database if otherwise
  Collection coll(name);
  coll.setParent(getName());
  collections.push_back(coll);

  //System commands
  filesystem::path dir_path = "../database/" + coll.getParent() + "/" + name;
  error_code ec;
  if (filesystem::create_directory(dir_path, ec)) {
      cout << "Collection created successfully!" << endl;
  } else {
      cout << "Collection creation failed: " << ec.message() << endl;
  }
}

//UPDATE Collection
void Database::update_Collection(string name, string newName) {
  // Find Collection with specified name
  bool worked = false;
  for (Collection & coll : collections) {
    if (coll.getName() == name) {
      coll.setName(newName);
      //System commands
      string old_path = "../database/" + coll.getParent() + "/" + name;
      string new_path = "../database/" + coll.getParent() + "/" + newName;
      try {
          filesystem::rename(old_path, new_path);
          cout << "Collection renamed to " << newName << " successfully." << endl;
      } catch (const filesystem::filesystem_error& e) {
          cout << "Collection renaming failed: " << e.what() << endl;
      }
      worked = true;
    }
  }
  if (!worked) {
    cout << "Error: Collection with name " << name << " does not exist." << endl;
  }
}

//DELETE Collection
void Database::delete_Collection(string name) {
  // Delete Collection with specified name
  int i = 0;
  bool worked = false;
  for (Collection & coll : collections) {
    if (coll.getName() == name) {
      collections.erase(collections.begin()+i);
      //System commands
      filesystem::path dir_path = "../database/" + coll.getParent() + "/" + name;
      error_code ec;
      if (filesystem::remove_all(dir_path, ec)) {
          cout << "Collection deleted successfully!" << endl;
      } else {
          cout << "Collection deletion failed: " << ec.message() << endl;
      }
      worked = true;
    }
    i++;
  }
  if (!worked) cout << "Error: Collection with name " << name << " does not exist." << endl;
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

string Database::display_Collections() {
  string st;
  for (auto i : collections) {
    st += i.getName() + " ";
  }
  st += "\n";
  return st;
}