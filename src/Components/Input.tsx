import { PaperPlaneRight } from "@phosphor-icons/react";
import { useState } from "react";
import { stageProps } from "../App";

interface InputProps {
  setText: (value: string) => void;
  setStage: (value: stageProps) => void;
  setClientPhone: (value: string) => void;
  setClientName: (value: string) => void;

  text: string;
  stage: stageProps;
}

export function Input({
  setText,
  setClientPhone,
  setClientName,
  text,
  stage,
  setStage,
}: InputProps) {
  const [invalidPhone, setInvalidPhone] = useState(false);

  async function handleSetData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (stage == "phone") {
      if (text.length == 11) {
        setClientPhone(text);
        setText("");
        setInvalidPhone(false);
        setStage("name");
      } else {
        setInvalidPhone(true);
      }
    } else if (stage == "name") {
      setClientName(text);
      setText("");
      setStage("options");
    }
  }

  return (
    <div className="fixed bottom-0 mt-20">
      {invalidPhone && (
        <span className="pl-4 font-bold text-red-600">
          Parece que esse telefone não é válido
        </span>
      )}
      <form
        className="flex flex-row h-16 w-screen p-2"
        onSubmit={handleSetData}
      >
        <input
          type={stage == "phone" ? "number" : "text"}
          maxLength={20}
          disabled={stage == "options" ? true : false}
          placeholder={
            stage == "phone"
              ? "Informe seu WHATSAPP"
              : stage == "name"
              ? "Informe seu NOME"
              : stage == "options"
              ? "Clique em uma das OPÇÕES"
              : "Escreva aqui"
          }
          className="rounded-full  p-4  w-full shadow-md"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button
          type="submit"
          className="rounded-full bg-green-800 w-[4.5rem] flex items-center justify-center shadow-md hover:bg-green-700 transition-colors"
        >
          <PaperPlaneRight size={26} color="#f2f2f2" weight="fill" />
        </button>
      </form>
    </div>
  );
}
