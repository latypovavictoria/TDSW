export interface Inspection {
  id: number;
  patient_id: number;

  datetime_created: string;
  access: boolean;
  inspection_type: string;

  json_data: Object;
}

export type PulseGraphData = {
  date: string;
  pulse: number;
  pressure: {
    first: number;
    second: number;
  };
};
