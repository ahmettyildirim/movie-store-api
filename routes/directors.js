const express = require('express');
const router = express.Router();

//models
const Director = require('../models/Director');
/* GET Directorslisting. */


router.get('/', (req, res) => {
    const promise = Director.find({ });
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});



router.get('/:director_id', (req, res, next) => {
    const promise = Director.findById(req.params.director_id);

    promise.then((director) => {
        if(!director) {
            next({message: 'Record was not found', code:11});
        }else {
            /*            next({message: 'Record was not found'});*/
            res.json(director);
        }
    }).catch((err) => {
        res.json(err);
    });
});



router.put('/:director_id', (req, res, next) => {
    const promise = Director.findByIdAndUpdate(
        req.params.director_id,
        req.body,
        {
            new:true
        });

    promise.then((director) => {
        if(!director) {
            next({message: 'Record was not found', code:11});
        }else {
            /*            next({message: 'Record was not found'});*/
            res.json(director);
        }
    }).catch((err) => {
        res.json(err);
    });
});
router.delete('/:director_id', (req, res, next) => {
    const promise = Director.findByIdAndRemove(req.params.director_id);

    promise.then((director) => {
        if(!director) {
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
    const { name, surname, bio} = req.body;
    const director = new Director(req.body);
    const promise = director.save();
    promise.then((data) => {
        res.json({status: 1});
    }).catch((err) => {
        res.json(err);
    })
});

module.exports = router;
