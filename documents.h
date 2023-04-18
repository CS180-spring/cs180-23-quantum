#ifndef DOCUMENT_H
#define DOCUMENT_H

#include <iostream>
#include <string>
#include <vector>
#include "collections.h"

using namespace std;

class Document {
public:
    // Constructor
    Document(int id_, Collection parentCollection_);
    Document(int id_, string content_, Collection parentCollection_);

    // Getter functions
    int getId();
    string getContent();
    Collection getParentCollection();

    // Setter functions
    void setId(int id_);
    void setContent(string content_);

    // Function declarations
    void create_document(int id, string content, Collection parentCollection);
    void read_document(int id, Collection parentCollection);
    void update_document(int id, string content, Collection parentCollection);
    void delete_document(int id, Collection parentCollection);

private:
  int id;
  string content;
  Collection parentCollection;
};

#endif
