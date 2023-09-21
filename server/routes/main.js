const express = require('express');

const router = express.Router();

const Post = require('../models/Post');

/**
 * GET /
 * Home
 */
router.get('', async (req, res) => {
  try {
    const locals = {
      title: 'NodeJs Blog',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.',
    };

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('pages/index', {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      prevPage: page > 1 ? page - 1 : null,
      currentRoute: '/',
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Post :id
 */
router.get('/post/:id', async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug }).exec();

    const locals = {
      title: data.title,
      description: 'Simple Blog created with NodeJs, Express & MongoDb.',
    };

    res.render('pages/post', {
      locals,
      data,
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * Post - searchTerm
 */
router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: 'Search',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.',
    };

    let searchTerm = req.body.searchTerm.replace(/[^a-zA-Z0-9 ]/g, '');

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchTerm, 'i') } },
        { body: { $regex: new RegExp(searchTerm, 'i') } },
      ],
    });

    res.render('pages/search', { locals, data });
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * About page
 */
router.get('/about', (req, res) => {
  const locals = {
    title: 'NodeJs Blog',
    description: 'Simple Blog created with NodeJs, Express & MongoDb.',
  };

  res.render('pages/about', { locals });
});

module.exports = router;
