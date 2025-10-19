import { useState } from "react";
import { Container } from "../../Container";
import { Paragraph } from "../../Paragraph";
import { Button } from "@/components/base/buttons/button";
import multiSelectStyles from "@/components/SignUp/PreferenceForm/PreferenceForm.module.css";
import btnStyles from "@/components/base/buttons/buttons.module.css";
import styles from "../ListFilter.module.css";
import { X } from "@untitledui/icons";

export type Category = "Saúde e Bem-estar" | "Jurídico e Direitos" | "Educação e Capacitação" | "Gênero e Sexualidade" | "Cultura e Comunidade" | "Necessidades Básicas" | "Trabalho";

export function ActionType({action, categoryFilters,setCategoryFilter, setShowModal}: {action: string, categoryFilters: Category[] | never[], setCategoryFilter: React.Dispatch<React.SetStateAction<Category[] | never[]>>, setShowModal: React.Dispatch<React.SetStateAction<boolean>>}) {

    const [categories] = useState<Category[]>(["Saúde e Bem-estar", "Jurídico e Direitos", "Educação e Capacitação", "Gênero e Sexualidade", "Cultura e Comunidade", "Necessidades Básicas", "Trabalho"]);
    const [markedCategories, setMarkedCategories] = useState<Category[] | never>(categoryFilters);

    return (
        <Container classCss={styles.modalBack}>
            <Container classCss={`${styles.modal} ${multiSelectStyles.selectContainer}`}>
                <Paragraph text={`Tipo de ${action}`} size="lg" weight="semibold"  />
                <Container classCss={multiSelectStyles.filtersContainer}>
                    {categories.map((category) => (
                       <Button key={category} 
                       onClick={() => {
                        if (markedCategories.includes(category)) {
                            setMarkedCategories((previous) => previous.filter((listedCategory) => listedCategory !== category));
                        } else{
                        setMarkedCategories((previous) => [...previous, category])
                    }
                }
            } 
                        className={`${multiSelectStyles.unselectedFilterBtn} ${markedCategories.includes(category) ? multiSelectStyles.selectedFilterBtn : ""}`}>{category}{markedCategories.includes(category) ? <X /> : null}</Button> 
                    ))}
                </Container>
                <Container classCss={styles.btnContainer}>
                <Button className={btnStyles.btn} onClick={() => {
                    setCategoryFilter(markedCategories)
                    setShowModal((previous) => !previous)}}>
                    Salvar
                </Button>
                <Button className={styles.btnOnlyText} onClick={() => {
                    setCategoryFilter([])
                     setShowModal((previous) => !previous)}}>
                    Limpar filtros
                </Button>
                </Container>
            </Container>
        </Container>
    );
}