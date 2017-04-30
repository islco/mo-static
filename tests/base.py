# https://github.com/wldcordeiro/cookiecutter-django-essentials/blob/a42ac5528d0edeb2bf20f5626494f958986bb045/tests/base.py
import os
import shutil
import unittest

from cookiecutter.main import cookiecutter


class MoStaticTestCase(unittest.TestCase):
    root_dir = os.path.dirname(os.path.dirname(__file__))
    ctx = {}

    def generate_project(self, extra_context=None):
        ctx = {
            "project_name": "test-mo-static",
            "repo_name": "test-mo-static",
            "author_name": "test-ISL",
            "email": "dev+mo-static-tests@isl.co",
            "description": "Test project for mo-static"
        }

        if extra_context:
            assert isinstance(extra_context, dict)
            ctx.update(extra_context)

        self.ctx = ctx
        self.destpath = os.path.join(self.root_dir, self.ctx.get('repo_name'))

        cookiecutter(template='./', checkout=None, no_input=True, extra_context=ctx)

        paths = [os.path.join(dirpath, file_path)
                 for dirpath, subdirs, files in os.walk(self.destpath)
                 for file_path in files]
        return paths

    def clean(self):
        if os.path.exists(self.destpath):
            shutil.rmtree(self.destpath)
        os.chdir(self.root_dir)

    def tearDown(self):
        pass
        self.clean()
