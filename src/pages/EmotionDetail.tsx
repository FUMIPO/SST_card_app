import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { emotions } from '../types/emotion';

const EmotionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const emotion = emotions.find(e => e.id === id);
  const [intensity, setIntensity] = useState(0);

  if (!emotion) {
    return (
      <div className="max-w-4xl mx-auto p-5 text-center">
        感情が見つかりません
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-5 text-center">
      <h1 className="text-2xl text-gray-800 mb-8">
        わたしはいま {emotion.name} です
      </h1>
      <div className="max-w-md mx-auto mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span>0</span>
          <input
            type="range"
            min="0"
            max="5"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="emotion-slider touch-none"
          />
          <span>5</span>
        </div>
        <p className="text-lg text-gray-600">
          {emotion.name}のつよさは {intensity} です
        </p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors touch-none"
      >
        戻る
      </button>
    </div>
  );
};

export default EmotionDetail; 