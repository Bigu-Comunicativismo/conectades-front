import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/structuralComponents/Container";
import { Image } from "@/components/structuralComponents/Image";
import { imgBaseUrl } from "@/utils/imgBaseUrl";
import { Section } from "@/components/structuralComponents/Section";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { ButtonGroupFloating } from "@/components/structuralComponents/ButtonGroupFloating";
import styles from "./Edit.module.css"
import inputStyles from "@/components/base/input/Input.module.css";
import selectStyles from "@/components/Campaign/DonationModal/DonationModal.module.css"
import avatarStyles from "../Profile.module.css"
import { useNavigate } from "@tanstack/react-router";
import type { LabedItem } from "@/components/structuralComponents/ListFilter";
import { apiFetch } from "@/utils/fetchApi";
import { editUsers } from "@/utils/formEditUser";

export type User = {
    avatar: string;
    id: number;
    nome_completo: string;
    nome_exibicao: string;
    nome_social: string;
    cpf: string;
    telefone: string;
    genero: number;
    bairro: string;
    cidade: string;
    mini_bio: string;
    tipo_usuario: number;
}

interface EditProfileProps {
    userInfo: User;
    gendersList: LabedItem[];
    citysList: LabedItem[];
    neighborhoodsList: LabedItem[];
    userCityId: string;
    userNeighborhoodId: string;
}


export function EditProfile({userInfo, gendersList, citysList, neighborhoodsList, userCityId, userNeighborhoodId}: EditProfileProps) {
const {avatar, nome_completo, nome_exibicao, cpf, telefone, genero, mini_bio} = userInfo;
const [fullName, setFullName] = useState(nome_completo);
const [showName, setShowName] = useState(nome_exibicao);
const [CPF, setCPF] = useState(cpf);
const [phone, setPhone] = useState(telefone);
const [miniBio, setMiniBio] = useState(mini_bio);
const [gender, setGender] = useState<string>(genero.toString());
const [neighborhood, setNeighborhood] = useState< string>(userNeighborhoodId.toString());
const [city, setCity] = useState<string>(userCityId.toString());
const [isOnFocus, setIsOnFocus] = useState(true);
const activeSection = useRef<HTMLDivElement>(null);
const [genderList] = useState<LabedItem[]>(gendersList);
const [cityList] = useState<LabedItem[]>(citysList);
const [neighborhoodList, setNeighborhoodList] = useState<LabedItem[]>(neighborhoodsList);



const navigate = useNavigate();



useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        
        setIsOnFocus(entry.isIntersecting);
        }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
        });
        
    observer.observe(activeSection.current!);

    return () => {observer.disconnect();}
     
    }, [activeSection]);

useEffect(() => {

    const userCity = cityList.find(item => item.id == city)?.label;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiFetch({ apiPath: `https://conectades.com.br/api/auth/bairros/${userCity}` }).then((data: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const neighborhoodList: LabedItem[] = data.bairros.map((item: any) => ({ id: item.id, label: item.nome }));
            return neighborhoodList;
    }).then((data) => setNeighborhoodList(data));
    
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [city])

 return (
   <Container classCss={styles.container} ref={activeSection}>
        <Image src={`${imgBaseUrl}${avatar}`} alternateText="" className={avatarStyles.profileImage} />
        <Section classCss={styles.formContainer} aria-label="Formulário">
            <Input placeholder="Nome completo" label="Nome Completo"
            value={fullName} 
            onChange={(fullName) => setFullName(() => fullName)} 
            className={`${inputStyles.input} ${styles.inputs}`} />
            <Input placeholder="Nome a ser exibido" label="Nome de exibição no perfil"
            value={showName} 
            onChange={(showName) => setShowName(() => showName)} 
            className={`${inputStyles.input} ${styles.inputs}`} />
            <Input placeholder="CPF" label="CPF"
            value={CPF} 
            onChange={(CPF) => setCPF(() => CPF)} 
            className={`${inputStyles.input} ${styles.inputs}`} />
            <Input placeholder="Telefone" label="Telefone"
            value={phone} 
            onChange={(phone) => setPhone(() => phone)} 
            className={`${inputStyles.input} ${styles.inputs}`} />
            <TextArea placeholder="Minha biografia" label="Minha biografia"
            value={miniBio} 
            onChange={(miniBio) => setMiniBio(() => miniBio)} 
            className={`${styles.textArea}`} />
            <Select placeholder="Gênero" 
            label="Gênero"
            id="Gênero" 
            name="Gênero"
            defaultSelectedKey={Number(gender)}
            onSelectionChange={(key) => {
                    if(gender !== key) {
                        setGender(key as string);}
                    return;
                }}
            className={`${selectStyles.select} ${styles.inputs}`}>
                {genderList.map((gender) => (
                        <Select.Item key={gender.id} 
                        id={gender.id} 
                        textValue={gender.label}
                        className={styles.selectOption}
                        >{gender.label}</Select.Item>
                    ))}
            </Select>
           <Container classCss={styles.locations}>
                <Select placeholder="Cidade" 
                defaultSelectedKey={Number(city)}
                label="Cidade" 
                id="Cidade"
                name="Cidade"
                onSelectionChange={(key) => {
                    if(city !== key) {
                        setCity(key as string);
                        setNeighborhood("");}
                    return;
                }}
                className={`${selectStyles.select} ${styles.inputs}`}>
                    {cityList.map((city) => (
                        <Select.Item key={city.id} 
                        id={city.id} 
                        textValue={city.label}
                        className={styles.selectOption}
                        >{city.label}</Select.Item>
                    ))}
                </Select>
                <Select placeholder="Bairro" 
                label="Bairro" 
                id="Bairro"
                name="Bairro"
                defaultSelectedKey={Number(neighborhood)}
                onSelectionChange={(key) => {
                    return neighborhood !== key ? setNeighborhood(key as string) : null;
                }}
                className={`${selectStyles.select} ${styles.inputs}`} >
                    {neighborhoodList.map((city) => (
                        <Select.Item key={city.id} 
                        id={city.id} 
                        textValue={city.label}
                        className={styles.selectOption}
                        >{city.label}</Select.Item>
                    ))}
                </Select>
            </Container>
        </Section>
        {isOnFocus ? <ButtonGroupFloating 
        btn1Text="Cancelar" 
        btn1Action={() => navigate({to: "/profile"})} 
        btn2Text="Salvar" 
        btn2Action={async () => {
            const tokens = JSON.parse(localStorage.getItem("tokens")!);
            const refreshToken = tokens.refresh;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const refreshedToken = await apiFetch({ apiPath: `https://conectades.com.br/api/token/refresh/`, apiMethod: 'POST', apiBody: {refresh: refreshToken}, apiHeaders: { "Content-Type": "application/json" } }).then((data: any) => data.access);
            localStorage.setItem("tokens", JSON.stringify({refresh: refreshToken, access: refreshedToken}));
            const editedUser = {nome_completo: fullName, nome_exibicao: showName, cpf: CPF, telefone: phone, genero: gender, bairro: neighborhood, cidade: city, mini_bio};
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            editUsers(editedUser, refreshedToken).then((data: any) => {
                localStorage.setItem("user", JSON.stringify(data.user));
            })
            navigate({to: "/profile"});
        }
        } /> : null}
   </Container>
 );
}