#ifndef DATABASES_H
#define DATABASES_H

#include <iostream>
#include <string>
#include <vector>
#include "collections.h"

using namespace std;

class Database {
public:
    // Constructor
    Database();
    Database(string name_);
    Database(string name_, vector<Collection> collections_);

    // Getter functions
    string getName();
    vector<Collection> getCollections();
        
    // Setter functions
    void setName(string name_);

    // Function declarations
    void create_Collection(string name);
    void update_Collection(string name, string newName);
    void delete_Collection(string name);
    void read();
    //Helper function
    Collection& lookup(string name);
        
private:
  string name;
  vector<Collection> collections;
};

#endif