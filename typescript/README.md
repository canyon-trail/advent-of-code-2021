# Typescript Template

This is a quick start template for typescript testing. See `day1.test.ts` for a simple example test.

## Installing and Running

You will need a working [Node Installation](https://nodejs.org/en/download/) in order to run this code. Afterwards, run this command:

```
npm install
```

## Project Layout & Tutorial

This project template has pairs of files, for instance, `day1.ts` and `day1.test.ts`.
Running `day1.ts` can be done via `npm start -- 1`; this will produce the solution
for the day 1 puzzle. This requires that `day1.ts` exports functions called `part1` and `part2` that accept strings (the entire puzzle input) as the only parameter.
Files here assume that puzzle input exists in files named `dayN.txt`. These `.txt` files are gitignored, since they'll be different for each person.

You can also run tests using either `npm run test` or `npm run test:watch`:

```
> npm run test

> test
> jest

  console.log
    2 + 2 = 4

      at Object.<anonymous> (example.ts:5:9)

 PASS  ./example.test.ts
  √ example 2 + 2 should equal 4 (2 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.668 s, estimated 1 s
Ran all test suites.
>
```
