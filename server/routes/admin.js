const express = require('express');

const router = express.Router();

const Post = require('../models/Post');

const adminLayout = '../views/layouts/admin';

/**
 * GET /
 * Admin - Login Page
 */
router.get('/admin', async (req, res) => {
  try {
    const locals = {
      title: 'NodeJs Blog | Admin Panel',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.',
    };

    res.render('pages/admin/index', {
      locals,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
