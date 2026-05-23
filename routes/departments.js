const express = require('express');
const router = express.Router();
const departmentsController = require('../controllers/departments');

router.get('/', departmentsController.getAll);
router.get('/:id', departmentsController.getSingle);
router.post('/', departmentsController.createDept);
router.put('/:id', departmentsController.updateDept);
router.delete('/:id', departmentsController.deleteDept);

module.exports = router;