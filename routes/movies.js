const express = require('express');
const router = express.Router();


//models
const Movie = require('../models/Movie');
/* GET movieslisting. */
router.post('/', (req, res, next) => {
  const { title, imdb_score,country, category,year} = req.body;


  const movie = new Movie(req.body);

  const promise = movie.save();
  promise.then((data) => {
      res.json({status: 1});
  }).catch((err) => {
      res.json(err);
  })


/* aşağıdaki gibi uzun uzun da yazılabilir
  const movie = new Movie({
      title:    title,
      imdb_score:   imdb_score,
      category: category,
      year: year,
      country: country
  });*/

  /*  movie.save((err,data) =>{
        if (err){
            res.json(err);
        }
        res.json({status: 1});
    });*/
});

module.exports = router;
