import { useState } from "react";
import { Container } from "@/components/structuralComponents/Container";
import { FormDescription } from "../FormDescription";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { MultiSelect } from "@/components/base/select/multi-select";
import { Button } from "@/components/base/buttons/button";
import { X } from "@untitledui/icons";
import styles from "./PreferenceForm.module.css";
import { useListData } from "react-stately";
import { useUserContext } from "@/contexts/userContext";

type Category = "Saúde e Bem-estar" | "Jurídico e Direitos" | "Educação e Capacitação" | "Gênero e Sexualidade" | "Cultura e Comunidade" | "Necessidades Básicas" | "Trabalho";


const neighborhoods = [
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
]

interface PreferenceFormProps  {
    nextStep: React.Dispatch<React.SetStateAction<number>>
}

export function PreferenceForm({nextStep}: PreferenceFormProps) {

    const {user, setUser} = useUserContext();
    const [userType] = useState(user.userType);
    const [categories] = useState<Category[]>(["Saúde e Bem-estar", "Jurídico e Direitos", "Educação e Capacitação", "Gênero e Sexualidade", "Cultura e Comunidade", "Necessidades Básicas", "Trabalho"]);
    const [markedCategories, setMarkedCategories] = useState<Category[] | never>([]);
    
    const selectedItems = useListData({
        initialItems: [user.location.neighborhood],
    });

    
    return (
        <Container classCss="flex flex-col gap-4">
            <FormDescription titleText="Escolha suas preferências" paragraphText="Vamos dar ao serviço sua cara! Escolha suas preferências. Elas poderão ser alteradas a qualquer momento no seu perfil" />
            <form>
                <Paragraph text={userType === "beneficiaria" ? "Quais doações você deseja ver mais?" : "Quais campanhas você deseja ver mais?"} size="sm" variant="secondary" classCss={styles.filtersLabel} />
                <Container classCss={styles.filtersContainer}>
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
                        className={`${styles.unselectedFilterBtn} ${markedCategories.includes(category) ? styles.selectedFilterBtn : ""}`}>{category}{markedCategories.includes(category) ? <X /> : null}</Button> 
                    ))}
                </Container>
                <Container classCss={styles.selectContainer}>
                    <MultiSelect isRequired
                    size="md"
                    selectedItems={selectedItems}
                    label={userType === "beneficiaria" ? "De quais bairros você deseja ver mais doações?" : "De quais bairros você deseja ver mais campanhas?"}
                    items={neighborhoods} 
                    popoverClassName={styles.multiselectContainer}>
                        {neighborhoods.map((neighborhood) => (
                            <MultiSelect.Item id={neighborhood.id} 
                            className={styles.selectItem} 
                            key={neighborhood.id} 
                            icon={null} 
                            label={neighborhood.id} 
                            textValue={neighborhood.id}>
                                {neighborhood.label}
                            </MultiSelect.Item>))}
                    </MultiSelect>
                </Container>
                <Button 
                onClick={() => {
                    const newUser = user;
                    newUser.interestedCategories = markedCategories;
                    newUser.interestedLocations = selectedItems.items;
                    setUser(newUser);
                    nextStep((previous: number) => previous + 1)}} 
                className={`${styles.btn} ${markedCategories.length === 0 || selectedItems.items.length === 0 ? styles.btnDesactive : ""}`}>Proximo</Button>
            </form>
        </Container>
    );
}