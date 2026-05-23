const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db('project2').collection('employees').find();
    const employees = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid employee id.' });
    }
    const employeeId = new ObjectId(req.params.id);
    const employee = await mongodb.getDatabase().db('project2').collection('employees').findOne({ _id: employeeId });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, jobTitle, salary, deptId, hireDate } = req.body;
    if (!firstName || !lastName || !email || !jobTitle || !salary || !deptId || !hireDate) {
      return res.status(400).json({ message: 'All 7 fields are required: firstName, lastName, email, jobTitle, salary, deptId, hireDate' });
    }
    
    const employee = {
      firstName,
      lastName,
      email,
      jobTitle,
      salary,
      deptId,
      hireDate
    };

    const response = await mongodb.getDatabase().db('project2').collection('employees').insertOne(employee);
    if (response.acknowledged) {
      res.status(201).json(response.insertedId);
    } else {
      res.status(500).json({ message: 'Error occurred while creating the employee.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID for update.' });
    }
    
    const { firstName, lastName, email, jobTitle, salary, deptId, hireDate } = req.body;
    if (!firstName || !lastName || !email || !jobTitle || !salary || !deptId || !hireDate) {
      return res.status(400).json({ message: 'All 7 fields are required for update.' });
    }

    const employeeId = new ObjectId(req.params.id);
    const employee = {
      firstName,
      lastName,
      email,
      jobTitle,
      salary,
      deptId,
      hireDate
    };

    const response = await mongodb.getDatabase()
      .db('project2')
      .collection('employees')
      .replaceOne({ _id: employeeId }, employee);
    if (response.matchedCount > 0) {
      res.status(204).send({ message: 'Employee updated successfully.' });
    } else {
      res.status(500).json({ message: 'Error occurred while updating the employee.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID for deletion.' });
    }
    const employeeId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('project2').collection('employees').deleteOne({ _id: employeeId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Error occurred while deleting the employee.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll, getSingle, createEmployee, updateEmployee, deleteEmployee
};