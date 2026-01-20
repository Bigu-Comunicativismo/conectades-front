import { Container } from "@/components/structuralComponents/Container";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { Button } from "@/components/base/buttons/button";
import styles from "./ReceiveModal.module.css"
import btnStyles from "@/components/base/buttons/buttons.module.css";

export function ReceiveModal ({setShowReceiveModal, whatsapp}: {setShowReceiveModal: React.Dispatch<React.SetStateAction<boolean>>, whatsapp: string}) {
    
    return (
    
        <Container classCss={styles.modalBack}>
            <Container classCss={styles.modal}>
                <Paragraph text="Deseja continuar e se conectar com essa doação?" weight="semibold" size="lg" />
                <Paragraph text="Você será direcionado para o whatsapp cadastrado pela pessoa doadora." weight="regular" size="sm" variant="secondary" />
                <Paragraph text="Não nos responsabilizamos por qualquer dano ou problema decorrente fora do sistema Conectades" weight="regular" size="sm" variant="secondary" />
                
                <Container classCss={styles.btnGroup}>
                    <Button className={`${btnStyles.btn} ${styles.noMargin}`} 
                    onClick={() => {
                        const message = `Olá, vi sua ação de doação no Conectades e gostaria de participar.`;
                        const encodedMessage = encodeURIComponent(message);
                        window.open(`https://wa.me/55${whatsapp}?text=${encodedMessage}`, '_blank');
                        setShowReceiveModal((prev) => !prev)
                    }}
                    >Continuar</Button>
                    <Button className={`${btnStyles.btn} ${styles.noMargin} ${styles.outline}`} onClick={() => setShowReceiveModal((prev) => !prev)}>Cancelar</Button>
                </Container>
            </Container>
        </Container>)
}