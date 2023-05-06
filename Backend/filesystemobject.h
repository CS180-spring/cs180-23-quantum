#ifndef FILESYSTEMOBJECT_H
#define FILESYSTEMOBJECT_H

#include <iostream>
#include <string>
#include <vector>
#include <ctime>
#include <filesystem>
#include <fstream>
#include "nlohmann/json.hpp"

using namespace std;

enum class ObjectType {
    FOLDER,
    FILE
};

class FilesystemObject {
    public:
        // Constructor
        FilesystemObject();
        FilesystemObject(string name, string path);

        // Getter functions
        int getID();
        string getName();
        string getPath();
        time_t getCreated();
        time_t getModified();
        ObjectType getType();
        vector<FilesystemObject*> getChildren();
        FilesystemObject* getParent();

        // Setter functions
        //You cannot set ID, it is set upon creation
        void setName(string);
        void setPath(string);
        //You cannot set created, it is set upon creation
        void setModified(time_t);
        //You cannot set type, it is set upon creation
        void setChildren(vector<FilesystemObject*> children);
        void setParent(FilesystemObject* parent);

        // CRUD Operations
        virtual int createOperation(string name, ObjectType type) = 0;
        //Move to Document? string read_Document(int id);
        virtual int updateOperation(string newName, string oldName, ObjectType type) = 0;
        virtual int deleteOperation(string name, ObjectType type) = 0;

        // Other functions
        //Move to Collection? string displayContents();
        int incrementID();
        void deleteChild(FilesystemObject* &child, vector<FilesystemObject*> &children);

    protected:
        int id;
        string name;
        string path;
        time_t created;
        time_t modified;
        ObjectType type;
        vector<FilesystemObject*> children;
        FilesystemObject* parent;
};

#endif