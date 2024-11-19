const baseURL = "http://localhost:3000/ramens";

function fetchRamens() {
  return fetch(baseURL)
    .then(response => response.json())
    .then(displayRamens)
    .catch(error => console.error("Error:", error));
}

function displayRamens(ramens) {
  const ramenMenu = document.getElementById('ramen-menu');
  ramens.forEach(ramen => {
    const img = document.createElement('img');
    img.src = ramen.image;
    img.alt = ramen.name;
    img.addEventListener('click', () => handleClick(ramen));
    ramenMenu.appendChild(img);
  });

  // Display the first ramen's details
  if (ramens.length > 0) {
    handleClick(ramens[0]);
  }
}

function handleClick(ramen) {
  const ramenImage = document.getElementById('ramen-image');
  const ramenName = document.getElementById('ramen-name');
  const ramenRestaurant = document.getElementById('ramen-restaurant');
  const ramenRating = document.getElementById('ramen-rating');
  const ramenComment = document.getElementById('ramen-comment');

  ramenImage.src = ramen.image;
  ramenName.textContent = ramen.name;
  ramenRestaurant.textContent = ramen.restaurant;
  ramenRating.textContent = ramen.rating;
  ramenComment.textContent = ramen.comment;
}

function addSubmitListener() {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const newRamen = {
      name: form.name.value,
      restaurant: form.restaurant.value,
      image: form.image.value,
      rating: form.rating.value,
      comment: form['new-comment'].value
    };
    addRamenToMenu(newRamen);
    form.reset();
  });
}

function addRamenToMenu(ramen) {
  const ramenMenu = document.getElementById('ramen-menu');
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener('click', () => handleClick(ramen));
  ramenMenu.appendChild(img);
}

function addEditListener() {
  const form = document.getElementById('edit-ramen');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const rating = document.getElementById('new-rating').value;
    const comment = document.getElementById('new-comment').value;
    const ramenRating = document.getElementById('ramen-rating');
    const ramenComment = document.getElementById('ramen-comment');

    ramenRating.textContent = rating;
    ramenComment.textContent = comment;

    form.reset();
  });
}

function main() {
  fetchRamens();
  addSubmitListener();
  addEditListener();
}

document.addEventListener('DOMContentLoaded', main);
