// Global variables
const baseUrl ='https://api.thedogapi.com/v1/';
const catBaseUrl = 'https://api.thecatapi.com/v1/';

const sendChatBtn = document.querySelector(".chat-input span");
const chatInput = document.querySelector(".chat-input textarea");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn")

let userMessage;
const inputInitHeight = chatInput.scrollHeight;


const createChatLi = (message, className) => {
  // create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined"><img alt="cat icon" class="icon" src="../img/cat3.png"/></span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message; // prevent use of html tags in chat incoming
  return chatLi;
};

const generateResponse = async (incomingChatLi) => {
  const userQuestion = incomingChatLi;
  console.log("userquestionis",userQuestion);

  let url = `/assistantResponse`;

  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: userQuestion })
    });

    if(!response.ok) {
      console.log("ERRORRRR");
    }

    let assistantMessage = await response.json();
    console.log(assistantMessage.response);
    chatbox.appendChild(createChatLi(assistantMessage.response, "incoming"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
  } catch (error) {
    console.log("Some error", error);
  };



  // fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
  //   messageElement.textContent = data.choices[0].message.content;
  // }).catch((error) => {
  //   messageElement.classList.add("error");
  //   messageElement.textContent = "Something went wrong! Please try again";
  // }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
  userMessage =  chatInput.value.trim();  // get users question

  if (!userMessage) {
    return;
  }

  chatInput.value = ""; // empty input line after message is sent
  chatInput.style.height = `${inputInitHeight}px`;  // reset textarea height to default after message is sent

  // append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
       // display "thinking..." message while waiting for the response
     const incomingChatLi = createChatLi("Thinking...","incoming");
     chatbox.appendChild(incomingChatLi);
     chatbox.scrollTo(0, chatbox.scrollHeight);
     console.log("currently commenting out line 85 so as not to use tokens");
     generateResponse(userMessage);
   }, 600);
}

chatInput.addEventListener("input", () => {
  // adjust the height of the input text area based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

// When user sends message, go to function that sends it to the right function
chatInput.addEventListener("keydown", (event) => {
  // if enter key is pressed without shift key and the window
  // width is greater than 800px, handle the chat
  if(event.key === "Enter" && !event.shiftKey && window.innerWidth > 800) {
    event.preventDefault();
    handleChat();
  }
});

chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
sendChatBtn.addEventListener("click", handleChat);
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

// event listeners
document.addEventListener('DOMContentLoaded', function() {


  // display cat and dog when page loads
  if (window.location.pathname == "/") {
    frontPageDisplayCatBreedInfo();
    frontPageDogBreedInfo();
  }


  let dogBreedDropdown = document.getElementById("dogBreeds");
  if (dogBreedDropdown) {
    if (window.location.pathname == '/') {
      dogBreeds.addEventListener('change', frontPageDogBreedInfo);
    } else {
      dogBreedDropdown.addEventListener("change", displayBreedInfo);
    }
  }

  let catBreedDropdown = document.getElementById("catBreeds");
  console.log(window.location.pathname);
  if (catBreedDropdown) {
    console.log(window.location.pathname);
    if (window.location.pathname == '/') {  // see if on front page
      catBreedDropdown.addEventListener("change", frontPageDisplayCatBreedInfo);
    } else {
      catBreedDropdown.addEventListener("change", displayCatBreedInfo);
    }
  }
});

// functions
async function displayBreedInfo() {
  // show modal window
  const myModal = new bootstrap.Modal(document.getElementById('breedInfoModal'));
  myModal.show();
  
  // call local dog API
  let dogId = document.getElementById("dogBreeds").value;
  let url = `api/dog/${dogId}`;
  let response = await fetch(url);
  let data = await response.json();
  //console.log(data.name);

  // display breed info
  let breedDetails = document.getElementById("breedDetails");
  breedDetails.innerHTML = `<h3 class="text-decoration-underline"> ${data.name}</h3>`;
  breedDetails.innerHTML += `<span class="fw-bold">Weight</span>: ${data.weight.metric} pounds<br>`;
  breedDetails.innerHTML += `<span class="fw-bold">Height</span>: ${data.height.metric} inches<br>`;
  breedDetails.innerHTML += `<span class="fw-bold">Life Span</span>: ${data.life_span}<br> `;
  breedDetails.innerHTML += `<span class="fw-bold">Temperament</span>: ${data.temperament} <br> `;

  // display dog image
  let breedInfo = document.getElementById("breedInfo");
  let image_reference = data.reference_image_id;
  console.log(image_reference);
  url = `/api/dogImg/${image_reference}`;
  response = await fetch(url);
  data = await response.json();
  breedInfo.innerHTML = `<img src="${data.url}" class="rounded">`;
}

async function displayCatBreedInfo() {
  // show modal window
  const myModal = new bootstrap.Modal(document.getElementById('breedInfoModal'));
  myModal.show();

  // call local cat API
  let catId = document.getElementById("catBreeds").value;
  let url = `/api/cat/${catId}`;
  let response = await fetch(url);
  let data = await response.json();
  //console.log(data.name);

  // display breed info
  let breedDetails = document.getElementById("breedDetails");
  breedDetails.innerHTML = `<h3 class="text-decoration-underline"> ${data.name}</h2>`;
  breedDetails.innerHTML += `<span class="fw-bold">Weight</span>: ${data.weight.metric} pounds<br>`;
  breedDetails.innerHTML += `<span class="fw-bold">Life Span</span>: ${data.life_span} years<br> `;
  breedDetails.innerHTML += `<span class="fw-bold">Temperament</span>: ${data.temperament} <br> `;
  breedDetails.innerHTML += `<span class="fw-bold">Affection Level</span>: ${data.affection_level}/5 <br>`;
  breedDetails.innerHTML += `<span class="fw-bold">Origin</span>: ${data.origin} <br>`;
  breedDetails.innerHTML += `<span class="fw-bold">Description</span>: ${data.description} <br>`;

  // display cat image
  let breedInfo = document.getElementById("breedInfo");
  let image_reference = data.reference_image_id;
  url = `/api/catImg/${image_reference}`;
  response = await fetch(url);
  data = await response.json();
  breedInfo.innerHTML = `<img src="${data.url}" class="rounded">`;
}

async function frontPageDisplayCatBreedInfo() {
  // call local cat API
  let catId = document.getElementById("catBreeds").value;
  let url = `/api/cat/${catId}`;
  let response = await fetch(url);
  let data = await response.json();

  let breedDetails = document.getElementById('displaySelectedBreed');

  breedDetails.innerHTML = `<h3 class="text-decoration-underline"> ${data.name}</h2>`;
  breedDetails.innerHTML += `<span class="fw-bold">Weight</span>: ${data.weight.metric} pounds<br>`;
  breedDetails.innerHTML += `<span class="fw-bold">Life Span</span>: ${data.life_span} years<br> `;
  breedDetails.innerHTML += `<span class="fw-bold">Temperament</span>: ${data.temperament} <br> `;
  breedDetails.innerHTML += `<span class="fw-bold">Affection Level</span>: ${data.affection_level}/5 <br>`;
  breedDetails.innerHTML += `<span class="fw-bold">Origin</span>: ${data.origin} <br>`;
  breedDetails.innerHTML += `<span class="fw-bold">Description</span>: ${data.description} <br>`;

    // display cat image
    let breedPhoto = document.getElementById('catBreedPhoto');
    let image_reference = data.reference_image_id;
    url = `/api/catImg/${image_reference}`;
    response = await fetch(url);
    data = await response.json();
    breedPhoto.innerHTML = `<img src="${data.url}" class="img-fluid h-100 w-100 p-2 rounded" style="object-fit:contain;">`;
}

async function frontPageDogBreedInfo() {
    // call local dog API
    let dogId = document.getElementById("dogBreeds").value;
    let url = `api/dog/${dogId}`;
    let response = await fetch(url);
    let data = await response.json();
    //console.log(data.name);
  
    // display breed info
    let breedDetails = document.getElementById("displayDogBreed");
    breedDetails.innerHTML = `<h3 class="text-decoration-underline"> ${data.name}</h3>`;
    breedDetails.innerHTML += `<span class="fw-bold">Weight</span>: ${data.weight.metric} pounds<br>`;
    breedDetails.innerHTML += `<span class="fw-bold">Height</span>: ${data.height.metric} inches<br>`;
    breedDetails.innerHTML += `<span class="fw-bold">Life Span</span>: ${data.life_span}<br> `;
    breedDetails.innerHTML += `<span class="fw-bold">Temperament</span>: ${data.temperament} <br> `;
  
    // display dog image
    let breedInfo = document.getElementById("dogBreedPhoto");
    let image_reference = data.reference_image_id;
    console.log(image_reference);
    url = `/api/dogImg/${image_reference}`;
    response = await fetch(url);
    data = await response.json();
    breedInfo.innerHTML = `<img src="${data.url}" class="img-fluid h-100 w-100 p-2 rounded" style="object-fit:contain;">`;
}