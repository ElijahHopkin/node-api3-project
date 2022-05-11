const Users = require('../users/users-model')
const Posts = require ('../posts/posts-model')

function logger(req, res, next) {
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
}

function validateUser(req, res, next) {
  const name = req.body.name
  if(!name) {
    res.status(400).json({message: "missing required name field"})
    return
  }else{
    next()
  }
}

function validatePost(req, res, next) {
  const text = req.body.text
  if(typeof text != 'string' || text == '') {
    res.status(400).json({message: "missing required text field"})
    return
  }else{
    next()
  }
}

// function validatePostId(req, res, next) {
//   const {id} = req.params
//   Posts.getById(id)
//   .then(result => {
//     if(result>0) {
//       req.user = result;
//       next();
//     }else{
//       res.status(404).json({message: "ID not found"})
//       return
//     }
//   })
// }

// do not forget to expose these functions to other modules

module.exports = {logger, validateUserId, validateUser, validatePost}
