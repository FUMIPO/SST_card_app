import { useState, useRef, useEffect } from "react";
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
  const [emojiSize, setEmojiSize] = useState(100);
  const sliderRef = useRef<HTMLInputElement>(null);
  const emotion = emotions.find((e) => e.id === emotionId);

  if (!emotion) return null;

  const emotionType = emotionId as EmotionType;
  // 常にレベル1の絵文字を使用
  const emojiUrl = getUnicodeForEmotion(emotionType, 1);

  // 絵文字サイズを計算
  const calculateEmojiSize = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const smallerDimension = Math.min(screenWidth, screenHeight);

    // 小さい画面では最大サイズを制限
    const minSize = smallerDimension * 0.2; // 最小サイズ（レベル1）
    const maxSize = smallerDimension * 0.8; // 最大サイズ（レベル5）

    // レベルに基づいて計算
    const size = minSize + ((maxSize - minSize) / 4) * (level - 1);
    return Math.min(size, maxSize); // 最大値で制限
  };

  // 画面サイズやレベルが変わったときに絵文字サイズを再計算
  useEffect(() => {
    const handleResize = () => {
      setEmojiSize(calculateEmojiSize());
    };

    handleResize(); // 初期サイズを設定
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [level]);

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
    <div className="flex flex-col items-center w-full">
      {/* 絵文字コンテナに固定高さを設定し、スライダーの位置が動かないようにする */}
      <div
        className="flex items-center justify-center relative"
        style={{ height: "200px" }}
      >
        <img
          src={emojiUrl}
          alt={emotion.name}
          className="transition-all duration-300"
          style={{
            width: `${emojiSize}px`,
            height: `${emojiSize}px`,
          }}
        />
      </div>

      <div className="w-full max-w-md mx-auto px-6 mt-4">
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
