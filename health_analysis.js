const addPatientButton = document.getElementById("addPatient")
const report = document.getElementById("report")
const btnSearch = document.getElementById("btnSearch")
const patients = []

function addPatient(){
    const name = document.getElementById("name").ariaValueMax;
    const gender = document.querySelector('input[name="gender"]:checked')
    const age = document.getElementById("age").ariaValueMax;
    const condition = document.getElementById("condition").value
    if (name && gender && age && condition){
        patients.push({name,gender:gender.value,age,condition})
        resetForm();
        generateReport();
    }
}

function resetForm(){
    document.getElementById("name").value="";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("age").value ="";
    document.getElementById("condition").value="";
}

function generateReport(){
    const numPatients = patients.length;
    const conditionCount = {
        Diabetes:0,
        Thyroid:0,
        "High Blood Pressure":0,
    }
    const genderConditionCount = {
        Male:{
            Diabetes:0,
            Thyroid:0,
            "High Blood Pressure":0,
        },
        Female:{
            Diabetes:0,
            Thyroid:0,
            "High Blood Pressure":0,
        },
    };
    for (const patients of patients){
        conditionCount[patients.condition]++
        genderConditionsCount[patients.gender][patients.condition]++
    }
    report.innerHTML = `Number of patients :${numPatients}<br><br>`
    report.innerHTML = `Condition Breakdown:<br>`

    for (const condition in conditionCount){
        report.innerHTML +=  `${condition}: ${conditionsCount[condition]}<br>`;
    }
    report.innerHTML += `<br>Gender-Based Conditions:<br>`;
    for (const gender in genderConditionsCount) {
        report.innerHTML += `${gender}:<br>`;
        for (const condition in genderConditionsCount[gender]) {
            report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
        }
    }
}
addPatientButton.addEventListener("click", addPatient);

function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('health_analysis.json')
      .then(response => response.json())
      .then(data => {
        const condition = data.conditions.find(item => item.name.toLowerCase() === input);

        if (condition) {
          const symptoms = condition.symptoms.join(', ');
          const prevention = condition.prevention.join(', ');
          const treatment = condition.treatment;

          resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
          resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

          resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
          resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
          resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
        } else {
          resultDiv.innerHTML = 'Condition not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
    btnSearch.addEventListener('click', searchCondition);