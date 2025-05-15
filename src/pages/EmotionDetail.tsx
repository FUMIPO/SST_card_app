import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { emotions } from "../types/emotion";
import Emotion from "../components/Emotion";

const EmotionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const emotion = emotions.find((e) => e.id === id);

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
      className="fixed inset-0 flex flex-col justify-between p-4 overflow-hidden"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <header className="pt-2 pb-4">
        <h1 className="text-2xl font-bold text-gray-800 rounded-lg bg-gray-100 py-4 shadow-sm">
          わたしはいま{" "}
          <span style={{ color: emotion.color }}>{emotion.name}</span> です
        </h1>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md">
          <Emotion emotionId={emotion.id} />
        </div>
      </main>

      <footer className="py-6">
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
