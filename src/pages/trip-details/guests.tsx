import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface Participants {
  id: string;
  name?: string;
  email: string;
  is_confirmed: boolean;
}
export function Guests() {
  const { tripId } = useParams();

  const [participants, setParticipants] = useState<Participants[]>([]);

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then((res) => {
      setParticipants(res.data.participants);
    });
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      {participants.map((val, index) => (
        <div key={val.id} className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {val.name || `Convidado ${index + 1}`}
              </span>
              <span className="block text-sm text-zinc-400 truncate">
                {val.email}
              </span>
            </div>

            {val.is_confirmed ? (
              <CheckCircle2 className="size-5 shrink-0 text-green-400 " />
            ) : (
              <CircleDashed className="size-5 text-zinc-400 shrink-0" />
            )}
          </div>
        </div>
      ))}


      <Button variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar Convidados
      </Button>
    </div>
  );
}
