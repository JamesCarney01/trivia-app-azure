import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserTable from './UserTable';

interface User {
  userName: string;
  score: number;
  time: number;
}

/**
 * EndPage component displays the top 5 users with the highest scores.
 */
export const EndPage = () => {
  // State to store the top users
  const [topUsers, setTopUsers] = useState<User[]>([]);

  useEffect(() => {
    /**
     * Fetches the top users from the server.
     */
    const fetchTopUsers = async () => {
      try {
        // Send GET request to retrieve top users
        const response = await axios.get<User[]>('http://localhost:3000/topUsers');
        // Set the fetched top users in the state
        setTopUsers(response.data);
        console.log('Top users received:', response.data);
      } catch (error) {
        console.error('Error fetching top users:', error);
      }
    };

    // Fetch the top users when the component mounts
    fetchTopUsers();
  }, []);

  return (
    <div   className="flex flex-col items-center justify-center h-screen bg-black text-white border border-white rounded-lg p-6 mt-4 text-xl mb-4 pr-4">
      <h1 >Congratulations!</h1>
      <h2>Here are the top 5 players with the highest score</h2>
      <h3>Did you make it on?</h3>
      {/* Render the UserTable component and pass the top users as a prop */}
      <UserTable users={topUsers} />
      {/* Link to navigate back to the login page */}
      <Link  className="border border-white py-2 px-4 transition-colors duration-300 hover:bg-orange-500" to="/">Want to play again?</Link>
    </div>
  );
};
