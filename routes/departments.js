const express = require('express');
const router = express.Router();
const departmentsController = require('../controllers/departments');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', isAuthenticated, departmentsController.getAll);
router.get('/:id', isAuthenticated, departmentsController.getSingle);
router.post('/', isAuthenticated, departmentsController.createDept);
router.put('/:id', isAuthenticated, departmentsController.updateDept);
router.delete('/:id', isAuthenticated, departmentsController.deleteDept);

module.exports = router;