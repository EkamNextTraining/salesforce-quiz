const correctAnswers = {
  q1: "CRM",
  q2: "Apex",
  q3: "LWC"
};

const form = document.getElementById("quizForm");

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  const studentName = document.getElementById("studentName").value;
  const studentEmail = document.getElementById("studentEmail").value;

  const formData = new FormData(form);

  let score = 0;

  const answers = {
    q1: formData.get("q1"),
    q2: formData.get("q2"),
    q3: formData.get("q3")
  };

  for (let key in correctAnswers) {
    if (answers[key] === correctAnswers[key]) {
      score++;
    }
  }

  document.getElementById("result").innerHTML =
    `You scored ${score} out of 3`;

  const payload = {
    studentName,
    studentEmail,
    answers,
    score
  };

  try {
    await fetch("https://script.google.com/macros/s/AKfycbzgGBp4kHqZN53lYLFKoZ-zoipTFMmGcZv5VY6TEtLpDIjYFNEU14YY8Hla8SaFdZF6/exec", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    console.log("Response saved successfully");

  } catch (error) {
    console.error("Error saving response", error);
  }
});