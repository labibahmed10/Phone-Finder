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
    phoneDetails.textContent = "";
  } else {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === false) {
          error2.remove("d-none");
          error1.add("d-none");
          showCard.textContent = "";
          phoneDetails.textContent = "";
        } else {
          error2.add("d-none");
          error1.add("d-none");
          showCard.textContent = "";
          phoneDetails.textContent = "";
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

// showing details of a phone

const showDetails = (details) => {
  phoneDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("row");
  if (details.others === undefined) {
    console.log("object");
    div.innerHTML = `
    <div class="col-md-12 mx-auto text-center">
      <img src="${details.image}" class="img-fluid w-75 rounded-start" alt="..." />
      <h2 class="text-center mt-4">${details.name}</h2>
    </div>
    <div class="col-md-12">
      <div class="card-body">
        <h1 class="card-title fs-1 fw-bold">${details.brand}</h1>
        <p class="text-muted fs-3 mb-0">${details?.releaseDate}</p>
        <h5 class="text-center display-5 fw-normal">Main Features</h5>
        <p class="mb-0"><span class="fw-bold fs-4">Chipset:</span> ${details.mainFeatures.chipSet}</p>
        <p class="mb-0"><span class="fw-bold fs-4">Display:</span> ${details.mainFeatures.displaySize}</p>
        <p class="mb-0"><span class="fw-bold fs-4">Memory: </span>${details.mainFeatures.memory}</p>
        <p class="mb-0"><span class="fw-bold fs-4">Storage:</span> ${details.mainFeatures.storage}</p>
        <p class="mb-0"><span class="fw-bold fs-4">Sensors:</span> ${details.mainFeatures.sensors}</p>
        `;
    return phoneDetails.appendChild(div);
  } else {
    div.innerHTML = `
  <div class="col-md-12 mx-auto text-center">
    <img src="${details.image}" class="img-fluid w-75 rounded-start" alt="..." />
    <h2 class="text-center mt-4">${details.name}</h2>
  </div>
  <div class="col-md-12">
    <div class="card-body">
      <h1 class="card-title fs-1 fw-bold">${details.brand}</h1>
      <p class="text-muted fs-3 mb-0">${details.releaseDate ? details.releaseDate : "Coming Soon!"}</p>
      <h5 class="text-center display-5 fw-normal">Main Features</h5>
      <p class="mb-0"><span class="fw-bold fs-4">Chipset:</span> ${details.mainFeatures.chipSet}</p>
      <p class="mb-0"><span class="fw-bold fs-4">Display:</span> ${details.mainFeatures.displaySize}</p>
      <p class="mb-0"><span class="fw-bold fs-4">Memory: </span>${details.mainFeatures.memory}</p>
      <p class="mb-0"><span class="fw-bold fs-4">Storage:</span> ${details.mainFeatures.storage}</p>
      <p class="mb-0"><span class="fw-bold fs-4">Sensors:</span> ${details.mainFeatures.sensors}</p>
      <h5 class="text-center display-5 fw-normal">Other Features</h5>
      <p class="mb-0"><span class="fw-bold fs-4">Sensors:</span> ${details.others.Bluetooth}</p>
      <p class="mb-0"><span class="fw-bold fs-4">GPS:</span> ${details.others.GPS}</p>
      <p class="mb-0"><span class="fw-bold fs-4">NFC:</span> ${details.others.NFC}</p>
      <p class="mb-0"><span class="fw-bold fs-4">Radio:</span> ${details.others.Radio}</p>
      <p class="mb-0"><span class="fw-bold fs-4">USB:</span> ${details.others.USB}</p>
      <p class="mb-0"><span class="fw-bold fs-4">WLAN:</span> ${details.others.WLAN}</p>
  </div>
  </div>
`;
    phoneDetails.appendChild(div);
  }
};
