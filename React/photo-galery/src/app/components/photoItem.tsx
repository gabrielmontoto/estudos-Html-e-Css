import { photo } from "../types/photo";

type Props = {
  photo: photo;
  onClickEvent: () => void;
};

export function PhotoItem({ photo, onClickEvent }: Props) {
  return (
    <div className="cursor-pointer hover:opacity-80" onClick={onClickEvent}>
      <img src={`/content/${photo.url}`} alt="" className="w-full h-full" />
    </div>
  );
}
