const router = require ('express').Router();
const {addComment, removeComment} = require('../../controllers/comment-controller')
//api to add comments
router.route('/:pizzaId').post(addComment);
//api to delete comments
router.route('/:pizzaId/:commentId').delete(removeComment)


module.exports = router;