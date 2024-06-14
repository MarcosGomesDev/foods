import Image, { ImageProps } from "next/image";
import Link, { LinkProps } from "next/link";

interface PromoBannerProps extends ImageProps {
  href: LinkProps["href"];
}

export function PromoBanner({ href, alt, ...props }: PromoBannerProps) {
  return (
    <Link href={href}>
      <Image
        width={0}
        height={0}
        className="h-auto w-full object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={alt}
        quality={100}
        {...props}
      />
    </Link>
  );
}
