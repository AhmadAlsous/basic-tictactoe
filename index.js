$(function () {
  let level = 0;
  let game = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  let canClick = false;
  let isDone = false;
  $(document).one("keypress", nextTurn);
  $(".btn").click(function () {
    if (canClick && $(this).find("p").attr("class") !== "clicked") {
      let attribute = this.className;
      let row = attribute.slice(5, 6);
      let col = attribute.slice(8, 9);
      let num = player(level);
      game[row][col] = char(num);
      $(this).find("p").addClass("clicked");
      $(this).find("p").text(char(num));
      // console.log(level + " " + showWinner());
      if (level < 5) {
        nextTurn();
      } else if (level >= 5 && level < 9) {
        if (showWinner() == 0) nextTurn();
        else {
          $("h1").text("Player " + showWinner() + " Wins!");
          playAgain();
        }
      } else {
        if (showWinner() == 0) {
          $("h1").text("Tie.");
          playAgain();
        } else {
          $("h1").text("Player " + showWinner() + " Wins!");
          playAgain();
        }
      }
    }
  });
  function nextTurn() {
    $("h2").fadeOut();
    canClick = true;
    level++;
    $("h1").text("Player " + player(level) + " Turn");
  }

  function playAgain() {
    $("h2").text("press any key to play again");
    $("h2").fadeIn();
    level = 0;
    game = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    canClick = false;
    isDone = false;
    $(document).one("keypress", function () {
      $(".btn").find("p").removeClass("clicked");
      nextTurn();
    });
  }

  function player(level) {
    if (level % 2 === 0) return 2;
    return 1;
  }
  function char(player) {
    if (player == 1) return "X";
    return "O";
  }

  function showWinner() {
    let winner = 0;
    for (let i = 0; i < 3; i++) {
      if (
        game[i][0] == game[i][1] &&
        game[i][0] == game[i][2] &&
        game[i][0] != 0
      )
        winner = player(level);
      if (
        game[0][i] == game[1][i] &&
        game[0][i] == game[2][i] &&
        game[0][i] != 0
      )
        winner = player(level);
    }
    if (game[0][0] == game[1][1] && game[0][0] == game[2][2] && game[0][0] != 0)
      winner = player(level);
    if (game[0][2] == game[1][1] && game[0][2] == game[2][0] && game[0][2] != 0)
      winner = player(level);
    return winner;
  }
});
