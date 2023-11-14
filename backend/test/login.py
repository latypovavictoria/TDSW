from dataclasses import dataclass


@dataclass
class Login:
    def login(self, name: str) -> str:
        return name

    def insert_to_file(self, name: str) -> bool:
        temp_name = self.login(name)
        with open("test.txt", 'a+') as file:
            file.write(temp_name)
        return True

    def register(self, name: str) -> bool:
        with open("test.txt", "r") as file:
            temp_data = file.readline()
            if name in temp_data:
                print("Choose another name")
                return False
            else:
                return True
