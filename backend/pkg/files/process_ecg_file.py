import base64
import io
import wave
from db import Files
import numpy as np
from numpy import float64, frombuffer
import mne
from mne.io.edf.edf import RawEDF


def process_ecg_file(file: Files, is_edf: bool):
    """
    Функция для парсинга файла

    :param: file - объект файла
    :type: File
    :param: is_edf - формат
    :type: bool

    :return: обработанные данные
    :rtype: np.ndarray
    """
    if is_edf:
        data = mne.io.read_raw_edf(file.file)
        return data
    else:
        f = wave.open(io.BytesIO(base64.b64decode(file)))
        f_data = f.readframes(1000000 * f.getframerate() * f.getframerate())
        data = frombuffer(f_data, dtype=float64)
        array = (data - data.mean()) / (data.std())
        return array
