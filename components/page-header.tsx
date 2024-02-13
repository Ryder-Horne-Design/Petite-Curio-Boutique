import { cn } from "@/lib/utils";
import Image from "next/image";

export default function PageHeader({ className, src, alt, priority = true, children }: {
  className?: string,
  src: string,
  alt: string,
  priority?: boolean,
  children: React.ReactNode,
}) {
  return (
    <header className={cn("p-4 min-[300px]:p-12 md:p-24 text-center relative overflow-hidden supports-[overflow:clip]:overflow-clip", className)}>
      <Image src={src} alt={alt} width={512} height={512} sizes="100vw" className="-z-50 supports-[filter:brightness(.5)]:brightness-50 absolute top-0 left-0 supports-[inset:0px]:inset-0 object-cover w-full h-full" loading="eager" priority={priority} />
      {children}
    </header>
  );
};