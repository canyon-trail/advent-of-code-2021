use strict;
use warnings;
use Test::More;
use lib ".";
use Day2;

my @fixtures = (
    "forward 5",
    "down 5",
    "forward 8",
    "up 3",
    "down 8",
    "forward 2",
);
is(Day2::part1(@fixtures), 150, "part1");
is(Day2::part2(@fixtures), 900, "part2");
done_testing();

