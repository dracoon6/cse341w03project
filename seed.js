const mongodb = require('./data/database');

const seedData = async () => {
  try {
    const db = mongodb.getDatabase().db('project2');

    // 1. Clean existing data (Optional: remove if you want to keep existing data)
    console.log('Cleaning existing data...');
    await db.collection('departments').deleteMany({});
    await db.collection('employees').deleteMany({});

    // 2. Insert Departments
    console.log('Seeding departments...');
    const departments = [
      {
        deptName: 'Engineering',
        manager: 'Sarah Connor',
        location: 'Building A - Floor 4'
      },
      {
        deptName: 'Human Resources',
        manager: 'Michael Scott',
        location: 'Building B - Suite 100'
      },
      {
        deptName: 'Marketing',
        manager: 'Beth Smith',
        location: 'Remote'
      }
    ];

    const deptResult = await db.collection('departments').insertMany(departments);
    const engineeringId = deptResult.insertedIds[0];
    const hrId = deptResult.insertedIds[1];
    const marketingId = deptResult.insertedIds[2];

    // 3. Insert Employees (Ensuring 7 fields per requirement)
    console.log('Seeding employees...');
    const employees = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'jdoe@project2.com',
        jobTitle: 'Senior Dev',
        salary: 95000,
        deptId: engineeringId.toString(),
        hireDate: '2023-01-15'
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jsmith@project2.com',
        jobTitle: 'Junior Architect',
        salary: 80000,
        deptId: engineeringId.toString(),
        hireDate: '2023-06-01'
      },
      {
        firstName: 'Dwight',
        lastName: 'Schrute',
        email: 'beets@project2.com',
        jobTitle: 'Assistant Regional Manager',
        salary: 60000,
        deptId: hrId.toString(),
        hireDate: '2022-03-12'
      },
      {
        firstName: 'Sarah',
        lastName: 'Connor',
        email: 'sconnor@project2.com',
        jobTitle: 'Engineering Manager',
        salary: 125000,
        deptId: engineeringId.toString(),
        hireDate: '2021-05-10'
      },
      {
        firstName: 'Michael',
        lastName: 'Scott',
        email: 'mscott@project2.com',
        jobTitle: 'HR Manager',
        salary: 110000,
        deptId: hrId.toString(),
        hireDate: '2021-06-15'
      },
      {
        firstName: 'Beth',
        lastName: 'Smith',
        email: 'bsmith@project2.com',
        jobTitle: 'Marketing Manager',
        salary: 115000,
        deptId: marketingId.toString(),
        hireDate: '2021-07-20'
      }
    ];

    await db.collection('employees').insertMany(employees);

    console.log('Database successfully seeded!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    seedData();
  }
});