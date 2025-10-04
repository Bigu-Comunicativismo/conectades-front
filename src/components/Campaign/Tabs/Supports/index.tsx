import { Message, type Contribuition } from "./Message";



interface SupportsProps {
    supports: Contribuition[]
}   

export function Supports({supports}:SupportsProps) {
    return (
        <>
        {supports.map((contribuition:Contribuition) => <Message key={contribuition.id} contribuitionMessage={contribuition}/>) }
        </>
    )
}