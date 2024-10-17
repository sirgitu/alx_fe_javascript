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
