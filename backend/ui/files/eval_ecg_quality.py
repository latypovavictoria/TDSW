from db import Inspections

# import neurokit2 as nk
from mne.io.edf.edf import RawEDF
import numpy as np


def eval_quality(data: np.ndarray, is_edf: bool, insp_id: int) -> tuple[np.ndarray, bool, dict]:
    """
    Функция для оценки качества сигнала и сохранения метаданных

    :param: data - ecg row
    :type: np.ndarray
    :param: is_edf - flag is edf format
    :type: bool
    :param: insp_id - id of inspection
    :type: int

    :return: ecg data
    :rtype: tuple[np.ndarray, bool, dict]
    """
    if is_edf:
        # получаем из файла частоту, длительность и размер файла
        frequency, duration, file_size = data.info.get('sfreq'), data.times[-1], data._size
        # получаем массив со значениями
        raw_data = data.get_data().reshape(-1)
        # ecg_cleaned = nk.ecg_clean(raw_data, sampling_rate=frequency)
        quality = "Unacceptable"
        acceptable = False if quality == 'Unacceptable' else True
        if not acceptable:
            return np.array([]), False, {}
        inspection = Inspections.GET(hash_map={"Id": insp_id})[0]
        meta_info = {'frequency': frequency, 'duration': duration, 'file_size': file_size}
        # загрузим метаинформацию о файле в бд
        inspection.set_json_data(meta_info)
        return raw_data, True, meta_info

    else:
        inspection = Inspections.GET(hash_map={"Id": insp_id})[0]
        meta_info = inspection.json_data
        frequency = meta_info['frequency']
        raw_data = data
        ecg_cleaned = nk.ecg_clean(raw_data, sampling_rate=frequency)
        quality = nk.ecg_quality(ecg_cleaned,
                                 sampling_rate=frequency,
                                 method="zhao2018",
                                 approach="fuzzy")
        acceptable = False if quality == 'Unacceptable' else True
        if not acceptable:
            return np.array([]), False, {}
        return raw_data, True, meta_info
