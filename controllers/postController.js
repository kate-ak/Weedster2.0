const db = require('../model')
const mongoDb = require('mongodb')

const createPost = async (req, res) => {
  const {category, caption}=req.body
  const result = await db.Post.create({ category, caption, author: req.user._id })
  await db.User.findByIdAndUpdate(req.user._id, { $push: { posts: result._id }})
  const postResult = await db.Post.findById(result._id).populate('author', 'username')
  res.json(postResult);
};

// const getPost = async (req, res) => {
//   console.log(req.body);
//   const { _id } = req.body
//   const result = await db.Post.findById({_id})
//   res.json(result);
// }

const getAllPosts = async (req, res) => {
  console.log(req.body);
  const { _id } = req.body
  const result = await db.Post.find({}).populate('author', 'username').populate({
    path: 'comments',
    populate: { path: 'owner', select:'username' }
  });
  res.json(result);
}

const getComment = async (req, res) => {
  console.log(req.body);
  const { _id } = req.body;
  const result = await Post.comments.findById({_id})
  res.json(result);
}

const createComment = async (req, res) => {
  console.log(req.body);
  const {message, postId}=req.body
  console.log(req.user);
  const options = { returnOriginal: false };
  const commentId = mongoDb.ObjectId()
  console.log(commentId);
  const result = await db.Post.findByIdAndUpdate(postId, { $push: { comments: { _id: commentId, message, owner: req.user._id} } }, options)
  const post = await db.Post.findById(postId).populate('author', 'username').populate({
    path: 'comments',
    populate: { path: 'owner', select:'username' }
  });
  res.json(post);
}

module.exports = {
  createPost,
  getAllPosts,
  createComment,
};
