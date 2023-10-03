"""
Файл для создания схем типов данных пользователей
"""

from ast import literal_eval

with open('../backend/schemes/users_schemes/doctor_scheme.json', encoding='utf-8') as file:
    doctor_scheme = literal_eval(file.read())

with open('../backend/schemes/users_schemes/patient_scheme.json', encoding='utf-8') as file:
    patient_scheme = literal_eval(file.read())

with open('../backend/schemes/users_schemes/staff_scheme.json', encoding='utf-8') as file:
    staff_scheme = literal_eval(file.read())

