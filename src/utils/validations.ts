const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordHasUpperandLowerRegex = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
const passwordHasNumberRegex = /^.*\d.*$/;
const passwordHasMinCharRegex = /^.{8,}$/;
// const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

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
/**
 * Checks if a given CPF is valid.
 *
 * @param {string} cpf - The CPF to be validated.
 * @returns {boolean} - True if the CPF is valid, false otherwise.
 *
 * This function first checks if the given CPF is a string. If it's not, it returns false.
 * Then, it removes any non-digit character from the CPF and checks if the resulting string has exactly 11 characters and does not contain any repeated digits.
 * If the CPF passes these checks, it then splits the CPF into an array of numbers and uses a helper function to calculate the verifying digit for the first 9 and the first 10 digits.
 * Finally, it checks if the calculated verifying digit matches the last digit of the CPF and if the calculated verifying digit for the first 10 digits matches the second to last digit of the CPF.
 * This function is originaly available on https://gist.github.com/joaohcrangel/8bd48bcc40b9db63bef7201143303937?permalink_comment_id=4877199#gistcomment-4877199.
 */
    cpf: (cpf: string): boolean => {
    
    if (typeof cpf !== 'string') {
        return false;
    }
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
        return false;
    }
    const digits = cpf.split('').map(el => +el);
    function getVerifyingDigit(arr: number[]) {
        const reduced = arr.reduce( (sum, digit, index)=>(sum + digit * (arr.length - index + 1)), 0 );
        return (reduced * 10) % 11 % 10;
    }
    return getVerifyingDigit(digits.slice(0, 9)) === digits[9]
        && getVerifyingDigit(digits.slice(0, 10)) === digits[10];
},
    confirmPassword: (password: string, confirmPassword: string): boolean => password === confirmPassword
};