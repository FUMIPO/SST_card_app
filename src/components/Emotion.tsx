import { useState, useRef } from "react";
import { Emotion as EmotionType } from "../types/emotionMap";
import { getUnicodeForEmotion } from "../utils/getUnicodeForEmotion";
import { emotions } from "../types/emotion";

type Props = {
  emotionId: string;
  initialLevel?: number;
  onLevelChange?: (level: number) => void;
};

const Emotion = ({ emotionId, initialLevel = 3, onLevelChange }: Props) => {
  const [level, setLevel] = useState(initialLevel);
  const sliderRef = useRef<HTMLInputElement>(null);
  const emotion = emotions.find((e) => e.id === emotionId);

  if (!emotion) return null;

  const emotionType = emotionId as EmotionType;
  // 常にレベル1の絵文字を使用
  const emojiUrl = getUnicodeForEmotion(emotionType, 1);

  // レベルに応じた絵文字サイズの計算（1:小さく、5:大きく）
  const getEmojiSize = () => {
    const minSize = 100; // 最小サイズ（レベル1）
    const maxSize = 360; // 最大サイズ（レベル5）
    // レベルに基づいて計算
    const size = minSize + ((maxSize - minSize) / 4) * (level - 1);
    return size;
  };

  // レベルに応じた色の計算
  const getLevelColor = (currentLevel: number) => {
    const colors = {
      1: "#E5E7EB", // gray-200
      2: "#93C5FD", // blue-300
      3: "#3B82F6", // blue-500
      4: "#F97316", // orange-500
      5: "#EF4444", // red-500
    };
    return colors[currentLevel as keyof typeof colors];
  };

  const strengthToWords = {
    1: "ちょっぴり",
    2: "すこし",
    3: "",
    4: "たくさん",
    5: "いーっぱい",
  };

  // スライダーの値変更ハンドラ
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLevel = Number(e.target.value);
    setLevel(newLevel);
    // 親コンポーネントに通知
    if (onLevelChange) {
      onLevelChange(newLevel);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* 絵文字コンテナに固定高さを設定し、下部に余白を持たせる */}
      <div className="mb-16 h-[200px] flex items-center justify-center">
        <img
          src={emojiUrl}
          alt={emotion.name}
          className="transition-all duration-300"
          style={{
            width: `${getEmojiSize()}px`,
            height: `${getEmojiSize()}px`,
          }}
        />
      </div>

      <div className="w-full max-w-md mx-auto px-6">
        {/* スライダーコンテナをタッチ操作用に最適化 */}
        <div className="touch-manipulation relative pb-8 pt-4">
          {/* スライダー */}
          <div className="mx-auto mb-4">
            <input
              ref={sliderRef}
              type="range"
              min="1"
              max="5"
              step="1"
              value={level}
              onChange={handleSliderChange}
              className="emotion-slider touch-manipulation w-full"
              aria-label={`${emotion.name}のつよさを1から5で選択`}
              style={
                {
                  "--track-color": getLevelColor(level),
                } as React.CSSProperties
              }
            />
          </div>

          {/* 数字インジケーター */}
          <div className="flex justify-between px-2 mb-6">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex flex-col items-center">
                <span
                  className={`text-xl font-bold ${
                    num === level ? "scale-125" : "text-gray-500"
                  }`}
                  style={{
                    color: num === level ? getLevelColor(num) : "",
                  }}
                >
                  {num}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emotion;
