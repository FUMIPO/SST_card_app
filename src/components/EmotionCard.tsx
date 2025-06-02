import { useNavigate } from "react-router-dom";
import { Emotion } from "../types/emotion";
import { Emotion as EmotionType, emotionMap } from "../types/emotionMap";

type Props = {
  emotion: Emotion;
};

const EmotionCard = ({ emotion }: Props) => {
  const navigate = useNavigate();

  // emotionIdをEmotionType型に変換（型安全のため）
  const emotionType = emotion.id as EmotionType;

  // 絵文字のUnicodeを取得
  const emojiUnicode = emotionMap[emotionType].emoji;
  const emojiUrl = `https://openmoji.org/data/color/svg/${emojiUnicode}.svg`;

  return (
    <div
      className="w-36 h-36 flex flex-col items-center justify-center rounded-lg cursor-pointer transition-transform hover:scale-105 touch-none"
      style={{ backgroundColor: emotion.color }}
      onClick={() => navigate(`/emotion/${emotion.id}`)}
    >
      <img src={emojiUrl} alt={emotion.name} className="w-24 h-24 mb-1" />
      <span className="text-white text-xl font-bold text-shadow">
        {emotion.name}
      </span>
    </div>
  );
};

export default EmotionCard;
