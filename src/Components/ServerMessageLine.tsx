import { Microphone } from "@phosphor-icons/react";
import { stageProps } from "../App";

interface ServerMessageLine {
  text?: string | undefined;
  type?: "button" | "text" | "audio";
  link?: string | undefined;
  stage?: stageProps;
  setSelectedOption?: (option: string) => void;
}

export function ServerMessageLine({
  text,
  type = "text",
  link,
  setSelectedOption,
}: ServerMessageLine) {
  function handleSelectOption() {
    if (setSelectedOption && text) {
      setSelectedOption(text);
    }
  }

  if (type == "text") {
    return (
      <span className="bg-white rounded-b-xl shadow-sm rounded-tr-xl  p-2 text-md text-zinc-900 mb-2 pr-8 break-normal animate-fade animate-once animate-duration-500 animate-ease-in-out animate-normal animate-fill-forwards">
        {text}
      </span>
    );
  }

  if (type == "audio" && link) {
    return (
      <div className="flex flex-row w-[22.5rem] border-2 mb-4 bg-[#f1f3f4] shadow-lg rounded-lg px-2 items-center">
        <div className="w-full py-3 flex flex-col gap-1 justify-start ">
          <audio controls className="w-[17rem]">
            <source src="/public/mp3.mp3" type="audio/mp3" />
            seu navegador não suporta HTML5
          </audio>
        </div>
        <div className="relative flex  w-[6rem] justify-center items-center">
          <img
            src="https://i.imgur.com/y5bbI33.png"
            alt="Imagem do atendente"
            className="rounded-full w-[4rem] h-[4rem]"
          />
          <div className="absolute left-0 top-9 bg-[#f1f3f4] rounded-full p-[0.2rem]">
            <Microphone size={24} weight="fill" color="#005E54" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <button
      onClick={handleSelectOption}
      className="bg-[#005E54] rounded-b-xl shadow-sm hover:shadow-inner  font-semibold text-center  rounded-tr-xl p-2 text-md text-white mb-2 pr-8 break-normal animate-fade animate-once animate-duration-500 animate-ease-in-out animate-normal animate-fill-forwards border-2  transition-all"
    >
      {text}
    </button>
  );
}
