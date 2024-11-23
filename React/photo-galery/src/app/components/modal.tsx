type Props = {
  image: string;
  onClickEvent: () => void;
};

export function Modal({ image, onClickEvent }: Props) {
  return (
    <>
      <div
        className="fixed flex left-0 top-0 right-0 bottom-0 justify-center items-center bg-black/90"
        onClick={onClickEvent}
      >
        <img
          src={`/content/${image}`}
          alt=""
          className="max-w-screen max-h-screen justify-center items-center"
        />
      </div>
      <div
        className="fixed top-5 right-5 w-10 h-10 text-white text-5xl cursor-pointer"
        onClick={onClickEvent}
      >
        x
      </div>
    </>
  );
}
