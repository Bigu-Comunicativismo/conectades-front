interface ContainerProps {
    classCss: string,
    ariaLabel?: string,
    children: React.ReactNode
    onClick?: ((event: React.MouseEvent<HTMLDivElement>) => void)
    ref?: React.RefObject<HTMLDivElement | null>
}

export function Container({ classCss, ariaLabel, children, ref, onClick }: ContainerProps) {
    return (
        <div className={classCss} aria-label={ariaLabel} ref={ref} onClick={onClick}>
            {children}
        </div>
    )
}