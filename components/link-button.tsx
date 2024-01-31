import Link from "next/link";

export default function LinkButton(props: {
  href: string,
  textContent: string,
}) {
  return (
    <Link href={props.href} className="border-2 bg-transparent px-3 py-1 border-yellow-500 rounded-md text-yellow-500 fill-yellow-500 group transition-colors duration-300 hover:border-white hover:bg-yellow-500 hover:text-white hover:fill-white focus-visible:border-white focus-visible:bg-yellow-500 focus-visible:text-white focus-visible:fill-white">
      <p className="inline-block">{props.textContent}</p>
      <svg xmlns="http://www.w3.org/2000/svg" className="inline-block align-middle" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path className="transition-transform duration-300 translate-x-0.5 group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5" fill="currentColor" d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"></path>
        <path className="transition-[stroke-dashoffset,transform] duration-300 translate-x-0.5 group-hover:translate-x-1.5 group-hover:stem-offset group-focus-visible:translate-x-1.5 group-focus-visible:stem-offset" strokeDashoffset={10} strokeDasharray={10} stroke="currentColor" d="M1.75 8H11" strokeWidth="1.5" strokeLinecap="round"></path>
      </svg>
    </Link>
  );
};