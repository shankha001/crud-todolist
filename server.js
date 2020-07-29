require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemsSchema = {
  name: String,
};

const Item = mongoose.model('Item', itemsSchema);

//Create
app.post('/', function (req, res) {
  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName,
  });
  item.save();
  res.redirect('/');
});

//Read
app.get('/', (req, res) => {
  Item.find({}, (err, items) => {
    res.render('list', { todoItems: items });
  });
});

//Update
app.post('/edit', (req, res) => {
  const checkedItemId = req.body.checkbox;

  Item.findByIdAndUpdate(
    checkedItemId,
    { name: req.body.updateName },
    function (err) {
      res.redirect('/');
    }
  );
});

//Delete
app.post('/delete', function (req, res) {
  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId, function (err) {
    if (!err) {
      console.log('Successfully deleted checked item.');
      res.redirect('/');
    }
  });
});

app.get('/', function (req, res) {
  res.render('list');
});

app.listen(3000, () => console.log('Server Started on Port 3000'));
