import { SpanText } from "@/components/structuralComponents/SpanText";
import { Message, type Contribuition } from "./Message";



interface SupportsProps {
    supports: Contribuition[]
}   

export function Supports({supports}:SupportsProps) {
    return (
        <>
        {supports.length > 0 ? supports.filter(doacao => doacao.status === 'confirmada').map((contribuition:Contribuition) => <Message key={contribuition.id} contribuitionMessage={contribuition}/>) : <SpanText text="Ainda sem doações. Contribua!"/>}
        </>
    )
}