const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employees');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', isAuthenticated, employeesController.getAll);
router.get('/:id', isAuthenticated, employeesController.getSingle);
router.post('/', isAuthenticated, employeesController.createEmployee);
router.put('/:id', isAuthenticated, employeesController.updateEmployee);
router.delete('/:id', isAuthenticated, employeesController.deleteEmployee);

module.exports = router;