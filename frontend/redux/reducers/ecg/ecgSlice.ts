import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EcgEvent } from "./EcgEvent";

export interface ECGState {
  events: Record<string, EcgEvent[]>;

  startTime?: number;
  endTime?: number;
  sampFreq: number;

  zoom: {
    lower: number;
    upper: number;
    page: number;
    maxPage: number;
  };

  filter: {
    freq: number;
  };

  dataLoading: boolean;
  statLoading: boolean;

  activeEventIndex: number;

  freqPower: {
    HF?: number;
    LF?: number;
    VLF?: number;
  };

  hgram: {
    data: { start: number; end: number; value: number }[];
    gates: { level: "danger" | "warn" | "ok"; start: number; end: number }[];
  };

  scater: {
    data: {
      index: number;
      pos: [number, number];
    }[];
  };

  rythm: {
    value: number;
    index: number;
  }[];
  length: number;

  isIsoline: boolean;
}

const initialState: ECGState = {
  events: {},
  sampFreq: 1,
  zoom: {
    lower: -5,
    upper: 5,
    page: 0,
    maxPage: 1,
  },
  filter: {
    freq: 35,
  },

  statLoading: true,
  dataLoading: true,

  activeEventIndex: -1,
  freqPower: {
    HF: 0,
    LF: 0,
    VLF: 0,
  },
  hgram: {
    data: [],
    gates: [
      {
        level: "danger",
        start: 350,
        end: 660,
      },
      {
        level: "warn",
        start: 660,
        end: 750,
      },
      {
        level: "ok",
        start: 750,
        end: 850,
      },
      {
        level: "warn",
        start: 850,
        end: 1000,
      },
      {
        level: "danger",
        start: 1000,
        end: 1350,
      },
    ],
  },
  scater: { data: [] },
  rythm: [],
  length: 0,
  isIsoline: false,
};

export const ECGSlice = createSlice({
  name: "ecg",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<EcgEvent[]>) => {
      const events = action.payload;
      if (events == null) {
        state.events = {};
        return;
      }
      events.sort((a, b) => a.start - b.start);
      const reduced = events.reduce((acc, cur) => {
        const stack = acc[cur.name] || [];
        if (stack.length === 0) {
          acc[cur.name] = [cur];
          return acc;
        }

        const last = stack[stack.length - 1];
        if (last.end < cur.start) {
          acc[cur.name] = [...stack, cur];
        } else {
          last.end = cur.end;
        }

        return acc;
      }, {} as Record<string, EcgEvent[]>);
      state.events = reduced;
    },
    setStartTime: (state, action: PayloadAction<number>) => {
      state.startTime = action.payload;
    },
    setEndTime: (state, action: PayloadAction<number>) => {
      state.endTime = action.payload;
    },
    setSampFreq: (state, action: PayloadAction<number>) => {
      state.sampFreq = action.payload;
    },
    substractLower: (state, action: PayloadAction<number>) => {
      state.zoom.lower -= action.payload;
    },
    addLower: (state, action: PayloadAction<number>) => {
      state.zoom.lower += action.payload;
    },
    addUpper: (state, action: PayloadAction<number>) => {
      state.zoom.upper += action.payload;
    },
    substractUpper: (state, action: PayloadAction<number>) => {
      state.zoom.upper -= action.payload;
    },
    setFilterFreq: (state, action: PayloadAction<number>) => {
      state.filter.freq = action.payload;
    },
    setActiveEventIndex: (state, action: PayloadAction<number>) => {
      state.activeEventIndex = action.payload;
    },
    setFreqPower: (
      state,
      action: PayloadAction<{ HF?: number; LF?: number; VLF?: number }>
    ) => {
      state.freqPower = action.payload;
    },
    setHgramData: (
      state,
      action: PayloadAction<{ start: number; end: number; value: number }[]>
    ) => {
      state.hgram.data = action.payload;
    },
    prevPage: (state) => {
      if (state.zoom.page > 0) state.zoom.page -= 1;
    },
    nextPage: (state) => {
      if (state.zoom.page < state.zoom.maxPage - 1) {
        state.zoom.page += 1;
      }
    },
    setPage: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.zoom.maxPage) {
        state.zoom.page = action.payload;
      }
    },
    setMaxPage: (state, action: PayloadAction<number>) => {
      state.zoom.maxPage = action.payload;
    },
    setStatLoading: (state, action: PayloadAction<boolean>) => {
      state.statLoading = action.payload;
    },
    setDataLoading: (state, action: PayloadAction<boolean>) => {
      state.dataLoading = action.payload;
    },
    setScater: (
      state,
      action: PayloadAction<{ index: number; pos: [number, number] }[]>
    ) => {
      state.scater.data = action.payload;
    },
    setRythm: (
      state,
      action: PayloadAction<{ value: number; index: number }[]>
    ) => {
      state.rythm = action.payload;
    },
    setLength: (state, action: PayloadAction<number>) => {
      state.length = action.payload;
    },
    setIsIsoline: (state, action: PayloadAction<boolean>) => {
      state.isIsoline = action.payload;
    },
  },
});

export const {
  setEvents,
  setStartTime,
  setEndTime,
  setSampFreq,
  substractLower,
  addLower,
  substractUpper,
  addUpper,
  setFilterFreq,
  setActiveEventIndex,
  setFreqPower,
  setHgramData,
  prevPage,
  nextPage,
  setPage,
  setMaxPage,
  setStatLoading,
  setDataLoading,
  setScater,
  setRythm,
  setLength,
  setIsIsoline,
} = ECGSlice.actions;

export default ECGSlice.reducer;
