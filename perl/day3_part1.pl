use Modern::Perl;
use ARGV::OrDATA;

my (%v_tot, $row_cnt);
while (<>) {
  chomp;
  my @row = split //;
  for (my $i = 0; $i < scalar(@row); $i++) {
    $v_tot{$i} += $row[$i];
  }
  $row_cnt++;
}
my ($gstr, $estr);
foreach my $k (sort { $a <=> $b } keys %v_tot) {
  if ($v_tot{$k} >= $row_cnt / 2) {
    $gstr .= "1";
    $estr .= "0";
  } else {
    $gstr .= "0";
    $estr .= "1";
  }
}
say "gamma:   $gstr";
say "epsilon: $estr";
my $gamma =   oct("0b" . $gstr);
my $epsilon = oct("0b" . $estr);
printf("Part 1: %s * %s = %s\n", $gamma, $epsilon, $gamma * $epsilon);

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
