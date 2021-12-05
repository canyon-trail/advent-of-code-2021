package Day4Board;
use Modern::Perl;
use Moose;

has 'grid'  => (is => 'rw', isa => 'HashRef', default => sub {{}});
has 'max_x' => (is => 'rw', isa => 'Num');

sub load {
  my ($self, @rows) = @_;
  my $y = 0;
  foreach my $r (@rows) {
    $r =~ s/^ +//;
    my $x = 0;
    foreach my $n (split / +/, $r) {
      $self->grid->{$x}->{$y}->{num} = $n;
      $x++;
    }
    $y++;
  }
  $self->max_x(scalar(keys %{$self->grid->{0}}) - 1);
  # use Data::Dumper;
  # warn Dumper($self->grid);
  return $self;
}

sub mark {
  my ($self, $n) = @_;
  for (my $x = 0; $x <= $self->max_x; $x++) {
    for (my $y = 0; $y <= $self->max_x; $y++) {
      if ($self->grid->{$x}->{$y}->{num} == $n) {
        $self->grid->{$x}->{$y}->{marked} = 1;
      }
    }
  }
}

sub winner {
  my ($self) = @_;
  my $board_width = scalar(keys %{$self->grid->{0}}) - 1;
  for (my $x = 0; $x <= $self->max_x; $x++) {
    my $check;
    for (my $y = 0; $y <= $self->max_x; $y++) {
      $check .= $self->grid->{$x}->{$y}->{marked} // 0;
    }
    # say "checking $self column $x = $check";
    unless ($check =~ /0/) {
      return 1;
    }
  }
  for (my $y = 0; $y <= $self->max_x; $y++) {
    my $check;
    for (my $x = 0; $x <= $self->max_x; $x++) {
      $check .= $self->grid->{$x}->{$y}->{marked} // 0;
    }
    # say "checking $self row    $y = $check";
    unless ($check =~ /0/) {
      return 1;
    }
  }
  return 0;
}

sub unmarked_sum {
  my ($self) = @_;
  my $rval;
  for (my $x = 0; $x <= $self->max_x; $x++) {
    for (my $y = 0; $y <= $self->max_x; $y++) {
      my $marked = $self->grid->{$x}->{$y}->{marked};
      my $num =    $self->grid->{$x}->{$y}->{num};
      unless ($marked) {
        $rval += $num;
      }
    }
  }
  return $rval;
}

1;
