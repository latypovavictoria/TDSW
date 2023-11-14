import unittest
from login import Login


class TestLogin(unittest.TestCase):
    def setUp(self):
        self.login_temp = Login()

    def test_login(self):
        self.assertEqual(self.login_temp.login("Admin"), "Admin")
        self.assertEqual(self.login_temp.login("Admin"), "Admin66666")

    def test_insert_to_file(self):
        self.assertEqual(self.login_temp.insert_to_file("Admin"), True)
        self.assertEqual(self.login_temp.insert_to_file("Admin22"), False)

    def test_register(self):
        self.assertEqual(self.login_temp.register("Admin000"), False)
        self.assertEqual(self.login_temp.register("Admin111"), True)


if __name__ == "__main__":
    unittest.main()
