let previousRandomNum;
let favQuotes = JSON.parse(localStorage.getItem("favQuotes")) || [];
const quotesContainer = document.getElementById("quote-container");
const myFavQuotes = document.getElementById("fav-quotes");
const copyBtn = document.getElementById("copy-btn");
const likeQuote = document.getElementById("quote-like");

function randomQuote() {
  const quotes = [
    {
      quote:
        "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
      author: "― Dr. Seuss",
    },
    {
      quote: "You only live once, but if you do it right, once is enough.",
      author: "― Mae West",
    },
    {
      quote: "Be the change that you wish to see in the world.",
      author: "― Mahatma Gandhi",
    },
    {
      quote:
        "Don't walk in front of me… I may not follow Don't walk behind me… I may not lead Walk beside me… just be my friend",
      author: "― Albert Camus",
    },
    {
      quote: "If you tell the truth, you don't have to remember anything.",
      author: "― Mark Twain",
    },
    {
      quote:
        "To live is the rarest thing in the world. Most people exist, that is all.",
      author: "― Oscar Wilde",
    },
    {
      quote: "Be yourself; everyone else is already taken.",
      author: "― Oscar Wilde",
    },
    {
      quote:
        "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
      author: "― Marilyn Monroe",
    },
    {
      quote:
        "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
      author: "― Albert Einstein",
    },
  ];

  let randomNum;
  do {
    randomNum = Math.round(Math.random() * (quotes.length - 1));
  } while (randomNum === previousRandomNum);
  previousRandomNum = randomNum;

  const selectedQuote = quotes[randomNum];
  quotesContainer.innerHTML = `
        <p id="quote" class="fw-bold fs-4">
            <i class="fa-solid fa-quote-left"></i>
            ${selectedQuote.quote}
            <i class="fa-solid fa-quote-right"></i>
        </p>
        <h2 id="author" class="fs-5 text-end">${selectedQuote.author}</h2>`;

  copyBtn.onclick = function () {
    navigator.clipboard.writeText(selectedQuote.quote);
  };

  updateLikeIcon(selectedQuote);

  likeQuote.onclick = function () {
    const existingQuote = favQuotes.find(
      (q) => q.quote === selectedQuote.quote
    );
    if (existingQuote) {
      favQuotes = favQuotes.filter((q) => q.quote !== selectedQuote.quote);
      likeQuote.classList.replace("fa-solid", "fa-regular");
      likeQuote.style.color = "#212529";
    } else {
      favQuotes.push(selectedQuote);
      likeQuote.classList.replace("fa-regular", "fa-solid");
      likeQuote.style.color = "red";
    }
    localStorage.setItem("favQuotes", JSON.stringify(favQuotes));
    updateFavoriteQuotes();
  };
}

function updateLikeIcon(selectedQuote) {
  const isFavorite = favQuotes.some((q) => q.quote === selectedQuote.quote);
  if (isFavorite) {
    likeQuote.classList.replace("fa-regular", "fa-solid");
    likeQuote.style.color = "red";
  } else {
    likeQuote.classList.replace("fa-solid", "fa-regular");
    likeQuote.style.color = "#212529";
  }
}

function updateFavoriteQuotes() {
  myFavQuotes.innerHTML = "";
  if (favQuotes.length === 0) {
    myFavQuotes.innerHTML = "You haven't added any quotes yet";
  } else {
    favQuotes.forEach((quote) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <p>${quote.quote}</p>
        <span class="d-block float-end">${quote.author}</span>
        <div class="clearfix mb-2"></div>`;
      myFavQuotes.appendChild(listItem);
    });
  }
}

function deleteAllFavQuotes() {
  favQuotes = [];
  localStorage.removeItem("favQuotes");
  updateFavoriteQuotes();
  updateLikeIcon();
  myFavQuotes.innerHTML = "You haven't added any quotes yet";
}

document
  .getElementById("clear-favQuotes")
  .addEventListener("click", deleteAllFavQuotes);
document
  .getElementById("quote-Generator")
  .addEventListener("click", randomQuote);

document.addEventListener("DOMContentLoaded", () => {
  randomQuote();
  updateFavoriteQuotes();
});

// Tooltips
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// Toast

const toastTrigger = document.getElementById("liveToastBtn");
const toastLiveExample = document.getElementById("liveToast");

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastTrigger.addEventListener("click", () => {
    toastBootstrap.show();
  });
}
