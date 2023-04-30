#ifndef DOCUMENT_H
#define DOCUMENT_H

#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Document {
public:
    // Constructor
    Document(int id_);
    Document(int id_, string content_);

    // Getter functions
    int getId();
    string getContent();

    // Setter functions
    void setId(int id_);
    void setContent(string content_);

private:
  int id;
  string content;
};

#endif
