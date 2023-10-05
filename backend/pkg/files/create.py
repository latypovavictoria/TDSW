import base64
import os


def _create_file(full_path: str):
    try:
        with open(full_path, "x"):
            pass
    except FileExistsError:
        pass


def os_create_file(byte_data: bytes, file_type: str, prefix: str) -> tuple[str, None]:


    encoders = {
        "edf": lambda data: base64.b64decode(data.decode("UTF-8")),
        "mp4": lambda data: data
        }
    f_encoder = encoders.get(file_type, None)
    if f_encoder is None:
        return ("/", f"Not supported format {file_type}")

    f = f_encoder(byte_data)
    file_type = "files/" + file_type
    full_path = file_type + "/" + f"{prefix}.{file_type}"

    try:
        os.mkdir("files")
    except Exception as e:
        return (full_path, e.__str__())

    try:
        os.mkdir(file_type)
    except Exception as e:
        return (full_path, e.__str__())

    _create_file(full_path=full_path)

    with open(f"{full_path}", "wb") as file:
        file.write(f)
        file.close()
    return (full_path, None)
