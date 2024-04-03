import { useState, useEffect } from "react";
import { ServerMessageLine } from "./Components/ServerMessageLine";
import { Header } from "./Components/Header";
import { Input } from "./Components/Input";
import { ClientMessageLine } from "./Components/ClientMessageLine";

const firstMessages = [
  "Olá, seja bem vindo(a)!",
  "Você está no ESTÚDIO SONORIZAR!",
  "Qual o seu WHATSAPP? (Com DDD)",
];

export default function App() {
  const [serverMessagesCounter, setServerMessagesCounter] = useState(0);
  const [clientPhone, setClientPhone] = useState("");
  const [clientName, setClientName] = useState("");
  const [stage, setStage] = useState<"phone" | "name" | "products">("phone");
  const [text, setText] = useState("");
  const [renderedFirstMessages, setRenderedFirstMessages] = useState<
    JSX.Element[]
  >([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (serverMessagesCounter < firstMessages.length) {
        setRenderedFirstMessages((prevMessages) => [
          ...prevMessages,
          <ServerMessageLine
            key={firstMessages[serverMessagesCounter]}
            text={firstMessages[serverMessagesCounter]}
          />,
        ]);
        setServerMessagesCounter((prevCounter) => prevCounter + 1);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [serverMessagesCounter]);

  useEffect(() => {
    if (serverMessagesCounter == 3) {
      const timer = setTimeout(() => {
        setServerMessagesCounter((prevCounter) => prevCounter + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [clientPhone]);

  useEffect(() => {
    if (serverMessagesCounter == 4) {
      const timer = setTimeout(() => {
        setServerMessagesCounter((prevCounter) => prevCounter + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [clientName]);

  return (
    <main className="bg-whats-pattern h-screen flex-col">
      <Header typing={renderedFirstMessages.length == 3 ? false : true} />
      <div className="p-4 flex flex-col pb-20">
        {renderedFirstMessages}
        {clientPhone && <ClientMessageLine text={clientPhone} />}
        {serverMessagesCounter >= 4 && (
          <ServerMessageLine text="Agora informe o seu NOME" />
        )}
        {clientName && <ClientMessageLine text={clientName} />}
        {serverMessagesCounter >= 5 && (
          <ServerMessageLine
            text={`${clientName}, qual das opções abaixo você está buscando? Clique em uma delas!`}
          />
        )}
        {serverMessagesCounter >= 5 && (
          <>
            <ServerMessageLine text="OPÇÃO 1" type="button" />
            <ServerMessageLine text="OPÇÃO 2" type="button" />
            <ServerMessageLine text="OPÇÃO 3" type="button" />
          </>
        )}
      </div>
      <Input
        setStage={setStage}
        setText={setText}
        text={text}
        stage={stage}
        setClientPhone={setClientPhone}
        setClientName={setClientName}
      />
    </main>
  );
}
