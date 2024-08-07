'use client';
import { useState } from 'react';
import UserList from './components/UserList';
import AverageAge from './components/AverageAge';

const HomePage: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  return (
    <div>
      <h1>Average age calculator</h1>
      <div className="element">
        <UserList onSelectionChange={setSelectedUsers} />
        <AverageAge selectedUsers={selectedUsers} />
      </div>
    </div>
  );
};

export default HomePage;
