import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { emotions } from "../types/emotion";
import Emotion from "../components/Emotion";

// 感情の強さを言葉で表現するマッピング
const strengthToWords = {
  1: "ちょっぴり",
  2: "すこし",
  3: "",
  4: "たくさん",
  5: "いーっぱい",
};

const EmotionDetail = () => {
  const { id, level: initialLevel = "3" } = useParams<{
    id: string;
    level: string;
  }>();
  const [level, setLevel] = useState(parseInt(initialLevel));
  const navigate = useNavigate();
  const emotion = emotions.find((e) => e.id === id);

  // レベル変更ハンドラ
  const handleLevelChange = (newLevel: number) => {
    setLevel(newLevel);
  };

  // スマホ向け設定
  useEffect(() => {
    // スクロールを無効化し、固定表示に
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";

    // コンポーネントがアンマウントされたときにリセット
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, []);

  // ビューポートの高さを設定（モバイルブラウザ対応）
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);

    return () => window.removeEventListener("resize", setViewportHeight);
  }, []);

  if (!emotion) {
    return (
      <div className="max-w-4xl mx-auto p-5 text-center">
        感情が見つかりません
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 flex flex-col p-4 overflow-hidden"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <header className="pt-2">
        <div className="text-center rounded-lg bg-gray-100 py-6 px-4 shadow-sm">
          <h2 className="text-xl font-medium text-gray-700 mb-2">
            わたしはいま
          </h2>
          <h1 className="text-3xl font-bold text-gray-800">
            {strengthToWords[level as keyof typeof strengthToWords] &&
              `${strengthToWords[level as keyof typeof strengthToWords]} `}
            <span style={{ color: emotion.color }}>{emotion.name}</span> です
          </h1>
        </div>
      </header>

      <main className="flex items-center justify-center mt-12">
        <div className="w-full max-w-md">
          <Emotion
            emotionId={emotion.id}
            initialLevel={level}
            onLevelChange={handleLevelChange}
          />
        </div>
      </main>

      <footer className="py-6 mt-auto">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white text-xl font-bold px-8 py-4 rounded-full shadow-lg active:bg-blue-700 active:scale-95 touch-manipulation transition-all"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          もどる
        </button>
      </footer>
    </div>
  );
};

export default EmotionDetail;
