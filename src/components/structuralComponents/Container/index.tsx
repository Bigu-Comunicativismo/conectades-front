interface ContainerProps {
    classCss: string,
    ariaLabel?: string,
    children: React.ReactNode
}

export function Container({ classCss, ariaLabel, children }: ContainerProps) {
    return (
        <div className={classCss} aria-label={ariaLabel}>
            {children}
        </div>
    )
}