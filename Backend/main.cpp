#include "collection.h"
#include "crow.h"
#include <crow/middlewares/cors.h>

using namespace std;

void initializationID();
void initialization();
string pathDecoder(string path);

/*
TODO:
1) Permission for renaming a file with folders inside it
NOTE: Key to both is recursively deleting/renaming children
2) Error handling for crow
3) Returns for crow
*/

int main(){
    initialization();
    initializationID();

    crow::App<crow::CORSHandler> app;
    auto& cors = app.get_middleware<crow::CORSHandler>();
    // clang-format off
    cors
      .global()
        .headers("X-Custom-Header", "Access-Control-Allow-Origin")
        .methods("POST"_method, "GET"_method)
      .prefix("/cors")
        .origin("example.com")
      .prefix("/nocors")
        .ignore();
    // clang-format on

    Collection database("database", "../database");

    CROW_ROUTE(app, "/")([](){
        return crow::response(200, "Server running.");
    });

    CROW_ROUTE(app, "/create/<string>/<string>/<string>")([&database](string name, string path, string type){
        int error = -1;
        string decodedPath = pathDecoder(path);
        if(decodedPath == "database"){
            if(type == "folder"){
                error = database.createOperation(name, ObjectType::FOLDER);
            } else if (type == "file"){
                error = database.createOperation(name, ObjectType::FILE);
            }
        } else {
            if(type == "folder"){
                Collection* pathCollection = database.lookupCollection(decodedPath);
                error = pathCollection->createOperation(name, ObjectType::FOLDER);
            } else if (type == "file"){
                Collection* pathCollection = database.lookupCollection(decodedPath);
                error = pathCollection->createOperation(name, ObjectType::FILE);
            }
        }    

        if (error == -1){
            return crow::response(400);
        } else if (error == 0){
            return crow::response(200);
        }
        return crow::response(400);
    });

    CROW_ROUTE(app, "/update/<string>/<string>/<string>/<string>")([&database](string oldName, string newName, string path, string type){
        int error = -1;
        string decodedPath = pathDecoder(path);
        if(decodedPath == "database"){
            if(type == "folder"){
                error = database.updateOperation(oldName, newName, ObjectType::FOLDER);
            } else if (type == "file"){
                error = database.updateOperation(oldName, newName, ObjectType::FILE);
            }
        } else {
            if(type == "folder"){
                Collection* pathCollection = database.lookupCollection(decodedPath);
                error = pathCollection->updateOperation(oldName, newName, ObjectType::FOLDER);
            } else if (type == "file"){
                Collection* pathCollection = database.lookupCollection(decodedPath);
                error = pathCollection->updateOperation(oldName, newName, ObjectType::FILE);
            }
        }  

        if (error == -1){
            return crow::response(400);
        } else if (error == 0){
            return crow::response(200);
        }
        return crow::response(400);
    });

    CROW_ROUTE(app, "/delete/<string>/<string>/<string>")([&database](string name, string path, string type){
        int error = -1;
        string decodedPath = pathDecoder(path);
        if(decodedPath == "database"){
            if(type == "folder"){
                error = database.deleteOperation(name, ObjectType::FOLDER);
            } else if (type == "file"){
                error = database.deleteOperation(name, ObjectType::FILE);
            }
        } else {
            if(type == "folder"){
                Collection* pathCollection = database.lookupCollection(decodedPath);
                error = pathCollection->deleteOperation(name, ObjectType::FOLDER);
            } else if (type == "file"){
                Collection* pathCollection = database.lookupCollection(decodedPath);
                error = pathCollection->deleteOperation(name, ObjectType::FILE);
            }
        }    

        if (error == -1){
            return crow::response(400);
        } else if (error == 0){
            return crow::response(200);
        }
        return crow::response(400);
    });

    CROW_ROUTE(app, "/read/<string>/<string>/<string>")([&database](string name, string path, string type){
        string decodedPath = pathDecoder(path);
        string content = "Error";
        if(decodedPath == "database"){
            if(type == "folder"){
                content = database.readOperation(name, ObjectType::FOLDER);
            } else if (type == "file"){
                content = database.readOperation(name, ObjectType::FILE);
            }
        } else {
            if(type == "folder"){
                Collection* pathCollection = database.lookupCollection(decodedPath);
                content = pathCollection->readOperation(name, ObjectType::FOLDER);
            } else if (type == "file"){
                Collection* pathCollection = database.lookupCollection(decodedPath);
                content = pathCollection->readOperation(name, ObjectType::FILE);
            }
        }    
        
        if (content == "Error"){
            return crow::response(400, content);
        } else {
            cout << "CONTENT: " << content;
            return crow::response(200, content);
        }
        return crow::response(400);
    });

    CROW_ROUTE(app, "/editFile/<string>/<string>/<string>")([&database](string name, string path, string newContent){
        int error = -1;
        string decodedPath = pathDecoder(path);
        if(decodedPath == "database"){
            error = database.editFileOperation(name, path, newContent);
        } else {
            Collection* pathCollection = database.lookupCollection(decodedPath);
            error = pathCollection->editFileOperation(name, path, newContent);
        }    

        if (error == -1){
            return crow::response(400);
        } else if (error == 0){
            return crow::response(200);
        }
        return crow::response(400);
    });


    app.port(8000).multithreaded().run();
    return 0;
}


//Following are helper functions for main
void initializationID(){
    filesystem::path database_path = "../database";
    filesystem::create_directory(database_path);

    filesystem::path json_path = database_path / "metadata.json";

    if (filesystem::exists(json_path)) {
        std::cout << "Metadata file already exists at " << json_path << ", skipping creation of JSON file." << endl;
        return;
    }    

    nlohmann::json json_object;

    json_object["serialID"] = 1;

    ofstream json_file(json_path);
    json_file << json_object;
    json_file.close();

    cout << "JSON file created at " << json_path << endl;

    return;
}

void initialization(){
    string path = "../database";
    try {
        if (filesystem::exists(path)) {
            filesystem::remove_all(path);
        } else {
            cout << "Directory does not exist: " << path << endl;
        }
    } catch (const std::exception& e) {
        cout << "Error removing directory: " << e.what() << endl;
    }
}

string pathDecoder(string path){
    for (int i = 0; i < path.length(); i++) {
        if (path[i] == '-') {
            path[i] = '/';
        }
    }
    return path;
}
