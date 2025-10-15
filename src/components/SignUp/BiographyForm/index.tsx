import { useEffect, useState } from "react";
import { Container } from "@/components/structuralComponents/Container";
import { FormDescription } from "../FormDescription";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Button } from "@/components/base/buttons/button";
import { validations } from "@/utils/validations";
import { valueMasks } from "@/utils/valueMasks";
import styles from "./BiographyForm.module.css";
import type { LocationFormProps as BiographyFomrProps } from "../LocationForm";
import { useUserContext, type UserGender } from "@/contexts/userContext";



export function BiographyForm({nextStep}: BiographyFomrProps) {
    const [fullname, setFullname] = useState("");
    const [CPF, setCPF] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState<UserGender | string>("");
    const [genderList, setGenderList] = useState<UserGender[] | never>([]);
    const [emailError, setEmailError] = useState(false);
    const [CPFError, setCPFError] = useState(false);

    const { user, setUser } = useUserContext();

    const MockedGenderList: UserGender[] = [
        { id: "Homem Cis", label: "Homem Cis" },
        { id: "Mulher Cis", label: "Mulher Cis" },
        { id: "Homem Trans", label: "Homem Trans" }, 
        { id: "Mulher Trans", label: "Mulher Trans" }, 
        { id: "Travesti", label: "Travesti" },
        { id: "Não-Binario", label: "Não-Binario" },
    ]

    useEffect(() => {
        setGenderList(MockedGenderList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container classCss="">
            <form>
                <FormDescription titleText="Dados de Cadastro" paragraphText="Esses dados são essenciais para garantir um melhor serviço e são protegidos com o máximo de segurança"/>
                <Input id="Nome Completo"
                type="text"
                label="Nome completo"
                placeholder="Insira seu nome aqui"
                value={fullname}
                onChange={(fullname) => setFullname(fullname)}
                className={`${styles.input}`}/>
                <Input id="CPF"
                type="text"
                label="CPF"
                placeholder="Insira apenas os números do CPF"
                value={valueMasks.cpfMask(CPF)}
                isInvalid={CPFError}
                hint={CPFError ? "CPF inválido. Verifique se os números foram digitados corretamente" : null}
                onChange={(CPF) => {
                    if(!validations.cpf(CPF)){
                        setCPF(CPF)
                        setCPFError(true)
                    }else{
                    setCPFError(false)
                    setCPF(CPF)}
                    return}}
                className={`${styles.input}`}/>
                <Input id="Telefone"
                type="tel"
                label="Telefone"
                placeholder="(81) 9 9999-9999"
                value={phone}
                onChange={(phone) => {
                    const maskedPhone = valueMasks.phoneMask(phone);
                    setPhone(maskedPhone)}}
                className={`${styles.input}`}/>
                <Input id="E-mail"
                type="email"
                label="E-mail"
                placeholder="Insira seu e-mail"
                isInvalid={emailError}
                hint={emailError ? "Insira um e-mail valido" : null}
                value={email}
                onChange={(email) => {
                    if(validations.email(email)){
                        setEmail(email)
                        setEmailError(false)
                    }else{
                        setEmail(email)
                        setEmailError(true)
                    }
                    return }}
                className={`${styles.input}`}/>
                <Select label="Gênero" 
                    placeholder="Selecione seu gênero"
                    isRequired
                    id="Gênero" 
                    name="Gênero"
                    onSelectionChange={(key) => {
                        if(gender !== key) {
                            setGender( key as string)}
                        return;
                    }}
                    className={styles.selectInput}>
                    {genderList.map((gender) => (
                            <Select.Item key={gender.id} 
                            id={gender.id} 
                            textValue={gender.label}
                            className={styles.selectOption}
                            >{gender.label}</Select.Item>
                        ))}
                </Select>
                <Button type="submit" 
                className={`${styles.btn} ${(fullname === '' || CPFError || phone === '' || emailError || gender === '') && styles.btnDesactive}`}
                isDisabled={fullname === '' || CPFError || phone === '' || emailError || gender === ''} 
                onClick={
                    () => {
                        const newUser = user;
                        newUser.fullname = fullname;
                        newUser.cpf = CPF;
                        newUser.phone = phone;
                        newUser.email = email;
                        newUser.gender = genderList.find(previousGender => previousGender.id === gender) || { id: "Outro", label: "Outro" };
                        setUser(newUser);
                        nextStep((previous: number) => previous + 1)
                    }
                }>Continuar</Button>
            </form>
        </Container>
    )
}