# Python Template

This is a quick start template for python testing. See `exampletests.py` for a simple example test.

## Installing and Running

You will need a working [Python installation](https://www.python.org/downloads/) in order to run this code. Afterwards, run this command:
```
pip install pytest pytest-watch
```

This will install the following utilities:

* `pytest` - runs tests once
* `ptw` - runs tests in "watch mode"; i.e. re-runs tests when any relevant `*.py` file changes. Stop `ptw` using `CTRL-C`.

If you'd rather not install Python and would rather run it out of a Docker container, see the instructions below.

## Project Layout & Tutorial

This project template has two files, `example.py` and `example_test.py`. The `example.py` file has a simple function in it that adds two numbers. You can see it in action by using the command `python example.py`:
```
> python example.py
2 + 2 = 4
```

You can also run the tests using either `pytest` or `ptw`:
```
> pytest
================== test session starts ==================
platform linux -- Python 3.7.4, pytest-6.2.5, py-1.11.0, pluggy-1.0.0
rootdir: /home
collected 1 item

example_test.py .                                  [100%]

=================== 1 passed in 0.10s ===================
>
```

Try experimenting with the test in `example_test.py` and changing `self.assertEqual(result, 4)` to `self.assertEqual(result, 5)` to get familiar with what test failures look like:

```
> pytest
================== test session starts ===================
platform linux -- Python 3.7.4, pytest-6.2.5, py-1.11.0, pluggy-1.0.0
rootdir: /home
collected 1 item

example_test.py F                                  [100%]

======================== FAILURES ========================
_______________ ExampleTests.test_example ________________

self = <example_test.ExampleTests testMethod=test_example>

    def test_example(self):
        result = example(2, 2)

>       self.assertEqual(result, 5)
E       AssertionError: 4 != 5

example_test.py:8: AssertionError
================ short test summary info =================
FAILED example_test.py::ExampleTests::test_example - AssertionError: 4 != 5
=================== 1 failed in 0.11s ====================
>
```


## Using Docker

This project has configuration to run in a Docker container. This part is **entirely optional**, but handy if you'd rather not install Python locally. To do this, you will need a working [Docker installation](https://docs.docker.com/get-docker/). Use either `runshell.ps1` (for Powershell) or `runshell.sh` (for bash or bash-like) to start a docker container and open a command prompt. The `pytest` and `ptw` packages will already be installed and available.
