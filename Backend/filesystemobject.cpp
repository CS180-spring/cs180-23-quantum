#include "filesystemobject.h"
#include <filesystem>
#include <fstream>

using namespace std;

FilesystemObject::FilesystemObject() {
    this->id = incrementID();
    this->name = "";
    this->path = "";
    this->created = time(nullptr);
    this->modified = time(nullptr);
    this->type = ObjectType::FOLDER;
    //children = vector<FilesystemObject*>();
    this->parent = nullptr;
}

FilesystemObject::FilesystemObject(string name, string path) {
    this->id = incrementID();
    this->name = name;
    this->path = path;
    this->created = time(nullptr);
    this->modified = this->created;
    this->type = ObjectType::FOLDER;
    //children = vector<FilesystemObject*>();
    this->parent = nullptr;
}

int FilesystemObject::getID() {
    return this->id;
}

string FilesystemObject::getName() {
    return this->name;
}

string FilesystemObject::getPath() {
    return this->path;
}

time_t FilesystemObject::getCreated() {
    return this->created;
}

time_t FilesystemObject::getModified() {
    return this->modified;
}

ObjectType FilesystemObject::getType() {
    return this->type;
}

vector<FilesystemObject*> FilesystemObject::getChildren() {
    return this->children;
}

FilesystemObject* FilesystemObject::getParent() {
    return parent;
}

void FilesystemObject::setName(string name) {
    this->name = name;
}

void FilesystemObject::setPath(string path) {
    this->path = path;
}

void FilesystemObject::setModified(time_t modified) {
    this->modified = modified;
}

void FilesystemObject::setChildren(vector<FilesystemObject*> children) {
    this->children = children;
}

void FilesystemObject::setParent(FilesystemObject* parent) {
    this->parent = parent;
}

int FilesystemObject::incrementID() {
    filesystem::path database_path = "../database";
    filesystem::path json_path = database_path / "metadata.json";
    nlohmann::json json_object;

    ifstream json_file(json_path);
    json_file >> json_object;
    json_file.close();

    int serial_id = json_object["serialID"];
    json_object["serialID"] = serial_id + 1;

    ofstream updated_json_file(json_path);
    updated_json_file << json_object;
    updated_json_file.close();

    return serial_id;
}


//Delete virtual child
void FilesystemObject::deleteChild(FilesystemObject* &child, vector<FilesystemObject*> &children) {
  if (child->children.size() == 0) {
    auto it = find(children.begin(), children.end(), child);
    if(it != children.end()){
        children.erase(it);
        delete child;
    }
  }
  else {
    for (auto ch : child->getChildren()) {
      child->deleteChild(ch, child->children);
    }
    // After all children have been deleted, delete the child itself and remove it from parent's children vector
    auto it = find(children.begin(), children.end(), child);
    if (it != children.end()) {
      children.erase(it);
      delete child;
    }
  }
}
