export type Emotion = {
  id: string;
  name: string;
  color: string;
};

export const emotions: Emotion[] = [
  { id: 'happy', name: 'うれしい', color: '#FFD700' },
  { id: 'sad', name: 'かなしい', color: '#4169E1' },
  { id: 'scared', name: 'こわい', color: '#800080' },
  { id: 'fun', name: 'たのしい', color: '#FF69B4' },
  { id: 'angry', name: 'おこってる', color: '#FF4500' },
  { id: 'surprised', name: 'びっくり', color: '#32CD32' },
]; 