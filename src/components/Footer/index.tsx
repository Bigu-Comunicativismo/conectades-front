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
                href: "/quemsomos#sobreabigu",
            },
            {
                label: "Sobre a Plataforma",
                href: "/quemsomos#sobreaplataforma",
            },
            {
                label: "Como Funciona",
                href: "/quemsomos#como-funciona",
            },
            {
                label: "Contato",
                href: "/quemsomos#contato",
            },
        ],
    },
    {
        label: "Doações",
        items: [
            {
                label: "Saúde e Bem-estar",
                href: "#",
            },
            {
                label: "Jurídico e Direitos",
                href: "#",
            },
            {
                label: "Educação e Capacitação",
                href: "#",
            },
            {
                label: "Outros",
                href: "#",
            },
        ],
    },
    {
        label: "Campanhas",
        items: [
            {
                label: "Saúde e Bem-estar",
                href: "#",
            },
            {
                label: "Gênero e Sexualidade",
                href: "#",
            },
            {
                label: "Cultura e Comunidade",
                href: "#",
            },
            {
                label: "Necessidades Básicas",
                href: "#",
            },
            {
                label: "Trabalho",
                href: "#",
            },
            {
                label: "Outros",
                href: "#",
            },
        ],
    },
    {
        label: "Oportunidades",
        items: [
            {
                label: "Cursos",
                href: "#",
            },
            {
                label: "Vagas de Emprego",
                href: "#",
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