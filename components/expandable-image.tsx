"use client";
import Image from "next/image";
import { type MouseEvent } from "react";
import { createRoot } from "react-dom/client";
import { cn } from "@/lib/utils";

function ExpandImage(Event?: MouseEvent<HTMLButtonElement>) {
  if (Event?.currentTarget) {
    const Button = Event!.currentTarget;
    if (Button.childElementCount === 1) {
      const ButtonImage: HTMLImageElement = Button.children[0] as HTMLImageElement;
      const Expanded = document.createElement("div");
      Expanded.className = "z-50 fixed w-full h-full bg-black/75 flex flex-col flex-wrap justify-center items-center transition-opacity duration-300 opacity-0";
      const ExpandedRoot = createRoot(Expanded);
      ExpandedRoot.render(
        <>
          <button type="button" className="absolute top-0 right-0 mr-2 w-max h-max" onClick={function() {
            Expanded.classList.add("opacity-0");
            Expanded.classList.remove("opacity-100");
            setTimeout(function() {
              Expanded.remove();
            }, 300);
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="3rem" viewBox="0 0 384 512" className="fill-white">
              <title>X Icon</title>
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
            </svg>
            <p className="sr-only">Close</p>
          </button>
          <img srcSet={ButtonImage.srcset} src={ButtonImage.src} sizes="(min-width: 640px) 50vw, 75vw" alt={ButtonImage.alt} width={ButtonImage.width} height={ButtonImage.height} className="h-[75vw] sm:h-[50vw] max-h-[90%] w-auto object-contain" />
          <p className="text-white text-xl text-center w-3/4 sm:w-1/2">{ButtonImage.alt}</p>
        </>
      );
      document.body.appendChild(Expanded);
      setTimeout(function() {
        Expanded.classList.add("opacity-100");
        Expanded.classList.remove("opacity-0");
      });
    };
  };
};

export default function ExpandableImage({ src, alt, width, height, sizes, priority = false, buttonClassName, className }: {
  src: string,
  alt: string,
  width: number,
  height: number,
  sizes: string,
  priority?: boolean,
  buttonClassName? : string,
  className?: string,
}) {
  return (
    <button className={buttonClassName} onClick={ExpandImage}>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className={cn("object-cover w-full h-full", className)} priority={priority} />
    </button>
  );
};