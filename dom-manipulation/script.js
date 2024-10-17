const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Inspirational" },
    { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon", category: "Funny" },
    // Add more quotes here
  ];
  
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteButton = document.getElementById("newQuote");
  const addQuoteForm = document.getElementById("addQuoteForm");
  const newQuoteText = document.getElementById("newQuoteText");
  const newQuoteAuthor = document.getElementById("newQuoteAuthor");
  const newQuoteCategory = document.getElementById("newQuoteCategory");
  
  function showRandomQuote(category) {
    const filteredQuotes = quotes.filter(quote => quote.category === category);
    if (filteredQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const randomQuote = filteredQuotes[randomIndex];
  
      quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.author}`;
    } else {
      quoteDisplay.textContent = "No quotes found for that category.";
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
    }
  }
  
  newQuoteButton.addEventListener("click", showRandomQuote);
  addQuoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addQuote();
  });