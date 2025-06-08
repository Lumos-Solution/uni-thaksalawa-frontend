import React, { useState } from 'react';
import User from '../models/User';
import Class from '../models/Class';
import UserClass from '../models/UserClass';

const EntityManager = () => {
  // Arrays to hold entities
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [userClasses, setUserClasses] = useState([]);

  // Sample function to add some test data
  const addSampleData = () => {
    // Create some users
    const user1 = new User('u1', 'Alice', 'pass1', '123456', 'alice@email.com', 'student', 'Colombo');
    const user2 = new User('u2', 'Bob', 'pass2', '654321', 'bob@email.com', 'teacher', 'Kandy');

    // Create some classes
    const class1 = new Class('c1', 'Math 101', 'Mathematics', 'Lecture', 'Colombo', 5000, '10:00 AM', '2025-05-20');
    const class2 = new Class('c2', 'Physics 201', 'Physics', 'Lab', 'Kandy', 6000, '2:00 PM', '2025-05-22');

    // Create enrollment relation
    const enrollment1 = new UserClass('u1', 'c1'); // Alice enrolled in Math 101
    const enrollment2 = new UserClass('u2', 'c2'); // Bob enrolled in Physics 201 (teacher role)

    // Update states
    setUsers([user1, user2]);
    setClasses([class1, class2]);
    setUserClasses([enrollment1, enrollment2]);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Entity Manager (Test)</h2>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={addSampleData}
      >
        Add Sample Data
      </button>

      <div>
        <h3>Users:</h3>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </div>

      <div>
        <h3>Classes:</h3>
        <pre>{JSON.stringify(classes, null, 2)}</pre>
      </div>

      <div>
        <h3>Enrollments:</h3>
        <pre>{JSON.stringify(userClasses, null, 2)}</pre>
      </div>
    </div>
  );
};

export default EntityManager;
