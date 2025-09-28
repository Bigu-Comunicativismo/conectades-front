import type { ImgHTMLAttributes } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alternateText: string;
    className?: string;
}

export function Image({ src, alternateText, className }: ImageProps) {

    return (
        <img src={src} alt={alternateText} className={`${className}`} />
    );
}