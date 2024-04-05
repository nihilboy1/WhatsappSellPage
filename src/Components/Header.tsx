import {
  ArrowLeft,
  Phone,
  SealCheck,
  VideoCamera,
} from "@phosphor-icons/react";

interface HeaderProps {
  typing: boolean;
}

export function Header({ typing }: HeaderProps) {
  return (
    <header className="h-[4.5rem] bg-[#005E54] flex flex-row p-4 mb-20  items-center justify-between fixed z-20 w-full">
      <ArrowLeft size={26} color="white" weight="bold" />
      <div className="flex flex-row items-center gap-2 ml-2 lg:mr-auto">
        <img
          src="https://i.imgur.com/y5bbI33.png"
          alt=""
          className="rounded-full w-[36px] h-[36px]"
        />
        <div className="flex flex-col">
          <div className="flex flex-row">
            <span className="text-white font-bold mr-1">Studio Sonorizar</span>
            <SealCheck size={18} color="#27eb00" weight="fill" />
          </div>

          <span className="text-zinc-200">
            {typing ? "Digitando..." : "Online"}
          </span>
        </div>
      </div>

      <div className="flex flex-row ml-10 gap-5">
        <VideoCamera size={26} color="#f2f2f2" weight="fill" />
        <Phone size={26} color="#f2f2f2" weight="fill" />
      </div>
    </header>
  );
}
