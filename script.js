const generateNum = function (word) {
  //length applies to array and string, so no worries
  const randNum = Math.floor(Math.random() * word.length);
  console.log(randNum);
  return randNum;
};
let data = [
  {
    0: {
      arr: [
        "apple",
        "orange",
        "grapes",
        "pomegranate",
        "pineapple",
        "mango",
        "cherry",
        "papaya",
        "watermelon",
        "blueberry",
        "strawberry",
      ],
      hint: "A Fruit",
    },
    1: {
      arr: [
        "Afghanistan",
        "Argentina",
        "Australia",
        "Azerbaijan",
        "Bahrain",
        "Bangladesh",
        "Belgium",
        "Bhutan",
        "Chile",
        "China",
        "Colombia",
        "Czech Republic",
        "Denmark",
        "Egypt",
        "Ethiopia",
        "Finland",
        "France",
        "Georgia",
        "Germany",
        "Hong Kong",
        ,
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Italy",
        "Japan",
        "Jordan",
        "Kenya",
        "Kuwait",
        "Libya",
        "Madagascar",
        "Malaysia",
        "Maldives",
        "Mexico",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Palestine",
        "Poland",
        "Portugal",
        "Qatar",
        "Russia",
        "Saudi Arabia",
        "Singapore",
        "Spain",
        "Sri Lanka",
        "Taiwan",
        "Turkey",
        "Ukraine",
        "Uzbekistan",
        "Vietnam",
        "Yemen",
        "Zimbabwe",
      ],
      hint: "A country",
    },
    2: {
      arr: [
        "umbrella",
        "phone",
        "laptop",
        "computer",
        "paper",
        "mixi",
        "pen",
        "scissors",
        "fan",
        "towel",
        "comb",
        "wipes",
        "bangle",
        "earrings",
        "necklace",
        "hair",
        "bed",
        "table",
        "chair",
      ],
      hint: "You can find me when you just look around your house",
    },
  },
];
let score = 0;
$(".start").click(() => {
  $(".welcome").hide();
  startGame();
});
function startGame() {
  $(".game-area").show();
  $(".hint p").hide();
  console.log("GAME START");

  let selectedCat = data[0][generateNum(Object.keys(data[0]))];
  console.log(selectedCat);
  let wordList = selectedCat.arr;
  let hint = selectedCat.hint;
  $(".hint p").text(hint);
  console.log(wordList);
  console.log(hint);
  $(".hint").click(() => {
    $(".hint p").show();
  });
  // let wordList=["apple","orange","grapes","pomegranate","pineapple","mango","cherry",  "papaya","watermelon","blueberry","strawberry"];
  but = $(".keys");
  console.log(but);

  $(".score h4").html('<i class="fa-solid fa-trophy">' + score + "</i>");

  var temp;
  var attempt = 1;
  var word = wordList[generateNum(wordList)].toLowerCase().replaceAll(" ", "");
  console.log(word);
  var tWord = word;
  for (let i = 0; i < tWord.length / 2 + 1; i++) {
    temp = word.replace(word[generateNum(word)], "_");
    word = temp;
  }
  console.log(temp);

  $(".word").text(temp);
  //temp="strawberry"

  $(".keys").on("click", function (e) {
    let letter = e.target.textContent.toLowerCase();
    console.log(letter);
    let ind = tWord.indexOf(letter);
    console.log("inside callback");
    console.log(tWord + "tWord");
    console.log(temp + "temp");
    console.log(word + "word");
    let indices = [];

    console.log("INDICES" + indices);

    for (let i = 0; i < tWord.length; i++) {
      if (ind > -1) {
        indices.push(ind);
        ind = tWord.indexOf(letter, ind + 1);
      }
      if (ind == -1) {
        break;
      }
    }
    console.log("after for INDICES" + indices);
    if (indices.length > 0) {
      console.log("IF");

      $(e.target).removeClass("btn-custom");
      $(e.target).addClass("btn-success");
      $(e.target).prop("disabled", true);

      console.log(e.target);
      console.log(indices);

      let arr = temp.split("");
      console.log("TEMP" + temp);
      console.log("arr" + arr);
      for (let j = 0; j < indices.length; j++) arr[indices[j]] = letter;
      var result = arr.join("");
      if (result != temp) {
        score += 10;
        $(".score h4").html('<i class="fa-solid fa-trophy">' + score + "</i>");
      }

      console.log(result);
      $(".word").text(result);
      //tWord=result;
      temp = result;
      console.log("tword" + tWord);
    } else if (indices.length == 0) {
      console.log("ELSE");
      $(e.target).removeClass("btn-custom");
      $(e.target).addClass("btn-danger");
      score -= 5;
      $(".score h4").html('<i class="fa-solid fa-trophy">' + score + "</i>");
      $(e.target).prop("disabled", true);
      if (attempt > 6) {
        $(".msg h2").text("GAME OVER");
        score = 0;
        $(".msg").removeClass("win");
        $(".msg").addClass("fail");

        $(".msg").show();
        $(".overlay").show();
        $("img").attr("src", "./images/last.jpg");
      } else {
        $("img").attr("src", "./images/" + attempt + ".jpg");
        attempt++;
      }
    }
    console.log("result" + result);

    if (result && !result.includes("_")) {
      console.log("Stop");

      // $(".keys").prop("disabled", true);
      $(".msg h2").text("YOU WON");
      $(".msg").removeClass("fail");
      $(".msg").addClass("win");

      triggerConfetti();
      setTimeout(() => {
        $(".msg").show();
      }, 500);
      $(".overlay").show();
    }
  });
}
$(".rst").click(function () {
  $(".keys").prop("disabled", false);
  $(".msg").hide();
  $(".overlay").hide();
  $(".keys").removeClass("btn-danger");
  $(".keys").removeClass("btn-success");
  $(".keys").addClass("btn-custom");
  $("img").attr("src", "./images/0.jpg");
  $(".keys").off("click");
  startGame();
});
function triggerConfetti() {
  confetti({
    particleCount: 350,
    spread: 100,
    origin: { y: 0.6 },
    decay: 0.8,
  });
}
