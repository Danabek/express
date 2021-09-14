const Burnoe = require('../models/burnoe');

const burnoe_reports = (req, res) => {
  const year = req.params.year;
  res.render(`burnoe/reports`, {title: year})
}

const burnoe_index = (req, res) => {
    res.render('burnoe/burnoe', { title: 'burnoe' });
};

const burnoe_details = (req, res) => {
  const id = req.params.id;
  Burnoe.findById(id)
    .then(result => {
      res.render('burnoe/details', { burnoe: result, title: 'Burnoe Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Burnoe not found' });
    });
};

const burnoe_nominee = (req, res) => {
  res.render('burnoe/nominee', {title: 'nominee' })
}

const burnoe_create_get = (req, res) => {
  res.render('burnoes/createPost', { title: 'Create a new burnoe' });
};

const burnoe_create_post = (req, res) => {
  const burnoe = new Burnoe(req.body);
  burnoe.save()
    .then(result => {
      res.redirect('/burnoe/all');
    })
    .catch(err => {
      console.log(err);
    });
};

const burnoe_delete = (req, res) => {
  const id = req.params.id;
  Burnoe.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/burnoe/all' });
    })
    .catch(err => {
      console.log(err);
    });
};

const burnoe_goals = (req, res) => {
  res.render('burnoe/goals', {title: 'burnoe'});
}

module.exports = {
  burnoe_index, 
  burnoe_details, 
  burnoe_create_get, 
  burnoe_create_post, 
  burnoe_delete,
  burnoe_reports,
  burnoe_goals,
  burnoe_nominee,
};