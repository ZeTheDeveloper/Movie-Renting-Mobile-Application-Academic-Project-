import sqlite3
db = sqlite3.connect('movie.sqlite')

#db.execute('')

db.execute('DROP TABLE IF EXISTS library')
db.execute('DROP TABLE IF EXISTS users')
db.execute('DROP TABLE IF EXISTS movies')
db.execute('DROP TABLE IF EXISTS cart')
db.execute('DROP TABLE IF EXISTS watchlist')

db.execute('''CREATE TABLE users(
    userID text PRIMARY KEY,
    username text NOT NULL
)''')

db.execute('''CREATE TABLE movies(
    movieID integer PRIMARY KEY,
    movieTitle text NOT NULL,
    movieDuration text NOT NULL,
    movieRating text NOT NULL,
    movieType text NOT NULL,
    movieImage text NOT NULL
)''')

db.execute('''CREATE TABLE watchlist(
    watchID integer PRIMARY KEY AUTOINCREMENT,
    userID text NOT NULL,
    movieID integer NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(UserID),
    FOREIGN KEY (movieID) REFERENCES movies(movieID)
)''')

db.execute('''CREATE TABLE library(
    libID integer PRIMARY KEY AUTOINCREMENT,
    userID text NOT NULL,
    movieID integer NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(UserID),
    FOREIGN KEY (movieID) REFERENCES movies(movieID)
)''')

db.execute('''CREATE TABLE cart(
    cartID integer PRIMARY KEY AUTOINCREMENT,
    userID text NOT NULL,
    movieID integer NOT NULL,
    price integer NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(UserID),
    FOREIGN KEY (movieID) REFERENCES movies(movieID)
)''')


cursor = db.cursor()

#cursor.execute(''' ''')

#users
#movies
#library
#watchlist
#cart


db.commit()
db.close()

print("Inserted")