import React from 'react';

/**
 * PageHeader component renders the header/title section of the login page.
 */

const PageHeader: React.FC = () => {
  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold text-center">Want to play trivia?</h1>
      <h2 className="text-2xl font-bold mt-4 text-center">Enter your name!</h2>
    </div>
  );
};

export default PageHeader;
