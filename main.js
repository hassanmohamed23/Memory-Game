var imagessource = [
  "asp.png", 
  "devops.png",
  "docker.png",
  "git.png",
  "github.png",
  "hadoop.png", 
  "javascript.png",
  "laravel.png", 
  "php.png",
];
var bolcknumber=8;
var yourName=""; 
var Score;
var score=0;
var time =120;
var timeflip = 2;
var timestop;
function savelocalStorage(){
      
      var user = {
          Name: yourName,
          Score: score,
      }
    
      localStorage.setItem("user", JSON.stringify(user));
      //console.log(localStorage.getItem("user"));
  
}
// Select The Start Game Button
document.querySelector(".control-buttons .startgame").onclick = function () {
  shuffleallimgs();
  //console.log("bforchhhh")
  // Prompt Window To Ask For Name
  yourName = prompt("Whats Your Name?"); 
  savelocalStorage();
  // If Name Is Empty
  if (yourName == null || yourName == "") {
    // Set Name To Unknown
    document.querySelector(".name span").innerHTML = "Unknown"; 
    // Name Is Not Empty
  } else {
    // Set Name To Your Name
    document.querySelector(".name span").innerHTML = yourName;
  } 
  // Remove Splash Screen
  document.querySelector(".control-buttons").remove();
   //funcion show 
 
   var tflip =setInterval(() => {
    timeflip--;
     var elements = document.getElementsByClassName("game-block");
     var blocks = Array.from(elements);
    blocks.forEach((elements)=> elements.classList.add('is-flipped'));
    if(timeflip==0)
    {
      blocks.forEach((elements)=> elements.classList.remove('is-flipped'));
      clearInterval(tflip);
    }
    }, 1000);

//function to remaining time

  timestop = setInterval(function()  {
    time--;
    var minute = parseInt(time/60);
    var seconde = parseInt(time % 60);
    document.getElementById("timer").textContent = 
    " Remaining Time :"+minute +":"+String(seconde).padStart(2, '0');

    if(time == 0)
    {
      document.querySelector(".modal-content p").innerHTML =
      "Game Over !<br>"+" "+
      " Sorry "+ yourName +" "+
      "You Did Not Pass This Current Level 🙄<br>So You Have To Do The Best! Go Ahead To Play Again! 💪";
      // Get the modal
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
      location.reload(true);
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        location.reload(true); 
      }
    };
      clearInterval(timestop);
    }
    }, 1000);

};
// when clicking on game level
document.querySelector(".control-buttons .gamelevel").onclick = function () {
  //var parent = document.querySelector(".control-buttons .span .gamelevel .test");
  //console.log("dddddd"+document.querySelectorAll(".control-buttons .span .test .test1").length);
  if (document.getElementsByClassName("test1").length == 0) {
    var sis = document.querySelector(".control-buttons .span .test");
    var easy = document.createElement("div");
    easy.innerHTML = "easy level";
    easy.classList.add("test1", "easy");
    sis.appendChild(easy);
    let median = document.createElement("div");
    median.innerHTML = "median level";
    median.classList.add("test1", "median");
    sis.appendChild(median);
    let hight = document.createElement("div");
    hight.innerHTML = "heigh level";
    hight.classList.add("test1", "high");
    sis.appendChild(hight);
    console.log("trueeeeeeee" + sis);
    makeclickongamelevel();
  }
};
function makeclickongamelevel() { 
  document
    .querySelector(".control-buttons .span .test .easy")
    .addEventListener("click", function () {
      console.log("you select easy level");
      bolcknumber=8;
      makeblock("easy");
    });
  document
    .querySelector(".control-buttons .span .test .median")
    .addEventListener("click", function () {
      console.log("you select easy median");
      bolcknumber = 12;
      makeblock("median");
    });
  document.querySelector(".control-buttons .span .test .high")
    .addEventListener("click", function () {
      // console.log("you select easy high");
      bolcknumber = 16;
        makeblock("high");
    });
    // var y = document.getElementsByClassName("test1");
    // //console.log(y);
    // removeelements(y);
}
// delete levels after click on it
var levels_parent = document.getElementsByClassName("test")[0];
var levels = levels_parent.children;
//levels.onclick= 

function makeblock(level) {
  let parent = document.getElementsByClassName("memory-game-blocks")[0];
  //document.getElementsByClassName("memory-game-blocks")[0].remove();
  //console.log(parent); 
  var x = document.querySelectorAll(".memory-game-blocks .game-block");
  if (level == "easy") {
    removeelements(x);
    for (let i = 0; i < 4; i++) {
      //makeelement(i);
      parent.appendChild(makeelement(i));
      parent.appendChild(makeelement(i));
    }
  } else if (level == "median") {
    removeelements(x);
    for (let i = 0; i < 6; i++) {
      //makeelement(i);
      parent.appendChild(makeelement(i));
      parent.appendChild(makeelement(i));
    }
  } else if (level == "high") {
    console.log("you select high");
    removeelements(x);
    for (let i = 0; i < 8; i++) {
      //makeelement(i);
      parent.appendChild(makeelement(i));
      parent.appendChild(makeelement(i));
    } 
  }
  var y = document.querySelectorAll(".test1");
  removeelements(y);
  //shuffleallimgs();
}
function makeelement(index) { 
    let imgname = imagessource[index].substring(0,imagessource[index].length - 4);
    //console.log(imgname);
    var container = document.createElement("div");
    container.classList.add("game-block");
    container.setAttribute("imagename", imgname);
    var ele1 = document.createElement("div");
    ele1.classList.add("face", "front");
    container.appendChild(ele1);
    var ele2 = document.createElement("div");
    ele2.classList.add("face", "back");
    var ele3 = document.createElement("img");
    ele3.setAttribute("src", "imgs/" + imagessource[index]);
    ele2.appendChild(ele3);
    container.appendChild(ele2);
    //console.log(container);
    return container;
}
function removeelements(x) {
  //var x = document.querySelectorAll(".memory-game-blocks .game-block");
  for (let i = x.length-1; i>=0; i--) {
    x[i].remove();
  }
}
// Effect Duration
let duration = 2000;
 
function shuffleallimgs() {
      // Select Blocks Container
      var blocksContainer = document.querySelector(".memory-game-blocks");
      //console.log("the blocks is"+blocks);
      // Create Array From Game Blocks
      var blocks = Array.from(blocksContainer.children);
      // Create Range Of Keys
      // let orderRange = [...Array(blocks.length).keys()];
      console.log("blocks.length" + blocks.length);
      var orderRange = Array.from(Array(blocks.length).keys());
      //console.log("ffffffffffffff");
      //console.log("before shuffle" + orderRange);
      //orderRange = shuffle(orderRange);
      shuffle(orderRange);
      //console.log("after shuffle" + orderRange);
      // Add Order Css Property To Game Blocks
      blocks.forEach((block, index) => {
            // Add CSS Order Property
            block.style.order = orderRange[index];
            // // Add Click Event
            block.addEventListener("click", function () {
              // // Trigger The Flip Block Function
              console.log("Trigger The Flip Block Function");
              flipBlock(block);
            });
      });
} 

// Flip Block Function
function flipBlock(selectedBlock) {
    // Add Class is-flipped
    selectedBlock.classList.add("is-flipped");
    var elements = document.getElementsByClassName("game-block");
    var blocks = Array.from(elements);
    // Collect All Flipped Cards
    var allFlippedBlocks = blocks.filter((flippedBlock) =>
        flippedBlock.classList.contains("is-flipped")
    );

    // If Theres Two Selected Blocks
    if (allFlippedBlocks.length === 2) {
        // console.log('Two Flipped Blocks Selected');

        // Stop Clicking Function
        stopClicking();

        // Check Matched Block Function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

// Stop Clicking Function
function stopClicking() {
    // Add Class No Clicking on Main Container
    var blocksContainer = document.getElementsByClassName("memory-game-blocks")[0];
    blocksContainer.classList.add("no-clicking"); 
    // Wait Duration
    setTimeout(() => {
        // Remove Class No Clicking After The Duration
        blocksContainer.classList.remove("no-clicking");
    }, duration);
}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector(".tries span");
    Score = document.querySelector('.score span');
//document.getElementsByClassName("game-block")[0].getAttribute("imagename");
    //if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    if (firstBlock.getAttribute("imagename")===secondBlock.getAttribute("imagename")) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
        gamefinshedornot();
        document.getElementById("success").play();
        document.getElementById("success1").play();

        ++score;
        savelocalStorage();
        Score.innerHTML = parseInt(Score.innerHTML) + 1;

    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration);

        document.getElementById("fail").play();
        }
}

// Shuffle Function
function shuffle(array) {
  // Settings Vars
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length By One
    current--;

    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;
  }
  return array;
}
function gamefinshedornot(){
      var elements = document.getElementsByClassName("game-block");
      var gameBlocks = Array.from(elements);
      var allCardsIsMatched = gameBlocks.filter((isMatchedBlock) =>
        isMatchedBlock.classList.contains("has-match")
      );
      console.log("number of bolcknumber" + bolcknumber);
      if (allCardsIsMatched.length === bolcknumber) {
        // Launching The Modal Box Using JS When The Player Flips All Matched Cards
        // alert('Congrats '+yourName+', You Win!')
        let triesElement = document.querySelector(".tries span");
        let numberOfWrongTries = parseInt(triesElement.innerHTML);
        let Scorediv = document.querySelector(".score span");
        let score = parseInt(Scorediv.innerHTML)+1;
        if (yourName == null || yourName == "") {
          document.querySelector(".modal-content p").innerHTML =
            "Congrats, Anonym 👏,Your SCore : "+ score+"  You Won The Game But After " +
            numberOfWrongTries +
            " Wrong Tries.🙄<br>So You Have To Do The Best! Go Ahead To Play Again! 😘";
        } else {
          document.querySelector(".modal-content p").innerHTML =
            "Congrats, " +
            yourName +
            " 👏,Your SCore :"+ score+" , You Won The Game But After " +
            numberOfWrongTries +
            " Wrong Tries.🙄<br>So You Have To Do The Best! Go Ahead To Play Again! 😘";
        }
        // Creating the Modal's Variable
        // Get the modal
        var modal = document.getElementById("myModal");
        // Get the button that opens the modal
        // var btn = document.getElementById("myBtn");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        // When the user clicks on the button, open the modal
        // btn.onclick = function() {
        modal.style.display = "block";
        // }
        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
          modal.style.display = "none";
          location.reload(true);
        };
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
          if (event.target == modal) {
            modal.style.display = "none";
            location.reload(true); 
          }
        };
        document.getElementById("FinalSuccess1").play();

        setTimeout(() => {
          document.getElementById("FinalSuccess2").play();
        }, 2000);
      }
}
