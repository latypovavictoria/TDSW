from typing import Any
from flask import Request


def parse_json_from_request(request: Request) -> tuple[dict[str, Any], str]:
    """
    Parses JSON data from a Flask request object.

    Args:
        request (flask.Request): The Flask request object.

    Returns:
        tuple[dict[str, Any], None|str]: 
        A tuple containing the parsed data (if successful) and an error message (if unsuccessful).

    Raises:
        N/A
    """
    try:
        parsed_data = request.get_json(force=True)
    except Exception:
        parsed_data = None

    if parsed_data is None:
        parsed_data = dict(request.args)

    if parsed_data is None:
        return ({"err": "JSON Parse Error"}, "bad_json")

    return (parsed_data, None)
