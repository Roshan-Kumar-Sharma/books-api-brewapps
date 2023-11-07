# books-api-brewapps

In order to run this project
Run the following commands in terminal and follow instructions

1. Clone the repository in your local machine
2. cd books-api-brewapps
3. npm i
4. create .env file in parent directory. Add following data in the created .env file
   DB_URI=<MONGODB ATLAS LINK>
   
5. npm run dev
6. Use rest.http file to see how to use all the enpoint/apis

# APIs usage

### Populate the database with test data
POST http://localhost:8080/populate_db


### Get a book by id
GET http://localhost:8080/get_book_by_id/<book_id>


### Get books by mulitple condition passed in query
GET http://localhost:8080/get_books?title=&author=&genre=&date_field=&s_date=&e_date=&sort_field=author&sort_type=&limit=5&offset=0


### Add a new book(s)
POST http://localhost:8080/add_books
Content-Type: application/json

{
    "title": "The Silent Patient",
    "author": "Alex Michaelides",
    "summary": "A psychological thriller about a woman who becomes mute after allegedly murdering her husband, and the psychotherapist determined to uncover the truth.",
    "genre": "Psychological Thriller",
    "publication_date": "2019-02-05"
}


### Update the title, author, genre of the book
PUT http://localhost:8080/update_book/<book_id>
Content-Type: application/json

{
    "title": "Ramayan",
    "author": "Valmiki",
    "genre": "Mythology"
}


# Delete a book by its id
DELETE http://localhost:8080/delete_book/<book_id>
Content-Type: application/json
