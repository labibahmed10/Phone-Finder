const findPhone = () => {
  const inputValue = document.getElementById("input").value.toLowerCase();
  document.getElementById("input").value = "";

  fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
    .then((res) => res.json())
    .then((data) => showPhones(data.data));
};

const showPhones = (data) => {
  data.slice(0, 20).forEach((phone) => {
    const showCard = document.getElementById("cardshow");
    console.log(phone);
    // const phones = phone;
    // console.log(phones.slice(0, 20));
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100">
    <img src="${phone.image}" class="card-img-top img-fluid" alt="..." />
      <div class="card-body">
        <h2 class="card-title">${phone.brand}</h2>
        <div class="d-flex justify-content-between align-center">
        <h4>${phone.phone_name}</h4>
        <button class="btn btn-warning" onclick="showDetails('${phone.slug}')">Explore</button>
        </div>
      </div>
    </div>
    `;
    showCard.appendChild(div);
  });
};



const showDetails = (slug) =>{
  
}