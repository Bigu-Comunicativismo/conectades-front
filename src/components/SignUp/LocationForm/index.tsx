import { useState } from "react";
import { FormDescription } from "../FormDescription";
import { Select } from "@/components/base/select/select";
import { Button } from "@/components/base/buttons/button";
import styles from './LocationForm.module.css';
import { Container } from "@/components/structuralComponents/Container";
import { useUserContext } from "@/contexts/userContext";

export interface LocationFormProps {
    nextStep: React.Dispatch<React.SetStateAction<number>>;
}

export function LocationForm({nextStep}: LocationFormProps) {

    type Neighborhood = {
        label: string;
        id: string;
    }
    const { user, setUser } = useUserContext();
    const [city, setCity] = useState<string>("");
    const [neighborhood, setNeighborhood] = useState<string>("");
    const [neighborhoods, setNeighborhoods] = useState<Neighborhood[] | []>([]);

        const Recife = { 
            label: "Recife", 
            id: "Recife",  
            neighborhoods: [
                { label: "Centro", id: "Centro" },
                { label: "Boa Viagem", id: "Boa Viagem" },
                { label: "Coque", id: "Coque" },
                { label: "Ibura", id: "Ibura" },
                { label: "Várzea", id: "Várzea" },
        ] }
        const Olinda = { 
            label: "Olinda", 
            id: "Olinda", 
            neighborhoods: [
                { label: "Bairro Novo", id: "Bairro Novo" },
                { label: "Peixinhos", id: "Peixinhos" },
                { label: "V8", id: "V8", supportingText: "V8" },
                { label: "Fragoso", id: "Fragoso" },
                { label: "Ouro Preto", id: "Ouro Preto" },
        ] }

    const cities = [
        Recife,
        Olinda
    ]

    return (
        <Container classCss={styles.container}>
            <FormDescription titleText="Insira sua cidade e bairro" paragraphText="Mostraremos apenas o seu bairro para facilitar a localização de campanhas e doações na sua região"/>
            <form>
                <Select label="Cidade" 
                placeholder="Selecione sua cidade"
                isRequired
                id="Cidade" 
                name="Cidade"
                onSelectionChange={(key) => {
                    if(city !== key) {setCity(key as string);
                    setNeighborhoods(cities.find((city) => city.id === key)?.neighborhoods || []);
                    setNeighborhood("");}
                    return;
                }}
                className={styles.selectInput}
                >
                    {cities.map((city) => (
                        <Select.Item key={city.id} 
                        id={city.id} 
                        textValue={city.label}
                        className={styles.selectOption}
                        >{city.label}</Select.Item>
                    ))}
                </Select>
                <Select label="Bairro" 
                placeholder="Selecione seu bairro"
                isRequired 
                id="Bairro"
                name="Bairro"
                onSelectionChange={(key) => {
                    return neighborhood !== key ? setNeighborhood(key as string) : null;
                }}
                className={styles.selectInput}>
                    {neighborhoods.map((neighborhood) => (
                        <Select.Item key={neighborhood.id} id={neighborhood.id} className={styles.selectOption}>{neighborhood.label}</Select.Item>
                    ))}
                </Select>
                <Button className={`${styles.btn} ${(!city || !neighborhood) ? styles.btnDesactive : ''}`}
                isDisabled={!city || !neighborhood}
                onClick={() => {
                    const newUser = user;
                    newUser.location.city = city;
                    newUser.location.neighborhood = neighborhoods.find((previousNeighborhood) => previousNeighborhood.id === neighborhood) || {id: "", label: ""};
                    setUser(newUser);
                    nextStep((previous: number) => previous + 1)}}>Continuar</Button>
            </form>
        </Container>
    )
}