//Cards where phones will see

const showCard = document.getElementById("cardshow");

//error messages

const error1 = document.getElementById("error1").classList;
const error2 = document.getElementById("error2").classList;

//search button and fetching data's

const findPhone = () => {
  const inputValue = document.getElementById("input").value.toLowerCase();

  if (inputValue === "" || inputValue <= 0 || inputValue > 0) {
    error1.remove("d-none");
    error2.add("d-none");
    showCard.textContent = "";
  } else {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === false) {
          error2.remove("d-none");
          error1.add("d-none");
          showCard.textContent = "";
        } else {
          error2.add("d-none");
          error1.add("d-none");
          showCard.textContent = "";
          showPhones(data.data);
        }
      });
  }
  document.getElementById("input").value = "";
};

//showing phones on cards

const showPhones = (data) => {
  showCard.textContent = "";
  data.slice(0, 20).forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100">
    <img src="${phone.image}" class="card-img-top img-fluid p-3" alt="..." />
      <div class="card-body">
        <h2 class="card-title">${phone.brand}</h2>
        <div class="d-flex justify-content-between align-center">
        <h4>${phone.phone_name}</h4>
        <button class="btn btn-warning" onclick="getId('${phone.slug}')">Explore</button>
        </div>
      </div>
    </div>
    `;
    showCard.appendChild(div);
  });
};

const getId = (slug) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.data.slug === slug) {
        showDetails(data.data);
      }
    });
};
const phoneDetails = document.getElementById("phoneDetails");

const showDetails = (details) => {
  console.log(details);

  const div = document.createElement("div");
  div.classList.add("row");
  div.innerHTML = `
        <div class="col-md-5">
          <img src="${details.image}" class="img-fluid w-100 rounded-start" alt="..." />
          <h2 class="text-center mt-3">${details.name}</h2>
        </div>
        <div class="col-md-7">
          <div class="card-body">
            <h1 class="card-title display-2 fw-normal">${details.brand}</h1>
            <h3>Status:${details.releaseDate}</h3>
            <p class="text-center display-4 fw-normal">Details</p>
            <h4>Chipset: ${details.mainFeatures.chipSet}</h4>
            <h4>Display: ${details.mainFeatures.displaySize.slice(0, 20)}</h4>

            <h4>Memory:<span>${details.mainFeatures.memory.slice(0, 13)}</span><br>
            <span>${details.mainFeatures.memory.slice(14, 28)}</span><br>
            <span>${details.mainFeatures.memory.slice(29, 43)}</span></h4>

            <h4>Storage: ${details.mainFeatures.storage}</h4>
            <h4>Sensors: ${details.mainFeatures.sensors}</h4>
           
          </div>
        </div>
        `;
  phoneDetails.appendChild(div);
};
