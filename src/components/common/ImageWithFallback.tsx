import { useState, type ImgHTMLAttributes, type ReactNode } from 'react';

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
  /** Rendered when src is empty or the image fails to load */
  fallback: ReactNode;
}

export const ImageWithFallback = ({ src, fallback, alt = '', onError, ...rest }: Props) => {
  // Track which src failed, so a new src gets a fresh attempt automatically
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) return <>{fallback}</>;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={(event) => {
        setFailedSrc(src);
        onError?.(event);
      }}
      {...rest}
    />
  );
};