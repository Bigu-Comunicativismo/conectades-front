import { useEffect, useState } from "react";
import { Container } from "../Container";
import { Button } from "@/components/base/buttons/button";
import { Image } from "../Image";
import { Location } from "./Location";
import { ActionType } from "./ActionType";
import { ChevronDown, MarkerPin01 } from "@untitledui/icons";
import donationType from "@/assets/Assets Visuais/envato-graphic-1be80dd4-214a-4576-ae14-65f1a7a9ddfb.png";
import styles from "./ListFilter.module.css";
import { setOptions } from "@/utils/setOptions";
import { useFilterContext } from "@/contexts/filterContext";


export type LabedItem = {
    id: string;
    label: string;
}

export function ListFilter() {
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const [locations, setLocations] = useState<LabedItem[]>([]);
    const [categories, setCategories] = useState<LabedItem[]>([]);
    const {selectedLocations, selectedItems} = useFilterContext();

    useEffect(() => {
        const storedLocations = localStorage.getItem("locations");
        const storedCategories = localStorage.getItem("categories");
        if(storedLocations) setLocations(JSON.parse(storedLocations));
        if(storedCategories) setCategories(JSON.parse(storedCategories));
        if(!storedLocations){
            setOptions().then((response) => {
                const {categories, locations} = response;
                setLocations(locations);
                setCategories(categories);
            })
            
        }
        
    }, [])

    return (
        <Container classCss="">
            <Container classCss={styles.container}>
                <Button className={styles.btn} 
                onClick={() => setShowActionModal((previous) => !previous)}
                iconLeading={<Image src={donationType} 
                    alternateText="" 
                    className={styles.filterImage} />} 
                iconTrailing={
                    <ChevronDown className={styles.filterChevron} />}>Tipo de doação {selectedItems.length > 0 && <span className={styles.activeFilterQuantity}>{selectedItems.length}</span>}</Button>
                <Button className={styles.btn} 
                onClick={() => setShowLocationModal((previous) => !previous)}
                iconLeading={
                    <MarkerPin01 className={styles.filterImage} 
                color="#f00"/>} iconTrailing={<ChevronDown className={styles.filterChevron} />}>Localização {selectedLocations.length > 0 &&<span className={styles.activeFilterQuantity}>{selectedLocations.length}</span>}</Button>
            </Container>
            {showLocationModal && <Location locations={locations}
                setShowModal={setShowLocationModal} />}
            {showActionModal && <ActionType categories={categories}
            setShowModal={setShowActionModal}  
            action="Campanhas" />}
        </Container>
    );
}