#include <filesystem>
#include "query.h"

void Query::search(string name, string path, Collection& currCollection, vector<string> &results) {
    for (auto child : currCollection.getChildren()) {
        if(child->getName() == name && child->getType() == ObjectType::FOLDER){
            string str = child->getPath();
            
            //Per request from the frontend team:
            str = str.substr(3);

            results.push_back(str);
        }
        if(child->getName() == name && child->getType() == ObjectType::FILE){
            string str = child->getPath();
            
            //Per request from the frontend team:
            str += ".json";
            str = str.substr(3);

            results.push_back(str);
        }
        if (child->getType() == ObjectType::FOLDER) {
            // Recursively search the sub-collection
            Collection* coll = static_cast<Collection*>(child);
            search(name, child->getPath(), *coll, results);
        }
    }
}
