#include "mastercontainer.h"
#include <filesystem>

using namespace std;

MasterContainer::MasterContainer() {
    //System commands
    filesystem::path root_dir_path = filesystem::current_path().parent_path() / "database";
    if (filesystem::create_directory(root_dir_path)) {
        cout << "Root database created successfully!" << endl;
    } else {
        cout << "Root database creation failed!" << endl;
    }
}

void MasterContainer::create_Database(string name) {
    for (Database &db : databases) {
        if (db.getName() == name) {
            cout << "Error: Database with name " << name << "already exists." << endl;
            return;
        }
    }
    Database d(name);
    databases.push_back(d);
    //System commands
    filesystem::path dir_path = "../database/" + name;
    error_code ec;
    if (filesystem::create_directory(dir_path, ec)) {
        cout << "Database created successfully!" << endl;
    } else {
        cout << "Database creation failed: " << ec.message() << endl;
    }
}

void MasterContainer::update_Database(string name, string newName) {
  // Find database with specified ID
  bool worked = false;
  for (Database &db : databases) {
    if (db.getName() == name) {
      db.setName(newName);
      //System commands
      string old_path = "../database/" + name;
      string new_path = "../database/" + newName;
      try {
          filesystem::rename(old_path, new_path);
          cout << "Database renamed to " << newName << " successfully." << endl;
      } catch (const filesystem::filesystem_error& e) {
          cout << "Database renaming failed: " << e.what() << endl;
      }
      worked = true;
    }
  }
  if (!worked) {
    cout << "Error: Database with name " << name << " does not exist." << endl;
  }
}

void MasterContainer::delete_Database(string name) {
  // Delete database with specified name
  int i = 0;
  bool worked = false;
  for (Database & d: databases) {
    if (d.getName() == name) {
      databases.erase(databases.begin()+i);
      //System commands
      filesystem::path dir_path = "../database/" + name;
      error_code ec;
      if (filesystem::remove_all(dir_path, ec)) {
          cout << "Database deleted successfully!" << endl;
      } else {
          cout << "Database deletion failed: " << ec.message() << endl;
      }
      worked = true;
    }
    i++;
  }
  if (!worked) cout << "Error: Database with name " << name << " does not exist." << endl;
}

//Helper functions
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