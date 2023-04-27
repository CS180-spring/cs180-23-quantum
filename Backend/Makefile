QuantumDb.x: main.o mastercontainer.o databases.o collections.o documents.o
	g++ -std=c++17 main.o mastercontainer.o databases.o collections.o documents.o -o QuantumDb.x

main.o: main.cpp collections.h documents.h databases.h mastercontainer.h
	g++ -std=c++17 main.cpp -o main.o -c

mastercontainer.o: mastercontainer.cpp mastercontainer.h databases.h collections.h documents.h
	g++ -std=c++17 mastercontainer.cpp -o mastercontainer.o -c

databases.o: databases.cpp databases.h collections.h documents.h
	g++ -std=c++17 databases.cpp -o databases.o -c

collections.o: collections.cpp collections.h documents.h
	g++ -std=c++17 collections.cpp -o collections.o -c

documents.o: documents.cpp documents.h
	g++ -std=c++17 documents.cpp -o documents.o -c

cleanObjects:
	rm *.o

clean:
	rm *.o
	rm *.x
	rm -r ../database

freeCache:
	git rm -r --cached ../.