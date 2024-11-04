import { emojiRating } from "./Components/emojiRating";
import { emojiRatingOtherWay } from "./Components/emojiRatingOtherWay";

function page() {
  const value = 4.9;

  // let finalText: string = emojiRating(value);
  let otherWay: string = emojiRatingOtherWay(value);

  return (
    <div>
      <h1 className="text-5xl text-center ">
        {value.toFixed(1)}
        {otherWay}
      </h1>
    </div>
  );
}

export default page;
