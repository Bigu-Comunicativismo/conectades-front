import { Container } from "@/components/structuralComponents/Container";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { Plus, Minus } from "@untitledui/icons";
import categoryStyles from "@/components/SignUp/PreferenceForm/PreferenceForm.module.css"
import onlyTextbtnStyles from "@/components/structuralComponents/ListFilter/ListFilter.module.css";
import inputStyles from "@/components/base/input/Input.module.css"
import styles from "../New.module.css"

export default function ItemsList({items, handleItems}: {items: { nome: string; quantidade_solicitada: number }[], handleItems: React.Dispatch<React.SetStateAction<{ nome: string; quantidade_solicitada: number }[]>>}) {

  function handleChange(index: number, field: string, value: string | number) {
    const newItems = [...items]
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    newItems[index][field] = value
    handleItems(newItems)
  }

  function handleAddItem() {
    handleItems([...items, { nome: "", quantidade_solicitada: 0 }])
  }

  function handleIncrement(index: number) {
    const newItems = [...items]
    newItems[index].quantidade_solicitada += 1
    handleItems(newItems)
  }

  function handleDecrement(index: number) {
    const newItems = [...items]
    if (newItems[index].quantidade_solicitada > 0) {
      newItems[index].quantidade_solicitada -= 1
      handleItems(newItems)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Paragraph text={"O que deseja arrecadar?"} size="sm" weight="medium" variant="secondary" classCss={categoryStyles.filtersLabel} />

      {items.map((item, index) => (
        <Container classCss={styles.addItemContainer} key={index}>
        <Input
            placeholder="Item"
            value={item.nome}
            onChange={(value) =>
            handleChange(index, "nome", value)
            }
            className={`${inputStyles.input}`}
        />

        <div className={styles.addItemBtnContainer}>
            <Button
            size="sm"
            className={`${onlyTextbtnStyles.btnOnlyText} ${styles.addItemBtnCounter}`}
            onClick={() => handleDecrement(index)}
            >
            <Minus />
            </Button>
            <span className={styles.addItemBtnText}>{item.quantidade_solicitada}</span>
            <Button
            size="sm"
            className={`${onlyTextbtnStyles.btnOnlyText} ${styles.addItemBtnCounter}`} 
            onClick={() => handleIncrement(index)}
            >
            <Plus />
            </Button>
        </div>
        </Container>
      ))}

      <Button
        className={`${onlyTextbtnStyles.btnOnlyText} ${styles.addItemBtn}`}
        onClick={handleAddItem}
      >
        Adicionar outro item
      </Button>
    </div>
  )
}
