import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from './PageHeader';
import LoginForm from './LoginForm';

type FormData = {
  userName: string;
};

/**
 * Login component renders a login form and handles form submission.
 */
export const Login: React.FC = () => {
  const navigate = useNavigate();

  /**
   * Handles form submission.
   * @param formData - Form data submitted by the user.
   */
  const submitData = async (formData: FormData) => {
    const userName = formData.userName;
    try {
      // Navigate to the trivia page with the provided user name
      navigate(`/trivia/${userName}`);
      console.log(`Passed userName: ${userName} to Trivia.tsx`);
    } catch (error) {
      console.error(`Error passing userName: ${userName} to Trivia.tsx`, error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      {/* Render the PageHeader component */}
      <PageHeader />
      {/* Render the LoginForm component and pass the submitData function as a prop */}
      <LoginForm onSubmit={submitData} />
    </div>
  );
};

export default Login;
