#include "collection.h"
//#include "document.h"

using namespace std;

Collection::Collection() {
  this->type = ObjectType::FOLDER;
}

Collection::Collection(string name, string path) {
  this->name = name;
  this->type = ObjectType::FOLDER;
  this->path = path;
}

Collection::~Collection(){
  for (auto ch : this->getChildren())
    {
        delete ch;
    } 
}

//CRUD Operations
//Create a collection
int Collection::createOperation(string name, ObjectType type) {
  if(type == ObjectType::FOLDER){
    for (auto& child : this->getChildren()) {
      if (child->getName() == name) {
        if (child->getType() == ObjectType::FOLDER){
          cout << "Error: collection with name " << name << " already exists." << endl;
          return -1;
        }
      }
    }
    
    // Create new collection if otherwise
    string path = this->getPath() + "/" + name;
    Collection* newCollection = new Collection(name, path);
    newCollection->setParent(this);
    children.push_back(newCollection);

    //System commands
    filesystem::path dir_path = this->path + "/" + name;
    error_code ec;
    if (filesystem::create_directory(dir_path, ec)) {
        cout << "Collection created successfully!" << endl;
        return 0;
    } else {
        cout << "Collection creation failed: " << ec.message() << endl;
        return -1;
    }
  } else if(type == ObjectType::FILE){
    for (auto& child : this->getChildren()) {
      if (child->getName() == name) {
        if (child->getType() == ObjectType::FILE){
          cout << "Error: file with name " << name << " already exists." << endl;
          return -1;
        }
      }
    }   
    // Create new file if otherwise
    string childPath = this->path + "/" + name + ".json";
    Document* newDocument = new Document(name, this->getPath() + "/" + name);
    newDocument->setParent(this);
    children.push_back(newDocument);

    //System commands
    filesystem::path file_path = this->path + "/" + name + ".json";
    ofstream outfile(file_path);
    if (outfile.is_open()) {
        outfile << "";
        outfile.close();
        cout << "Document with name " << name << " created successfully." << endl;
        return 0;
    } else {
        cout << "Failed to create document with name " << name << endl;
        return -1;
    }
  }
  return -1;
}

//Update a collection
int Collection::updateOperation(string oldName, string newName, ObjectType type) {
  if(type == ObjectType::FOLDER){
    bool found = false;
    for (auto& child : this->getChildren()) {
      if (child->getName() == oldName) {
        if(type == ObjectType::FOLDER){
          child->setName(newName);
          //System commands
          string old_path = this->path + "/" + oldName;
          string new_path = this->path + "/" + newName;
          try {
              filesystem::rename(old_path, new_path);
              cout << "Collection renamed to " << newName << " successfully." << endl;
              return 0;
          } catch (const filesystem::filesystem_error& e) {
              cout << "Collection renaming failed: " << e.what() << endl;
              return -1;
          }
          found = true;
        }
      }
    }
    if (!found) {
      cout << "Error: Collection with name " << oldName << " does not exist." << endl;
      return -1;
    }
    return -1;
  } else if (type == ObjectType::FILE){
    bool found = false;
    for (auto& child : this->getChildren()) {
      if (child->getName() == oldName) {
        if(type == ObjectType::FILE){
          child->setName(newName);
          //System commands
          string old_path = "../database/" + this->path + "/" + oldName + ".json";
          string new_path = "../database/" + this->path + "/" + newName + ".json";
          try {
              filesystem::rename(old_path, new_path);
              cout << "Document renamed to " << newName << " successfully." << endl;
              return 0;
          } catch (const filesystem::filesystem_error& e) {
              cout << "Document renaming failed: " << e.what() << endl;
              return -1;
          }
          found = true;
        }
      }
    }
    if (!found) {
      cout << "Error: Document with name " << oldName << " does not exist." << endl;
      return -1;
    }
    return -1;
  }
  return -1;
}

//Delete a collection
int Collection::deleteOperation(string name, ObjectType type) {
  if(type == ObjectType::FOLDER){
    // Delete Collection with specified name
    int i = 0;
    bool found = false;
    for (auto& child : this->getChildren()) {
      if (child->getName() == name) {
        if (type == ObjectType::FOLDER){
          this->deleteChild(child, children, i);    
          }
          //System commands
          filesystem::path dir_path = this->path + "/" + name;
          error_code ec;
          if (filesystem::remove_all(dir_path, ec)) {
              cout << "Collection deleted successfully!" << endl;
              return 0;
          } else {
              cout << "Collection deletion failed: " << ec.message() << endl;
              return -1;
          }
          found = true;
        }
      i++;
    }
    if (!found) cout << "Error: Collection with name " << name << " does not exist." << endl;
    return -1;
  } else if (type == ObjectType::FILE){
    // Delete Collection with specified name
    int i = 0;
    bool found = false;
    for (auto& child : this->getChildren()) {
      if (child->getName() == name) {
        if (type == ObjectType::FILE){
          this->deleteChild(child, children, i);                
          //System commands
          filesystem::path dir_path = this->path + "/" + name + ".json";
          error_code ec;
          if (filesystem::remove_all(dir_path, ec)) {
              cout << "Document deleted successfully!" << endl;
              return 0;
          } else {
              cout << "Document deletion failed: " << ec.message() << endl;
              return -1;
          }
          found = true;
        }
      }
      i++;
    }
    if (!found) cout << "Error: Document with name " << name << " does not exist." << endl;
    return -1;
  }
  return -1;
}

//Lookup collection
Collection* Collection::lookupCollection(string path) {
    // Split the path into its components
    vector<string> components;
    stringstream ss(path);
    string component;
    while (getline(ss, component, '/')) {
        if (component != "") {
            components.push_back(component);
        }
    }

    // Traverse the path to find the target collection
    FilesystemObject* current = this; 
    for (string component : components) {

        bool found = false;
        for (auto child : current->getChildren()) {
            if (child->getName() == component && child->getType() == ObjectType::FOLDER) {
                current = child;
                found = true;
                break;
            }
        }
        if (!found) {
          cout << "PATH: " << path << endl;
          throw runtime_error("Collection not found: " + path);
        }
    }

    // Cast the current object to a Collection and return it
    Collection* collection = dynamic_cast<Collection*>(current);
    return collection;
}
