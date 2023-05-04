#ifndef DOCUMENT_H
#define DOCUMENT_H

#include "filesystemobject.h"

using namespace std;

class Document : public FilesystemObject {
  public:
    // Constructor
    Document();
    Document(string name, string path);
    Document(string name, string path, string content);

    // Getter functions
    string getContent();
    //string getFormat();

    // Setter functions
    void setContent(string content);
    //void getFormat(string format);

    // CRUD Operations
    int createOperation(string name, ObjectType type);
    int updateOperation(string oldName, string newName, ObjectType type);
    int deleteOperation(string name, ObjectType type);

private:
  string content;
  //string format;
};

#endif
