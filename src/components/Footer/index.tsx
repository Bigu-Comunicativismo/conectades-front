import styles from './Footer.module.css';
import { FooterLarge01 as UntitledFooter } from '../marketing/footers/footer-large-01';
import { Logo } from '../structuralComponents/Logo';
import { Button } from '../base/buttons/button';
import { Link, useNavigate } from '@tanstack/react-router';
import { useLoggedUserContext } from '@/contexts/loggedUserContext';
import { useEffect, useState } from 'react';
import { useFilterContext } from '@/contexts/filterContext';



export function Footer({ref}: {ref?: React.RefObject<HTMLDivElement | null>}) {
    const { loggedUser } = useLoggedUserContext();
    const [userType, setUserType] = useState<number | undefined>(undefined);
    const { setSelectedItems } = useFilterContext();
    const navigate = useNavigate();

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
                href: "/aboutus#comofunciona",
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
                action: () => {
                    setSelectedItems([{id: '2', label: 'Saúde'}]);
                    navigate({ to: '/donations' });
                }
            },
            {
                label: "Jurídico e Direitos",
                href: "/donations",
                action: () => {
                    setSelectedItems([{id: '3', label: 'Jurídico e Direitos'}]);
                    navigate({ to: '/donations' });
                }
            },
            {
                label: "Educação e Capacitação",
                href: "/donations",
                action: () => {
                    setSelectedItems([{id: '4', label: 'Educação'}]);
                    navigate({ to: '/donations' });
                }
            },
            {
                label: "Outros",
                href: "/donations",
                action: () => {
                    setSelectedItems([{id: '22', label: 'Outros'}]);
                    navigate({ to: '/donations' });
                }
            },
        ],
    },
    {
        label: "Campanhas",
        items: [
            {
                label: "Saúde e Bem-estar",
                href: "/campaigns",
                action: () => {
                    setSelectedItems([{id: '16', label: 'Saúde'}]);
                    navigate({ to: '/campaigns' });
                }
            },
            {
                label: "Gênero e Sexualidade",
                href: "/campaigns",
                action: () => {
                    setSelectedItems([{id: '17', label: 'Jurídico e Direitos'}]);
                    navigate({ to: '/campaigns' });
                }
            },
            {
                label: "Cultura e Comunidade",
                href: "/campaigns",
                action: () => {
                    setSelectedItems([{id: '21', label: 'Cultura e Lazer'}]);
                    navigate({ to: '/campaigns' });
                }
            },
            {
                label: "Necessidades Básicas",
                href: "/campaigns",
                action: () => {
                    setSelectedItems([{id: '14', label: 'Higiene e Cuidados Pessoais'}]);
                    navigate({ to: '/campaigns' });
                }
            },
            {
                label: "Trabalho",
                href: "/campaigns",
                action: () => {
                    setSelectedItems([{id: '20', label: 'Trabalho e Emprego'}]);
                    navigate({ to: '/campaigns' });
                }
            },
            {
                label: "Outros",
                href: "/campaigns",
                action: () => {
                    setSelectedItems([{id: '22', label: 'Outros'}]);
                    navigate({ to: '/campaigns' });
                }
            },
        ],
    },
    // {
    //     label: "Oportunidades",
    //     items: [
    //         {
    //             label: "Cursos",
    //             href: "/cursos",
    //         },
    //         {
    //             label: "Vagas de Emprego",
    //             href: "/vagas",
    //         },
    //     ],
    // },
];

const footerDonatariesNavList = [
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
                href: "/aboutus#comofunciona",
            },
            {
                label: "Contato",
                href: "/aboutus#contato",
            },
        ],
    },
    {
        label: "Campanhas",
        items: [
            {
                label: "Saúde e Bem-estar",
                href: "/campaigns",
                action: () => {
                    setSelectedItems([{id: '16', label: 'Saúde'}]);
                    navigate({ to: '/campaigns' });
                }
            },
            {
                label: "Gênero e Sexualidade",
                href: "/campaigns",
                action: () => {
                    setSelectedItems([{id: '17', label: 'Jurídico e Direitos'}]);
                    navigate({ to: '/campaigns' });
                }
            },
            {
                label: "Cultura e Comunidade",
                href: "/campaigns",
                action: () => {
                    setSelectedItems([{id: '21', label: 'Cultura e Lazer'}]);
                    navigate({ to: '/campaigns' });
                }
            },
            {
                label: "Necessidades Básicas",
                href: "/campaigns",
                action: () => {
                    setSelectedItems([{id: '14', label: 'Higiene e Cuidados Pessoais'}]);
                    navigate({ to: '/campaigns' });
                }
            },
            {
                label: "Trabalho",
                href: "/campaigns",
                action: () => {
                    setSelectedItems([{id: '20', label: 'Trabalho e Emprego'}]);
                    navigate({ to: '/campaigns' });
                }
            },
            {
                label: "Outros",
                href: "/campaigns",
                action: () => {
                    setSelectedItems([{id: '22', label: 'Outros'}]);
                    navigate({ to: '/campaigns' });
                }
            },
        ],
    }
];

const footerBeneficiariesNavList = [
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
                href: "/aboutus#comofunciona",
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
                action: () => {
                    setSelectedItems([{id: '2', label: 'Saúde'}]);
                    navigate({ to: '/donations' });
                }
            },
            {
                label: "Jurídico e Direitos",
                href: "/donations",
                action: () => {
                    setSelectedItems([{id: '3', label: 'Jurídico e Direitos'}]);
                    navigate({ to: '/donations' });
                }
            },
            {
                label: "Educação e Capacitação",
                href: "/donations",
                action: () => {
                    setSelectedItems([{id: '4', label: 'Educação'}]);
                    navigate({ to: '/donations' });
                }
            },
            {
                label: "Outros",
                href: "/donations",
                action: () => {
                    setSelectedItems([{id: '22', label: 'Outros'}]);
                    navigate({ to: '/donations' });
                }
            },
        ],
    }
];

    useEffect(() => {
        if (loggedUser?.user) setUserType(loggedUser.user.tipo_usuario);

    }, []);
    return (
        <>
            <UntitledFooter footerNavList={userType === 5 ? footerBeneficiariesNavList : userType === 6 ? footerDonatariesNavList : footerNavList} navCategoryCss={styles.categoryTitle} navItemCss={styles.categoryItem} footerCss={styles.footer} ref={ref}>
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