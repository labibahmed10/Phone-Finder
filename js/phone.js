//Cards where phones will see

const showCard = document.getElementById("cardshow");

//phone details in a div

const phoneDetails = document.getElementById("phoneDetails");

//error messages

const error1 = document.getElementById("error1").classList;
const error2 = document.getElementById("error2").classList;

//search button and fetching data's

const findPhone = () => {
  const inputValue = document.getElementById("input").value.toLowerCase();

  if (inputValue === "" || inputValue <= 0 || inputValue > 0) {
    error1.remove("d-none");
    error2.add("d-none");
    showCard.textContent = ""; //cards cleared
    phoneDetails.textContent = ""; //phone details cleared
  } else {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === false) {
          error2.remove("d-none");
          error1.add("d-none");
          showCard.textContent = ""; //cards cleared
          phoneDetails.textContent = ""; //phone details cleared
        } else {
          spinnerLoad("block"); //spinner added
          error2.add("d-none");
          error1.add("d-none");
          showCard.textContent = ""; //cards cleared
          phoneDetails.textContent = ""; //phone details cleared
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
        <h2 class="card-title brand">${phone.brand}</h2>
        <div class="d-flex justify-content-between align-center brand">
        <h4>${phone.phone_name}</h4>
        <button class="btn btn-success" onclick="getId('${phone.slug}')">Explore</button>
        </div>
      </div>
    </div>
    `;
    showCard.appendChild(div);
  });
  spinnerLoad("none"); //spinner added
};

// Getting slug or id here

const getId = (slug) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.data.slug === slug) {
        showDetails(data.data);
      }
    });
};

// showing details of a phone

const showDetails = (details) => {
  phoneDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("row");

  // checking if others are not available
  if (details.others === undefined) {
    div.innerHTML = `
    <div class="col-md-12 mx-auto text-center">
      <img src="${details.image}" class="img-fluid w-75 rounded-start" alt="..." />
      <h2 class="text-center mt-4 brand">${details.name}</h2>
    </div>
    <div class="col-md-12">
      <div class="card-body">
        <h1 class="card-title fs-1 fw-bold brand">${details.brand}</h1>
        <p class="text-muted fs-3 mb-0">${details.releaseDate ? details.releaseDate : "Coming Soon!"}</p>
        <h5 class="text-center display-5 fw-normal">Main Features</h5>
        <p class="mb-0 feature-text"><span class="fw-bold fs-4">Chipset:</span> ${
          details.mainFeatures.chipSet
        }</p>
        <p class="mb-0 feature-text"><span class="fw-bold fs-4">Display:</span> ${
          details.mainFeatures.displaySize
        }</p>
        <p class="mb-0 feature-text"><span class="fw-bold fs-4">Memory: </span>${
          details.mainFeatures.memory
        }</p>
        <p class="mb-0 feature-text"><span class="fw-bold fs-4">Storage:</span> ${
          details.mainFeatures.storage
        }</p>
        <p class="mb-0 feature-text"><span class="fw-bold fs-4">Sensors:</span> ${
          details.mainFeatures.sensors
        }</p>
      </div>
    </div>
        `;
    return phoneDetails.appendChild(div);
  }
  // if others are available then
  else {
    div.innerHTML = `
      <div class="col-md-12 mx-auto text-center">
        <img src="${details.image}" class="img-fluid w-75 rounded-start" alt="..." />
        <h2 class="text-center mt-4 brand">${details.name}</h2>
      </div>
      <div class="col-md-12">
        <div class="card-body">
          <h1 class="card-title fs-1 fw-bold brand">${details.brand}</h1>
          <p class="text-muted fs-3 mb-0">${details.releaseDate ? details.releaseDate : "Coming Soon!"}</p>
          <h5 class="text-center display-5 fw-normal features">Main Features</h5>
          <p class="mb-0 feature-text"><span class="fw-bold fs-4">Chipset:</span> ${
            details.mainFeatures.chipSet
          }</p>
          <p class="mb-0 feature-text"><span class="fw-bold fs-4">Display:</span> ${
            details.mainFeatures.displaySize
          }</p>
          <p class="mb-0 feature-text"><span class="fw-bold fs-4">Memory: </span>${
            details.mainFeatures.memory
          }</p>
          <p class="mb-0 feature-text"><span class="fw-bold fs-4">Storage:</span> ${
            details.mainFeatures.storage
          }</p>
          <p class="mb-0 feature-text"><span class="fw-bold fs-4">Sensors:</span> ${
            details.mainFeatures.sensors
          }</p>
          <h5 class="text-center display-5 fw-normal features">Other Features</h5>
          <p class="mb-0 feature-text"><span class="fw-bold fs-4">Bluetooth:</span> ${
            details.others.Bluetooth
          }</p>
          <p class="mb-0 feature-text"><span class="fw-bold fs-4">GPS:</span> ${details.others.GPS}</p>
          <p class="mb-0 feature-text"><span class="fw-bold fs-4">NFC:</span> ${details.others.NFC}</p>
          <p class="mb-0 feature-text"><span class="fw-bold fs-4">Radio:</span> ${details.others.Radio}</p>
          <p class="mb-0 feature-text"><span class="fw-bold fs-4">USB:</span> ${details.others.USB}</p>
          <p class="mb-0 feature-text"><span class="fw-bold fs-4">WLAN:</span> ${details.others.WLAN}</p>
      </div>
      </div>
`;
    phoneDetails.appendChild(div);
  }
  spinnerLoad("none"); //spinner added
};

//spinner on loading --
const spinnerLoad = (display) => {
  document.getElementById("spinner").style.display = display;
};
