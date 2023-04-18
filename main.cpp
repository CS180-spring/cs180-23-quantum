#include "documents.h"
#include "collections.h"
#include "databases.h"

#include <iostream>
#include <vector> 

using namespace std;

// void printExistingDatabases(vector<Database> databases) {
//   cout << "Available databases:" << endl;
//   for(int i = 0; i < databases.size(); i++){
//     cout << i+1 << ". " << databases.at(i).getName() << endl;
//   }
//   cout << "Enter 0 for more options" << endl;
//   cout << "Enter q to quit the program" << endl;
// }

// void moreOptions(){
//   cout << "Available options:" << endl;
//   cout << "1. Create database" << endl;
//   cout << "2. Delete database" << endl;
//   cout << "3. Rename database" << endl;
// }

// void printDatabaseMenu(Database db) {
//   cout << "You are in database: " << db.getName() << endl;
//   cout << "Available collections:" << endl;
//   for (auto& collection : db.getCollections()) {
//     cout << "- " << collection.getName() << endl;
//   }
//   cout << "Enter 0 for more options" << endl;
//   cout << "Enter b to go back to databases" << endl;
// }

// void moreDatabaseOptions(Database db) {
//   cout << "Available options:" << endl;
//   cout << "1. Create collection" << endl;
//   cout << "2. Delete collection" << endl;
//   cout << "3. Rename collection" << endl;
// }

// void printCollectionMenu(Collection col) {
//   cout << "You are in collection: " << col.getName() << endl;
//   cout << "Available documents:" << endl;
//   for (auto& doc : col.getDocuments()) {
//     cout << "- " << doc.getId() << endl;
//   }
//   cout << "Enter 0 for more options" << endl;
//   cout << "Enter b to go back to the database" << endl;
// }

// void moreCollectionOptions(Collection col) {
//   cout << "Available options:" << endl;
//   cout << "1. Create document" << endl;
//   cout << "2. Delete document" << endl;
//   cout << "3. Rename document" << endl;
// }



int main() {
  cout << "hello world" << endl;
  
  
  // vector<Database> databases;
  // Database db1("MyDatabase");
  // databases.push_back(db1);

  // Collection col1("MyCollection", db1);

  // // Create a new Document
  // std::string data = "This is some sample data.";
  // Document doc1(1, data, col1);

}