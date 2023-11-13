const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create a post

// router.post("/", async (req, res) => {
//   const {base64, otherProperties } = req.body
//   const newPost = new Post({
//     ...otherProperties, // Include other properties from the request body
//     img: base64, // Assuming 'img' field exists in your Post schema

//   });
//   try {
//     const savedPost = await newPost.save();
//     res.status(200).json(savedPost);

//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     res.status(500).json({ error: "Internal Server Error" });

//   }
// });

router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(200).send({
        status: 'Success',
        message: 'Post created successfully',
        post: newPost
    })
} catch (error) {
    res.status(500).send({
        status: 'Failed',
        message: error.message
    })
}
});


//update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

router.delete("/:id", async (req, res) => {
  console.log('yaha tak agaya');
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId !== req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log('nahi chala')
  }
});
//like / dislike a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user's all posts

router.get("/profile/:username", async (req, res) => {
  console.log("chal gaya")
  try {
    const user = await User.findOne({username:req.params.username});
    const posts = await Post.find({userId: user._id });
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
