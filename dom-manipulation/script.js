const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Inspirational" },
    { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon", category: "Funny" },
    // Add more quotes here
  ];
  
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteButton = document.getElementById("newQuote");
  const newQuoteText = document.getElementById("newQuoteText");
  const newQuoteCategory = document.getElementById("newQuoteCategory");
  
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
    const quoteCategory = newQuoteCategory.value;
  
    if (quoteText && quoteCategory) {
      quotes.push({ text: quoteText, category: quoteCategory });
      showRandomQuote(quoteCategory);
      newQuoteText.value = "";
      newQuoteCategory.value = "";
    }
  }
  
  newQuoteButton.addEventListener("click", showRandomQuote);
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    addQuote();
  });