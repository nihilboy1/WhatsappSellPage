import { useState, useEffect } from "react";
import { ServerMessageLine } from "./Components/ServerMessageLine";
import { Header } from "./Components/Header";
import { Input } from "./Components/Input";
import { ClientMessageLine } from "./Components/ClientMessageLine";
import { v4 as uuidv4 } from "uuid";

const firstMessages = [
  "Olá, seja bem vindo(a)!",
  "Você está no ESTÚDIO SONORIZAR!",
  "Qual o seu WHATSAPP? (Com DDD)",
];

const userOptions = ["BORAA!!!", "VER OUTRAS OPÇÕES"];
const productOptions = ["GRAVAÇÃO 1", "GRAVAÇÃO 2", "GRAVAÇÃO 3"];

export type stageProps = "phone" | "name" | "options";

export default function App() {
  const [firstMessagesCounter, setFirstMessagesCounter] = useState(0);
  const [clientPhone, setClientPhone] = useState("");
  const [clientName, setClientName] = useState("");
  const [stage, setStage] = useState<stageProps>("phone");
  const [text, setText] = useState("");
  const [renderedFirstMessages, setRenderedFirstMessages] = useState<
    JSX.Element[]
  >([]);
  const [messagesList, setMessagesList] = useState<JSX.Element[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");

  function clearButtons() {
    const filteredMessageList = messagesList.filter((item) => {
      if (item.props.type !== "button") {
        return item;
      }
    });
    setMessagesList(filteredMessageList);
  }

  function clearDemonstratativeMessages() {
    console.log(messagesList);

    let indexClientName = messagesList.findIndex(
      (item) => item.props.text === clientName
    );

    const filteredMessageList = messagesList.filter((item, index) => {
      if (index <= indexClientName) {
        return item;
      }
    });

    setMessagesList(filteredMessageList);
  }

  function getDescriptionTextFromSelectedOption(selectedOption: string) {
    if (selectedOption === "GRAVAÇÃO 1") {
      return "A GRAVAÇAO 1 É EXCELENTE PARA X TIPOS DE COMÉRCIOS";
    } else if (selectedOption === "GRAVAÇÃO 2") {
      return "A GRAVAÇAO 2 É EXCELENTE PARA Y TIPOS DE COMÉRCIOS";
    }
    return "A GRAVAÇAO 3 É EXCELENTE PARA Z TIPOS DE COMÉRCIOS";
  }

  function sendClientMessage(text: string) {
    setMessagesList((prevMessages) => [
      ...prevMessages,
      <ClientMessageLine key={uuidv4()} text={text} />,
    ]);
  }

  function sendServerMessage(text: string) {
    const timer = setTimeout(() => {
      setMessagesList((prevMessages) => [
        ...prevMessages,
        <ServerMessageLine key={uuidv4()} text={text} />,
      ]);
    }, 1500);
    return () => clearTimeout(timer);
  }

  function sendServerAudioMessage(link: string) {
    const timer = setTimeout(() => {
      setMessagesList((prevMessages) => [
        ...prevMessages,
        <ServerMessageLine key={uuidv4()} type="audio" link={link} />,
      ]);
    }, 1500);
    return () => clearTimeout(timer);
  }

  function sendServerButtonMessage(productList: string[]) {
    const timer = setTimeout(() => {
      setMessagesList((prevMessages) => [
        ...prevMessages,
        ...productList.map((item) => {
          return (
            <ServerMessageLine
              text={item}
              type="button"
              key={uuidv4()}
              stage={stage}
              setSelectedOption={setSelectedOption}
            />
          );
        }),
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (firstMessagesCounter < firstMessages.length) {
        setRenderedFirstMessages((prevMessages) => [
          ...prevMessages,
          <ServerMessageLine
            key={uuidv4()}
            text={firstMessages[firstMessagesCounter]}
          />,
        ]);
        setFirstMessagesCounter((prevCounter) => prevCounter + 1);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [firstMessagesCounter]);

  useEffect(() => {
    if (clientPhone !== "") {
      sendClientMessage(clientPhone);
      sendServerMessage("Agora informe seu NOME");
      setStage("name");
    }
  }, [clientPhone]);

  useEffect(() => {
    if (clientName !== "") {
      sendClientMessage(clientName);
      sendServerMessage(
        `${clientName}, qual das opções abaixo você está buscando? Clique em uma delas!`
      );
      sendServerButtonMessage(productOptions);
      setStage("options");
    }
  }, [clientName]);

  useEffect(() => {
    if (selectedOption !== "") {
      if (productOptions.includes(selectedOption)) {
        clearButtons();
        const descriptionText =
          getDescriptionTextFromSelectedOption(selectedOption);
        sendClientMessage(selectedOption);
        sendServerMessage(descriptionText);
        sendServerMessage("Vou te enviar um demonstrativo, olha só...");
        sendServerAudioMessage(
          "https://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg"
        );
        sendServerMessage("O que achou? Vamos fazer uma dessas para você?");
        sendServerButtonMessage(userOptions);
      } else if (userOptions.includes(selectedOption)) {
        if (selectedOption == userOptions[0]) {
          console.log("levar para o whatsapp real com o pedido");
          window.open(
            "https://wa.me//5584981410949?text=Tenho%20interesse%20em%20comprar"
          );
        } else if (selectedOption == userOptions[1]) {
          clearButtons();
          clearDemonstratativeMessages();
          sendServerMessage(
            `${clientName}, qual das opções abaixo você está buscando? Clique em uma delas!`
          );
          sendServerButtonMessage(productOptions);
          setStage("options");
        }
      }
    }
  }, [selectedOption]);

  return (
    <main className="bg-whats-pattern min-h-screen h-full flex-col">
      <Header typing={renderedFirstMessages.length == 3 ? false : true} />
      <div className="p-4 flex flex-col pb-20 pt-[6rem] ">
        {renderedFirstMessages}
        {messagesList}
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
