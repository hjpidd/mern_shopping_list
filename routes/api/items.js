const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route   GET api/ietms
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
        .catch(err => console.log(err))
});

// @route   POST api/ietms
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

// @route   DELETE api/ietms/:id
// @desc    Delete An Item
// @access  Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({succes: true})))
        .catch(err => res.status(404).json({success: true}));
});

module.exports = router;