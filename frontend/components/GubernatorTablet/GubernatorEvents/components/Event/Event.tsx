import { VisibilitySharp } from "@mui/icons-material";

import EBox from "@components/UI/EBox";

import { usePatientById } from "../../hooks/usePatientById";

export interface EventProps {
  event: {
    description: string;
    organization: string;
    patient_id: number;
    town: string;
    risk: string;
  };
  switchPatient: (_: number) => void;
}

function Event({ event, switchPatient }: EventProps) {
  const patient = usePatientById(event.patient_id);

  const onClick = () => switchPatient(event.patient_id);

  return (
    <EBox notched className="p-2" onClick={onClick}>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <h5>
            {patient?.json_data?.lastName} {patient?.json_data?.firstName}
          </h5>
          <span>
            {event.town}, {event.organization}
          </span>
          <span className="mt-2">{event.description}</span>
          <span className="mt-2">{event.risk}</span>
        </div>
        <span className="my-auto ml-auto">
          <VisibilitySharp />
        </span>
      </div>
    </EBox>
  );
}

export default Event;
