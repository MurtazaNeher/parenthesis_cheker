const inputBox = document.querySelector("#input-box");
const checkBtn = document.querySelector("#check-btn");
const outputBox = document.querySelector("#output-result");

let arr = [];
let topPointer = 0;
let stack = [];
let currentPushed;
let errorIndex;
let outputShown = false;

outputBox.style.display = "none";

function checkClickHandler() {
    let inputStr = inputBox.value;
    topPointer = -1;
    stack = [];
    arr = inputStr;

    checkParenthesis();
}

function checkParenthesis() {
    outputShown = false;
    topPointer = -1;

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] == "{" || arr[i] == "[" || arr[i] == "(" || arr[i] == "<") {
            stack.push(arr[i]);
            currentPushed = arr[i];
            topPointer++;
        } else if (arr[i] == "}" || arr[i] == "]" || arr[i] == ")" || arr[i] == ">") {

            if (
                (arr[i] == "}" && stack[topPointer] == "{") ||
                (arr[i] == "]" && stack[topPointer] == "[") ||
                (arr[i] == ")" && stack[topPointer] == "(") ||
                (arr[i] == ">" && stack[topPointer] == "<")) {

                stack.pop();
                topPointer--;

            } else {

                showOutput(false, `An error has been caught!!!  Closing parenthesis : " ${arr[i]} " appears at position : ${i+1} , before an opening parenthesis.`);
            }
        }
        errorIndex = i + 1;
    }

    if (!outputShown) {
        if (topPointer == -1) {
            showOutput(true);
        } else if (topPointer > -1) {
            showOutput(false, `An error has been caught!!! Closing parenthesis are missing. At position " ${errorIndex} " , " ${stack[topPointer]} " doesn't has closing parenthesis !!!`)
        }
    }
}


function showOutput(bool, mssg = "No errors found . You have given a perfect input :) ") {
    outputShown = true;

    if (bool) {
        outputBox.style.transition = "0.5s";
        outputBox.style.display = "block";
        outputBox.style.backgroundColor = "#DFF2BF";
        outputBox.style.color = "#4F8A10";

        outputBox.innerHTML = mssg;
    } else {
        outputBox.style.display = "block";
        outputBox.style.backgroundColor = " #FFD2D2";
        outputBox.style.color = "#D8000C";

        outputBox.innerHTML = mssg;

    }
}

checkBtn.addEventListener("click", checkClickHandler);