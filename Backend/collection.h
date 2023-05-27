#ifndef COLLECTIONS_H
#define COLLECTIONS_H

#include "filesystemobject.h"
#include "document.h"
#include <regex>

using namespace std;

class Collection : public FilesystemObject{
    public:
        // Constructors
        Collection();
        Collection(string name, string path);
        ~Collection();
        
        // CRUD Operations
        int createOperation(string name, ObjectType type);
        int updateOperation(string oldName, string newName, ObjectType type);
        int deleteOperation(string name, ObjectType type);
        string readOperation(string name, ObjectType type);
        int editFileOperation(string name, string path, string newContent);

        //Other functions
        Collection* lookupCollection(string path);
        string displayContents();

};

#endif