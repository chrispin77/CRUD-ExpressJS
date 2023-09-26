const express = require('express');
const stuffCtrl = require('../controllers/stuff');

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, stuffCtrl.getAllStuff);

router.post('/', auth, multer, stuffCtrl.createThing);

router.put('/:id', auth, multer, stuffCtrl.modifyThing);

router.delete('/:id', auth, stuffCtrl.deleteThing);

router.get('/:id', auth, stuffCtrl.getOneThing)


module.exports = router;