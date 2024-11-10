let previousRandomNum;
let favQuotes = JSON.parse(localStorage.getItem("favQuotes")) || [];

function randomQuote() {
  const quotesContainer = document.getElementById("quote-container");
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

  quotesContainer.innerHTML = `
        <p id="quote" class="fw-bold fs-4">
            <i class="fa-solid fa-quote-left"></i>
            ${quotes[randomNum].quote}
            <i class="fa-solid fa-quote-right"></i>
        </p>
        <h2 id="author" class="fs-5 text-end">${quotes[randomNum].author}</h2>`;

  const copyBtn = document.getElementById("copy-btn");
  copyBtn.addEventListener("click", () => {
    const quoteText = quotes[randomNum].quote;
    navigator.clipboard.writeText(quoteText);
  });
  const likeQuote = document.getElementById("quote-like");
  likeQuote.classList.remove("fa-solid");
  likeQuote.classList.add("fa-regular");
  likeQuote.style.color = "#212529";
  likeQuote.onclick = function () {
    if (likeQuote.classList.contains("fa-regular")) {
      likeQuote.classList.remove("fa-regular");
      likeQuote.classList.add("fa-solid");
      likeQuote.style.color = "red";
      favQuotes.push(quotes[randomNum]);
      localStorage.setItem("favQuotes", JSON.stringify(favQuotes));
      console.log(favQuotes);
    } else {
      likeQuote.classList.remove("fa-solid");
      likeQuote.classList.add("fa-regular");
      likeQuote.style.color = "#212529";
      favQuotes.pop();
    }
    updateFavoriteQuotes();
  };
}

const myFavQuotes = document.getElementById("fav-quotes");
function updateFavoriteQuotes() {
  myFavQuotes.innerHTML = "";

  if (favQuotes.length === 0) {
    myFavQuotes.innerHTML = "You haven't added any quotes yet";
  } else {
    favQuotes.forEach((quote) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <p>
          ${quote.quote}
        </p>
        <span class="d-block float-end">${quote.author}</span>
        <div class="clearfix mb-2"></div>
      `;
      myFavQuotes.appendChild(listItem);
    });
  }
}

function deleteAllFavQuotes() {
  if (favQuotes.length >= 1) {
    myFavQuotes.innerHTML = "You haven't added any quotes yet";
    favQuotes = [];
    localStorage.removeItem("favQuotes");
  }
}
document
  .getElementById("clear-favQuotes")
  .addEventListener("click", deleteAllFavQuotes);

document
  .getElementById("quote-Generator")
  .addEventListener("click", randomQuote);

randomQuote();
updateFavoriteQuotes();

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
