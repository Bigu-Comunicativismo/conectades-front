import { Container } from "@/components/structuralComponents/Container";
import { Title } from "@/components/structuralComponents/Title";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import styles from './JoinUs.module.css';

export function JoinUs() {
  return (
    <Container classCss={`flex flex-col items-center text-center gap-6  ${styles.joinUsSection}`}>
      <Title.Level2 text="Junte-se a nós e comece a se conectar!" />
      <Paragraph text="Entre na rede de apoio e solidariedade que é a Conectades." size="lg" weight="regular"/>
      <form className={`flex flex-row w-full ${styles.form}`}>
          <Input type="email" placeholder="E-mail" size="md" className={styles.input}/>
          <Button type="submit" color="primary" className={styles.btn}>Criar conta</Button>
      </form>
    </Container>
  );
}
