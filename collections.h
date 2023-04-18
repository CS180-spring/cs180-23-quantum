#ifndef COLLECTIONS_H
#define COLLECTIONS_H

#include <iostream>
#include <string>
#include <vector>
#include "databases.h"

using namespace std;

class Document; //Forward Declaration

class Collection {
public:
    // Constructor
    Collection();
    Collection(string name_, Database parentDB_);
    Collection(string name_, vector<Document> documents_, Database parenDB_);

    // Getter functions
    string getName();
    vector<Document> getDocuments();
    Database getParentDB();
    
    // Setter functions
    void setName(string name_);
    
    // Function declarations
    void create_Collection(string name, Database parentDB);
    void update_Collection(string name, Database parentDB);
    void delete_Collection(string name, Database parentDB);

private:
  string name;
  vector<Document> documents;
  Database parentDB;
};

#endif