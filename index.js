#!/usr/bin/env node

import chalkAnimation from "chalk-animation";
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;
let score = 0;

const quizQuestions = [
  {
    question:
      "Which data structure works on the principle of “Last In, First Out” (LIFO)?",
    choices: ["Queue", "Linked list", "Stack", "Tree"],
    answer: "Stack",
  },
  {
    question: "Which company developed the programming language Java?",
    choices: ["Microsoft", "Sun Microsystems", "IBM", "Apple"],
    answer: "Sun Microsystems",
  },
  {
    question: "In database management systems (DBMS), what does SQL stand for?",
    choices: [
      "Structured Question Language",
      "System Query Logic",
      "Structured Query Language",
      "Sequential Query Language",
    ],
    answer: "Structured Query Language",
  },
  {
    question: "What is the time complexity of Binary Search in the worst case?",
    choices: ["O(n)", "O(log n)", " O(n²)", " O(1)"],
    answer: "O(log n)",
  },
  {
    question: "5. Which of the following is a NoSQL database?",
    choices: ["MySQL", "PostgreSQL", "MongoDB", "Oracle Database"],
    answer: "MongoDB",
  },
];

/// Function for user name
async function askName() {
  const answer = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answer.player_name;
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer....").start();
  await sleep();

  if (isCorrect) {
    score++;
    spinner.success({
      text: `That's a W ${playerName}. You are slaying it🥳`,
    });
  } else {
    spinner.error({
      text: `💀 What a L ${playerName}, You got mogged 😭`,
    });
  }
}

// Function for multiple Questions
async function questions() {
  for (const quizQuestion of quizQuestions) {
    const answers = await inquirer.prompt({
      name: "choice",
      type: "rawlist",
      message: `${quizQuestion.question}\n`,
      choices: quizQuestion.choices,
    });

    await handleAnswer(answers.choice === quizQuestion.answer);
  }
}

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

// Function for welcome message
async function welcome() {
  const title = chalkAnimation.rainbow(
    `Want to know you CS Knowledge ${playerName}? Lets find out \n`,
  );

  await sleep();
  title.stop();

  console.log(`${chalk.bgBlue.bold("HOW TO PLAY")}
  This test will ask you 5 random questions from CS field.
  Based on your answer, your knowledge will be defined📝.
  ${chalk.black.bgRed.bold("READY FOR THE ACTION")}
  `);
}

function winner() {
  console.clear();
  let msg;
  if (score === quizQuestions.length) {
    msg = `HOLY MOLY, ${playerName}! \nYOU DA REAL GOAT. YOU ACED I`;
  } else {
    msg = `NOT BAD, ${playerName}! \n YOUR GOT A SOLID ${score}/${quizQuestions.length}`;
  }

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await askName();
await welcome();
await questions();
console.log(`\nFinal score: ${score}/${quizQuestions.length}`);
winner();
