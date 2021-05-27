class Quiz {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if (contestantCountRef.exists()) {
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play() {
  
    question.hide();
    background("white");

    textSize(30);
    fill("maroon");
    text("Result of the Game", 240, 230);

    Contestant.getContestantInfo();

    if (allContestants !== undefined) {

      var display_position = 280;

      textSize(20);
      fill("black")
      text("NOTE: Contestant who answer correct are highlighted in green colour !",180,265);

      for (var plr in allContestants) {
        var correctAns = "1";

        if (correctAns === allContestants[plr].answer) {
           fill("green");
        }else{
          fill("red");
        }
        display_position+=20;
        textSize(15);
        text(allContestants[plr].name + ": " + allContestants[plr].answer, 280,display_position)

      }

    }
    

  }
}