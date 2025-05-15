import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { emotions } from "../types/emotion";
import Emotion from "../components/Emotion";
import { FiCheckCircle } from "react-icons/fi";
import { FaChild, FaStar } from "react-icons/fa";

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
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  // アドレスバーを隠すための処理を追加
  useEffect(() => {
    // ページロード時に画面トップへスクロール
    window.scrollTo(0, 0);

    // iOS Safariなどでアドレスバーを隠す試み
    const hideAddressBar = () => {
      if (document.documentElement.scrollHeight > window.innerHeight) {
        window.scrollTo(0, 1);
      }
    };

    // 少し遅延させて実行
    setTimeout(hideAddressBar, 100);

    // 画面サイズが変わった時にも試行
    window.addEventListener("resize", hideAddressBar);

    return () => {
      window.removeEventListener("resize", hideAddressBar);
    };
  }, []);

  // レベル変更ハンドラ
  const handleLevelChange = (newLevel: number) => {
    console.log(`EmotionDetail: レベル変更 ${level} → ${newLevel}`);
    setLevel(newLevel);
  };

  if (!emotion) {
    return (
      <div className="max-w-4xl mx-auto p-5 text-center">
        感情が見つかりません
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white pb-safe">
      <header className="pt-1 px-2 sticky top-0 bg-white z-10">
        <div className="text-center rounded-lg bg-gray-100 py-2 px-2 shadow-sm">
          <h2 className="text-lg font-medium text-gray-700 mb-1">
            わたしはいま
          </h2>
          <h1 className="text-2xl font-bold text-gray-800">
            {strengthToWords[level as keyof typeof strengthToWords] &&
              `${strengthToWords[level as keyof typeof strengthToWords]} `}
            <span style={{ color: emotion.color }}>{emotion.name}</span>
          </h1>
          <h2 className="text-lg font-medium text-gray-700 mt-1">です</h2>
        </div>
      </header>

      <main className="h-auto flex flex-col items-center justify-center p-2 mt-0 bg-white">
        {/* 感情表示エリア - スマホ画面に合わせてさらに小さく */}
        <div
          className="w-full max-w-md flex items-center justify-center overflow-visible"
          style={{ height: "auto" }}
        >
          <Emotion
            emotionId={emotion.id}
            initialLevel={level}
            onLevelChange={handleLevelChange}
          />
        </div>
      </main>

      <footer className="p-3 pb-safe bg-white z-10">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white text-lg font-bold px-5 py-2 rounded-full shadow-lg active:bg-blue-700 active:scale-95 transition-all touch-manipulation"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            もどる
          </button>

          <button
            onClick={() => setShowThankYouModal(true)}
            className="flex items-center justify-center bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 touch-manipulation"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <FiCheckCircle className="text-green-500 w-8 h-8" />
          </button>
        </div>
      </footer>

      {/* サンクスモーダル */}
      {showThankYouModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={() => setShowThankYouModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-sm flex flex-col items-center shadow-lg animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-5xl mb-4 text-yellow-400">
              <FaStar className="inline-block animate-gentle-pulse" />
              <FaChild className="inline-block mx-2 text-blue-500" />
              <FaStar className="inline-block animate-gentle-pulse" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              おしえてくれてありがとう！
            </h2>
            <button
              onClick={(e) => {
                e.stopPropagation(); // イベント伝播を停止
                setShowThankYouModal(false);
                // タイミング問題を解決するため少し遅延してナビゲーション
                setTimeout(() => {
                  navigate("/");
                }, 10);
              }}
              className="bg-green-500 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md active:bg-green-600 active:scale-95 transition-all touch-manipulation"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              もどる
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmotionDetail;
