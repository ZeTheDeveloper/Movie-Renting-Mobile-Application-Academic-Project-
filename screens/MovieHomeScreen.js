import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import YoutubePlayer from 'react-native-youtube-iframe';

import Movie from '../UI/Movie';
import {AuthContext} from '../navigation/AuthNavigator';

let tmdb = require('../assets/api/TMDBApi');
let config = require('../assets/api/DatabaseConfig');

function MovieHomeScreen() {
  // add firebase sign-out and user info function later
  const user = useContext(AuthContext);

  //console.log(user.uid);

  const [state, setState] = useState({
    selected: {},
    title: {},
    year: {},
    spoken_languages: {},
    duration: {},
    movieType: {},
    selectedYoutubeKey: {},
  });

  const [moviesPopular, setMoviesPopular] = useState({});

  useEffect(() => {
    fetch(tmdb.settings.popularMovieApi)
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        setMoviesPopular(data.results);
      });
  }, []);

  const [showsPopular, setShowsPopular] = useState({});

  useEffect(() => {
    fetch(tmdb.settings.popularTVShowApi)
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        setShowsPopular(data.results);
      });
  }, []);

  const [animesPopular, setAnimesPopular] = useState({});

  useEffect(() => {
    fetch(tmdb.settings.popularAnimeApi)
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        setAnimesPopular(data.results);
      });
  }, []);

  const [comediesPopular, setComediesPopular] = useState({});

  useEffect(() => {
    fetch(tmdb.settings.popularComedyApi)
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        setComediesPopular(data.results);
      });
  }, []);

  const [crimesPopular, setCrimesPopular] = useState({});

  useEffect(() => {
    fetch(tmdb.settings.popularCrimeApi)
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        setCrimesPopular(data.results);
      });
  }, []);

  const showMovieTrailer = id => {
    axios(
      tmdb.settings.movieBaseUrl +
        id +
        '/videos?api_key=' +
        tmdb.settings.apiKey +
        '&language=en-US',
    ).then(({data}) => {
      var result = data.results;

      console.log(data);

      var key, i;

      for (i = 0; i < result.length; i++) {
        if (data.results[i].site.localeCompare('YouTube') == 0) {
          if (data.results[i].official == true) {
            if (data.results[i].type.localeCompare('Trailer') == 0) {
              key = data.results[i].key;
              console.log('Movie Official Trailer: ' + key);
              break;
            } else if (data.results[i].type.localeCompare('Teaser') == 0) {
              key = data.results[i].key;
              console.log('Movie Official Teaser: ' + key);
              break;
            }
          } else if (data.results[i].official == false) {
            if (data.results[i].type.localeCompare('Trailer') == 0) {
              key = data.results[i].key;
              console.log('Movie non Official Trailer: ' + key);
              break;
            } else if (data.results[i].type.localeCompare('Teaser') == 0) {
              key = data.results[i].key;
              console.log('Movie non Official Teaser: ' + key);
              break;
            }
          }
        }
      }

      console.log(key);

      setState(prevState => {
        return {
          ...prevState,
          selectedYoutubeKey: key,
        };
      });
    });
  };

  const showTVTrailer = id => {
    axios(
      tmdb.settings.showBaseUrl +
        id +
        '/videos?api_key=' +
        tmdb.settings.apiKey +
        '&language=en-US',
    ).then(({data}) => {
      var result = data.results;

      console.log(data);

      var key, i;

      for (i = 0; i < result.length; i++) {
        if (data.results[i].site.localeCompare('YouTube') == 0) {
          if (data.results[i].official == false) {
            if (data.results[i].type.localeCompare('Trailer') == 0) {
              key = data.results[i].key;
              console.log('TV non  Official Trailer: ' + key);
              break;
            } else if (data.results[i].type.localeCompare('Featurette') == 0) {
              key = data.results[i].key;
              console.log('TV non Official Featured: ' + key);
              break;
            } else if (
              data.results[i].type.localeCompare('Opening Credits') == 0
            ) {
              key = data.results[i].key;
              console.log('TV non Official OP: ' + key);
              break;
            } else if (data.results[i].type.localeCompare('Teaser') == 0) {
              key = data.results[i].key;
              console.log('TV non Official Teaser: ' + key);
              break;
            }
          }
        }

        if (data.results[i].official == true) {
          if (data.results[i].type.localeCompare('Trailer') == 0) {
            key = data.results[i].key;
            console.log('TV Official Trailer: ' + key);
          } else if (data.results[i].type.localeCompare('Featurette') == 0) {
            key = data.results[i].key;
            console.log('TV  Official Featured: ' + key);
          } else if (
            data.results[i].type.localeCompare('Opening Credits') == 0
          ) {
            key = data.results[i].key;
            console.log('TV Official OP: ' + key);
          } else if (data.results[i].type.localeCompare('Teaser') == 0) {
            key = data.results[i].key;
            console.log('TV Official Teaser: ' + key);
          }
        }
      }

      setState(prevState => {
        return {
          ...prevState,
          selectedYoutubeKey: key,
        };
      });
    });
  };

  const openPopupMovie = id => {
    axios(
      tmdb.settings.movieBaseUrl +
        id +
        '?api_key=' +
        tmdb.settings.apiKey +
        '&language=en-US',
    ).then(({data}) => {
      let result = data;
      //console.log(result);
      /* console.log(result.spoken_languages[0].name); */
      let title = result.title;
      let year = result.release_date.slice(0, 4);
      let language = result.spoken_languages[0].english_name;
      let duration = result.runtime;

      setState(prevState => {
        return {
          ...prevState,
          selected: result,
          title: title,
          year: year,
          spoken_languages: language,
          duration: duration,
          movieType: 'Movie',
        };
      });
    });
  };

  const openPopupShow = id => {
    axios(
      tmdb.settings.showBaseUrl +
        id +
        '?api_key=' +
        tmdb.settings.apiKey +
        '&language=en-US',
    ).then(({data}) => {
      let result = data;
      let title = result.name;
      let year = result.first_air_date.slice(0, 4);
      let language = result.spoken_languages[0].english_name;
      let duration = result.episode_run_time;
      // console.log(result);

      setState(prevState => {
        return {
          ...prevState,
          selected: result,
          title: title,
          year: year,
          spoken_languages: language,
          duration: duration,
          movieType: 'Series',
        };
      });
    });
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [searchMovieResults, setSearchMovieResults] = useState({});
  const [searchTVResults, setSearchTVResults] = useState({});

  const handleOnSubmitMovie = e => {
    e.preventDefault();

    fetch(tmdb.settings.searchMovieApi + searchTerm)
      .then(res => res.json())
      .then(data => {
        setSearchMovieResults(data.results);
      });

    setSearchTerm('');
  };

  const handleOnSubmitTV = e => {
    e.preventDefault();

    fetch(tmdb.settings.searchTVApi + searchTerm)
      .then(res => res.json())
      .then(data => {
        setSearchTVResults(data.results);
      });

    setSearchTerm('');
  };

  const handleOnSubmit = e => {
    handleOnSubmitMovie(e);
    handleOnSubmitTV(e);
  };

  useEffect(() => {
    async function validateUser() {
      let url = config.settings.serverPath + '/api/users/' + user.uid;

      fetch(url)
        .then(response => {
          if (!response.ok) {
            Alert.alert('Error', response.status.toString());
            throw Error('Error ' + response.status);
          }
          return response.json();
        })
        .then(checkUser => {
          if (checkUser == 0) {
            storeUser();
          } else {
            console.log(
              'The user ' + user.displayName + ' has already been registered',
            );
          }
        })
        .catch(error => {
          console.log(error);
        });
    }

    async function storeUser() {
      let url = config.settings.serverPath + '/api/users';

      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: user.uid,
          userName: user.displayName,
        }),
      })
        .then(response => {
          if (!response.ok) {
            Alert.alert('Error', response.status.toString());
            throw Error('Error ' + response.status);
          }
          return response.json();
        })
        .then(responseJson => {
          if (responseJson.affected > 0) {
            console.log(
              'The user: ' +
                user.displayName +
                ' has been saved to local database',
            );
          } else {
            console.log('Error saving record');
          }
        });
    }

    validateUser();

    return () => {};
  }, []);

  const popupMovieandTrailer = id => {
    openPopupMovie(id);
    showMovieTrailer(id);
  };

  const popupTVandTrailer = id => {
    openPopupShow(id);
    showTVTrailer(id);
  };

  /* Store value to Movie */
  const storeMovie = () => {
    let movieUrl = config.settings.serverPath + 'api/movies/';

    fetch(movieUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieID: state.selected.id,
        movieTitle: state.title,
        movieDuration: state.duration.toString(),
        movieRating: state.selected.vote_average.toString(),
        movieType: state.movieType,
        movieImage: state.selected.poster_path,
      }),
    })
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }

        return response.json();
      })
      .then(responseJson => {
        if (responseJson.affected > 0) {
          Alert.alert(
            'Added to watchlist',
            'Record for `' + state.title + '` has been added',
          );
        } else {
          console.log('Error saving record');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  /* Store value to Watchlist */
  const validateWatchlist = () => {
    /* Check if movieID already exist in movie database */
    let movieValidationUrl =
      config.settings.serverPath + '/api/movies/' + state.selected.id;
    console.log(state.selected.id);
    fetch(movieValidationUrl)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(checkMovie => {
        if (checkMovie == 0) {
          storeMovie();
        } else {
          console.log(
            'The movie ' + state.title + ' has already been registered',
          );
        }
      })
      .catch(error => {
        console.log(error);
      });

    /* Check if movieID already exist in watchlist database */
    let watchlistValidationUrl =
      config.settings.serverPath + '/api/watchlist/' + state.selected.id;

    fetch(watchlistValidationUrl)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(checkMovie => {
        if (checkMovie == 0) {
          storeWatchlist();
        } else {
          Alert.alert(
            'Watchlist',
            'Record for `' + state.title + '` is already in watchlist',
          );
          console.log('The movie ' + state.title + ' is already in watchlist');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  /* Store value to watchlist */
  const storeWatchlist = () => {
    let watchlistUrl = config.settings.serverPath + '/api/watchlist/';

    fetch(watchlistUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieID: state.selected.id,
        userID: user.uid,
      }),
    })
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }

        return response.json();
      })
      .then(responseJson => {
        if (responseJson.affected > 0) {
          Alert.alert(
            'Added to watchlist',
            'Record for `' + state.title + '` has been added',
          );
        } else {
          Alert.alert(' Error saving record');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const validateCart = () => {
    /* Check if movieID already exist in movie database */
    let movieValidationUrl =
      config.settings.serverPath + '/api/movies/' + state.selected.id;

    fetch(movieValidationUrl)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(checkMovie => {
        console.log(checkMovie);
        if (checkMovie == 0) {
          storeMovie();
        } else {
          console.log(
            'The movie ' + state.title + ' has already been registered',
          );
        }
      })
      .catch(error => {
        console.log(error);
      });

    /* Check if movieID already exist in cart database */
    let cartValidationUrl =
      config.settings.serverPath + '/api/cart/' + state.selected.id;

    fetch(cartValidationUrl)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(checkMovie => {
        if (checkMovie == 0) {
          storeCart();
        } else {
          Alert.alert(
            'Cart',
            'Record for `' + state.title + '` is already in cart',
          );
          console.log('The movie ' + state.title + ' is already in cart');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  /* Store value to cart */
  const storeCart = () => {
    let cartUrl = config.settings.serverPath + '/api/cart/';

    fetch(cartUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: user.uid,
        movieID: state.selected.id,
        price: 5,
      }),
    })
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }

        return response.json();
      })
      .then(responseJson => {
        if (responseJson.affected > 0) {
          Alert.alert(
            'Added to cart',
            'Record for `' + state.title + '` has been added',
          );
        } else {
          Alert.alert('Error saving record');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <ScrollView>
      <TextInput
        style={styles.search}
        placeholder="Search a movie or series"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleOnSubmit}
      />
      <ScrollView
        horizontal={true}
        contentCotainerStyle={styles.contentContainer}>
        {searchMovieResults.length > 0 &&
          searchMovieResults.map(searchMovieResults => (
            <TouchableHighlight
              key={searchMovieResults.id}
              onPress={() => popupMovieandTrailer(searchMovieResults.id)}>
              <Movie key={searchMovieResults.id} {...searchMovieResults} />
            </TouchableHighlight>
          ))}
        {searchTVResults.length > 0 &&
          searchTVResults.map(searchTVResults => (
            <TouchableHighlight
              key={searchTVResults.id}
              onPress={() => popupTVandTrailer(searchTVResults.id)}>
              <Movie key={searchTVResults.id} {...searchTVResults} />
            </TouchableHighlight>
          ))}
      </ScrollView>
      <Text style={styles.genre}>Popular Movies</Text>
      <ScrollView
        horizontal={true}
        contentCotainerStyle={styles.contentContainer}>
        {moviesPopular.length > 0 &&
          moviesPopular.map(moviePopular => (
            <TouchableHighlight
              key={moviePopular.id}
              onPress={() => popupMovieandTrailer(moviePopular.id)}>
              <Movie key={moviePopular.id} {...moviePopular} />
            </TouchableHighlight>
          ))}
      </ScrollView>

      <Text style={styles.genre}>Popular TV Shows</Text>
      <ScrollView
        horizontal={true}
        contentCotainerStyle={styles.contentContainer}>
        {showsPopular.length > 0 &&
          showsPopular.map(showPopular => (
            <TouchableHighlight
              key={showPopular.id}
              onPress={() => popupTVandTrailer(showPopular.id)}>
              <Movie key={showPopular.id} {...showPopular} />
            </TouchableHighlight>
          ))}
      </ScrollView>

      <Text style={styles.genre}>Popular Animes</Text>
      <ScrollView
        horizontal={true}
        contentCotainerStyle={styles.contentContainer}>
        {animesPopular.length > 0 &&
          animesPopular.map(animePopular => (
            <TouchableHighlight
              key={animePopular.id}
              onPress={() => popupTVandTrailer(animePopular.id)}>
              <Movie key={animePopular.id} {...animePopular} />
            </TouchableHighlight>
          ))}
      </ScrollView>

      <Text style={styles.genre}>Popular Comedies</Text>
      <ScrollView
        horizontal={true}
        contentCotainerStyle={styles.contentContainer}>
        {comediesPopular.length > 0 &&
          comediesPopular.map(comedyPopular => (
            <TouchableHighlight
              key={comedyPopular.id}
              onPress={() => popupTVandTrailer(comedyPopular.id)}>
              <Movie key={comedyPopular.id} {...comedyPopular} />
            </TouchableHighlight>
          ))}
      </ScrollView>

      <Text style={styles.genre}>Popular Crimes</Text>
      <ScrollView
        horizontal={true}
        contentCotainerStyle={styles.contentContainer}>
        {crimesPopular.length > 0 &&
          crimesPopular.map(crimePopular => (
            <TouchableHighlight
              key={crimePopular.id}
              onPress={() => popupTVandTrailer(crimePopular.id)}>
              <Movie key={crimePopular.id} {...crimePopular} />
            </TouchableHighlight>
          ))}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        propagateSwipe={true}
        visible={
          typeof state.selected.title !== 'undefined' ||
          typeof state.selected.name !== 'undefined'
        }
        /* Set state to nothing when the modal is closed */
        onBackdropPress={() =>
          setState(prevState => {
            return {
              ...prevState,
              selected: {},
              title: {},
              year: {},
              spoken_languages: {},
              duration: {},
            };
          })
        }
        onSwipeComplete={() =>
          setState(prevState => {
            return {
              ...prevState,
              selected: {},
              title: {},
              year: {},
              spoken_languages: {},
              duration: {},
            };
          })
        }
        swipeDirection="down"
        style={styles.modalContainer}>
        {/* To prevent modal from floating up */}
        <View style={{maxHeight: Dimensions.get('window').height - 5}}>
          <ScrollView style={styles.container}>
            <View style={styles.trailerVideo}>
              <TouchableHighlight
                onPress={() =>
                  setState(prevState => {
                    return {...prevState, selected: {}, selectedYoutubeKey: {}};
                  })
                }>
                <Entypo
                  name="circle-with-cross"
                  size={37}
                  style={styles.exitDescription}
                />
              </TouchableHighlight>
              <YoutubePlayer
                style={styles.youtubePlayer}
                width={Dimensions.get('window').width}
                height={400}
                play={true}
                videoId={state.selectedYoutubeKey}
              />
            </View>
            {/*
            Touchable opacity to allow scrolling contents in modal
                activeOpactiy to let prevent dimming onPress
                */}
            <TouchableOpacity activeOpacity={1}>
              <View style={styles.content}>
                <Text style={styles.title}>{state.title}</Text>
                <View style={styles.tag}>
                  <Text style={styles.year}>{state.year}</Text>
                  <Text style={styles.language}>{state.spoken_languages}</Text>
                  <Text style={styles.duration}>
                    {parseInt(state.duration / 60)}h{' '}
                    {parseInt(state.duration % 60)}m
                  </Text>
                  <Text style={styles.rating}>
                    {state.selected.vote_average}
                  </Text>
                </View>
                <TouchableOpacity style={styles.rentBtn}>
                  <Text style={styles.rentText}>Rent</Text>
                </TouchableOpacity>
                <Text style={styles.title2}>
                  {state.selected.title}
                  {state.selected.name}
                </Text>
                <Text style={styles.description}>
                  {state.selected.overview}
                </Text>
              </View>
              <View style={styles.extraFunction}>
                <TouchableOpacity
                  style={styles.addList}
                  onPress={() => validateWatchlist()}>
                  <Entypo name="add-to-list" size={37} />
                  <Text style={styles.btnText}>Add List</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cart}
                  onPress={() => validateCart()}>
                  <Ionicons name="ios-cart" size={37} />
                  <Text style={styles.btnText}>Add Cart</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: '#ECECEC',
    paddingLeft: 10,
    margin: 5,
    borderRadius: 8,
  },

  genre: {
    fontStyle: 'normal',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
  },

  contentContainer: {
    height: 270,
    padding: 5,
    justifyContent: 'space-between',
  },

  //style for movie description
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end', // modal stick to the bottom
  },

  container: {
    backgroundColor: '#E7EBFE',
    height: '65%',
    width: '100%',
    marginTop: 'auto',
    padding: 0,
    borderRadius: 20,
    borderBottomLeftRadius: 0, //let bottom border have 0 radius
    borderBottomRightRadius: 0,
  },

  exitDescription: {
    margin: 7,
    textAlign: 'right',
  },

  trailerVideo: {
    height: 300,
  },

  bacgroundVideo: {
    height: 250,
  },

  content: {},

  title: {
    marginLeft: 5,
    fontSize: 32,
    fontWeight: 'bold',
  },

  rentBtn: {
    backgroundColor: '#9CAEFC',
    marginTop: 10,
    marginLeft: 5, //set the space with the left of screen
    marginRight: 5,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
  },

  rentText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  tag: {
    flexDirection: 'row',
  },

  year: {
    borderRadius: 8,
    margin: 5,
    padding: 5,
    backgroundColor: '#FFE7C7',
    textAlign: 'center',
  },

  rating: {
    borderRadius: 8,
    margin: 5,
    padding: 5,
    backgroundColor: '#CAF1DE',
    textAlign: 'center',
  },

  language: {
    borderRadius: 8,
    margin: 5,
    padding: 5,
    backgroundColor: '#FFDBDB',
    textAlign: 'center',
  },

  duration: {
    borderRadius: 8,
    margin: 5,
    fontSize: 15,
    padding: 5,
    textAlign: 'center',
    backgroundColor: '#B39DDC',
  },

  title2: {
    marginTop: 10,
    marginLeft: 5,
    fontSize: 17,
    fontWeight: 'bold',
  },

  description: {
    marginLeft: 5,
    fontSize: 14,
    /* fontWeight: 'bold', */
  },

  extraFunction: {
    flexDirection: 'row', //let all the buttons at one row
  },

  btnText: {
    fontSize: 10,
    textAlign: 'center',
  },

  addList: {
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 100,
  },

  cart: {
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 105,
  },
});

export default MovieHomeScreen;
