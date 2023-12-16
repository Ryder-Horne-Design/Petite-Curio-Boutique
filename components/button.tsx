import { type MouseEventHandler } from "react";

export default function Button(props: {
  onClick: MouseEventHandler<HTMLButtonElement>,
  textContent: string,
}) {
  return (
    <button onClick={props.onClick} className="border-2 bg-transparent px-2 py-1 border-yellow-500 rounded-md text-yellow-500 fill-yellow-500 group transition-colors duration-300 hover:border-white hover:bg-yellow-500 hover:text-white hover:fill-white focus-visible:border-white focus-visible:bg-yellow-500 focus-visible:text-white focus-visible:fill-white">
      <p className="inline-block">{props.textContent}</p>
    </button>
  );
};