interface TimerDisplayProps {
    timer: number;
  }
  
  const TimerDisplay: React.FC<TimerDisplayProps> = ({ timer }) => {
    return <div  className="text-white text-2xl font-bold mt-4 text-center">Your time: <span id="timer-display">{timer}</span></div>;
  };

  export default TimerDisplay