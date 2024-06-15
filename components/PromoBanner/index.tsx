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
        sizes="100vw"
        alt={alt}
        priority
        {...props}
      />
    </Link>
  );
}
