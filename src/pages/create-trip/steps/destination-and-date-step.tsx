import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

interface DestinationAndDateStepProps {
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  isGuestsInputOpen: boolean;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
  eventStartAndEndDates: DateRange | undefined;
}
export function DestinationAndDateStep(props: DestinationAndDateStepProps) {
  const {
    isGuestsInputOpen,
    openGuestsInput,
    closeGuestsInput,
    setDestination,
    setEventStartAndEndDates,
    eventStartAndEndDates,
  } = props;

  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

  const openDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  const closeDatePicker = () => {
    setIsDatePickerOpen(false);
  };

  const displaySelectedDates =
    eventStartAndEndDates &&
    eventStartAndEndDates?.from &&
    eventStartAndEndDates?.to
      ? format(eventStartAndEndDates.from, "d 'de 'LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDates.to, "d 'de 'LLL"))
      : null;

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />

        <input
          type="text"
          disabled={isGuestsInputOpen}
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none "
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <button
        onClick={openDatePicker}
        className="flex items-center gap-2 flex-1 text-left W-[240PX]"
        disabled={isGuestsInputOpen}
      >
        <Calendar className="size-5 text-zinc-400" />

        <span className=" text-lg text-zinc-400 w-40 flex-1">
          {displaySelectedDates || "Quando?"}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Selecione a Data</h2>

              <button type="button" onClick={closeDatePicker}>
                <X className="size-5 text-zinc-400" />
              </button>
            </div>

            <DayPicker
              mode="range"
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
              classNames={{
                selected: " text-black",
              }}
            />
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-800" />
      {!isGuestsInputOpen ? (
        <Button variant="primary" onClick={openGuestsInput}>
          Continuar <ArrowRight className="size-5" />
        </Button>
      ) : (
        <Button variant="secondary" onClick={closeGuestsInput}>
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      )}
    </div>
  );
}
