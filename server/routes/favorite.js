const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {
  
  //Get 'favorite number' from mongoDB
  Favorite.find({ "movieId": req.body.movieId })
        .exec((err, info) => {
            if (err) return res.status(400).send(err)
      
      //And then send the number to the front
      res.status(200).json({ success: true, favoriteNumber: info.length })
        })

})


router.post('/favorited', (req, res) => {

  //Get information from DB if the movie is in the list
  Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, info) => {
            if (err) return res.status(400).send(err)
      
      //And then send the number to the front

      let result = false;
            if (info.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, favorited: result })
        })
})








router.post('/removeFromFavorite', (req, res) => {

    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, doc })
        })

})




router.post('/addToFavorite', (req, res) => {

    const favorite = new Favorite(req.body)

    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({ success: true, doc })
    })

})


router.post('/getFavoredMovie', (req, res) => {

  Favorite.find({ 'userFrom': req.body.userFrom })
      .exec((err, favorites) => {
          if (err) return res.status(400).send(err)
          return res.status(200).json({ success: true, favorites })
      })

})


router.post('/removeFromFavorite', (req, res) => {

    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, result) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true})
        })

})



module.exports = router;