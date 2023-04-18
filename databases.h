#ifndef DATABASES_H
#define DATABASES_H

#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Collection; //Forward declaration

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
    void create_Database(string name, vector<Database>& databases);
    void update_Database(string name, vector<Database>& databases);
    void delete_Database(string name, vector<Database>& databases);
        
private:
  string name;
  vector<Collection> collections;
};

#endif
