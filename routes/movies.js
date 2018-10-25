const express = require('express');
const router = express.Router();


//models
const Movie = require('../models/Movie');
/* GET movieslisting. */


router.get('/', (req, res) => {
   const promise = Movie.aggregate([
       {
           $lookup: {
               from: 'directors',
               localField: 'director_id',
               foreignField: '_id',
               as: 'direct'
           }
       },
        {
            $unwind:'$direct'
        }
   ]);
   promise.then((data) => {
       res.json(data);
   }).catch((err) => {
       res.json(err);
   })
});



//TOP 10
router.get('/top10', (req, res) => {
    const promise = Movie.find({ }).limit(10).sort({imdb_score: -1});
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});
router.get('/:movie_id', (req, res, next) => {
    const promise = Movie.findById(req.params.movie_id);

    promise.then((movie) => {
        if(!movie) {
            next({message: 'Record was not found', code:11});
        }else {
            /*            next({message: 'Record was not found'});*/
            res.json(movie);
        }
    }).catch((err) => {
        res.json(err);
    });
});



//TOP 10


router.get('/between/:start_year/:end_year', (req, res) => {
    const { start_year, end_year} = req.params;
    const promise = Movie.find({
        year: { '$gte' : parseInt(start_year), '$lte' : parseInt(end_year)}    //$gte büyük veya eşit demek
    });
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});
router.put('/:movie_id', (req, res, next) => {
    const promise = Movie.findByIdAndUpdate(
        req.params.movie_id,
        req.body,
        {
            new:true
        });

    promise.then((movie) => {
        if(!movie) {
            next({message: 'Record was not found', code:11});
        }else {
            /*            next({message: 'Record was not found'});*/
            res.json(movie);
        }
    }).catch((err) => {
        res.json(err);
    });
});
router.delete('/:movie_id', (req, res, next) => {
    const promise = Movie.findByIdAndRemove(req.params.movie_id);

    promise.then((movie) => {
        if(!movie) {
            next({message: 'Record was not found', code:11});
        }else {
            /*            next({message: 'Record was not found'});*/
            res.json({status: 1});
        }
    }).catch((err) => {
        res.json(err);
    });
});
router.post('/', (req, res, next) => {
  const { title, imdb_score,country, category,year, director_id} = req.body;
  const movie = new Movie(req.body);
  const promise = movie.save();
  promise.then((data) => {
      res.json(data);
  }).catch((err) => {
      res.json(err);
  })

});

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





module.exports = router;
