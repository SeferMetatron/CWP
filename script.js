import { q, c } from "./utils.js";
import { GET, BASE_URL } from "./api.js";

const navBtnEl = q(".nav-item");
const filmWrapper = q(".film-wrapper");
const infoEl = q(".modal-detail");
const favFilm = q(".favourite-film");
const loginBtn = q(".login-btn");

navBtnEl.addEventListener("click", function () {
  location.reload();
});

loginBtn.addEventListener("click", function () {
  const userName = prompt("Please enter your username");
  const userPassword = prompt("Please enter your password");
  try {
    if (
      localStorage.getItem("userPassword") !== userPassword &&
      localStorage.getItem("userName") !== userName
    ) {
      alert("Username/password not recognized, please try again.");
      throw error;
    }
  } catch {
    localStorage.setItem("userPassword", userPassword);
    localStorage.setItem("userName", userName);
  }
});

let film = [];

GET(BASE_URL).then((data) => {
  film = data.results;

  film.forEach((el) => {
    const card = c("div");
    card.classList.add("film-card");
    filmWrapper.appendChild(card);
    card.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${el.poster_path}">`;

    card.addEventListener("click", function () {
      infoEl.classList.add("active");
      infoEl.innerHTML = `<div class="info-section">
            <div class="info">
            <img src="https://image.tmdb.org/t/p/w500/${el.poster_path}">
            </div>
            <div class="overview">
            <iframe width="800" height="350" src="https://www.youtube.com/embed/J6E4N3S-MPE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p class="overview-info">${el.original_title} <br> ${el.overview}</p>
            <div class="info-btn">
            <button class="add-fav">Add to favourites</button>
            <button class="close-btn">X</button>
            </div>
            </div>`;

      const btnEl = q(".close-btn");
      const addBtnEl = q(".add-fav");

      btnEl.addEventListener("click", function () {
        infoEl.classList.remove("active");
      });

      let newCard = card;
      addBtnEl.addEventListener("click", function () {
        favFilm.append(newCard);
      });
    });
  });
});
