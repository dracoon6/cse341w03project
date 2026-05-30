const express = require('express');
const router = express.Router();
const departmentsController = require('../controllers/departments');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', departmentsController.getAll);
router.get('/:id', departmentsController.getSingle);
router.post('/', isAuthenticated, departmentsController.createDept);
router.put('/:id', isAuthenticated, departmentsController.updateDept);
router.delete('/:id', isAuthenticated, departmentsController.deleteDept);

module.exports = router;