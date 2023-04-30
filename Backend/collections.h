#ifndef COLLECTIONS_H
#define COLLECTIONS_H

#include <iostream>
#include <string>
#include <vector>
#include "documents.h"

using namespace std;

class Collection {
public:
    // Constructor
    Collection();
    Collection(string name_);
    Collection(string name_, vector<Document> documents_);

    // Getter functions
    string getName();
    vector<Document> getDocuments();
    string getParent();
    // Setter functions
    void setName(string name_);
    void setParent(string name_);
    
    // Function declarations
    void create_Document(int id, string content);
    string read_Document(int id);
    void update_Document(int id, string content);
    void delete_Document(int id);

    //Helper functions
    Document lookup(int id);
    string display_Documents();

private:
  string name;
  vector<Document> documents;
  string parent;
};

#endif