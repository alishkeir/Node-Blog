const express = require('express');

const router = express.Router();

//Routes
router.get('', (req, res) => {
  const locals = {
    title: 'Node Blog',
    description: 'Simple Blog Built with NodeJs & MongoDB',
  };

  res.render('pages/index', { locals });
});

router.get('/about', (req, res) => {
  res.render('pages/about');
});

module.exports = router;
