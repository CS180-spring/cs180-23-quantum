#include "documents.h"

//Constructors
Document::Document(int id_, Collection parentCollection_) {
  id = id_;
  string content_ = "";
  content = content_;
  parentCollection = parentCollection_;
}

Document::Document(int id_, string content_, Collection parentCollection_) {
  id = id_;
  content = content_;
  parentCollection = parentCollection_;
}

// Getter functions
int Document::getId() { return id; }
string Document::getContent() { return content; }
Collection Document::getParentCollection() {
  return parentCollection;
};

// Setter functions
void Document::setId(int id_) { id = id_; }

void Document::setContent(string content_) { content = content_; }

// CRUD operations
// CREATE DOCUMENT
void create_document(int id, string content, Collection parentCollection) {
  // Check if document with same ID already exists
  for (Document &doc : parentCollection.getDocuments()) {
    if (doc.getId() == id) {
      cout << "Error: document with ID " << id << " already exists." << endl;
      return;
    }
  }
  // Create new document if otherwise
  Document d(id, content, parentCollection);
  parentCollection.getDocuments().push_back(d);
  cout << "Document with ID " << id << " created successfully." << endl;
  return;
}

// READ DOCUMENT
void read_document(int id, Collection parentCollection) {
  // Find document with specified ID
  for (Document doc : parentCollection.getDocuments()) {
    if (doc.getId() == id) {
      cout << "ID: " << doc.getId() << std::endl;
      cout << "Content: " << doc.getContent() << std::endl;
      return;
    }
  }

  cout << "Error: document with ID " << id << " not found." << std::endl;
}

// UPDATE DOCUMENT
void update_document(int id, string &new_content, Collection parentCollection) {
  // Find document with specified ID
  for (Document &doc : parentCollection.getDocuments()) {
    if (doc.getId() == id) {
      doc.setContent(new_content);
      cout << "Document with ID " << id << " updated successfully." << endl;
      return;
    }
  }
  cout << "Error: document with ID " << id << " not found." << endl;
}

// DELETE DOCUMENT
void delete_document(int id, Collection parentCollection) {
  // Find document with specified ID
  for (auto it = parentCollection.getDocuments().begin(); it != parentCollection.getDocuments().end(); ++it) {
    if (it->getId() == id) {
      parentCollection.getDocuments().erase(it);
      cout << "Document with ID " << id << " deleted successfully." << endl;
      return;
    }
  }
  cout << "Error: document with ID " << id << " not found." << endl;
}