const express = require('express');
const {logger, validateUserId, validateUser, validatePost} = require('../middleware/middleware')
const Users = require('./users-model')
const Posts = require('../posts/posts-model')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();
router.use(logger);



router.get('/', (req, res) => {
  Users.get()
  .then(result => {
    res.status(200).json(result)
  })

  // RETURN AN ARRAY WITH ALL THE USERS
});

router.get('/:id', validateUserId,  (req, res) => {
   res.json(req.user)
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
  .then(results => {
    res.status(201).json(results)
  })
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validateUser,  (req, res) => {

  Users.update(req.params.id, req.body)
  .then(results => {
    res.json(results)
  })
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
  .then(results => {
    if(results) {
      res.json(req.user)
    }
  })
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
