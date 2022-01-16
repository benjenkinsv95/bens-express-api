// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for practices
const Practice = require('../models/practice')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { practice: { title: '', text: 'foo' } } -> { practice: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /practices
router.get('/practices', requireToken, (req, res, next) => {
  Practice.find()
    .populate('skill')
    // respond with status 200 and JSON of the practices
    .then(practices => res.status(200).json({ practices: practices }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// INDEX
// GET /my-practices
router.get('/my-practices', requireToken, (req, res, next) => {
  Practice.find({ owner: req.user._id })
    .populate('skill')
    // respond with status 200 and JSON of the practices
    .then(practices => res.status(200).json({ practices: practices }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /practices/5a7db6c74d55bc51bdf39793
router.get('/practices/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Practice.findById(req.params.id)
    .populate('skill')
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "practice" JSON
    .then(practice => res.status(200).json({ practice: practice }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /practices
router.post('/practices', requireToken, (req, res, next) => {
  // set owner of new practice to be current user
  req.body.practice.owner = req.user.id

  Practice.create(req.body.practice)
    // respond to succesful `create` with status 201 and JSON of new "practice"
    .then(practice => {
      res.status(201).json({ practice })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

router.patch('/mark-practice/:id', requireToken, removeBlanks, (req, res, next) => {
  Practice.findById(req.params.id)
    .then(handle404)
    // ensure the signed in user (req.user.id) is the same as the practice's owner (practice.owner)
    .then(practice => requireOwnership(req, practice))
    .then(practice => {
      const nowDate = new Date()
      console.log(practice)

      return practice.updateOne({
        lastPracticed: nowDate,
        streakStart: practice.daysStreak === 0 ? nowDate
          : practice.streakStart
      })
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// UPDATE
// PATCH /practices/5a7db6c74d55bc51bdf39793
router.patch('/practices/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.practice.owner

  Practice.findById(req.params.id)
    .then(handle404)
    // ensure the signed in user (req.user.id) is the same as the practice's owner (practice.owner)
    .then(practice => requireOwnership(req, practice))
    // updating practice object with practiceData
    .then(practice => practice.updateOne(req.body.practice))
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /practices/5a7db6c74d55bc51bdf39793
router.delete('/practices/:id', requireToken, (req, res, next) => {
  Practice.findById(req.params.id)
    .then(handle404)
    // ensure the signed in user (req.user.id) is the same as the practice's owner (practice.owner)
    .then(practice => requireOwnership(req, practice))
    // delete practice from mongodb
    .then(practice => practice.deleteOne())
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
