const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
    // Add more quotes here
  ];
  
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteButton = document.getElementById("newQuote");
  
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
  
    quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.author}`;
  }
  
  function createAddQuoteForm() {
    const form = document.createElement("form");
    form.innerHTML = `
      <input type="text" id="newQuoteText" placeholder="Enter the quote">
      <input type="text" id="newQuoteAuthor" placeholder="Enter the author">
      <button type="submit">Add Quote</button>
    `;
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const newQuoteText = document.getElementById("newQuoteText").value;
      const newQuoteAuthor = document.getElementById("newQuoteAuthor").value;
  
      if (newQuoteText && newQuoteAuthor) {
        quotes.push({ text: newQuoteText, author: newQuoteAuthor });
        showRandomQuote();
        form.remove();
      }
    });
  
    quoteDisplay.appendChild(form);
  }
  
  newQuoteButton.addEventListener("click", showRandomQuote);
  createAddQuoteForm();

  