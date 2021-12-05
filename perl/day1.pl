use 5.34.0;
use strict;
use warnings;

# https://adventofcode.com/2021/day/1

{
  # Part 1
  my ($cnt, $prev);
  open my $in, "<", "day1.txt";
  while (<$in>) {
    chomp;
    my $this = $_;
    $cnt++ if ($prev && $this > $prev);
    $prev = $this;
  }
  say "Part 1: $cnt";
}

{
  # Part 2
  my ($cnt, @all, $prev);
  open my $in, "<", "day1.txt";
  while (<$in>) {
    chomp;
    push @all, $_;
  }
  for (my $i = 0; $i < scalar(@all); $i++) {
    next unless $all[$i+2];
    my $this = $all[$i] + $all[$i+1] + $all[$i+2];
    # say "$all[$i]: $this";
    $cnt++ if ($prev && $this > $prev);
    $prev = $this;
  }
  say "Part 2: $cnt";
}

