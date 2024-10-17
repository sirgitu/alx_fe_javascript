const quotes = [
    // ... your existing quotes
  ];
  
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteButton = document.getElementById("newQuote");
  const categoryFilter = document.getElementById("categoryFilter");
  const addQuoteForm = document.getElementById("addQuoteForm");
  const newQuoteText = document.getElementById("newQuoteText");
  const newQuoteAuthor = document.getElementById("newQuoteAuthor");
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
    const quoteAuthor = newQuoteAuthor.value;
    const quoteCategory = newQuoteCategory.value;
  
    if (quoteText && quoteAuthor && quoteCategory) {
      quotes.push({ text: quoteText, author: quoteAuthor, category: quoteCategory });
      showRandomQuote(quoteCategory);
      newQuoteText.value = "";
      newQuoteAuthor.value = "";
      newQuoteCategory.value = "";
  
      // Update categories in the filter dropdown
      populateCategories();
    }
  }
  
  function populateCategories() {
    const uniqueCategories = quotes.map(quote => quote.category).filter((value, index, self) => self.indexOf(value) === index);
  
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
    uniqueCategories.forEach(category => {
      categoryFilter.innerHTML += `<option value="${category}">${category}</option>`;
    });
  }
  
  function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    showRandomQuote(selectedCategory);
  }
  
  // Load quotes and populate categories on page load
  function loadQuotesAndCategories() {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
      quotes = JSON.parse(storedQuotes);
    }
    populateCategories();
    showRandomQuote(categoryFilter.value);
  }
  
  // Save quotes to local storage
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  // Load quotes and categories on page load
  window.addEventListener("load", loadQuotesAndCategories);
  
  // Event listeners
  newQuoteButton.addEventListener("click", showRandomQuote);
  addQuoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addQuote();
  });