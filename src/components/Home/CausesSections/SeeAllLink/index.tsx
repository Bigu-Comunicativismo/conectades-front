import { Button } from "@/components/base/buttons/button";
import { Link } from "@tanstack/react-router";
import styles from './SeeAllLink.module.css';

export function SeeAllLink({ href }: { href: string }) {
    return (
        <Link to={href}>
            <Button className={styles.seeAllLink} >
                Ver todas
            </Button>
        </Link>
    )
}