import { useEffect } from 'react';
import axios from 'axios';

interface Question {
  question: string;
  options: {
    option: string;
    isCorrect: boolean;
  }[];
}

interface QuestionFetcherProps {
  onQuestionsFetched: (questions: Question[]) => void;
}

/**
 * QuestionFetcher component fetches questions from a server and invokes the provided callback function
 * with the fetched questions.
 * 
 * @param onQuestionsFetched - Callback function to handle fetched questions.
 */
const QuestionFetcher: React.FC<QuestionFetcherProps> = ({ onQuestionsFetched }) => {
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get<Question[]>('http://localhost:3000/questions');
        onQuestionsFetched(response.data);
        console.log('Questions received:', response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []); // Effect will run only once when the component mounts

  return null;
};

export default QuestionFetcher;
