#include "collections.h"

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

vector<Document> Collection::getDocuments() {
  return documents;
}

//Setter functions
void Collection::setName(string name_) {
  name = name_;
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
  cout << "Document with ID " << id << " created successfully." << endl;
  return;
}

// READ DOCUMENT
void Collection::read_Document(int id) {
  // Find document with specified ID
  for (Document doc : documents) {
    if (doc.getId() == id) {
      cout << "ID: " << doc.getId() << std::endl;
      cout << "Content: " << doc.getContent() << std::endl;
      return;
    }
  }

  cout << "Error: document with ID " << id << " not found." << std::endl;
}

// UPDATE DOCUMENT
void Collection::update_Document(int id, string content) {
  // Find document with specified ID
  for (Document &doc : documents) {
    if (doc.getId() == id) {
      doc.setContent(content);
      cout << "Document with ID " << id << " updated successfully." << endl;
      return;
    }
  }
  cout << "Error: document with ID " << id << " not found." << endl;
}

// DELETE DOCUMENT
void Collection::delete_Document(int id) {
  // Delete Collection with specified name
  int i = 0;
  for (Document doc : documents) {
    if (doc.getId() == id) {
      documents.erase(documents.begin()+i);
      cout << "Erased document with ID " << doc.getId() << endl;
      return;
    }
    i++;
  }
  cout << "Error: document with id " << id << " does not exist." << endl;
}

//Helper functions
Document Collection::lookup (int id){
  for (Document doc : documents) {
    if (doc.getId() == id) {
      return doc;
    }
  } 
}
