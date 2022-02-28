const findPhone = () => {
  const inputValue = document.getElementById("input").value.toLowerCase();
  document.getElementById("input").value = "";

  fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
    .then((res) => res.json())
    .then((data) => showPhones(data.data));
};

const showPhones = (data) => {
  data.forEach((phone) => console.log(phone));
};
