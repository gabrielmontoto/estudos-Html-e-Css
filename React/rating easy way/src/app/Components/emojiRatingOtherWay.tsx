type IdMap<T> = {
  [id: string]: T;
};

type ratingValues = {
  id: number;
  emoji: string;
};

const ratingMap: IdMap<ratingValues> = {
  [0]: { id: 0, emoji: "😢" },
  [1]: { id: 1, emoji: "😒" },
  [2]: { id: 2, emoji: "😶" },
  [3]: { id: 3, emoji: "😊" },
  [4]: { id: 4, emoji: "😁" },
  [5]: { id: 5, emoji: "😍" },
};
export function emojiRatingOtherWay(value: number): string {
  if (value < 0) value = 0;
  if (value > 5) value = 5;
  const maxSpaces = 5;
  let finalText: string = "";

  const floorNumber = Math.floor(value);

  finalText += ratingMap[floorNumber].emoji.repeat(floorNumber);
  finalText += ratingMap[0].emoji.repeat(maxSpaces - floorNumber);

  return finalText;
}
