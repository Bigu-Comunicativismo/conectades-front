interface ContainerProps {
    classCss: string,
    ariaLabel?: string,
    children: React.ReactNode
    ref?: React.RefObject<HTMLDivElement | null>
}

export function Container({ classCss, ariaLabel, children, ref }: ContainerProps) {
    return (
        <div className={classCss} aria-label={ariaLabel} ref={ref}>
            {children}
        </div>
    )
}