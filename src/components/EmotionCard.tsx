import { useNavigate } from 'react-router-dom';
import { Emotion } from '../types/emotion';

type Props = {
  emotion: Emotion;
};

const EmotionCard = ({ emotion }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-36 h-36 flex items-center justify-center rounded-lg cursor-pointer transition-transform hover:scale-105 touch-none"
      style={{ backgroundColor: emotion.color }}
      onClick={() => navigate(`/emotion/${emotion.id}`)}
    >
      <span className="text-white text-xl font-bold text-shadow">
        {emotion.name}
      </span>
    </div>
  );
};

export default EmotionCard; 