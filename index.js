const quizRoot = document.getElementById("quiz");
fetch("./quiz.json")
  .then((resp) => resp.json())
  .then((data) => {
    const questions = data["questionnaire"];

    for (let i = 0; i < questions.length; i++) {
      const qData = questions[i];
      const question = qData["question"];
      const questionElement = document.createElement("h1");
      questionElement.textContent = question;
      quizRoot.appendChild(questionElement);

      const formElement = document.createElement("form");
      formElement.setAttribute("id", "quiz-form");

      const submitElement = document.createElement("input");
      submitElement.setAttribute("id", "submit");
      submitElement.setAttribute("type", "submit");

      const choices = qData["choices"];
      for (let j = 0; j < choices.length; j++) {
        const answerElement = document.createElement("input");
        answerElement.setAttribute("type", "radio");
        answerElement.setAttribute("id", "choice" + j);
        answerElement.setAttribute("name", "choices" + i);
        answerElement.setAttribute("value", choices[j]);

        const labelElement = document.createElement("label");
        labelElement.setAttribute("class", "container");
        labelElement.setAttribute("id", choices[j]);
        labelElement.textContent = choices[j];
        labelElement.appendChild(answerElement);

        const checkMarkSpanElement = document.createElement("span");
        checkMarkSpanElement.setAttribute("class", "checkmark");
        labelElement.appendChild(checkMarkSpanElement);

        formElement.appendChild(labelElement);
      }
      quizRoot.appendChild(formElement);
      formElement.appendChild(submitElement);

      formElement.addEventListener("submit", function (e) {
        e.preventDefault();

        const selectedAnswer = formElement.querySelector(
          `input[name="choices${i}"]:checked`
        );
        const actualAnswer = choices[qData["answer"]];

        if (selectedAnswer) {
          console.log("Selected value: " + selectedAnswer.value);
          console.log(selectedAnswer.parentElement);
          if (
            selectedAnswer.value?.toLowerCase() === actualAnswer.toLowerCase()
          ) {
            console.log("Correct Answer");
            selectedAnswer.parentElement.classList.add("correct");
          } else {
            console.log("Wrong Answer");
            selectedAnswer.parentElement.classList.add("wrong");
          }
        } else {
          console.log("No choice selected.");
        }
      });
    }

    console.log(questions);
  });
