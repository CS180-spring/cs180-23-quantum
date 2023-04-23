#include "mastercontainer.h"
#include <direct.h>
#include <filesystem>
//Constructors

using namespace std;


MasterContainer::MasterContainer() {
    int status = _mkdir("All_Databases");
}

void MasterContainer::create_Database(string name) {
    for (Database &d : databases) {
        if (d.getName() == name) {
            cout << "Error: Database with name " << name << "already exists." << endl;
            return;
        }
    }
    Database d(name);
    databases.push_back(d);
    string parent = "All_Databases";
    string n = parent + string("/") + name;
    int status = _mkdir(n.c_str());
    cout << "Database " << name << " created successfully!" << endl;
}

void MasterContainer::update_Database(string name, string newName) {
  // Find document with specified ID
  for (Database &d : databases) {
    if (d.getName() == name) {
      d.setName(newName);
      string parent = "All_Databases/";
      rename((parent + name).c_str(), (parent + newName).c_str());
      cout << "DB changed to " << newName << endl;
      return;
    }
  }
  cout << "Database not found" << endl;
}

void MasterContainer::delete_Database(string name) {
  // Delete Collection with specified name
  int i = 0;
  for (Database & d: databases) {
    if (d.getName() == name) {
      string parent = "All_Databases/";
      _rmdir((parent + name).c_str());
      databases.erase(databases.begin()+i);
      cout << "Erased Database: " << name << endl;
      return;
    }
    i++;
  }
  cout << "Error: Collection with name " << name << " does not exist." << endl;
}
void MasterContainer::readAll_Database() {
    for (Database &d : databases) {
        cout << d.getName() << " ";
    }
    cout << endl;
}

Database& MasterContainer::lookup(string name) {
    for (Database &d : this->databases) {
        if (d.getName() == name) {
            return d;
        }
    }
    throw std::runtime_error("DB not found");
}

vector<Database> MasterContainer::get() {
  return this->databases;
}


  // string dir = "hello";
  // int st = _mkdir(dir.c_str());
  // string dname = "/" + string("qr");
  // string full = dir + dname;
  // int status = _mkdir(full.c_str());