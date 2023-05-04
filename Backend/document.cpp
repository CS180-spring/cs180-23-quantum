#include "document.h"

//Constructors
Document::Document() {
  this->type = ObjectType::FILE;
}

Document::Document(string name, string path) {
  this->name = name;
  this->type = ObjectType::FILE;
  this->path = path;
}

Document::Document(string name, string path, string content) {
  this->name = name;
  this->type = ObjectType::FILE;
  this->path = path;
  this->content = content;
}

// Getter functions
string Document::getContent() { return content; }
//string Document::getFormat() { return format; }

// Setter functions
void Document::setContent(string content) { this->content = content; }
//void Document::setFormat(string format) { this->format = format; }

//CRUD
int Document::createOperation(string name, ObjectType type){
  //No need to implemenet, already implemented in collection class
  return -1;
}

int Document::updateOperation(string oldName, string newName, ObjectType type){
  //No need to implemenet, already implemented in collection class
  return -1;
}

int Document::deleteOperation(string name, ObjectType type){
  //No need to implemenet, already implemented in collection class
  return -1;
}