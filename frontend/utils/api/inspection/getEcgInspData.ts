import fetchAPI from "../rep";

export const getEcgInspData = (id: number) => {
  return fetchAPI({
    url: `/get_ecg_inspection/${id}`,
    method: "post",
    data: {},
  });
};

export const getEcgInspGraph = (
  id: number,
  page = 0,
  items_on_page = 1000,
  freq = 35,
  isoline = false
) => {
  return fetchAPI({
    url: `/get_ecg_record/${id}`,
    method: "post",
    data: {
      lowpass: freq,
      current_page: page,
      points: items_on_page,
      isoline,
    },
  });
};
