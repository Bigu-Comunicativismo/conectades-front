import {useState} from "react";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { type DateRange } from "react-day-picker";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { ptBR } from "date-fns/locale";
import styles from "../New.module.css";


export function DatePicker({setDateRange, dateRange}: {setDateRange: (dateRange: DateRange | undefined) => void, dateRange: DateRange | undefined}) {
  const [date, setDate] = useState<Date | undefined >(undefined)

  function handleSelect(date: Date | undefined) {
      setDate(date)
      if(date){
      const newRange = {
        from: date,
        to: addDays(date, 15),
      }
      setDateRange(newRange)
    } else {
      setDateRange(undefined)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <p className="text-sm font-medium">
        Selecione a data de início e fim desta campanha
      </p>

      <div className="flex gap-3 w-full">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-start text-left pw-8 py-5.5 rounded-xl text-[14px] min-w-[115px] grow"
            >
              <CalendarIcon className="mr-2" style={{width: '14px', height: '14px'}} />
              {dateRange?.from ? format(dateRange.from, "dd/MM/yyyy") : "Início"}
            </Button>
          </PopoverTrigger>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-start text-left pw-8 py-5.5 rounded-xl text-[14px] min-w-[115px] grow"
            >
              <CalendarIcon className="mr-2" style={{width: '14px'}} />
              {dateRange?.to ? format(dateRange.to, "dd/MM/yyyy") : "Fim"}
            </Button>
          </PopoverTrigger>
        </Popover>
      </div>
      <Calendar className={`w-full ${styles.daySelected}`}
      buttonVariant={"outline"}
      disabled={{before: new Date()}}
      defaultMonth={dateRange?.to || new Date()}
      locale={ptBR}
      navLayout="around"
      mode="single"
      selected={date}
      onSelect={handleSelect}
       />
    </div>
  )
}
