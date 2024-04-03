interface ServerMessageLine {
  text: string;
  type?: "button" | "text";
}

export function ServerMessageLine({ text, type = "text" }: ServerMessageLine) {
  if (type == "text") {
    return (
      <span className="bg-white rounded-b-xl shadow-sm  rounded-tr-xl  p-2 text-md text-zinc-900 mb-2 inline-block pr-8 break-normal animate-fade animate-once animate-duration-500 animate-ease-in-out animate-normal animate-fill-forwards">
        {text}
      </span>
    );
  }
  return (
    <button className="bg-green-900 rounded-b-xl shadow-sm font-black text-left pl-3 rounded-tr-xl  p-2 text-md text-white mb-2 inline-block pr-8 break-normal animate-fade animate-once animate-duration-500 animate-ease-in-out animate-normal animate-fill-forwards">
      {text}
    </button>
  );
}
