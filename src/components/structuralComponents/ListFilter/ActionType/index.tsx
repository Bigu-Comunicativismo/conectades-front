import { useState } from "react";
import { useFilterContext } from "@/contexts/filterContext";
import { Container } from "../../Container";
import { Paragraph } from "../../Paragraph";
import { Button } from "@/components/base/buttons/button";
import multiSelectStyles from "@/components/SignUp/PreferenceForm/PreferenceForm.module.css";
import btnStyles from "@/components/base/buttons/buttons.module.css";
import styles from "../ListFilter.module.css";
import { X } from "@untitledui/icons";
import type { LabedItem } from "..";

export function ActionType({action, categories, setShowModal}: {action: string, categories: LabedItem[], setShowModal: React.Dispatch<React.SetStateAction<boolean>>}) {
    
    const {selectedItems, setSelectedItems} = useFilterContext();
    const [markedCategories, setMarkedCategories] = useState<LabedItem[] | never>(selectedItems);

    return (
        <Container classCss={styles.modalBack} onClick={() => setShowModal((previous) => !previous)}>
            <Container classCss={`${styles.modal} ${multiSelectStyles.selectContainer}`} onClick={(event: React.MouseEvent) => event.stopPropagation()}>
                <Paragraph text={`Tipo de ${action}`} size="lg" weight="semibold"  />
                <Container classCss={multiSelectStyles.filtersContainer}>
                    {categories.map((category) => (
                       <Button key={category.id} 
                       onClick={() => {
                        if (markedCategories.includes(category)) {
                            setMarkedCategories((previous) => previous.filter((listedCategory) => listedCategory.id !== category.id));
                        } else{
                        setMarkedCategories((previous) => [...previous, category])
                    }
                }
            } 
                        className={`${multiSelectStyles.unselectedFilterBtn} ${markedCategories.includes(category) ? multiSelectStyles.selectedFilterBtn : ""}`}>{category.label}{markedCategories.includes(category) ? <X /> : null}</Button> 
                    ))}
                </Container>
                <Container classCss={styles.btnContainer}>
                <Button className={btnStyles.btn} onClick={() => {
                    setSelectedItems(markedCategories)
                    setShowModal((previous) => !previous)}}>
                    Salvar
                </Button>
                <Button className={styles.btnOnlyText} onClick={() => {
                    setSelectedItems([])
                     setShowModal((previous) => !previous)}}>
                    Limpar filtros
                </Button>
                </Container>
            </Container>
        </Container>
    );
}