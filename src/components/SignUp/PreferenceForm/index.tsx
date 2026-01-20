import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/structuralComponents/Container";
import { FormDescription } from "../FormDescription";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { MultiSelect } from "@/components/base/select/multi-select";
import { Button } from "@/components/base/buttons/button";
import { X } from "@untitledui/icons";
import styles from "./PreferenceForm.module.css";
import { useListData } from "react-stately";
import { useUserContext } from "@/contexts/userContext";

export type Category = {
    id: string;
    label: string;
};


export type Location = {
    id: string;
    label: string;
};

interface PreferenceFormProps  {
    nextStep: React.Dispatch<React.SetStateAction<number>>
    preferences: {category: Category[], locations: Location[]}
}

export function PreferenceForm({nextStep, preferences}: PreferenceFormProps) {

    const {user, setUser} = useUserContext();
    const [userType] = useState(user.userType);
    const [categories] = useState<Category[]>(preferences.category);
    const [markedCategories, setMarkedCategories] = useState<Category[]>([]);
    
    const selectedItems = useListData({
        initialItems: [user.location.neighborhood],
    });

    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (containerRef.current) {
        containerRef.current.focus();
        }
    }, []);
    
    return (
        <Container classCss="flex flex-col gap-4" ref={containerRef}>
            <FormDescription titleText="Escolha suas preferências" paragraphText="Vamos dar ao serviço sua cara! Escolha suas preferências. Elas poderão ser alteradas a qualquer momento no seu perfil" />
            <form>
                <Paragraph text={userType === "5" ? "Quais doações você deseja ver mais?" : "Quais campanhas você deseja ver mais?"} size="sm" variant="secondary" classCss={styles.filtersLabel} />
                <Container classCss={styles.filtersContainer}>
                    {categories.map((category) => (
                       <Button key={category.id} 
                       onClick={() => {
                        if (markedCategories.includes(category)) {
                            setMarkedCategories((previous) => previous.filter((listedCategory) => listedCategory !== category));
                        } else{
                        setMarkedCategories((previous) => [...previous, category])
                        console.log(markedCategories);
                    }
                }
            } 
                        className={`${styles.unselectedFilterBtn} ${markedCategories.includes(category) ? styles.selectedFilterBtn : ""}`}>{category.label}{markedCategories.includes(category) ? <X /> : null}</Button> 
                    ))}
                </Container>
                <Container classCss={styles.selectContainer}>
                    <MultiSelect isRequired
                    size="md"
                    selectedItems={selectedItems}
                    label={userType === "5" ? "De quais bairros você deseja ver mais doações?" : "De quais bairros você deseja ver mais campanhas?"}
                    items={preferences.locations} 
                    popoverClassName={styles.multiselectContainer}>
                        {preferences.locations.map((location) => (
                            <MultiSelect.Item id={location.id} 
                            className={styles.selectItem} 
                            key={location.id} 
                            icon={null} 
                            label={location.label} 
                            textValue={location.id}>
                                {location.label}
                            </MultiSelect.Item>))}
                    </MultiSelect>
                </Container>
                <Button 
                onClick={() => {
                    const newUser = user;
                    newUser.interestedCategories = markedCategories;
                    newUser.interestedLocations = selectedItems.items;
                    setUser(newUser);
                    nextStep((previous: number) => previous + 1)
                }} 
                className={`${styles.btn} ${markedCategories.length === 0 || selectedItems.items.length === 0 ? styles.btnDesactive : ""}`}>Proximo</Button>
            </form>
        </Container>
    );
}