import { useEffect, useState } from "react";
import { Container } from "../Container";
import { Button } from "@/components/base/buttons/button";
import { Image } from "../Image";
import { Location } from "./Location";
import { ActionType, type Category } from "./ActionType";
import { ChevronDown, MarkerPin01 } from "@untitledui/icons";
import donationType from "@/assets/Assets Visuais/envato-graphic-1be80dd4-214a-4576-ae14-65f1a7a9ddfb.png";
import styles from "./ListFilter.module.css";

export function ListFilter() {

    const [selectedItems, setSelectedItems] = useState<Category[] | never[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<[] | never[]>([]);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
      useEffect(() => {
        console.log(selectedItems, selectedLocations);
      }, [selectedItems, selectedLocations]);
    return (
        <Container classCss="">
            <Container classCss={styles.container}>
                <Button className={styles.btn} 
                onClick={() => setShowActionModal((previous) => !previous)}
                iconLeading={<MarkerPin01 className={styles.filterImage} 
                color="#f00"/>} 
                iconTrailing={
                    <ChevronDown className={styles.filterChevron} />}>Tipo de doação </Button>
                <Button className={styles.btn} 
                onClick={() => setShowLocationModal((previous) => !previous)}
                iconLeading={
                    <Image src={donationType} 
                    alternateText="" 
                    className={styles.filterImage} />} iconTrailing={<ChevronDown className={styles.filterChevron} />}>Localização </Button>
            </Container>
            {showLocationModal && <Location selectedLocations={selectedLocations}
                setShowModal={setShowLocationModal} 
                setLocationFilter={setSelectedLocations}/>}
            {showActionModal && <ActionType setShowModal={setShowActionModal} 
            categoryFilters={selectedItems} 
            action="Campanhas" 
            setCategoryFilter={setSelectedItems}/>}
        </Container>
    );
}