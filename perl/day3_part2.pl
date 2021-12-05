use Modern::Perl;
use ARGV::OrDATA;

my @all = map { chomp; $_ } <>;
# say join "\n", @all;
my $oxystr = algo(1, @all);  # Oxy prefers 1 ("most common")
# say "------CO2 ------";
my $co2str = algo(0, @all);  # CO2 prefers 0 ("least common")
my $oxy = oct("0b" . $oxystr);
my $co2 = oct("0b" . $co2str);
my $final = $oxy * $co2;
print <<EOT;
oxy: $oxystr
CO2: $co2str
Part 2: $oxy * $co2 = $final
EOT

sub algo {
  my ($prefer, @these) = @_;
  foreach my $i (0 .. length($these[0]) - 1) {
    my $mc = most_common_at_pos($i, @these);
    unless ($prefer) {
      # We're doing CO2, so invert, because we actually want least common
      if ($mc eq "1") {
        $mc = 0;
      } elsif ($mc eq "0") {
        $mc = 1;
      }
    }
    @these = reduce($i, $prefer, $mc, @these);
    if (scalar(@these) == 1) {
      return $these[0];
    }
  }
}

sub most_common_at_pos {
  my ($pos, @these) = @_;
  my $total;
  foreach my $r (@these) {
    my @this = split //, $r;
    $total += $this[$pos];
  }
  if ($total > scalar(@these) / 2) { return 1; }
  if ($total < scalar(@these) / 2) { return 0; }
  return "X";  # It's a tie.
}

sub reduce {
  my ($pos, $prefer, $val, @these) = @_;
  if ($val eq "X") {
    # It was a tie. Reduce based on preference (oxy vs. CO2)
    return reduce($pos, $prefer, $prefer, @these);
  }
  my @rval;
  foreach my $r (@these) {
    my @this = split //, $r;
    if ($this[$pos] == $val) {
      push @rval, $r;
    }
  }
  # say "After reduce($pos):\n" . join "\n", @rval;
  return @rval;
}


__DATA__
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
