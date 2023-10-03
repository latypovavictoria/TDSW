import type { patientType } from "@api/schemas";

export const filterPatient = (
  filter: string,
  patient: Partial<patientType>
) => {
  return (
    patient.json_data?.firstName
      ?.toLowerCase()
      .includes(filter.toLowerCase()) ||
    patient.json_data?.lastName?.toLowerCase().includes(filter.toLowerCase()) ||
    patient.tid?.toString().includes(filter.toLowerCase()) ||
    `${patient.json_data?.firstName} ${patient.json_data?.lastName}`
      .toLowerCase()
      .includes(filter.toLowerCase()) ||
    `${patient.json_data?.lastName} ${patient.json_data?.firstName}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  );
};
