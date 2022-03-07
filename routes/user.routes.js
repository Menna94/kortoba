const express = require('express');
const router = express.Router();
const { 
    getUsers, 
    getUser, 
    delUser 
} = require('../controller/user.controller');

router.get('/', getUsers);

router.get('/:id', getUser);


router.delete('/:id', delUser);

// router.put('/:id', updateAProduct);



module.exports = router;