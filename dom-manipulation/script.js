const quotes = loadQuotesFromLocalStorage() || []; // Load from local storage or initialize empty array

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const addQuoteForm = document.createElement("form");
addQuoteForm.innerHTML = `
  <input type="text" id="newQuoteText" placeholder="Enter the quote">
  <input type="text" id="newQuoteAuthor" placeholder="Enter the author">
  <select id="newQuoteCategory">
    <option value="Inspirational">Inspirational</option>
    <option value="Funny">Funny</option>
    <option value="Motivational">Motivational</option>
  </select>
  <button type="submit">Add Quote</button>
`;
document.body.appendChild(addQuoteForm);

const newQuoteText = document.getElementById("newQuoteText");
const newQuoteAuthor = document.getElementById("newQuoteAuthor");
const newQuoteCategory = document.getElementById("newQuoteCategory");
const importFile = document.getElementById("importFile");

function showRandomQuote(category) {
  const filteredQuotes = quotes.filter(quote => quote.category === category);
  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];

    quoteDisplay.innerHTML = `"${randomQuote.text}" - ${randomQuote.author}`;
  } else {
    quoteDisplay.innerHTML = "No quotes found for that category.";
  }
}

function addQuote() {
  const quoteText = newQuoteText.value;
  const quoteAuthor = newQuoteAuthor.value;
  const quoteCategory = newQuoteCategory.value;

  if (quoteText && quoteAuthor && quoteCategory) {
    quotes.push({ text: quoteText, author: quoteAuthor, category: quoteCategory });
    showRandomQuote(quoteCategory);
    newQuoteText.value = "";
    newQuoteAuthor.value = "";
    newQuoteCategory.value = "";
    saveQuotes(); // Save quotes to local storage
  }
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotesFromLocalStorage() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    return JSON.parse(storedQuotes);
  }
  return null;
}

// Optional: Session Storage for Last Viewed Quote
function storeLastViewedQuote(quoteText) {
  sessionStorage.setItem("lastViewedQuote", quoteText);
}

function getLastViewedQuote() {
  return sessionStorage.getItem("lastViewedQuote");
}

// JSON Export Functionality (using Blob and URL.createObjectURL)
function exportQuotesToJson() {
  const jsonContent = JSON.stringify(quotes);
  const blob = new Blob([jsonContent], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();

  URL.revokeObjectURL(url); // Clean up the temporary URL
}

// JSON Import Functionality (using FileReader)
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes); // ... spreads the imported quotes array
    saveQuotes();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

newQuoteButton.addEventListener("click", showRandomQuote);
addQuoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addQuote();
});
importFile.addEventListener("change", importFromJsonFile);

// Optional: Load and display last viewed quote on initialization
const lastViewedQuote = getLastViewedQuote();
if (lastViewedQuote) {
  quoteDisplay.innerHTML = lastViewedQuote;
}