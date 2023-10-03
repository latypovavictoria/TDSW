export type Patient = {
  id: number;

  firstName: string;
  lastName: string;

  phone?: string;

  sex?: number;

  birthday?: string;
  age?: number;

  weight?: number;
  height?: number;
  insure_number?: string;

  risks?: [string, string][];
  recommendations?: [string, string][];

  last_inspection?: string;
  tid?: string;

  inspections_short_info?: {
    all: number;
    danger: number;
    warning: number;
    ok: number;
    last: boolean;
  };

  avatar?: string;
};
