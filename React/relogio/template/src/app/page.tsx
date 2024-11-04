function page() {
  const fullTime = new Intl.DateTimeFormat("pt-BR", {
    timeStyle: "short",
    hour12: false,
  }).format();

  const hour = new Date().getHours();
  let greetings =
    hour >= 0 && hour < 12
      ? "bom dia"
      : hour >= 12 && hour < 18
      ? "boa tarde"
      : "boa noite";

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center text-white bg-gradient-to-r from-sky-500 to-indigo-500">
      <div className="text-9xl">{fullTime}</div>
      <div className="text-5xl font-bold">{greetings} </div>
    </div>
  );
}

export default page;
