#ifndef MASTERCONTAINER_H
#define MASTERCONTAINER_H


#include <iostream>
#include <string>
#include <vector>
#include "databases.h"

using namespace std;

class MasterContainer {
    public:
        MasterContainer();
        void create_Database(string name);
        void update_Database(string name, string newName);
        void delete_Database(string name);
        void readAll_Database();
        vector<Database> get();
        Database& lookup(string name);
    private:
        vector<Database> databases;
};

#endif