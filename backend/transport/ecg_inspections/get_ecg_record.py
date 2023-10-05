from math import ceil
from app import app
from flask import request
from flask_api import status

from ui import user_access, get_file, eval_quality

from pkg import process_ecg_file, filter_ecg_signal
from pkg.webapi import parse_json_from_request, create_response, ServiceMessages


@app.route("/v2/inspections/get/ecg_record/<inspection_id>", methods=["POST"])
@user_access(["supervisor", "administrator", "doctor"])
def get_ecg_record(inspection_id):
    """
    Функция для получения и отрисовки записи экг

    :param: id: id of inspection
    :type: int

    :return: Response to front (status, message, data)
    :rtype: dict
    """

    (request_body, err) = parse_json_from_request(request)
    if err:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST, message=getattr(ServiceMessages.language("en"), err, "error")
        )
        return response

    page = request_body["current_page"]
    points = request_body["points"]
    lowpass = request_body.get("lowpass", 35)
    is_isoline = request_body.get("isoline", False)

    (file, err) = get_file(hash_map={"inspection_id": inspection_id})
    if err:
        response = create_response(
            status=status.HTTP_404_NOT_FOUND, message=getattr(ServiceMessages.language("en"), err, "error")
        )
        return response

    data = process_ecg_file(file, True)

    raw_data, acceptable, meta_info = eval_quality(data, True, inspection_id)
    if not acceptable:
        response = create_response(status=status.HTTP_406_NOT_ACCEPTABLE, message=ServiceMessages.language("en").signal)
        return response

    total_r = filter_ecg_signal(lowpass, meta_info["frequency"], is_isoline, raw_data)
    all_pages = ceil(total_r.shape[0] / points)
    result = {
        "meta_info": meta_info,
        "data": total_r.tolist()[page * points : (page + 1) * points],
        "all_pages": all_pages,
    }

    response = create_response(status=status.HTTP_200_OK, message="ok", data=result)

    return response
