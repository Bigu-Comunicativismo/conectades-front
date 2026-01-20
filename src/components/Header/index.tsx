import { BookClosed, FileCode01, PlayCircle, Stars02 } from "@untitledui/icons";
import { Header as UntitledHeader, type HeaderNavItem } from "../marketing/header-navigation/header";
import styles from "./Header.module.css";
import { DropdownMenuSimpleWithFooter } from "../marketing/header-navigation/dropdown-menu-simple-with-footer";
import { useLoggedUserContext } from "@/contexts/loggedUserContext";

const donationsItems = [
    { title: "Todas as doações", href: "/donations", Icon: BookClosed },
    { title: "Saúde e Bem-estar", href: "/donations", Icon: Stars02 },
    { title: "Educação e Capacitação", href: "/donations", Icon: PlayCircle },
    { title: "Outros", href: "/donations", Icon: FileCode01 },
]
const campaignItems = [
    { title: "Todas as campanhas", href: "/campaigns", Icon: BookClosed },
    { title: "Saúde e Bem-estar", href: "/campaigns", Icon: Stars02 },
    { title: "Educação e Capacitação", href: "/campaigns", Icon: PlayCircle },
    { title: "Outros", href: "/campaigns", Icon: FileCode01 },
]

const donatariesHeaderNavItems: HeaderNavItem[] = [
    { label: "Campanhas", href: "/campaigns", menu: <DropdownMenuSimpleWithFooter items={campaignItems}/> },
    { label: "Minhas doações", href: "/mydonations" },
    { label: "Quem somos", href: "/aboutus" },
];
const beneficiarieHeaderNavItems: HeaderNavItem[] = [
    { label: "Doações", href: "/donations", menu: <DropdownMenuSimpleWithFooter items={donationsItems}/> },
    { label: "Minhas campanhas", href: "/mycampaigns" },
    { label: "Quem somos", href: "/aboutus" },
];

const unloggedHeaderNavItems: HeaderNavItem[] = [
    { label: "Campanhas", href: "/campaigns", menu: <DropdownMenuSimpleWithFooter items={campaignItems}/> },
    { label: "Doações", href: "/donations", menu: <DropdownMenuSimpleWithFooter items={donationsItems}/> },
    { label: "Quem somos", href: "/aboutus" },
];

export function Header() {
    const {loggedUser} = useLoggedUserContext();

    if (loggedUser) {
        if (loggedUser.user?.tipo_usuario === 5) {
            return (
                <UntitledHeader className={styles.customHeader} items={beneficiarieHeaderNavItems}/>
            );
        } else if (loggedUser.user?.tipo_usuario === 6) {
            return (
                <UntitledHeader className={styles.customHeader} items={donatariesHeaderNavItems}/>
            );
        }
    }
    return (
        <UntitledHeader className={styles.customHeader} items={unloggedHeaderNavItems}/>
    );
}