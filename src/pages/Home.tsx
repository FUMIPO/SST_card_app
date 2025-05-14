import EmotionCard from '../components/EmotionCard';
import { emotions } from '../types/emotion';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-center text-3xl text-gray-800 mb-8">
        今の気持ちを選んでください
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 justify-items-center">
        {emotions.map(emotion => (
          <EmotionCard key={emotion.id} emotion={emotion} />
        ))}
      </div>
    </div>
  );
};

export default Home; 