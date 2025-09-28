import { Button } from "@/components/base/buttons/button";
import styles from './SeeAllLink.module.css';

export function SeeAllLink({ href }: { href: string }) {
    return (
        <Button className={styles.seeAllLink} href={href}>
            Ver todos
        </Button>
    )
}