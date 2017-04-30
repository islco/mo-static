from contextlib import contextmanager

import pytest


@pytest.fixture
def context():
    return {
        "project_name": "test-mo-static",
        "repo_name": "test-mo-static",
        "author_name": "test-ISL",
        "email": "dev+mo-static-tests@isl.co",
        "description": "Test project for mo-static"
    }


# utility methods


@contextmanager
def content_of(project, path):
    f = project.join(path)


def generate(cookies, context):
    result = cookies.bake(extra_context=context)
    assert result.exit_code == 0
    assert result.exception is None
    return result


# test methods


def test_mo_static(cookies, context):
    result = generate(cookies, context)
    assert result.project.basename == context['repo_name']
    assert result.project.isdir()
