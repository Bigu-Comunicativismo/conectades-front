import styles from './Footer.module.css';
import { FooterLarge01 as UntitledFooter } from '../marketing/footers/footer-large-01';
import { Logo } from '../structuralComponents/Logo';
import { Button } from '../base/buttons/button';

const footerNavList = [
    {
        label: "Quem Somos",
        items: [
            {
                label: "Sobre a Bigu",
                href: "#",
            },
            {
                label: "Sobre a Plataforma",
                href: "#",
            },
            {
                label: "Como Funciona",
                href: "#",
            },
            {
                label: "Contato",
                href: "#",
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
    {
        label: "Informe-se",
        items: [
            {
                label: "PCD+",
                href: "#",
            },
            {
                label: "Débitos e Orientações",
                href: "#",
            },
            {
                label: "Gênero",
                href: "#",
            },
            {
                label: "POP LGBTQIA+",
                href: "#",
            },
            {
                label: "FAQ",
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
                    <Button color="link-gray" size="lg" className={`gap-1 ${styles.privacyLinks}`} href="politicadeprivacidade">Política de privacidade</Button>
                    <Button color="link-gray" size="lg" className={`gap-1 ${styles.privacyLinks}`} href="/termosdeuso">Termos de uso</Button>
                </div>
            </UntitledFooter>
        </>
    )
}