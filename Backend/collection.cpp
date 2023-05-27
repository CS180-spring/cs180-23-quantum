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
        cout << "Collection with name " << name << " created successfully." << endl;
        return 0;
    } else {
        cout << "Collection creation failed: " << ec.message() << endl;
        return -2;
    }
  } else if(type == ObjectType::FILE){
    for (auto& child : this->getChildren()) {
      if (child->getName() == name) {
        if (child->getType() == ObjectType::FILE){
          cout << "Error: file with name " << name << " already exists." << endl;
          return -3;
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
        return 1;
    } else {
        cout << "Failed to create document with name " << name << endl;
        return -4;
    }
  }
  return -5;
}

//Update a collection
int Collection::updateOperation(string oldName, string newName, ObjectType type) {
  cout << "NAMES: ";
  for (auto& child : this->getChildren()) {
    cout << child->getName() << " ";
  }
  cout << endl;

  if(type == ObjectType::FOLDER){
    bool found = false;
    for (auto& child : this->getChildren()) {
      if (child->getName() == oldName) {
        if(type == ObjectType::FOLDER){
          for (auto& ch : this->getChildren()) {
            if(ch->getName() == newName && ch->getType() == ObjectType::FOLDER){
              cout << "Collection with name " << newName << " already exists." << endl;
              return -1;
            }
          }

          //Set the new name
          child->setName(newName);
          //Set the new path
          string oldPath = child->getPath();
          string newPath = child->getPath();
          int lastSlashIndex = newPath.find_last_of("/");
          if (lastSlashIndex != string::npos) {
              newPath.erase(lastSlashIndex);
          }
          newPath += "/";
          newPath += child->getName();
          child->setPath(newPath);

          //Change path of all children
          this->renameChildren(child, newPath, oldPath);
  
          //System commands
          string old_path = this->path + "/" + oldName;
          string new_path = this->path + "/" + newName;
          try {
            // filesystem::permissions(old_path, filesystem::perms::owner_all | filesystem::perms::group_all | filesystem::perms::others_all);
            filesystem::rename(old_path, new_path);
            cout << "Collection renamed to " << newName << " successfully." << endl;
            return 0;
          } catch (const filesystem::filesystem_error& e) {
            cout << "Collection renaming failed: " << e.what() << endl;
            return -2;
          }
          found = true;
        }
      }
    }
    if (!found) {
      cout << "Error: Collection with name " << oldName << " does not exist." << endl;
      return -3;
    }
    return -4;
  } else if (type == ObjectType::FILE){
    bool found = false;
    for (auto& child : this->getChildren()) {
      if (child->getName() == oldName) {
        if(type == ObjectType::FILE){
          for (auto& ch : this->getChildren()) {
            if(ch->getName() == newName && ch->getType() == ObjectType::FILE){
              cout << "Document with name " << newName << " already exists." << endl;
              return -7;
            }
          }
          child->setName(newName);
          //System commands
          cout <<  this->path;
          string old_path = this->path + "/" + oldName + ".json";
          string new_path = this->path + "/" + newName + ".json";
          try {
              filesystem::rename(old_path, new_path);
              cout << "Document renamed to " << newName << " successfully." << endl;
              return 1;
          } catch (const filesystem::filesystem_error& e) {
              cout << "Document renaming failed: " << e.what() << endl;
              return -5;
          }
          found = true;
        }
      }
    }
    if (!found) {
      cout << "Error: Document with name " << oldName << " does not exist." << endl;
      return -6;
    }
  }
  return -5;
}

//Delete a collection
int Collection::deleteOperation(string name, ObjectType type) {
  if(type == ObjectType::FOLDER){
    // Delete Collection with specified name
    bool found = false;
    for (auto& child : this->getChildren()) {
      if (child->getName() == name) {
        if (type == ObjectType::FOLDER){
          this->deleteChild(child, children);
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
    }
    if (!found) cout << "Error: Collection with name " << name << " does not exist." << endl;
    return -2;
  } else if (type == ObjectType::FILE){
    // Delete Collection with specified name
    bool found = false;
    for (auto& child : this->getChildren()) {
      if (child->getName() == name) {
        if (type == ObjectType::FILE){
          this->deleteChild(child, children);                
          //System commands
          filesystem::path dir_path = this->path + "/" + name + ".json";
          error_code ec;
          if (filesystem::remove_all(dir_path, ec)) {
              cout << "Document deleted successfully!" << endl;
              return 1;
          } else {
              cout << "Document deletion failed: " << ec.message() << endl;
              return -3;
          }
          found = true;
        }
      }
    }
    if (!found) cout << "Error: Document with name " << name << " does not exist." << endl;
    return -4;
  }
  return -5;
}

//Read a collection
string Collection::readOperation(string name, ObjectType type) {
  // Read contents of a collection with specified name
  // Name does not matter here, only path matters.
  string str;
  if(type == ObjectType::FOLDER){
    for (auto& child : this->getChildren()) {
      if (child->getType() == ObjectType::FOLDER){
        str = str + child->getName();
        str = str + "-";
      } else if (child->getType() == ObjectType::FILE){
        str = str + child->getName();
        str = str + ".json-";
      }
    }
    return str;
  } 
  else if (type == ObjectType::FILE){
    // Read contents of a file with specified name
    // Name does matter here since this is a file.
    string str;
    bool found = false;
    for (auto& child : this->getChildren()) {
      if (child->getName() == name) {
        if (type == ObjectType::FILE){
          found = true;
          Document* doc = dynamic_cast<Document*>(child);
          if(doc != nullptr){
            str = doc->getContent();
            return str;
          } else {
            str = "Something went wrong.";
            cout << str;
            return "Error";
          }
          break;
        }
      }
    }
    if (!found){
      return "File not Found.";
    }
    return str;
  }
  cout << "An unexpcted event happened.";
  return "Error";
}

//Update file content
int Collection::editFileOperation(string name, string path, string newContent){
  bool found = false;
  for (auto& child : this->getChildren()) {
    if (child->getName() == name && child->getType() == ObjectType::FILE) {
      Document* doc = dynamic_cast<Document*>(child);
      doc->setContent(newContent);
      
      //System commands
      string file_path = "../database/" + this->path + "/" + name + ".json";
      /*
        Comments regarding the next 2 lines of code:
        When new content is passed in, it will have "%20" instead of space, 
        and "%0A" instead of new lines. The two following lines will replace those
        You can add or edit later if needed. This is so that you can literally 
        have spaces in the crow route. 
        Edit this comment if needed as well.
      */
      string content = regex_replace(newContent, regex("%20"), " ");
      content = regex_replace(content, regex("%0A"), "\n");

      ofstream file(file_path);
      if (file.is_open()){
        file << content;
        file.close();
        cout << "Document content changed successfully." << endl;
        return 0;
      }
      else {
        cout << "Error: Unable to open file." << endl;
        return -1;
      }
      found = true;
    }
  }
  if (!found) {
    cout << "Error: Document with name " << name << " does not exist." << endl;
    return -2;
  }
  return -3;
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
          throw runtime_error("Collection not found: " + path);
        }
    }

    // Cast the current object to a Collection and return it
    Collection* collection = dynamic_cast<Collection*>(current);
    return collection;
}
