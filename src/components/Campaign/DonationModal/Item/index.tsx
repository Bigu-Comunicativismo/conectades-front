import { Container } from "@/components/structuralComponents/Container";
import { Button } from "@/components/base/buttons/button";
// import { Input } from "@/components/base/input/input";
// import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { Plus, Minus } from "@untitledui/icons";
// import categoryStyles from "@/components/SignUp/PreferenceForm/PreferenceForm.module.css"
import onlyTextbtnStyles from "@/components/structuralComponents/ListFilter/ListFilter.module.css";
// import inputStyles from "@/components/base/input/Input.module.css"
import styles from "../../New/New.module.css"

export default function ItemQuantityPicker({handleQuantity, disponibleQuantity, quantity}: {disponibleQuantity: number, quantity: number, handleQuantity: React.Dispatch<React.SetStateAction<number>>}) {


  function handleIncrement() {
    if(quantity < disponibleQuantity) handleQuantity((prevQuantity: number) => prevQuantity + 1)
  }

  function handleDecrement() {
    if(quantity > 0) handleQuantity((prevQuantity: number) => prevQuantity - 1)
  }

  return (
    <div className="flex flex-col gap-4">
      <Container classCss={styles.addItemContainer} >
        <div className={styles.addItemBtnContainer}>
            <Button
            size="sm"
            className={`${onlyTextbtnStyles.btnOnlyText} ${styles.addItemBtnCounter}`}
            onClick={() => handleDecrement()}
            >
            <Minus />
            </Button>
            <span className={styles.addItemBtnText}>{quantity}</span>
            <Button
            size="sm"
            className={`${onlyTextbtnStyles.btnOnlyText} ${styles.addItemBtnCounter}`} 
            onClick={() => handleIncrement()}
            >
            <Plus />
            </Button>
        </div>
      </Container>
      
    </div>
  )
}
