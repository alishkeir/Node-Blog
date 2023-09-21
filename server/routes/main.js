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

router.get('/about', (req, res) => {
  res.render('pages/about');
});

module.exports = router;
