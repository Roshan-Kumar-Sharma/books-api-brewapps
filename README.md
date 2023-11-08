# books-api-brewapps

In order to run this project
Run the following commands in terminal and follow instructions

1. Clone the repository in your local machine using the below command   
   ```$ git clone https://github.com/Roshan-Kumar-Sharma/books-api-brewapps.git```
   
3. Navigate inside the directory by the below command  
   ```$ cd books-api-brewapps```
   
5. Run the below command to install the dependencies  
   ```$ npm i```
   
6. create .env file in parent directory. Add following data in the created .env file   
   ```
   DB_URI=<MONGODB_ATLAS_LINK>
   DB_NAME=<DATABASE_NAME>
   ```
   
7. Execute the below command to start the server in development mode
   ```$ npm run dev```
   
9. Go through rest.http file to see how to use all the endpoints/apis

# APIs are hosted on render hosting platform:   
```https://books-api-b5k2.onrender.com```

# APIs usage

### Populate the database with test data   
```POST http://localhost:8080/populate_db```


### Get a book by id      
```GET http://localhost:8080/get_book_by_id/<book_id>```


### Get books by mulitple condition passed in query    
```GET http://localhost:8080/get_books?title=&author=&genre=&date_field=&s_date=&e_date=&sort_field=author&sort_type=&limit=5&offset=0```


### Add a new book(s)  
```
POST http://localhost:8080/add_books
Content-Type: application/json

{
    "title": "The Silent Patient",
    "author": "Alex Michaelides",
    "summary": "A psychological thriller about a woman who becomes mute after allegedly murdering her husband, and the psychotherapist determined to uncover the truth.",
    "genre": "Psychological Thriller",
    "publication_date": "2019-02-05"
}
```


### Update the title, author, genre of the book  
```
PUT http://localhost:8080/update_book/<book_id>
Content-Type: application/json

{
    "title": "Ramayan",
    "author": "Valmiki",
    "genre": "Mythology"
}
```


### Delete a book by its id   
```DELETE http://localhost:8080/delete_book/<book_id>```
