#ifndef QUERY_H
#define QUERY_H

#include <string>
#include <vector>
#include "collection.h"

using namespace std;

class Query {
public:
    void search(string name, string path, Collection& currCollection, vector<string> &results);
};

#endif