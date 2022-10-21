let roleLay = document.querySelector(".lay");
let roleBtn = document.querySelector(".rules");
let closeLay = document.querySelector(".head img");

let section = document.querySelectorAll("section");
//open roles layer
roleBtn.addEventListener("click", () => {
    roleLay.classList.add("active");
});
//close roles layer
closeLay.onclick = () => {
    roleLay.classList.remove("active");
};

////////////////////!/

////////////////////!/
//count the result
let counter = document.querySelector(".score p");

//select items
let items = document.querySelectorAll(".step-1 .box");
let choice = document.querySelector(".you .box");
let you = document.querySelector(".you");
let houseChoice = document.querySelector(".house .box");
let house = document.querySelector(".house");
let houseChoiceText = document.querySelector(".house h2");
let step1 = document.querySelector(".step-1");
let step2 = document.querySelector(".step-2");
let step2Box = document.querySelector(".step-2 .box");
let step3 = document.querySelector(".step-3");
let step4 = document.querySelector(".step-4");

let reset = document.querySelector(".reset");
let resetBtn = document.querySelector(".reset button");
let resetText = document.querySelector(".reset h2");
houseChoice.style.visibility = "hidden";
houseChoiceText.style.visibility = "hidden";

let classes = ["paper", "scissors", "rock"];

items.forEach((item) => {
    item.addEventListener("click", () => {
        let Generate = Math.floor(Math.random() * classes.length);

        //let get data of item
        const data = item.firstElementChild;
        //get class name
        let className = data.getAttribute("alt");

        choice.classList.add(`${className}`);
        // step2.classList.add("added");
        choice.appendChild(data);
        step1.style.display = "none";
        step2.style.display = "flex";
        let result;

        function theResult(result) {
            if (className === classes[Generate]) {
                result = "Draw";
                return result;
            } else if (className === "rock" && classes[Generate] === "scissors") {
                result = "you win";
                return result;
            } else if (className === "rock" && classes[Generate] === "paper") {
                result = "you lose";
                return result;
            } else if (className === "scissors" && classes[Generate] === "rock") {
                result = "you lose";
                return result;
            } else if (className === "scissors" && classes[Generate] === "paper") {
                result = "you win";
                return result;
            } else if (className === "paper" && classes[Generate] === "scissors") {
                result = "you lose";
                return result;
            } else if (className === "paper" && classes[Generate] === "rock") {
                result = "you win";
                return result;
            }
        }
        setTimeout(() => {
            houseChoice.classList.add(classes[Generate]);
            houseChoice.innerHTML += `<img src="images/icon-${classes[Generate]}.svg" alt="${classes[Generate]}" width="60" />`;
            houseChoice.style.visibility = "visible";
            houseChoiceText.style.visibility = "visible";
            reset.style.cssText = "display: flex;";
            let res = theResult(result);

            resetText.textContent = res;
            if (res === "you lose") {
                resetBtn.style.cssText = "color: red";
            }
            if (res === "you win") {
                you.classList.add("win");

                let mark;
                if (localStorage.getItem("marks") === null) {
                    mark = [];
                } else {
                    mark = JSON.parse(localStorage.getItem("marks"));
                }
                mark.push(1);
                localStorage.setItem("marks", JSON.stringify(mark));
            } else if (res === "you lose") {
                house.classList.add("win");

                let lose;
                if (localStorage.getItem("lose") === null) {
                    lose = [];
                } else {
                    lose = JSON.parse(localStorage.getItem("lose"));
                }
                lose.push(1);
                localStorage.setItem("lose", JSON.stringify(lose));
            }
            resetBtn.onclick = () => {
                window.location.reload();
            };
        }, 200);
    });
});

let newGame = document.querySelector(".newGame");
let message = document.querySelector(".newGame h3");
let start = document.querySelector("#yes");
let end = document.querySelector("#no");
let win;
let lose;
if (
    localStorage.getItem("marks") === null ||
    localStorage.getItem("lose") === null
) {
    win = [];
    lose = [];
} else {
    win = JSON.parse(localStorage.getItem("marks"));
    lose = JSON.parse(localStorage.getItem("lose"));
    counter.innerHTML = Number(win.length) + " : " + Number(lose.length);
}
if (Number(win.length) >= 5) {
    newGame.style.cssText = "top: 0;left: 0; width: 100%;height: 100%;opacity: 1";
    message.innerText = "Congratulations! You win!";
    message.style.cssText = " color: rgb(47, 192, 25)";
} else if (lose.length >= 5) {
    newGame.style.cssText = "top: 0;left: 0; width: 100%;height: 100%;opacity: 1";
    message.innerText = "Sorry! You lose!";
    message.style.cssText = "color: rgb(222, 67, 32)";
}
start.onclick = () => {
    window.location.reload();
    localStorage.clear("marks");
    localStorage.clear("lose");
};
end.onclick = () => {
    localStorage.clear("marks");
    localStorage.clear("lose");
    window.close();
};