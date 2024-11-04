export function emojiRating(value: number): string {
  if (value < 0) value = 0;
  if (value > 5) value = 5;
  const maxSpaces = 5;
  const happyEmoji = "😊";
  const noFaceEmoji = "😶";

  let finalText: string = "";
  const floorNumber = Math.floor(value);

  finalText += happyEmoji.repeat(floorNumber);
  finalText += noFaceEmoji.repeat(maxSpaces - floorNumber);

  return finalText;
}
