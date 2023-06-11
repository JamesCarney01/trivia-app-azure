import React from 'react';

interface TriviaSummaryProps {
  score: number;
  userName?: string;
}

/**
 * TriviaSummary component displays the user's score and optional user name.
 * 
 * @param score - The user's score.
 * @param userName - Optional user name.
 */
const TriviaSummary: React.FC<TriviaSummaryProps> = ({ score, userName }) => {
  return (
    <div  className="text-white text-2xl font-bold mt-4 text-center">
      {userName && <div>{userName}, your current score is: {score}</div>}
    </div>
  );
};

export default TriviaSummary;
