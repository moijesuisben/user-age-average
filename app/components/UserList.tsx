import { useEffect, useState } from 'react';
import axios from '../lib/axios';
import styled from 'styled-components';

interface User {
  id: string;
  name: string;
  birthYear: number;
}

interface UserListProps {
  onSelectionChange: (selectedUsers: Set<string>) => void;
}

const UserListContainer = styled.div`
  width: 300px;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
`;

const UserList: React.FC<UserListProps> = ({ onSelectionChange }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleCheckboxChange = (userId: string) => {
    setSelectedUsers((prev) => {
      const updated = new Set(prev);
      if (updated.has(userId)) {
        updated.delete(userId);
      } else {
        updated.add(userId);
      }
      onSelectionChange(updated);
      return updated;
    });
  };

  return (
    <UserListContainer>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <input
              type="checkbox"
              checked={selectedUsers.has(user.id)}
              onChange={() => handleCheckboxChange(user.id)}
            />
            {user.name}
          </li>
        ))}
      </ul>
    </UserListContainer>
  );
};

export default UserList;
