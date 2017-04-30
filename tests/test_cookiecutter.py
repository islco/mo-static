from .base import MoStaticTestCase


class TestCookiecutter(MoStaticTestCase):
    def test_all(self):
        paths = self.generate_project()

        print(paths)
