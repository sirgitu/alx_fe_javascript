const serverUrl = 'https://jsonplaceholder.typicode.com/posts';

function syncData() {
  fetch(serverUrl)
    .then(response => response.json())
    .then(serverQuotes => {
      const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
      const mergedQuotes = mergeQuotes(localQuotes, serverQuotes);
      localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
      showRandomQuote();
    })
    .catch(error => console.error('Error fetching data:', error));
}

function mergeQuotes(localQuotes, serverQuotes) {
  // Simple conflict resolution: Prioritize server data
  return serverQuotes;
}

function handleConflict(localQuote, serverQuote) {
    // More sophisticated conflict resolution logic can be implemented here
    // For now, prioritize server data
    return serverQuote;
  }

  // ... (rest of your code)

function syncData() {
    // ... (same as above)
  }
  
  function mergeQuotes(localQuotes, serverQuotes) {
    // ... (same as above)
  }
  
  // ... (rest of your code)
  
  setInterval(syncData, 5000); // Sync every 5 seconds

  const quotes = [
    // ... your initial quotes
  ];
  
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteButton = document.getElementById("newQuote");
  const categoryFilter = document.getElementById("categoryFilter");
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
  
  async function showRandomQuote(category) {
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
    }
  }
  
  async function fetchQuotesFromServer() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Replace with your actual server URL
      const serverQuotes = await response.json();
  
      const mergedQuotes = mergeQuotes(quotes, serverQuotes);
      localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
      showRandomQuote(categoryFilter.value);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  function mergeQuotes(localQuotes, serverQuotes) {
    // Implement your conflict resolution logic here
    // For simplicity, prioritize server quotes
    return serverQuotes;
  }
  
  // ... (rest of your code)
  
  setInterval(fetchQuotesFromServer, 5000); // Fetch quotes from server every 5 seconds