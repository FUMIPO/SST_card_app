import { Emotion, emotionMap } from "../types/emotionMap";

/**
 * 感情からUnicodeを返す関数
 * @param emotion 感情タイプ
 * @returns OpenMojiのURL
 */
export const getUnicodeForEmotion = (
  emotion: Emotion,
  _level: number // levelは使用しないが、互換性のために残す
): string => {
  // 該当する絵文字のUnicodeを取得
  const unicode = emotionMap[emotion].emoji;

  // OpenMojiのURLを返す
  return `https://openmoji.org/data/color/svg/${unicode}.svg`;
};
