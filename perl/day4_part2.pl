use Modern::Perl;
use ARGV::OrDATA;
use lib ".";
use Day4Board;

my @nums = split /,/, <>;
my @boards;
my @in_rows;
while (<>) {
  chomp;
  if (/\d/) {
    push @in_rows, $_;
  } elsif (@in_rows) {
    push @boards, Day4Board->new->load(@in_rows);
    @in_rows = ();
  }
}
push @boards, Day4Board->new->load(@in_rows);
say "Loaded " . scalar(@boards) . " Boards";

my %boards = map { $_ => $_ } @boards;
my $loser_pick;
my $loser_board;
foreach my $n (@nums) {
  if (scalar(keys %boards) == 0) {
    say "Loser board was $loser_board";
    printf("%s * %s = %s\n", $b->unmarked_sum, $loser_pick, $b->unmarked_sum * $loser_pick);
    exit;
  }
  # say "Picked $n";
  foreach my $b_str (keys %boards) {
    $b = $boards{$b_str};
    $b->mark($n);
    if ($b->winner) {
      # say "Board $b won, discarding";
      $loser_board = $b;
      delete $boards{$b_str};
    }
  }
  $loser_pick = $n;
}


__DATA__
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
