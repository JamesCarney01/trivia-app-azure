import React from 'react';

interface QuestionDisplayProps {
  question: string;
  options: {
    option: string;
    isCorrect: boolean;
  }[];
  onAnswerSubmit: (selectedAnswer: string) => void;
}

/**
 * QuestionDisplay component renders a question and its options, allowing the user to select an answer.
 * 
 * @param question - The question text.
 * @param options - An array of options for the question.
 * @param onAnswerSubmit - Callback function to handle the selected answer.
 */
const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  options,
  onAnswerSubmit,
}) => {
  return (
    <div className="text-white text-2xl font-bold mt-4 text-center">
      <h3 className="pb-5">Question: {question}</h3>
      <ul className="space-y-4">
        {options.map((option, index) => (
          <li key={index}>
            <button className="w-full border border-white py-2 px-4 transition-colors duration-300 hover:bg-orange-500" onClick={() => onAnswerSubmit(option.option)}>
              {option.option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionDisplay;
