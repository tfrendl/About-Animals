// Global variables
const baseUrl ='https://api.thedogapi.com/v1/';
const key = 'live_2ePwG6Vr7gnUJfkRxf7WRSW6wKZNaX25WXemQm6XbVdMqXuc8t4oOar8JOt1o1yM';

const catBaseUrl = 'https://api.thecatapi.com/v1/';
const catKey = 'live_VtZnItKb31weSk4mWWZfmI9k5g3QgjqA0IqvD565GQy6itmqlZ7cw2z5wcvj3TAH';

// Event Listeners
document.getElementById("breeds").addEventListener("change", displayBreedInfo);

document.getElementById("catBreeds").addEventListener("change", displayCatBreedInfo);

// functions
async function displayBreedInfo() {
  // show modal window
  const myModal = new bootstrap.Modal(document.getElementById('breedInfoModal'));
  myModal.show();
  
  let dogId = document.getElementById("breeds").value;
  console.log(dogId);
  // call dog API
  let url = `${baseUrl}breeds/${dogId}`;
  let response = await fetch(url, {
    headers: {
      'x-api-key': key
    }
  });
  let data = await response.json();
  console.log(data.name);

  // display info
  let breedInfo = document.getElementById("breedInfo");
  let breedDetails = document.getElementById("breedDetails");
  breedInfo.innerHTML = `<h2> ${data.name}</h2>`;
  breedDetails.innerHTML = `Weight: ${data.weight.metric} <br>`;
  breedDetails.innerHTML += `Height: ${data.height.metric} <br>`;
  breedDetails.innerHTML += `Life Span: ${data.life_span} <br> `;
  breedDetails.innerHTML += `Temperament: ${data.temperament} <br> `;

  // get dog image
  let image_reference = data.reference_image_id;
  console.log(image_reference);
  url = `${baseUrl}images/${image_reference}`;
  response = await fetch(url, {
    headers: {
      'x-api-key': key
    }
  });
  data = await response.json();
  breedInfo.innerHTML += `<img src="${data.url}" width="250">`;
}

//https://api.thedogapi.com/v1/images/rkiByec47

async function displayCatBreedInfo() {
  // show modal window
  const myModal = new bootstrap.Modal(document.getElementById('breedInfoModal'));
  myModal.show();

  let catId = document.getElementById("breeds").value;
  console.log(catId);
  // call dog API
  let url = `${catBaseUrl}breeds/${catId}`;
  let response = await fetch(url, {
    headers: {
      'x-api-key': key
    }
  });
  let data = await response.json();
  console.log(data.name);

  // display info
  let breedInfo = document.getElementById("breedInfo");
  let breedDetails = document.getElementById("breedDetails");
  breedInfo.innerHTML = `<h2> ${data.name}</h2>`;
  breedDetails.innerHTML = `Weight: ${data.weight.metric} <br>`;
  breedDetails.innerHTML += `Height: ${data.height.metric} <br>`;
  breedDetails.innerHTML += `Life Span: ${data.life_span} <br> `;
  breedDetails.innerHTML += `Temperament: ${data.temperament} <br> `;

  // get dog image
  let image_reference = data.reference_image_id;
  console.log(image_reference);
  url = `${baseUrl}images/${image_reference}`;
  response = await fetch(url, {
    headers: {
      'x-api-key': key
    }
  });
  data = await response.json();
  breedInfo.innerHTML += `<img src="${data.url}" width="250">`;
}