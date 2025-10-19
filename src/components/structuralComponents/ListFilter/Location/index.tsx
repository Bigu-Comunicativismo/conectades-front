import { useState } from "react";
import { useListData } from "react-stately";
import { Container } from "../../Container";
import { Paragraph } from "../../Paragraph";
import { Button } from "@/components/base/buttons/button";
import { MultiSelect } from "@/components/base/select/multi-select";
import multiSelectStyles from "@/components/SignUp/PreferenceForm/PreferenceForm.module.css";
import btnStyles from "@/components/base/buttons/buttons.module.css";
import styles from "../ListFilter.module.css";


export function Location({selectedLocations, setLocationFilter, setShowModal}: { selectedLocations: [] | never[], setLocationFilter: React.Dispatch<React.SetStateAction<[] | never[]>>, setShowModal: React.Dispatch<React.SetStateAction<boolean>>}) {

    const [locations] = useState([
    { id: "Centro", label: "Centro" },
    { id: "Boa Viagem", label: "Boa Viagem" },
    { id: "Coque", label: "Coque" },
    { id: "Ibura", label: "Ibura" },
    { id: "Várzea", label: "Várzea" },
    { id: "Bairro Novo", label: "Bairro Novo" },
    { id: "Peixinhos", label: "Peixinhos" },
    { id:"V8", label: "V8" },
    { id: "Fragoso", label: "Fragoso" },
    { id: "Ouro Preto", label: "Ouro Pretp" },
]);

    const selectedItems = useListData({
        initialItems: selectedLocations,
    });
    return (
        <Container classCss={styles.modalBack}>
            <Container classCss={`${styles.modal} ${styles.modalLocation} ${multiSelectStyles.selectContainer}`}>
                <Paragraph text={"Localização"} size="lg" weight="semibold"  />
                <MultiSelect isRequired
                    size="md"
                    selectedItems={selectedItems}
                    placeholder=""
                    aria-label="Filtro"
                    items={locations} 
                    popoverClassName={`${multiSelectStyles.multiselectContainer} ${styles.searchInput}`} >
                    {locations.map((location) => (
                        <MultiSelect.Item id={location.id} 
                        className={multiSelectStyles.selectItem} 
                        key={location.id} 
                        icon={null} 
                        label={location.id} 
                        textValue={location.id}>
                            {location.label}
                        </MultiSelect.Item>))}
                </MultiSelect>
                <Container classCss={styles.btnContainer}>
                <Button className={btnStyles.btn} onClick={() => {
                    setLocationFilter(selectedItems.items)
                    setShowModal((previous) => !previous)}}>
                    Salvar
                </Button>
                <Button className={styles.btnOnlyText} onClick={() => {
                    setLocationFilter([])
                     setShowModal((previous) => !previous)}}>
                    Limpar filtros
                </Button>
                </Container>
            </Container>
        </Container>
    );
}