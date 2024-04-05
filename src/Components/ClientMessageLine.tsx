import { v4 as uuidv4 } from 'uuid';


interface ClientMessageLineProps {
  text: string;
}

export function ClientMessageLine({ text }: ClientMessageLineProps) {
  return (
    <span key={uuidv4()}  className="bg-[#E1FFC7] text-right text-black rounded-b-xl shadow-sm  rounded-tl-xl  p-2 text-md mb-8 inline-block pr-8 break-all animate-fade animate-once animate-duration-500 animate-ease-in-out animate-normal animate-fill-forwards">
      {text}
    </span>
  );
}
