#include "documents.h"

//Constructors
Document::Document(int id_) {
  id = id_;
  string content_ = "";
  content = content_;
}

Document::Document(int id_, string content_) {
  id = id_;
  content = content_;
}

// Getter functions
int Document::getId() { return id; }
string Document::getContent() { return content; }

// Setter functions
void Document::setId(int id_) { id = id_; }

void Document::setContent(string content_) { content = content_; }