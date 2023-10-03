from typing import Callable, Type


class English_mgs:
    # Already Exist
    @staticmethod
    def login_already_exists(login):
        return f'Login: {login} already exists'

    @staticmethod
    def tid_already_exists(tid, or_id):
        return f'User with tid: {tid} already exists in the organization {or_id}'

    file_already_exist = "The file has already been saved to the database",
    inspection_already_exist = "This inspection is already exist",

    # Not found
    user_not_found = 'User not found',
    patient_not_found = 'Patient not found',
    doctor_not_found = 'Doctor does not exist',
    doctors_not_found = 'Doctors do not exist',
    person_not_found = "Can not find person",
    organization_users_not_found = "No users were found in the organization",
    file_not_found = 'File not found',
    files_not_found = 'Files not found',
    inspection_not_found = 'Inspection not found',
    inspections_not_found = "Inspections not found",
    risk_not_found = 'Risks of patient not found',
    recs_not_found = 'Recommendations of patient not found',
    parent_zone_not_found = 'Parent zone not found',
    child_zone_not_found = 'Child zone not found',
    organization_not_found = 'Organization not found',
    organizations_not_found = "There is not a single organization in the database",
    schedule_not_found = "Schedule not found",
    avatar_not_found = "Avatar not found",
    inspection_scheme_not_found = "Inspection Scheme not found",
    roles_scheme_not_found = "Roles Schemes not found",

    # Attach
    not_attached = 'user is not attached',
    patient_already_attached = 'patient already attached',
    doctor_already_attached = 'doctor already attached',
    employee_already_attached = 'employee already attached to organization',
    user_is_attached_to_organization = "The user is attached to the organization",
    user_is_detached_from_organization = "The user is detached from the organization",
    doctor_to_supervisor_attached = "Doctor is attached to Supervisor",
    doctor_from_supervisor_detach = "Doctor is detached from Supervisor",
    patient_to_doctor_attached = "Patient is attached to Doctor",
    patient_from_doctor_detach = "Patient is detached from Doctor",

    # Incorrect data
    incorrect_pass = 'Incorrect password',
    bad_json = "Couldn't parse the JSON string ⚠️",
    bad_data = "Couldn't parse the DATA string ⚠️",
    inspection_type_error = lambda x: f"Inspection type: {x} dose not exist"
    incorrect_set_of_fields_for = lambda x: f"Incorrect data set to create {x}"
    ext = 'Incorrect file extension',
    bad_inspection_datetime = "In the transmitted data, the datetime_start or datetime_end has wrong format",
    bad_doctor_search_params = "Not enough data for find/add doctor",
    bad_make_schedule_data = "Transmitted data has an incorrect format for creating a schedule",
    bad_set_schedule_data = "Transmitted data has an incorrect format for setting a schedule",
    bad_inspection_search_params = "Transmitted data for searching inspections have wrong format",
    bad_format_to_get_stats_on_inspections = "Some data has an incorrect format",
    bad_get_condition_data = "Can not get condition to inspection_type",
    not_supported_graph_type = "The graph type is not supported",
    empty_organization_hash_or_id = "not organization_hash or organization_id in hash_map",
    bad_update_user = "Can not update User"
    bad_update_role = "Can not update Role"
    bad_update_employee = "Can not update Employee"

    # TMT
    empty_tmt = "TMT data is empty",
    insufficient_tmt_data = "Not enough data to save the TMT inspection",
    tmt_dont_stop = "TMT bracelet did not stop the sending data",
    tmt_dont_saved = "TMT inspection don't saved",
    tmt_saved = "TMT inspection saved",

    # Authorization & Tokens
    user_unauthorized = 'User_unauthorized',
    not_access = 'Not access',
    tokens_msg = 'Token not created or no session, Login required',

    # Success
    result_added = "Result for inspection added",
    schedule_created = "Schedule created",
    schedule_setted = "Schedule setted",
    Hash = "All patient's data was given",

    @staticmethod
    def user_updated(user_id):
        return f"User {user_id} success updated"

    @staticmethod
    def user_deleted(user_id):
        return f"User {user_id} success deleted"

    # Errors
    bad_redis_save = "Data was not recorded in the Redis",
    signal = "Too noisy signal",
    error_on_update_schedule = "An error occurred while updating the schedule",
    towns = 'No towns were added',


class Russian_mgs:
    # Already Exist
    @staticmethod
    def login_already_exists(login):
        return f'Логин: {login} уже существует'

    @staticmethod
    def tid_already_exists(tid, or_id):
        return f'Пользователь с tid: {tid} уже существует в организации {or_id}'

    file_already_exist = "Файл уже до этого был в базе данных",
    inspection_already_exist = "Этот осмотр уже существует в базе данных",

    # Not found
    user_not_found = 'Пользователь не найден',
    patient_not_found = 'Пациент не найден',
    doctor_not_found = 'Доктора не существует',
    doctors_not_found = 'Доктора не существует',
    person_not_found = "Персона не найдена",
    organization_users_not_found = "В организации не было найдено ни одного пользователя",
    file_not_found = 'Файл не найден',
    files_not_found = 'Не нашёл файлы',
    inspection_not_found = 'Осмотр не найден',
    inspections_not_found = "Нет осмотров удовлетворяющих входным данным",
    risk_not_found = 'Риски пациента не найдены',
    recs_not_found = 'Рекомендации пациента не найдены',
    parent_zone_not_found = 'Пилотная зона не найдена',
    child_zone_not_found = 'Объекты пилотной зоны не найдены',
    organization_not_found = 'Организация не найдена',
    organizations_not_found = "В базе нет ни одной оргназиации",
    schedule_not_found = "Расписание не найдено",
    avatar_not_found = "Аватарка пользователя не найдена",
    inspection_scheme_not_found = "Схема осмотра не найдена",
    roles_scheme_not_found = "Схемы ролей не найдены",

    # Attach
    not_attached = 'Пользователь не прикреплён',
    patient_already_attached = 'Пациент уже прикреплен',
    doctor_already_attached = 'Доктор уже прикреплен',
    employee_already_attached = 'employee already attached to organization',
    user_is_attached_to_organization = "Пользователь прикреплен к организации",
    user_is_detached_from_organization = "Пользователь не прикреплён к организации",
    doctor_to_supervisor_attached = "Доктор прикреплён к губернатору",
    doctor_from_supervisor_detach = "Доктор откреплён от губернатора",
    patient_to_doctor_attached = "Пациент прикреплён к доктору",
    patient_from_doctor_detach = "Пациент откреплён от доктора",

    # Incorrect data
    incorrect_pass = 'Неправильный пароль',
    bad_json = "Не удалось распарсить JSON строчку",
    bad_data = "Не удалось распарсить DATA строчку"
    inspection_type_error = lambda x: f"Типа осмотра: {x} нет в системе"
    incorrect_set_of_fields_for = lambda x: f"Неправильный набор данных для создания {x}"
    ext = 'Неверное расширение файла',
    bad_inspection_datetime = "В переданных данных одно из полей datetime_start или datetime_end имеет плохой формат",
    bad_doctor_search_params = "Недостаточно данных для нахождения или добавления доктора"
    bad_make_schedule_data = "Переданные данные имеют неправильный формат для создания расписания",
    bad_set_schedule_data = "Переданные данные имеют неправильный формат для установки расписания",
    bad_inspection_search_params = "Переданные данные для поиска осмотров имеют неверный формат",
    bad_format_to_get_stats_on_inspections = "Какие-то данные имеют не корректный формат",
    bad_get_condition_data = "Не могу получить условие по типу осмотра",
    not_supported_graph_type = "Данный тип графика не поддерживается",
    empty_organization_hash_or_id = "Отсутствует id или hash организации в hash_map"
    bad_update_user = "Не обновился Юзер"
    bad_update_role = "Не обновилась Роль"
    bad_update_employee = "Не обновился Работник"

    # TMT
    empty_tmt = "Данные TMT пусты",
    insufficient_tmt_data = "Недостаточно данных для сохранения осмотра по TMT"
    tmt_dont_stop = "TMT браслет не с остановил съём данных"
    tmt_dont_saved = "TMT осмотр не сохранился"
    tmt_saved = "TMT осмотр сохранился"

    # Authorization & Tokens
    user_unauthorized = 'Неавторизован',
    not_access = 'Нет допуска',
    tokens_msg = 'Токен не создан или нет сессии, Необходимо авторизоваться',

    # Success
    result_added = "Добавлен результат осмотра",
    schedule_created = "Расписание создано",
    schedule_setted = "Расписание установлено",
    Hash = 'Все данные о пациента были заполнены',

    @staticmethod
    def user_updated(user_id):
        return f"Юзер {user_id} успешно обновился"

    @staticmethod
    def user_deleted(user_id):
        return f"Юзер {user_id} успешно удалён"

    # Errors
    bad_redis_save = "Данные не записались в Redis",
    signal = "Слишком шумный сигнал",
    error_on_update_schedule = "Во время обновления расписания произошла ошибка",
    towns = 'Отсутствие пилотных зон',


class ServiceMessages:
    english = English_mgs
    russian = Russian_mgs
    @classmethod
    def language(cls, lang: str) -> Type[English_mgs] :
        if lang == "ru":
            return cls.russian
        else:
            return cls.english
