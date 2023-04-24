cmake_minimum_required(VERSION 3.0.0)
project(quantumdb VERSION 0.1.0)

add_library(backend OBJECT
    backend/documents.cpp
    backend/collections.cpp
    backend/databases.cpp
    backend/mastercontainer.cpp
)

add_custom_target(backend_target
    DEPENDS backend
)

add_executable(quantumdb
    backend/main.cpp
)

target_link_libraries(quantumdb
    backend
)