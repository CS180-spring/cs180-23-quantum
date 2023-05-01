#include "collections.h"
#include <filesystem>

//remove after
#include <fstream>

using namespace std;

Collection::Collection(string name_) {
  name = name_;
  vector<Document> docs;
  documents = docs;
}

Collection::Collection(string name_, vector<Document> documents_){
  name = name_;
  documents = documents_;
}

//Getter functions
string Collection::getName() {
  return name;
}

string Collection::getParent() {
  return parent;
}

vector<Document> Collection::getDocuments() {
  return documents;
}

//Setter functions
void Collection::setName(string name_) {
  name = name_;
}

void Collection::setParent(string name_) {
  parent = name_;
}

//CRUD Operations
//Create a Document
void Collection::create_Document(int id, string content) {
  // Check if document with same ID already exists
  for (Document &doc : documents) {
    if (doc.getId() == id) {
      cout << "Error: document with ID " << id << " already exists." << endl;
      return;
    }
  }
  // Create new document if otherwise
  Document d(id, content);
  documents.push_back(d); 
  //System commands
  filesystem::path file_path = "../database/" + this->parent + "/" + name + "/" + to_string(id) + ".json";
  ofstream outfile(file_path);
  if (outfile.is_open()) {
      outfile << content;
      outfile.close();
      cout << "Document with ID " << id << " created successfully." << endl;
  } else {
      cout << "Failed to create document with ID " << id << endl;
  }
}

// READ DOCUMENT
string Collection::read_Document(int id) {
  // Find document with specified ID
  string st;
  for (Document doc : documents) {
    if (doc.getId() == id) {
      st += "Content: " + doc.getContent();
      st += "\n";
      return st;
    }
  }
  st += "Error: document with ID " + id;
  st += " not found.\n";
  return st;
}

// UPDATE DOCUMENT
void Collection::update_Document(int id, string content) {
  // Find document with specified ID
  bool worked = false;
  for (Document &doc : documents) {
    if (doc.getId() == id) {
      doc.setContent(content);
      //System commands
      filesystem::path file_path = "../database/" + this->parent + "/" + name + "/" + to_string(id) + ".json";
      ofstream outfile(file_path);
      if (outfile.is_open()) {
        outfile << content;
        outfile.close();
        cout << "Document with ID " << id << " updated successfully." << endl;
      } else {
        cout << "Failed to updated document with ID " << id << endl;
      }
        worked = true;
    }
  }
  if(!worked){
    cout << "Error: document with ID " << id << " not found." << endl;
  }
}

// DELETE DOCUMENT
void Collection::delete_Document(int id) {
  // Delete Collection with specified name
  int i = 0;
  bool worked = false;
  for (Document doc : documents) {
    if (doc.getId() == id) {
      documents.erase(documents.begin()+i);
      //System commands
      filesystem::path file_path = "../database/" + this->parent + "/" + name + "/" + to_string(id) + ".json";
      error_code ec;
      if (filesystem::remove_all(file_path, ec)) {
          cout << "Document deleted successfully!" << endl;
      } else {
          cout << "Document deletion failed: " << ec.message() << endl;
      }
      worked = true;
    }
    i++;
  }
  if (!worked) cout << "Error: Document with name " << name << " does not exist." << endl;
}

//Helper functions
Document Collection::lookup (int id){
  for (Document doc : documents) {
    if (doc.getId() == id) {
      return doc;
    }
  }
  throw std::runtime_error("Collection not found");
}

string Collection::display_Documents() {
  string st;
  for (Document doc : documents) {
    st += doc.getId();
    st += " ";
  }
  return st;
}
