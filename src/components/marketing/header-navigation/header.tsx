import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { BookClosed, ChevronDown, ChevronRight, FileCode01, Plus, Stars02 } from "@untitledui/icons";
import { Button as AriaButton, Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
// import { DropdownMenuFeatureCard } from "./dropdown-menu-feature-card";
import { DropdownMenuSimpleWithFooter } from "./dropdown-menu-simple-with-footer";
// import { DropdownMenuWithTwoColsAndLinksAndFooter } from "./dropdown-menu-with-two-cols-and-links-and-footer";
import { Logo } from "@/components/structuralComponents/Logo";
import { imgBaseUrl } from "@/utils/imgBaseUrl";
import { Avatar } from "@/components/base/avatar/avatar";
import { Link, useNavigate } from "@tanstack/react-router";
import { useLoggedUserContext } from "@/contexts/loggedUserContext";
import { PlayCircle } from "lucide-react";
import styles from './headerComponent.module.css';
import createBtn from "@/components/CreateItem/CreateItem.module.css"

export type HeaderNavItem = {
    label: string;
    href?: string;
    menu?: ReactNode;
};

const donationsItems = [
    { title: "Todas as doações", subtitle: "The latest industry new and guides curated by our expert team.", href: "/donations", Icon: BookClosed },
    { title: "Saúde e Bem-estar", subtitle: "Learn how our customers are using Untitled UI to 10x their growth.", href: "/donations", Icon: Stars02 },
    { title: "Educação e Capacitação", subtitle: "Get up and running on our newest features and in-depth guides.", href: "/donations", Icon: PlayCircle },
    { title: "Outros", subtitle: "In-depth articles on our tools and technologies to empower teams.", href: "/donations", Icon: FileCode01 },
]
const campaignItems = [
    { title: "Todas as campanhas", subtitle: "The latest industry new and guides curated by our expert team.", href: "/campaigns", Icon: BookClosed },
    { title: "Saúde e Bem-estar", subtitle: "Learn how our customers are using Untitled UI to 10x their growth.", href: "/campaigns", Icon: Stars02 },
    { title: "Educação e Capacitação", subtitle: "Get up and running on our newest features and in-depth guides.", href: "/campaigns", Icon: PlayCircle },
    { title: "Outros", subtitle: "In-depth articles on our tools and technologies to empower teams.", href: "/campaigns", Icon: FileCode01 },
]


const headerNavItems: HeaderNavItem[] = [
    { label: "Campanhas", href: "/campaigns", menu: <DropdownMenuSimpleWithFooter items={campaignItems}/> },
    { label: "Doações", href: "/donations", menu: <DropdownMenuSimpleWithFooter items={donationsItems}/> },
    { label: "Quem somos", href: "/aboutus" },
];

const MobileNavItem = (props: { className?: string; label: string; href?: string; children?: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (props.href) {
        return (
            <li className={styles.navigationListItem}>
                <a href={props.href} className="flex items-center justify-between px-4 py-3 text-md font-semibold text-primary hover:bg-primary_hover">
                    {props.label}
                </a>
            </li>
        );
    }

    return (
        <li className="flex flex-col gap-0.5">
            <button
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between px-4 py-3 text-md font-semibold text-primary hover:bg-primary_hover"
            >
                {props.label}{" "}
                <ChevronRight
                    className={cx("size-4 stroke-[2.625px] text-fg-quaternary transition duration-100 ease-linear", isOpen ? "-rotate-180" : "rotate-0")}
                />
            </button>
            {isOpen && <div>{props.children}</div>}
        </li>
    );
};

// const MobileFooter = () => {
//     return (
//         <div className="flex flex-col gap-8 border-t border-secondary px-4 py-6">
//             <div>
//                 <ul className="grid grid-flow-col grid-cols-2 grid-rows-4 gap-x-6 gap-y-3">
//                     {footerNavItems.map((navItem) => (
//                         <li key={navItem.label}>
//                             <Button color="link-gray" size="lg" href={navItem.href}>
//                                 {navItem.label}
//                             </Button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <div className="flex flex-col gap-3">
//                 <Button size="lg">Sign up</Button>
//                 <Button color="secondary" size="lg">
//                     Log in
//                 </Button>
//             </div>
//         </div>
//     );
// };

interface HeaderProps {
    items?: HeaderNavItem[];
    isFullWidth?: boolean;
    isFloating?: boolean;
    className?: string;
}

export const Header = ({ items = headerNavItems, isFullWidth, isFloating, className }: HeaderProps) => {
    const headerRef = useRef<HTMLElement>(null);

    const { loggedUser } = useLoggedUserContext();
    const [userAvatar, setUserAvatar] = useState<string>("");
    const [showAvatar, setShowAvatar] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("user")!);
        if (loggedUser) {
            setUserAvatar(`${imgBaseUrl}${loggedUser.avatar}`);
            setShowAvatar(true);
        }
    }, [loggedUser])

    return (
        <header
            ref={headerRef}
            className={cx(
                "relative flex h-18 w-full items-center justify-center md:h-20",
                isFloating && "h-16 md:h-19 md:pt-3",
                isFullWidth && !isFloating ? "has-aria-expanded:bg-primary" : "max-md:has-aria-expanded:bg-primary",
                className,
            )}
        >
            <div className="flex size-full max-w-container flex-1 items-center pr-3 pl-4 md:px-8">
                <div
                    className={cx(
                        "flex w-full justify-between gap-4",
                        isFloating && "ring-secondary_alt md:rounded-2xl md:bg-primary md:py-3 md:pr-3 md:pl-4 md:shadow-xs md:ring-1",
                    )}
                >
                    <Logo />
                    <div aria-label="avatar-and-menu" className="md:mr-auto!">
                        {showAvatar && <Link to="/profile" aria-label="Avatar do usuário logado" className="md:hidden"><Avatar src={userAvatar} size="lg" /></Link>}
                        <div className="flex flex-1 items-center gap-5 hidden md:block">
                            {/* Desktop navigation */}
                            <nav className="max-md:hidden">
                                <ul className={`flex items-center gap-0.5 ${styles.navUl}`}>
                                    {items.map((navItem) => (
                                        <li key={navItem.label}>
                                            {navItem.menu ? (
                                                <AriaDialogTrigger>
                                                    <AriaButton className="flex cursor-pointer items-center gap-0.5 rounded-lg px-1.5 py-1 text-md font-semibold text-secondary outline-focus-ring transition duration-100 ease-linear hover:text-secondary_hover focus-visible:outline-2 focus-visible:outline-offset-2">
                                                        <span className={`px-0.5 ${styles.headerLiItem}`}>{navItem.label}</span>

                                                        <ChevronDown className="rotate-0 stroke-[2.625px] text-fg-quaternary transition duration-100 ease-linear in-aria-expanded:-rotate-180" size={20}/>
                                                    </AriaButton>

                                                    <AriaPopover
                                                        className={({ isEntering, isExiting }) =>
                                                            cx(
                                                                "hidden origin-top will-change-transform md:block",
                                                                isFullWidth && "w-full",
                                                                isEntering && "duration-200 ease-out animate-in fade-in slide-in-from-top-1",
                                                                isExiting && "duration-150 ease-in animate-out fade-out slide-out-to-top-1",
                                                            )
                                                        }
                                                        offset={isFloating || isFullWidth ? 0 : 8}
                                                        containerPadding={0}
                                                        triggerRef={(isFloating && isFullWidth) || isFullWidth ? headerRef : undefined}
                                                    >
                                                        {({ isEntering, isExiting }) => (
                                                            <AriaDialog
                                                                className={cx(
                                                                    "mx-auto origin-top outline-hidden",
                                                                    isFloating && "max-w-7xl px-8 pt-3",
                                                                    // Have to use the scale animation inside the popover to avoid
                                                                    // miscalculating the popover's position when opening.
                                                                    isEntering && !isFullWidth && "duration-200 ease-out animate-in zoom-in-95",
                                                                    isExiting && !isFullWidth && "duration-150 ease-in animate-out zoom-out-95",
                                                                )}
                                                            >
                                                                {navItem.menu}
                                                            </AriaDialog>
                                                        )}
                                                    </AriaPopover>
                                                </AriaDialogTrigger>
                                            ) : (
                                                <a
                                                    href={navItem.href}
                                                    className="flex cursor-pointer items-center gap-0.5 rounded-lg px-1.5 py-1 text-md font-semibold text-secondary outline-focus-ring transition duration-100 ease-linear hover:text-secondary_hover focus:outline-offset-2 focus-visible:outline-2"
                                                >
                                                    <span className={`px-0.5 ${styles.headerLiItem}`}>{navItem.label}</span>
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        {/* Mobile menu and menu trigger */}
                        <AriaDialogTrigger>
                            <AriaButton
                                aria-label="Toggle navigation menu"
                                className={({ isFocusVisible, isHovered }) =>
                                    cx(
                                        "group cursor-pointer rounded-lg md:hidden",
                                        isHovered && "bg-primary_hover",
                                        isFocusVisible && "outline-2 outline-offset-2 outline-focus-ring",
                                    )
                                }
                            >
                                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path
                                        className="hidden text-secondary group-aria-expanded:block"
                                        d="M18 6L6 18M6 6L18 18"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        className="text-secondary group-aria-expanded:hidden"
                                        d="M3 12H21M3 6H21M3 18H21"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </AriaButton>
                            <AriaPopover
                                triggerRef={headerRef}
                                className="h-calc(100%-72px) scrollbar-hide w-full overflow-y-auto shadow-lg md:hidden"
                                offset={0}
                                crossOffset={20}
                                containerPadding={0}
                                placement="bottom left"
                            >
                                <AriaDialog className="outline-hidden">
                                    <nav className="w-full bg-primary shadow-lg">
                                        <ul className="flex flex-col gap-0.5 py-5">
                                            {items.map((navItem) =>
                                                navItem.menu ? (
                                                    <MobileNavItem key={navItem.label} label={navItem.label}>
                                                        {navItem.menu}
                                                    </MobileNavItem>
                                                ) : (
                                                    <MobileNavItem key={navItem.label} label={navItem.label} href={navItem.href} />
                                                ),
                                            )}
                                        </ul>
                                        {showAvatar && <Button color="secondary" size="lg" onClick={() => {
                                            localStorage.removeItem("user");
                                            localStorage.removeItem("tokens")
                                            navigate({to:"/", reloadDocument: true});
                                        }}>Sair</Button>}
                                        {/* <MobileFooter /> */}
                                    </nav>
                                </AriaDialog>
                            </AriaPopover>
                        </AriaDialogTrigger>
                    </div>
                    <div className="hidden md:flex gap-8">{!showAvatar ? <div><Button className={`${styles.btn} ${styles.btnOutlined}`} onClick={() => navigate({to: "/login"})}>Entrar</Button> <Button className={styles.btn} onClick={() => navigate({to: "/signup"})}>Cadastro</Button></div> : <Button className={styles.btnCreate} onClick={() => navigate({to: `${loggedUser?.user.tipo_usuario === 5 ? "/campaigns/new" : "/donations/new"}`})}><Plus className={createBtn.plus} size={20}/>Criar {loggedUser?.user.tipo_usuario === 5 ? "campanha" : "doação"}</Button>}
                    {showAvatar && <Link to="/profile" aria-label="Avatar do usuário logado" className="hidden md:block"><Avatar src={userAvatar} size="lg" /></Link>}</div>
                </div>
            </div>
        </header>
    );
};
