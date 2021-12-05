use 5.34.0;
use strict;
use warnings;
use lib ".";
use Day2;

my @in;
open my $in, "<", "day2.txt";
while (<$in>) {
  chomp;
  push @in, $_;
}
say "Part 1: " . Day2::part1(@in);
say "Part 2: " . Day2::part2(@in);


