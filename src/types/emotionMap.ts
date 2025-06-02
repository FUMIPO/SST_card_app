// 感情と強さレベルに応じたUnicodeマッピング
export type Emotion =
  | "happy"
  | "sad"
  | "angry"
  | "surprised"
  | "scared"
  | "fun";

// 各感情に対応するUnicodeを定義
export const emotionMap: Record<Emotion, { emoji: string }> = {
  happy: {
    emoji: "1F60A", // 笑顔
  },
  sad: {
    emoji: "1F622", // 悲しい
  },
  angry: {
    emoji: "1F620", // 怒り
  },
  surprised: {
    emoji: "1F62E", // 驚き
  },
  scared: {
    emoji: "1F628", // 恐れ
  },
  fun: {
    emoji: "1F606", // 楽しい
  },
};

// 感情の日本語表示名
export const emotionLabels: Record<Emotion, string> = {
  happy: "うれしい",
  sad: "かなしい",
  angry: "おこってる",
  surprised: "びっくり",
  scared: "こわい",
  fun: "たのしい",
};
