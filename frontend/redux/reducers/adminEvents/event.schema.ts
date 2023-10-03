export type AdminEvent = {
  town: string;
  factory: string;
  patient_id: number;
  description: string;
};

export type AdminEventsResponse = {
  events: {
    events: {
      date: string;
      name: string;
    }[];
    patient_id: number;
  }[];
  factory_name: string;
  zone_name: string;
};
