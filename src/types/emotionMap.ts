// 感情と強さレベルに応じたUnicodeマッピング
export type Emotion =
  | "happy"
  | "sad"
  | "angry"
  | "surprised"
  | "scared"
  | "fun";

// 各感情に対して、強度レベル1-5に応じたUnicodeを定義
export const emotionMap: Record<Emotion, Record<string, string[]>> = {
  happy: {
    emoji: ["1F60A", "1F60A", "1F60A", "1F60A", "1F60A"], // すべて同じ笑顔に
  },
  sad: {
    emoji: ["1F622", "1F61F", "1F622", "1F62D", "1F62B"], // 悲しい → 号泣
  },
  angry: {
    emoji: ["1F620", "1F624", "1F621", "1F47F", "1F92C"], // 怒り → 激怒
  },
  surprised: {
    emoji: ["1F62E", "1F62F", "1F632", "1F633", "1F631"], // 軽い驚き → 大ショック
  },
  scared: {
    emoji: ["1F628", "1F630", "1F627", "1F626", "1F631"], // 恐れ → 恐怖
  },
  fun: {
    emoji: ["1F606", "1F603", "1F602", "1F604", "1F923"], // 楽しい → 爆笑
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
