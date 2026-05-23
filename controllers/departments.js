const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db('project2').collection('departments').find();
    const departments = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid department id.' });
    }
    const deptId = new ObjectId(req.params.id);
    const department = await mongodb.getDatabase().db('project2').collection('departments').findOne({ _id: deptId });
    if (!department) {
      return res.status(404).json({ message: 'Department not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(department);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createDept = async (req, res) => {
  try {
    const { deptName, manager, location } = req.body;
    if (!deptName || !manager || !location) {
      return res.status(400).json({ message: 'deptName, manager, and location are required fields.' });
    }
    const department = { deptName, manager, location };
    const response = await mongodb.getDatabase().db('project2').collection('departments').insertOne(department);
    if (response.acknowledged) {
      res.status(201).json(response.insertedId);
    } else {
      res.status(500).json({ message: 'Error occurred while creating the department.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateDept = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID for update.' });
    }
    const { deptName, manager, location } = req.body;
    if (!deptName || !manager || !location) {
      return res.status(400).json({ message: 'deptName, manager, and location are required for update.' });
    }
    const deptId = new ObjectId(req.params.id);
    const department = { deptName, manager, location };
    const response = await mongodb
      .getDatabase().db('project2')
      .collection('departments')
      .replaceOne({ _id: deptId }, department);
    if (response.matchedCount > 0) {
      res.status(204).send({ message: 'Department updated successfully.' });
    } else {
      res.status(500).json({ message: 'Error occurred while updating the department.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteDept = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID for deletion.' });
    }
    const deptId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('project2').collection('departments').deleteOne({ _id: deptId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Error occurred while deleting the department.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createDept, updateDept, deleteDept };