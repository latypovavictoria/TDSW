import numpy as np
from scipy import signal
import pandas as pd


# скользящее среднее
def moving_average(x, window_size):
    """
    Вычисление скользящего среднего

    :param: x - массив данных
    :type: np.ndarray
    :param: window_size: размер окна
    :type: int
    :return: массив данных
    :rtype: np.ndarray
    """
    return pd.Series(x).rolling(window=window_size).mean().iloc[window_size - 1:].values


# фильтрация по изолинии
def isolate_line_filter(fs: float, data: np.ndarray) -> np.ndarray:
    """
    Фильтрация оп изолинии

    :param: fs - частота дискретизации
    :type: float
    :param: data - массив данных
    :type: np.ndarray
    :return: массив данных
    :rtype: np.ndarray
    """
    # Calculate moving averages
    r = moving_average(data, window_size=int(fs * 0.3))
    new_r = moving_average(r, window_size=int(fs * 0.67))

    # Compute difference between original and smoothed signal
    diff = (data.shape[0] - new_r.shape[0]) // 2
    total_r = data[diff: -(diff + 1)] - new_r

    return total_r


# фильтрация экг сигнала по чатсоте
def filter_ecg_signal(lowpass_cutoff: float, sampling_frequency: float, use_isoline_filter: bool, data: np.ndarray):
    """
    Фильтрация экг сигнала по частоте

    :param: lowpass_cutoff: нижняя частота Гц
    :type: float
    :param: sampling_frequency - частота дискретизации
    :type: float
    :param use_isoline_filter - есть ли изолиния
    :type: bool
    :param: data - данные
    :type: np.ndarray
    :return: Массив данных
    :rtype: np.ndarray
    """
    # Compute Butterworth filter coefficients
    wn = 2 * lowpass_cutoff / sampling_frequency
    b, a = signal.butter(8, wn, 'lowpass')

    # Apply filter
    filtered_data = signal.filtfilt(b, a, data)

    # Apply isoline filter if requested
    total_r = isolate_line_filter(sampling_frequency, filtered_data) if use_isoline_filter else filtered_data

    return total_r
