const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.get('/', (req, res) => { res.send('Employee & Dept API Home'); });

router.use('/employees', require('./employees'));
router.use('/departments', require('./departments'));

module.exports = router;