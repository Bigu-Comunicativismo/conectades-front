import { Button } from "@/components/base/buttons/button";
import { Link } from "@tanstack/react-router";
import styles from './RegisterButton.module.css';

export const RegisterButton =  {
    LogIn: () => <Link to="/login"><Button color="secondary" className={`${styles.btn} ${styles.outline}`}>Entrar</Button></Link>,
    SignUp: () => <Link to="/signup"><Button color="primary" className={styles.btn}>Cadastrar</Button></Link>
}