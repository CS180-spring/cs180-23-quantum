#include "databases.h"

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
//CREATE Database
void create_Database(string name, vector<Database>& databases) {
  // Check if Database with same name already exists
  for (Database& database : databases) {
    if (database.getName() == name) {
      cout << "Error: database with name " << name << " already exists." << endl;
      return;
    }
  }
  // Create new Databas if otherwise
  vector<Collection> collections;
  Database db(name, collections);
  databases.push_back(db);
  cout << "Database with name " << name << " created successfully." << endl;
  return;
}

//UPDATE Database
void update_Database(string name, vector<Database>& databases) {
  // Find Database with specified name
  for (Database & database : databases) {
    if (database.getName() == name) {
      database.setName(name);
      cout << "Database renamed to " << name << " successfully." << endl;
      return;
    }
  }
  cout << "Error: Database with name " << name << " not found." << endl;
}

//DELETE Database
void delete_Database(string name, vector<Database>& databases) {
  // Delete Database with specified name
  for (auto it = databases.begin(); it != databases.end(); ++it) {
    if (it->getName() == name) {
      databases.erase(it);
      cout << "Database with name " << name << " deleted successfully." << endl;
      return;
    }
  }
  cout << "Error: Database with name " << name << " not found." << endl;
}