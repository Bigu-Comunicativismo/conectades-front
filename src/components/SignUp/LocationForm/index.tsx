import { useEffect, useRef, useState, type FormEvent } from "react";
import { FormDescription } from "../FormDescription";
import { Select } from "@/components/base/select/select";
import { Button } from "@/components/base/buttons/button";
import styles from './LocationForm.module.css';
import { Container } from "@/components/structuralComponents/Container";
import { useUserContext } from "@/contexts/userContext";
import { apiFetch } from "@/utils/fetchApi";
import type { LabedItem } from "@/components/structuralComponents/ListFilter";

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
    const [cities, setCities] = useState<LabedItem[] | []>([]);
    const [neighborhood, setNeighborhood] = useState<string>("");
    const [neighborhoods, setNeighborhoods] = useState<Neighborhood[] | []>([]);

    const containerRef = useRef<HTMLDivElement>(null);
    
        useEffect(() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            apiFetch<LabedItem[]>({ apiPath: "https://conectades.com.br/api/auth/opcoes/"}).then((data: any) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const cityList = data.cidades.map((item: any) => ({ id: item.id, label: item.nome }));
                return cityList;
            }).then((cityList) => {
                setCities(cityList);
            })

            if (containerRef.current) {
                containerRef.current.focus();
            }
        }, []);

        useEffect(() => {
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const lockedCity: any = cities.find((listedCity: LabedItem) => listedCity.id === city)
            if(city !== "") {
            apiFetch({ apiPath: `https://conectades.com.br/api/auth/bairros/${lockedCity?.label}` })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((data: any) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const neighborhoods: Neighborhood[] = data.bairros.map((item: any) => ({ id: item.id, label: item.nome }));
                setNeighborhoods(neighborhoods);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [city]);

    return (
        <Container classCss={styles.container} ref={containerRef}>
            <FormDescription titleText="Insira sua cidade e bairro" paragraphText="Mostraremos apenas o seu bairro para facilitar a localização de campanhas e doações na sua região"/>
            <form>
                <Select label="Cidade" 
                placeholder="Selecione sua cidade"
                isRequired
                id="Cidade" 
                name="Cidade"
                onSelectionChange={(key) => {
                    if(city !== key) {
                        setCity(key as string);
                    // setNeighborhoods(cities.find((city) => city.id === key)?.neighborhoods || []);
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
                        <Select.Item key={neighborhood.id} id={neighborhood.id} textValue={neighborhood.label} className={styles.selectOption}>{neighborhood.label}</Select.Item>
                    ))}
                </Select>
                <Button className={`${styles.btn} ${(!city || !neighborhood) ? styles.btnDesactive : ''}`}
                type="submit"
                isDisabled={!city || !neighborhood}
                onClick={(event: FormEvent) => {
                    event.preventDefault();
                    const newUser = user;
                    newUser.location.city = city;
                    newUser.location.neighborhood = neighborhoods.find((previousNeighborhood) => previousNeighborhood.id === neighborhood) || {id: "", label: ""};
                    setUser(newUser);
                    nextStep((previous: number) => previous + 1)}}>Continuar</Button>
            </form>
        </Container>
    )
}