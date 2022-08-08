function calc(event) {
  event.preventDefault();

  if (document.getElementById("calcType").value == "final") {
    calcFinal();
  } else if (document.getElementById("calcType").value == "quadratic") {
    calcQuadratic();
  }
}

function calcFinal() {
  currentGrade = document.getElementById("curr").value;
  desiredGrade = document.getElementById("goal").value;
  finalWorth = document.getElementById("percent").value;

  console.log(currentGrade + " " + desiredGrade + " " + finalWorth);

  needed =
    (desiredGrade - currentGrade * ((100 - finalWorth) / 100)) / finalWorth * 100;

  alert(
    "You will need a " +
      needed +
      " on the final to have a " +
      desiredGrade +
      " as your final grade."
  );

  document.getElementById("calcForm").reset();
}

function calcQuadratic(event) {
  a = parseInt(document.getElementById("a").value, 10);
  b = parseInt(document.getElementById("b").value, 10);
  c = parseInt(document.getElementById("c").value, 10);

  x1 = (-b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
  x2 = (-b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);

  quadraticEquation = a + "x^2 + " + b + "y " + "+ " + c;
  
  if(isNaN(x1) && isNaN(x2)){
    alert(
      "No real number satisfies the quadratic equation " + quadraticEquation)
  }else if(isNaN(x1)){
    alert(
      x2 + " satisfies the quadratic equation " + quadraticEquation
    );
  }else if(isNaN(x2)){
    alert(
      x1 + " satisfies the quadratic equation " + quadraticEquation
    );
  }else{
    alert(
      x1 + " and " + x2 + " satisfies the quadratic equation " + quadraticEquation
  );
  }
  
  document.getElementById("calcForm").reset();
}

function displayCalculator(event) {
  document.getElementById("description").innerHTML = "";
  document.getElementById("equation").innerHTML = "";
  document.getElementById("calcForm").innerHTML = "";

  calcType = document.getElementById("calcType").value;
  if (calcType == "final") {
    displayFinalCalc();
  } else if (calcType == "quadratic") {
    displayQuadraticCalc();
  } else {
    return;
  }
}

function displayFinalCalc() {
  var description = document.createTextNode(
    "Equation for calculating final grade"
  );
  document.getElementById("description").appendChild(description);

  var equation = document.createTextNode(
    "Required = (Goal - Current * (100% - Final Weight)) / Final    Weight"
  );
  document.getElementById("equation").appendChild(equation);

  var currentGradeInput = document.createElement("input");
  currentGradeInput.type = "number";
  currentGradeInput.step = "any";
  currentGradeInput.required = true;
  currentGradeInput.id = "curr";

  var desiredGradeInput = document.createElement("input");
  desiredGradeInput.type = "number";
  desiredGradeInput.step = "any";
  desiredGradeInput.required = true;
  desiredGradeInput.id = "goal";

  var finalWorthInput = document.createElement("input");
  finalWorthInput.type = "number";
  finalWorthInput.step = "any";
  finalWorthInput.required = true;
  finalWorthInput.id = "percent";

  var submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "Ready for your impending doom?";
  submit.class = "submit";

  document.getElementById("description").appendChild(description);
  document.getElementById("equation").appendChild(equation);

  var equationBox = document.getElementById("calcForm");
  equationBox.appendChild(document.createTextNode("Current Grade:"));
  equationBox.appendChild(currentGradeInput);
  equationBox.appendChild(document.createTextNode("Desired Grade:"));
  equationBox.appendChild(desiredGradeInput);
  equationBox.appendChild(document.createTextNode("Final Worth:"));
  equationBox.appendChild(finalWorthInput);
  equationBox.appendChild(submit);
}

function displayQuadraticCalc() {
  var description = document.createTextNode("Quadratic Formula");
  document.getElementById("description").appendChild(description);

  var equation = document.createTextNode("x = (-b +/- sqrt(b^2-4ac))/2a");
  document.getElementById("equation").appendChild(equation);

  var aInput = document.createElement("input");
  aInput.type = "number";
  aInput.step = "any";
  aInput.required = true;
  aInput.id = "a";

  var bInput = document.createElement("input");
  bInput.type = "number";
  bInput.step = "any";
  bInput.required = true;
  bInput.id = "b";

  var cInput = document.createElement("input");
  cInput.type = "number";
  cInput.step = "any";
  cInput.required = true;
  cInput.id = "c";

  var submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "Be thankful you don't have to do this by hand";
  submit.class = "submit";

  document.getElementById("description").appendChild(description);
  document.getElementById("equation").appendChild(equation);

  var equationBox = document.getElementById("calcForm");
  equationBox.appendChild(document.createTextNode("Value for a:"));
  equationBox.appendChild(aInput);
  equationBox.appendChild(document.createTextNode("Value for b:"));
  equationBox.appendChild(bInput);
  equationBox.appendChild(document.createTextNode("Value for c:"));
  equationBox.appendChild(cInput);
  equationBox.appendChild(submit);
}

function changeGif() {
  if(document.getElementsByName("ans")[0].checked){
    document.getElementById("gif").src = "https://media.giphy.com/media/xUNd9IchxKZadO3XMc/giphy.gif";
  }else{
    document.getElementById("gif").src = "https://media.giphy.com/media/1xo9BMTCjcKa6BnQsO/giphy.gif";
  }
  
}

window.onload = () => {
  calcForm.addEventListener("submit", calc);
  calcType.addEventListener("change", displayCalculator);
  truth.addEventListener("change", changeGif);
};





