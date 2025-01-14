const highlightDisplay = document.getElementById("highlight-display");

document.addEventListener("DOMContentLoaded", async () => {
  let fetchedHighlights = await chrome.storage.local.get();
  //   console.log(fetchedHighlights.savedHighlights);
  Object.keys(fetchedHighlights.savedHighlights).forEach((pageURL) => {
    let pageHighlights = fetchedHighlights.savedHighlights[pageURL];
    console.log(pageHighlights);
    Object.keys(pageHighlights).forEach((highlightIndex) => {
      let highlight = pageHighlights[highlightIndex];
      let newLi = document.createElement("li");
      newLi.textContent = highlight.textContent;
      highlightDisplay.appendChild(newLi);
    });
  });
});
