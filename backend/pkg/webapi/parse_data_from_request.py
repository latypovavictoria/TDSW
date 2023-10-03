from flask import Request


def parse_data_from_request(request: Request) -> tuple[bytes, str]:
    try:
        parsed_data = request.get_data()
    except Exception as e:
        return (bytes(), "bad_data")

    if parsed_data is None:
        return (bytes(), "bad_data")
    return (parsed_data, None)
