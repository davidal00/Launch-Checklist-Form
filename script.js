/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener("load", function () {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
      response.json().then(function (json) {
         const div = document.getElementById("missionTarget");
         document.addEventListener("click", function () {

            //for (let i = 0; i < json.length; i++) {
            planet = json[0];
            div.innerHTML = `
                       <div class="missionTarget">
                           <h2>Mission Destination</h2>
                           <ol>
                              <li>Name: ${json[0].name}</li>
                              <li>Diameter: ${json[0].diameter}</li>
                              <li>Star: ${json[0].star}</li>
                              <li>Distance from Earth: ${json[0].distance}</li>
                              <li>Number of Moons: ${json[0].moons}</li>
                           </ol>
                           <img src=${json[0].image}>
                       </div>
                       `;
            // };
         });
      });
   });
});




window.addEventListener("load", function () {
   let form = document.querySelector("form");
   form.addEventListener("submit", function (event) {
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");
      //Validate TextBox value against the Regex.
      let regex = /^[A-Za-z ]+$/;
      let emptyString = /^.{0}$/;

      let isPilotNameEmptyString = emptyString.test(pilotName.value);
      let isPilotNameValid = regex.test();

      let isCopilotNameEmptyString = emptyString.test(copilotName.value);
      let isCopilotNameValid = regex.test();

      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         alert("All fields are required!");
         // stop the form submission
         event.preventDefault();
      }

      isPilotNameValid = regex.test(pilotName.value);
      isPilotNameEmptyString = emptyString.test(pilotName.value);
      if (!isPilotNameValid && !isPilotNameEmptyString) {
         alert("Pilot Name must be a string with no numbers or special characters.\n\nex) 'John' or 'John Doe'");
         event.preventDefault();
      } else {
         const div = document.getElementById("pilotStatus");
         div.innerHTML = `Pilot ${pilotName.value} Ready`;
      }

      isCopilotNameValid = regex.test(copilotName.value);
      isCopilotNameEmptyString = emptyString.test(copilotName.value);
      if (!isCopilotNameValid && !isCopilotNameEmptyString) {
         alert("Co-pilot Name must be a string with no numbers or special characters.\n\nex) 'John' or 'John Doe'");
         event.preventDefault();
      } else {
         const div = document.getElementById("copilotStatus");
         div.innerHTML = `Copilot ${copilotName.value} Ready`;
      }

      if (isNaN(fuelLevel.value)) {
         alert("Fuel Level must be a number!");
         event.preventDefault();
      } else {
         if (fuelLevel.value < 10000) {
            console.log("fuel level less than 10000");
            document.getElementById("faultyItems").style.visibility = 'visible';
            const fuelList = document.getElementById("fuelStatus");
            fuelList.innerHTML = `10000L of fuel required to launch.`;
            const notReadyForLaunch = document.getElementById("launchStatus");
            notReadyForLaunch.innerHTML = `Shuttle not ready for launch`;
            document.getElementById("launchStatus").style.color = 'red';
            event.preventDefault();
         } else {
            //this resets the Awaiting Information Before Launch to hidden
            //because if you enter a fuel level that's valid for launch after
            //having entered a value to low, it would still show if this wasn't
            //in place
            //document.getElementById("faultyItems").style.visibility = 'hidden';
            const readyForLaunch = document.getElementById("launchStatus");
            readyForLaunch.innerHTML = `Awaiting Information Before Launch`;
            document.getElementById("launchStatus").style.color = 'black';
         }
      }

      if (isNaN(cargoMass.value)) {
         alert("Cargo Mass must be a number!");
         event.preventDefault();
      } else {
         if (cargoMass.value > 10000) {
            console.log("Cargo Mass is greater than 10000kg!");
            document.getElementById("faultyItems").style.visibility = 'visible';
            const cargoList = document.getElementById("cargoStatus");
            cargoList.innerHTML = `Max cargo mass to launch is 10000kg.`;
            const notReadyForLaunch = document.getElementById("launchStatus");
            notReadyForLaunch.innerHTML = `Shuttle not ready for launch`;
            document.getElementById("launchStatus").style.color = 'red';
            event.preventDefault();
         } else {
            //this resets the Awaiting Information Before Launch to hidden
            //because if you enter a cargo mass that's valid for launch after
            //having entered a value to high, it would still show if this wasn't
            //in place
            //document.getElementById("faultyItems").style.visibility = 'hidden';
            const readyForLaunch = document.getElementById("launchStatus");
            readyForLaunch.innerHTML = `Awaiting Information Before Launch`;
            document.getElementById("launchStatus").style.color = 'black';
         }
      }
      if (fuelLevel.value >= 10000 && cargoMass.value <= 10000) {
         console.log("good to go");
         const readyForLaunch = document.getElementById("launchStatus");
         readyForLaunch.innerHTML = `Shuttle is ready for launch`;

         const readyFuelLevel = document.getElementById("fuelStatus");
         readyFuelLevel.innerHTML = "Fuel level high enough for launch";

         const readyCargoMass = document.getElementById("cargoStatus");
         readyCargoMass.innerHTML = "Cargo mass low enough for launch";
         document.getElementById("launchStatus").style.color = 'green';
         event.preventDefault();
      } else {
         const notReadyForLaunch = document.getElementById("launchStatus");
         notReadyForLaunch.innerHTML = `Shuttle not ready for launch`;
         document.getElementById("launchStatus").style.color = 'red';
         event.preventDefault();
      }
   });
});
