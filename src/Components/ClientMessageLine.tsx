interface ClientMessageLineProps {
    text: string
}


export function ClientMessageLine({text}:ClientMessageLineProps ){
    return <span className="bg-green-800 text-right text-white rounded-b-xl shadow-sm  rounded-tl-xl  p-2 text-md mb-8 inline-block pr-8 break-all animate-fade animate-once animate-duration-500 animate-ease-in-out animate-normal animate-fill-forwards">
    {text}
  </span>
}