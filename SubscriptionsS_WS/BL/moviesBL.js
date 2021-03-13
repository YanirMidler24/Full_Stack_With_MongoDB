const moviesDAL = require("../DALS/movieDAL");
const Movie = require("../models/MoviesModel");

const movieToDB = async function () {
  return new Promise((resolve, reject) => {
    Movie.find({}, async function (err, movies) {
      if (err) {
        reject(err);
      } else {
        if (movies.length == 0) {
          let resp = await moviesDAL.getAllMovie();
          resp.data.forEach((x) => {
            const m = new Movie({
              MovieName: x.name,
              MovieGeners: x.genres,
              MovieImage: x.image.medium,
              Premiered: x.premiered,
            });
            m.save(function (err) {
              if (err) {
                reject(err);
              } else {
                resolve(movies);
              }
            });
          });
        } else {
          resolve(movies);
        }
      }
    });
  });
};

const updateMovie = async function (obj) {
  try {
    return new Promise((resolve, reject) => {
      let id = obj.id;
      Movie.findByIdAndUpdate(
        id,
        {
          MovieName: obj.movieName,
          MovieGeners: obj.movieGener,
          MovieImage: obj.movieImage,
        },
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteMovie = async function (obj) {
  try {
    return new Promise((resolve, reject) => {
      let id = obj.id;

      Movie.findByIdAndDelete(id, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const createMovie = async function (obj) {
  try {
    return new Promise((resolve, reject) => {
      const m = new Movie({
        MovieName: obj.MovieName,
        MovieGeners: obj.MovieGeners,
        MovieImage: obj.MovieImage,
        Premiered: obj.Premiered,
      });
      m.save(function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = { movieToDB, updateMovie, deleteMovie ,createMovie};
