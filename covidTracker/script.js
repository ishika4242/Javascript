const btn1 = document.getElementById("btn1");
const results = document.getElementById("results");
const countryName = document.getElementById("countryName");

btn1.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("click");
  const tracker = async function () {
    const res = await fetch("https://corona.lmao.ninja/v2/countries");
    const data = await res.json();
    country = countryName.value;
    countryName.value = "";

    data.forEach((element) => {
      if (element.country.toLowerCase() === country) {
        // if (element.country.toLowerCase() === "india") {
        var template = `
        <h4 class="mt-4">Covid Cases</h4>
            <ul class="list-group mb-4">
                <li type="none" class="list-group-item"><strong>Country: ${element.country}</strong></li>
                <li type="none" class="list-group-item"><strong>Continent:</strong> ${element.continent}</li>
                <li type="none" class="list-group-item"><strong>Total Cases: </strong> ${element.cases}</li>
                <li type="none" class="list-group-item"><strong>Active Cases: </strong> ${element.active}</li>
                <li type="none" class="list-group-item"><strong>Deaths: </strong> ${element.deaths}</li>
                <li type="none" class="list-group-item"><strong>Recovered: </strong> ${element.recovered}</li>
            </ul>
        `;
        results.insertAdjacentHTML("beforeend", template);
      }
    });
  };
  tracker();
});
