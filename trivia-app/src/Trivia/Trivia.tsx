import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionDisplay from './QuestionDisplay';
import TimerDisplay from './TimerDisplay';
import TriviaSummary from './TriviaSummary';
import QuestionFetcher from './QuestionFetcher';

interface Question {
  question: string;
  options: {
    option: string;
    isCorrect: boolean;
  }[];
}

/**
 * Trivia component represents the trivia game page.
 * It fetches questions, handles user answers, tracks the score and timer,
 * and displays the question, timer, summary, and fetcher components.
 */
export const Trivia = () => {
  const { userName } = useParams(); // Get the user name from the URL parameters
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]); // Array of questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index of the current question
  const [timer, setTimer] = useState(0); // Timer value in seconds
  const [score, setScore] = useState(0); // User's score
  const [loading, setLoading] = useState(true); // Loading state for fetching questions

  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, [questions]); // Reset the current question index when the questions change

  // Handle user's answer submission
  const handleAnswerSubmit = (selectedAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.options.find(
      (option) => option.option === selectedAnswer
    )?.isCorrect;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    // Check if all questions are answered
    if (questions.length > 0 && currentQuestionIndex === questions.length) {
      // Send the score and time to the server
      const sendScoreAndTime = async () => {
        try {
          await axios.post('http://localhost:3000/scoreAndTime', {
            userName,
            score,
            time: timer,
          });
          console.log('Score and time sent');
          navigate('/endPage');
        } catch (error) {
          console.error('Error sending score and time:', error);
        }
      };

      sendScoreAndTime();
    }
  }, [currentQuestionIndex, questions.length, score, timer, userName, navigate]);

  useEffect(() => {
    // Start the timer
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update the timer display
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
      timerDisplay.textContent = timer.toString();
    }
  }, [timer]);

  // Callback function to handle questions fetched by the QuestionFetcher
  const handleQuestionsFetched = useCallback(
    (fetchedQuestions: Question[]) => {
      setQuestions(fetchedQuestions);
      setLoading(false); // Set loading to false after questions are fetched
    },
    []
  );

  // Get the current question based on the current question index
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div  className="flex flex-col items-center justify-center h-screen bg-black text-white border border-white rounded-lg p-6 mt-4">
      {loading ? (
        <div>Loading...</div>
      ) : currentQuestionIndex !== -1 && currentQuestion ? (
        <QuestionDisplay
          question={currentQuestion.question}
          options={currentQuestion.options}
          onAnswerSubmit={handleAnswerSubmit}
        />
      ) : (
        <div>No more questions</div>
      )}

      <TimerDisplay timer={timer} />

      <TriviaSummary score={score} userName={userName} />

      <QuestionFetcher onQuestionsFetched={handleQuestionsFetched} />
    </div>
  );
};
