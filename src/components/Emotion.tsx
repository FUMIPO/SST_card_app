import { useState } from "react";
import { Emotion as EmotionType } from "../types/emotionMap";
import { getUnicodeForEmotion } from "../utils/getUnicodeForEmotion";
import { emotions } from "../types/emotion";

type Props = {
  emotionId: string;
};

const Emotion = ({ emotionId }: Props) => {
  const [level, setLevel] = useState(1); // 初期値を1に変更
  const emotion = emotions.find((e) => e.id === emotionId);

  if (!emotion) return null;

  // emotionIdをEmotionType型に変換（型安全のため）
  const emotionType = emotionId as EmotionType;

  // 対応するUnicodeのURLを取得
  const emojiUrl = getUnicodeForEmotion(emotionType, level);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6">
        <img src={emojiUrl} alt={emotion.name} className="w-32 h-32 mx-auto" />
      </div>

      <div className="w-full max-w-xs">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm">1</span>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm">5</span>
        </div>
        <p className="text-center text-gray-600">
          {emotion.name}のつよさ: {level}
        </p>
      </div>
    </div>
  );
};

export default Emotion;
