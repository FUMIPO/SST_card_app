import { useParams, useNavigate } from "react-router-dom";
import { emotions } from "../types/emotion";
import Emotion from "../components/Emotion";

const EmotionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const emotion = emotions.find((e) => e.id === id);

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
        <Emotion emotionId={emotion.id} />
      </div>
      <button
        onClick={() => navigate("/")}
        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors touch-none"
      >
        戻る
      </button>
    </div>
  );
};

export default EmotionDetail;
