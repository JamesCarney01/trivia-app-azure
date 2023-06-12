import React from 'react';

interface User {
  userName: string;
  score: number;
  time: number;
}

interface UserTableProps {
  users: User[];
}

/**
 * UserTable component displays a table of user data.
 * @param users - Array of user objects containing user data.
 */
const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <table  className="flex flex-col items-center justify-center bg-black text-white border border-white rounded-lg p-6 mt-4 text-xl mb-4 pr-4">
      <thead>
        <tr>
          <th className="pr-20">User Name</th>
          <th className="pr-20">Score</th>
          <th className="pr-20">Time</th>
        </tr>
      </thead>
      <tbody>
        {/* Map through each user and render a table row */}
        {users.map((user, index) => (
          <tr key={index}>
            <td className="pr-20">{user.userName}</td>
            <td className="pr-20 text-center">{user.score}</td>
            <td className="pr-20 text-center">{user.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
