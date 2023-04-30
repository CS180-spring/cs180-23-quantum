#include "collections.h"
#include "documents.h"
#include "databases.h"
#include "mastercontainer.h"
#include "crow.h"
#include <iostream>

int main() {
    crow::SimpleApp app; //define your crow application

    MasterContainer m;
    //define your endpoint at the root directory
    CROW_ROUTE(app, "/")([](){
        return "Server Running.";
    });

    //Regarding databases
    CROW_ROUTE(app, "/createDB/<string>")([&m](string newDB){
        m.create_Database(newDB);
        return newDB;
    });

    CROW_ROUTE(app, "/updateDB/<string>/<string>")
    ([&m](const crow::request& req, string oldDB, string newDB){
        m.update_Database(oldDB, newDB);
        return newDB;
    });


    CROW_ROUTE(app, "/deleteDB/<string>")
    ([&m](const crow::request& req,string delDB){
        m.delete_Database(delDB);
        return delDB;
    });

    CROW_ROUTE(app, "/displayDB")
    ([&m](const crow::request& req){
        string st = m.display_Databases();
        return st;
    });

    //Regarding collections
    CROW_ROUTE(app, "/createCL/<string>/<string>")([&m](string parentDB, string newColl){
        m.lookup(parentDB).create_Collection(newColl);
        return newColl;
    });

    CROW_ROUTE(app, "/updateCL/<string>/<string>/<string>")([&m](string parentDB, string oldColl, string newColl){
        m.lookup(parentDB).update_Collection(oldColl, newColl);
        return newColl;
    });

    CROW_ROUTE(app, "/deleteCL/<string>/<string>")([&m](string parentDB, string delColl){
        m.lookup(parentDB).delete_Collection(delColl);
        return delColl;
    });
    
    CROW_ROUTE(app, "/displayCL/<string>")
    ([&m](string parentDB){
        string st = m.lookup(parentDB).display_Collections();
        return st;
    });

    //Regarding Documents
    CROW_ROUTE(app, "/createDoc/<string>/<string>/<int>/<string>")([&m](string parentDB, string parentColl, int newDocID, string newDocContent){
        m.lookup(parentDB).lookup(parentColl).create_Document(newDocID, newDocContent);
        return newDocContent;
    });

    CROW_ROUTE(app, "/updateDoc/<string>/<string>/<int>/<string>")([&m](string parentDB, string parentColl, int docID, string newDocContent){
        m.lookup(parentDB).lookup(parentColl).update_Document(docID, newDocContent);
        return newDocContent;
    });

    CROW_ROUTE(app, "/deleteDoc/<string>/<string>/<int>")([&m](string parentDB, string parentColl, int delDocID){
        m.lookup(parentDB).lookup(parentColl).delete_Document(delDocID);
        return delDocID;
    });
    
    CROW_ROUTE(app, "/readDoc/<string>/<string>/<int>")([&m](string parentDB, string parentColl, int docID){
        string st = m.lookup(parentDB).lookup(parentColl).read_Document(docID);
        return st;
    });

    
    CROW_ROUTE(app, "/displayDocs/<string>/<string>") ([&m](string parentDB, string parentColl){
        string st = m.lookup(parentDB).lookup(parentColl).display_Documents();
        return st;
    });

    //set the port, set the app to run on multiple threads, and run the app
    app.port(8000).multithreaded().run();


  return 0;
}