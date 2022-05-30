import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser

DB = './movie.sqlite'

def get_row_as_dict(row):
    row_dict = {
        'favID': row[0],
        'userID': row[1],
        'movieID': row[2],
        'movieTitle': row[3],
        'movieDuration': row[4],
        'movieType': row[5],
        'movieRating': row[6],
        'movieImage': row[7],
    }

    return row_dict

app = Flask(__name__)

@app.route('/api/users/<user>', methods=['GET'])
def validateUser(user):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''SELECT userID FROM users WHERE userID=?''',(user,))
    rows = cursor.fetchall()

    noResult = 0
    haveResult = 1

    if not rows:
        return jsonify(noResult), 200
    else:
        return jsonify(haveResult), 200

@app.route('/api/users', methods=['POST'])
def storeUser():
    if not request.json:
        abort(404)

    newUser = (
        request.json['userID'],
        request.json['userName'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''INSERT INTO users(userID,username) VALUES (?,?)''', newUser)

    user_ID = cursor.lastrowid

    db.commit()

    response = {
        'id': user_ID,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201


@app.route('/api/library/<user>', methods=['GET'])
@app.route('/api/library/<user>/', methods=['GET'])
def showLibrary(user):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''SELECT DISTINCT movies.movieID,movieTitle,movieType,movieDuration,movieRating,movieImage FROM library,movies WHERE library.userID = ? AND library.movieID = movies.movieID ORDER BY movieTitle ASC''',(user,))
    rows = cursor.fetchall()

    #print(rows)

    db.close()

    return jsonify(rows), 200

@app.route('/api/watchlist<user>', methods=['GET'])
@app.route('/api/watchlist/<user>/',methods=['GET'])
def showWatchlist(user):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''SELECT DISTINCT movies.movieID,movieTitle,movieType,movieDuration,movieRating,movieImage FROM watchlist,movies WHERE watchlist.userID = ? AND watchlist.movieID = movies.movieID ORDER BY movieTitle ASC''',(user,))
    rows = cursor.fetchall()

    db.close()

    return jsonify(rows), 200

@app.route('/api/watchlist/<user>/<watchlist>',methods=['GET'])
def searchWatchlist(user,watchlist):

    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''SELECT DISTINCT movies.movieID,movieTitle,movieType,movieDuration,movieRating,movieImage FROM watchlist,movies WHERE watchlist.userID = ? AND watchlist.movieID = movies.movieID AND movieTitle LIKE ? ORDER BY movieTitle ASC''', (user, '%' + watchlist + '%',))
    rows = cursor.fetchall()
    db.close()

    return jsonify(rows), 200

@app.route('/api/library/<user>/<library>',methods=['GET'])
def searchLibrary(user,library):

    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''SELECT DISTINCT movies.movieID,movieTitle,movieType,movieDuration,movieRating,movieImage FROM library,movies WHERE library.userID = ? AND library.movieID = movies.movieID AND movieTitle LIKE ? ORDER BY movieTitle ASC''', (user,'%' + library + '%',))
    rows = cursor.fetchall()
    db.close()

    return jsonify(rows), 200

@app.route('/api/cart', methods=['GET'])
def showCart():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''SELECT DISTINCT movies.movieID,movieTitle,movieType,movieDuration,movieRating,movieImage FROM cart,movies WHERE cart.userID = 1 AND cart.movieID = movies.movieID''')
    rows = cursor.fetchall()

    db.close()

    return jsonify(rows), 200

@app.route('/api/library/storeCart/user', methods=['POST'])
def storeToLibraryFromCart():
    if not request.json:
        abort(404)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cartToLib = (
        request.json['userID'],
        request.json['movieID'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''INSERT INTO library(userID,movieID) VALUES (?,?)''', cartToLib)

    library_ID = cursor.lastrowid

    db.commit()

    response = {
        'libID': library_ID,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

@app.route('/api/cart/retrieve/user/<user>', methods=['GET'])
def showIDCart(user):
    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''SELECT DISTINCT cart.userID,cart.movieID FROM cart WHERE cart.userID = ? ''',(user,))
    rows = cursor.fetchall()

    db.close()

    return jsonify(rows), 200

@app.route('/api/cart/user/<user>', methods=['GET'])
def showAllThingsCart(user):

    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''SELECT DISTINCT movies.movieID,movieTitle,movieType,movieDuration,movieRating,movieImage FROM cart,movies WHERE cart.userID = ? AND cart.movieID = movies.movieID''',(user,))
    rows = cursor.fetchall()

    db.close()

    return jsonify(rows), 200

@app.route('/api/cart/deleteall/<user>', methods=['DELETE'])
def deleteAllUserCart(user):
    if not request.json:
        abort(400)

    if 'userID' not in request.json:
        abort(400)

    if request.json['userID'] != user:
        abort(400)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''DELETE FROM cart WHERE cart.userID = ? ''',(user,))

    db.commit()

    response = {
        'userID': user,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

@app.route('/api/cart/<int:cart>', methods=['DELETE'])
def deleteCart(cart):
    if not request.json:
        abort(400)

    if 'id' not in request.json:
        abort(400)

    if int(request.json['id']) != cart:
        abort(400)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('DELETE FROM cart WHERE cart.movieID=?', (str(cart),))

    db.commit()

    response = {
        'id': cart,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

@app.route('/api/movies/', methods=['POST'])
def storeMovie():
    if not request.json:
        abort(404)

    newMovie = (
        request.json['movieID'],
        request.json['movieTitle'],
        request.json['movieDuration'],
        request.json['movieRating'],
        request.json['movieType'],
        request.json['movieImage'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''INSERT INTO movies(movieID, movieTitle, movieDuration, movieRating, movieType, movieImage) VALUES (?,?,?,?,?,?)''', newMovie)

    db.commit()

    response = {
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(1), 201

@app.route('/api/movies/<movieID>', methods=['GET'])
def validateMovieID(movieID):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''SELECT movieID FROM movies WHERE movieID=?''',(movieID,))
    rows = cursor.fetchall()

    noResult = 0
    haveResult = 1

    if not rows:
        return jsonify(noResult), 200
    else:
        return jsonify(haveResult), 200
@app.route('/api/watchlist/<movieID>', methods=['GET'])
def validateWatchlistMovieID(movieID):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''SELECT movieID FROM watchlist WHERE movieID=?''',(movieID,))
    rows = cursor.fetchall()

    noResult = 0
    haveResult = 1

    if not rows:
        return jsonify(noResult), 200
    else:
        return jsonify(haveResult), 200

@app.route('/api/watchlist/', methods=['POST'])
def storeWatchlist():
    if not request.json:
        abort(404)

    newWatchlist = (
        request.json['movieID'],
        request.json['userID'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''INSERT INTO watchlist(movieID,userID) VALUES (?,?)''', newWatchlist)

    watch_ID = cursor.lastrowid

    db.commit()

    response = {
        'watchID': watch_ID,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201
@app.route('/api/cart/<movieID>', methods=['GET'])
def validateCartMovieID(movieID):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''SELECT movieID FROM cart WHERE movieID=?''',(movieID,))
    rows = cursor.fetchall()

    noResult = 0
    haveResult = 1

    if not rows:
        return jsonify(noResult), 200
    else:
        return jsonify(haveResult), 200

@app.route('/api/cart/', methods=['POST'])
def storeCart():
    if not request.json:
        abort(404)

    newCart = (
        request.json['userID'],
        request.json['movieID'],
        request.json['price'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''INSERT INTO cart(userID,movieID,price) VALUES (?,?,?)''', newCart)

    cart_ID = cursor.lastrowid

    db.commit()

    response = {
        'cartID': cart_ID,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201



if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)
