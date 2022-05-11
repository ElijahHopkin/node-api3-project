const Users = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log (`\n The request method is ${req.method}, \n The request URL is ${req.url}, \n The timestamp is ${Date.now()}`) 
  next()
}

function validateUserId(req, res, next) {
  const {id} = req.params
  Users.getById(id)
  .then(result => {
    if(result) {
      req.user = result;
      next();
    }else{
      res.status(404).json({message: "ID not found"})
      return
    }
  })
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  const name = req.body.name
  if(!name) {
    res.status(400).json({message: "missing required name field"})
    return
  }else{
    next()
  }
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {logger, validateUserId, validateUser, validatePost}
