import styles from './Footer.module.css';
import { FooterLarge01 as UntitledFooter } from '../marketing/footers/footer-large-01';
import { Logo } from '../structuralComponents/Logo';
import { Button } from '../base/buttons/button';
import { Link } from '@tanstack/react-router';

const footerNavList = [
    {
        label: "Quem Somos",
        items: [
            {
                label: "Sobre a Bigu",
                href: "/aboutus#sobreabigu",
            },
            {
                label: "Sobre a Plataforma",
                href: "/aboutus#sobreaplataforma",
            },
            {
                label: "Como Funciona",
                href: "/aboutus#como-funciona",
            },
            {
                label: "Contato",
                href: "/aboutus#contato",
            },
        ],
    },
    {
        label: "Doações",
        items: [
            {
                label: "Saúde e Bem-estar",
                href: "/donations",
            },
            {
                label: "Jurídico e Direitos",
                href: "/donations",
            },
            {
                label: "Educação e Capacitação",
                href: "/donations",
            },
            {
                label: "Outros",
                href: "/donations",
            },
        ],
    },
    {
        label: "Campanhas",
        items: [
            {
                label: "Saúde e Bem-estar",
                href: "/campaigns",
            },
            {
                label: "Gênero e Sexualidade",
                href: "/campaigns",
            },
            {
                label: "Cultura e Comunidade",
                href: "/campaigns",
            },
            {
                label: "Necessidades Básicas",
                href: "/campaigns",
            },
            {
                label: "Trabalho",
                href: "/campaigns",
            },
            {
                label: "Outros",
                href: "/campaigns",
            },
        ],
    },
    {
        label: "Oportunidades",
        items: [
            {
                label: "Cursos",
                href: "/cursos",
            },
            {
                label: "Vagas de Emprego",
                href: "/vagas",
            },
        ],
    },
];

export function Footer() {
    return (
        <>
            <UntitledFooter footerNavList={footerNavList} navCategoryCss={styles.categoryTitle} navItemCss={styles.categoryItem} footerCss={styles.footer}>
                <div style={{ marginTop: '84px' }}>
                    <Logo />
                </div>
                <div className={styles.privacyLinksContainer}>
                    <Link to='/termosdeuso' ><Button color="link-gray" size="lg" className={`gap-1 ${styles.privacyLinks}`} >Termos de uso</Button></Link>
                    <Link to='/politicadeprivacidade' ><Button color="link-gray" size="lg" className={`gap-1 ${styles.privacyLinks}`} >Política de privacidade</Button></Link>
                </div>
            </UntitledFooter>
        </>
    )
}