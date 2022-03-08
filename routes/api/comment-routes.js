const router = require ('express').Router();
const {addComment, removeComment , addReply, removeReply} = require('../../controllers/comment-controller')
//api to add comments
router.route('/:pizzaId').post(addComment);
//api to delete comments
router.route('/:pizzaId/:commentId').delete(removeComment)

router.route('/:pizzaId/:commentId')
.put(addReply)
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply)


module.exports = router;