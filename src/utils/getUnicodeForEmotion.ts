import { Emotion, emotionMap } from "../types/emotionMap";

/**
 * 感情とスライダー値（1-5）からUnicodeを返す関数
 * @param emotion 感情タイプ
 * @param level スライダー値（1-5）
 * @returns OpenMojiのURL
 */
export const getUnicodeForEmotion = (
  emotion: Emotion,
  level: number
): string => {
  // レベルが範囲外の場合は調整
  const safeLevel = Math.max(1, Math.min(5, Math.round(level)));

  // 0から始まるインデックスに変換
  const index = safeLevel - 1;

  // 該当する絵文字のUnicodeを取得
  const unicode = emotionMap[emotion].emoji[index];

  // OpenMojiのURLを返す
  return `https://openmoji.org/data/color/svg/${unicode}.svg`;
};
