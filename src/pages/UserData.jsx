// client/src/App.js
import React, { useState } from 'react';
import UserList from '../components/ui/UserList';
import UserForm from '../components/ui/UserForm';
import userService from '@/services/userService';

const UserData = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await userService.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div>
      <h1>CRUD Application</h1>
      <UserForm fetchUsers={fetchUsers} />
      <UserList users={users} fetchUsers={fetchUsers} />
    </div>
  );
};

export default UserData;
