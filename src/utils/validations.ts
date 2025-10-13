const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordHasUpperandLowerRegex = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
const passwordHasNumberRegex = /^.*\d.*$/;
const passwordHasMinCharRegex = /^.{8,}$/;
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

type passwordValidations = {
    passwordHasUpperandLower: boolean, 
    passwordHasNumber: boolean,  
    passwordHasMinChar: boolean
}

type Validations = {
    email: (email: string) => boolean;
    password: (password: string) => passwordValidations;
    confirmPassword: (password: string, confirmPassword: string) => boolean;
    cpf: (cpf: string) => boolean;
};

export const validations: Validations = {
    email: (email: string): boolean => emailRegex.test(email),
    password: (password: string): passwordValidations => {
        const passwordHasUpperandLower: boolean = passwordHasUpperandLowerRegex.test(password);
        const passwordHasNumber: boolean =passwordHasNumberRegex.test(password) 
        const passwordHasMinChar: boolean = passwordHasMinCharRegex.test(password)
        return {passwordHasUpperandLower, passwordHasNumber,  passwordHasMinChar};
    },
    cpf: (cpf: string): boolean => cpfRegex.test(cpf),
    confirmPassword: (password: string, confirmPassword: string): boolean => password === confirmPassword
};