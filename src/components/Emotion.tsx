import { useState, useRef, useEffect } from "react";
import { Emotion as EmotionType } from "../types/emotionMap";
import { getUnicodeForEmotion } from "../utils/getUnicodeForEmotion";
import { emotions } from "../types/emotion";

type Props = {
  emotionId: string;
  initialLevel?: number;
  onLevelChange?: (level: number) => void;
};

// サイズマップ - コンポーネント外で定義して参照の問題を避ける
const SIZE_MAP = {
  1: { class: "w-20 h-20", px: 80 },
  2: { class: "w-32 h-32", px: 128 },
  3: { class: "w-40 h-40", px: 160 },
  4: { class: "w-48 h-48", px: 192 },
  5: { class: "w-56 h-56", px: 224 },
};

const Emotion = ({ emotionId, initialLevel = 3, onLevelChange }: Props) => {
  // 状態をuseStateでトラッキング
  const [level, setLevel] = useState(initialLevel);
  const [forceUpdate, setForceUpdate] = useState(0); // 強制再レンダリング用のカウンター
  const sliderRef = useRef<HTMLInputElement>(null);
  const emotion = emotions.find((e) => e.id === emotionId);

  if (!emotion) return null;

  const emotionType = emotionId as EmotionType;
  // 固定の絵文字を使用（レベル3）- サイズのみ変更
  const emojiUrl = getUnicodeForEmotion(emotionType, 3);

  // レベルに応じたサイズクラスを取得
  const sizeInfo = SIZE_MAP[level as keyof typeof SIZE_MAP] || SIZE_MAP[3];
  const sizeClass = sizeInfo.class;
  const sizePx = sizeInfo.px;

  // スライダーの値変更ハンドラ - より厳密な変更検知
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLevel = Number(e.target.value);
    // 同じ値なら何もしない
    if (newLevel === level) return;

    console.log(
      `スライダー値変更: ${level} → ${newLevel} (サイズ: ${sizePx} → ${
        SIZE_MAP[newLevel as keyof typeof SIZE_MAP].px
      }px)`
    );

    // 強制的に再レンダリング
    setLevel(newLevel);
    setForceUpdate((prev) => prev + 1);

    // 親コンポーネントに通知
    if (onLevelChange) {
      onLevelChange(newLevel);
    }
  };

  // スライダーのタッチ操作対応用のハンドラ
  const handleSliderInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const newLevel = Number(target.value);
    // 同じ値なら何もしない
    if (newLevel === level) return;

    console.log(`スライダータッチ操作: ${level} → ${newLevel}`);

    // 強制的に再レンダリング
    setLevel(newLevel);
    setForceUpdate((prev) => prev + 1);

    if (onLevelChange) {
      onLevelChange(newLevel);
    }
  };

  // レベル変更を検出するためのuseEffect
  useEffect(() => {
    console.log(`レベルが変更されました: ${level}、サイズクラス: ${sizeClass}`);
    // 何かあれば追加のアクションをここに
  }, [level, sizeClass]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* 絵文字コンテナ - キーを使って強制的に再レンダリングを促す */}
      <div
        className="flex items-center justify-center relative"
        style={{ height: "auto", minHeight: "224px" }}
        key={`container-${level}-${forceUpdate}`}
      >
        <img
          src={emojiUrl}
          alt={emotion.name}
          key={`emoji-${level}-${forceUpdate}`}
          className={`transition-all duration-300 ${sizeClass}`}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* スライダー部分 */}
      <div className="w-full max-w-md mx-auto px-6 mt-4">
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
              onInput={handleSliderInput}
              className="emotion-slider touch-manipulation w-full"
              aria-label={`${emotion.name}のつよさを1から5で選択`}
              style={
                {
                  "--track-color": getLevelColor(level),
                } as React.CSSProperties
              }
            />
          </div>

          {/* 数字インジケーター - 現在のレベルを強調表示 */}
          <div className="flex justify-between px-2 mb-6">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={`level-${num}`}
                className="flex flex-col items-center"
                onClick={() => {
                  setLevel(num);
                  setForceUpdate((prev) => prev + 1);
                  if (onLevelChange) onLevelChange(num);
                }}
              >
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

export default Emotion;
