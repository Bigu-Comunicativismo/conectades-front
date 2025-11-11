import { useEffect, useState } from "react";
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


export function EditProfile({userInfo}: {userInfo: User}) {
const {avatar, nome_completo, nome_exibicao, cpf, telefone, genero, bairro, cidade, mini_bio} = userInfo;
const [fullName, setFullName] = useState("");
const [showName, setShowName] = useState("");
const [CPF, setCPF] = useState("");
const [phone, setPhone] = useState("");
const [miniBio, setMiniBio] = useState("");
const [gender, setGender] = useState<string>("");
const [neighborhood, setNeighborhood] = useState< string>("");
const [city, setCity] = useState<string>("");
// const [cityList, setCityList] = useState([]);
// const [neighborhoodList, setNeighborhoodList] = useState([]);

const navigate = useNavigate();

useEffect(() => {
    setFullName(nome_completo)
    setShowName(nome_exibicao)
    setCPF(cpf)
    setPhone(telefone)
    setMiniBio(mini_bio)
    setGender(genero.toString())
    setNeighborhood(bairro)
    setCity(cidade)
},[])
 return (
   <Container classCss={styles.container}>
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
            onSelectionChange={() => console.log(gender)}
            className={`${selectStyles.select} ${styles.inputs}`}>
                <Select.Item id="1" value={undefined}>Masculino</Select.Item>
                <Select.Item id="2" value={undefined}>Feminino</Select.Item>
            </Select>
            <Select placeholder="Cidade" 
            label="Cidade" 
            onSelectionChange={() => console.log(city)}
            className={`${selectStyles.select} ${styles.inputs}`}>
                <Select.Item id="1" value={undefined}>Masculino</Select.Item>
                <Select.Item id="2" value={undefined}>Feminino</Select.Item>
            </Select>
            <Select placeholder="Bairro" 
            label="Bairro" 
            onSelectionChange={() => console.log(neighborhood)}
            className={`${selectStyles.select} ${styles.inputs}`}>
                <Select.Item id="1" value={undefined}>Masculino</Select.Item>
                <Select.Item id="2" value={undefined}>Feminino</Select.Item>
            </Select>
        </Section>
        <ButtonGroupFloating 
        btn1Text="Cancelar" 
        btn1Action={() => navigate({to: "/profile"})} 
        btn2Text="Salvar" 
        btn2Action={() => console.log("Atualizou!")
        } />
   </Container>
 );
}