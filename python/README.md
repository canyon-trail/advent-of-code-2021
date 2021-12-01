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

## Project Layout

This project template has pairs of files, for instance, `day1.py` and `day1_test.py`. Running `day1.py` via `python day1.py` will produce the solution for the day 1 puzzle.
Files here assume that puzzle input exists in files named `dayN.txt`. These `.txt` files are gitignored, since they'll be different for each person.
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

## Using Docker

This project has configuration to run in a Docker container. This part is **entirely optional**, but handy if you'd rather not install Python locally. To do this, you will need a working [Docker installation](https://docs.docker.com/get-docker/). Use either `runshell.ps1` (for Powershell) or `runshell.sh` (for bash or bash-like) to start a docker container and open a command prompt. The `pytest` and `ptw` packages will already be installed and available.
