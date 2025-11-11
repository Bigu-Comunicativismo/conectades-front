import { Container } from "@/components/structuralComponents/Container";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import ItemQuantityPicker from "./Item";
import { useState } from "react";
import { Button } from "@/components/base/buttons/button";
import styles from "./DonationModal.module.css"
import btnStyles from "@/components/base/buttons/buttons.module.css";
import { Select } from "@/components/base/select/select";
import multiSelectStyles from "@/components/SignUp/PreferenceForm/PreferenceForm.module.css";
import { createDonation } from "@/utils/createDonation";

type Item = {
    id: number;
    campanha: number;
    nome: string;
    quantidade_contribuida: number;
    quantidade_solicitada: number;
}


export function DonationModal ({setShowDonationModal, items, whatsapp}: {setShowDonationModal: React.Dispatch<React.SetStateAction<boolean>>, items: Item[], whatsapp: string}) {
    const [donationQuantity, setDonationQuantity] = useState(0);
    const [selectedItem, setSelectedItem] = useState<string | undefined>(undefined);
    const [disponibleQuantity, setDisponibleQuantity] = useState(0);
    const campaignItems = items.map((item) => {
        return {label: item.nome, id: item.id.toString()}
    })
    return (
    
        <Container classCss={styles.modalBack}>
            <Container classCss={styles.modal}>
                <Paragraph text="O que deseja doar?" weight="semibold" size="lg" />
                <Paragraph text="Direcionaremos você para falar com a pessoa organizadora da campanha para organizar sua doação" weight="regular" size="sm" variant="secondary" />
                <Select placeholder="Item a doar" 
                items={campaignItems}
                onSelectionChange={(key) => {
                    
                   const pickedItem =  items.find((item) => item.id.toString() === key);
                   setSelectedItem(pickedItem?.id.toString())
                   setDisponibleQuantity((pickedItem?.quantidade_solicitada ?? 0) - (pickedItem?.quantidade_contribuida ?? 0))
                    
                }}
                className={`${multiSelectStyles.selectedFilterBtn} ${styles.select}`}
                aria-label="Lista de itens para seleção">
                    {items.filter((item) => item.quantidade_contribuida < item.quantidade_solicitada ).map((item) => (
                        <Select.Item key={item.nome}
                        id={item.id.toString()}
                        textValue={item.nome}
                        label={item.nome} 
                        className={styles.selectItem}/>
                    ))}
                </Select>
                <ItemQuantityPicker handleQuantity={setDonationQuantity} disponibleQuantity={disponibleQuantity} quantity={donationQuantity} />
                <Container classCss={styles.btnGroup}>
                    <Button className={`${btnStyles.btn} ${styles.noMargin} ${donationQuantity === 0 && btnStyles.btnDesactive}`} 
                    onClick={() => {
                        if(items){
                             
                            const campanha_id = items && items.find(() => true)?.id;

                            if(campanha_id) createDonation({campanha_id, item_campanha_id: Number(selectedItem), quantidade: donationQuantity}).then(() => {
                                const message = `Olá, vi sua campanha no Conectades e gostaria de doar ${donationQuantity} ${items.find((item) => item.id.toString() === selectedItem)?.nome}`;
                                const encodedMessage = encodeURIComponent(message);
                                window.open(`https://wa.me/55${whatsapp}?text=${encodedMessage}`, '_blank');
                            })
                        }
                    }}
                    isDisabled={donationQuantity === 0}
                    >Continuar</Button>
                    <Button className={`${btnStyles.btn} ${styles.noMargin} ${styles.outline}`} onClick={() => setShowDonationModal((prev) => !prev)}>Cancelar</Button>
                </Container>
            </Container>
        </Container>)
}