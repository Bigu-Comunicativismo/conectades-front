import { Button } from "@/components/base/buttons/button";
import styles from './RegisterButton.module.css';

export const RegisterButton =  {
    LogIn: () => <Button color="secondary" className={`${styles.btn} ${styles.outline}`} onClick={() => {console.log('Entrar')}}>Entrar</Button>,
    SignUp: () => <Button color="primary" className={styles.btn} onClick={() => {console.log('Cadastrar')}}>Cadastrar</Button>
}