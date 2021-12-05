package Day2;

use 5.34.0;
use strict;
use warnings;
no warnings 'experimental';

sub part1 {
  my ($pos, $depth);
  foreach my $in (@_) {
    my ($cmd, $qty) = split / /, $in;
    for ($cmd) {
      when (/forward/) { $pos   += $qty }
      when (/down/)    { $depth += $qty }
      when (/up/)      { $depth -= $qty }
      default          { die "uhhh... what does '$cmd' mean?" }
    }
  }
  return $pos * $depth;
}

sub part2 {
  my ($aim, $pos, $depth) = (0,0,0);
  foreach my $in (@_) {
    my ($cmd, $qty) = split / /, $in;
    for ($cmd) {
      when (/forward/) { $pos += $qty, $depth += $aim * $qty }
      when (/down/)    { $aim += $qty }
      when (/up/)      { $aim -= $qty }
      default          { die "uhhh... what does '$cmd' mean?" }
    }
  }
  return $pos * $depth;
}

1;

