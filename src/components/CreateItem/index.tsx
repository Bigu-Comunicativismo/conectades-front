import { createPortal } from "react-dom";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../base/buttons/button";
import { Plus } from "@untitledui/icons";
import styles from "./CreateItem.module.css";

export function CreateItem({btnText, path}: {btnText: string, path: string}) {
    const navigate = useNavigate();

    const handleClick = () => navigate({to: `${path}`});
    return createPortal(<Button className={styles.createItemBtn} onClick={handleClick}><Plus className={styles.plus}/>{btnText}</Button>, document.body);
}