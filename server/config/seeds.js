const faker = require('faker')

const db = require('../config/connection');
const { User, Post } = require('../models');

db.once('open', async () => {
  await User.deleteMany({});
  await Post.deleteMany({});
  
  // create user data
  const userData = [];

  for (let i = 0; i < 10; i +=1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create posts
  let createdPosts = [];
  for (let i = 0; i < 50; i += 1) {

    const postTitle = faker.lorem.words(Math.round(Math.random(50-1)) + 1);
    const postText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdPost = await Post.create({ postTitle, postText, username });

    const updatedUser = await User.updateOne(
      {_id: userId },
      { $push: { posts: createdPost._id } }
    );

    createdPosts.push(createdPost);
  }

  // create comments
  for (let i = 0; i < 50; i += 1) {
    const commentText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomPostIndex = Math.floor(Math.random() * createdPosts.length);
    const { _id: postId } = createdPosts[randomPostIndex];

    await Post.updateOne(
      { _id: postId },
      { $push: {comments: { commentText, username } } },
      {runValidators: true }
    );
  }

  console.log('Database seeded!');
  process.exit(0);
});