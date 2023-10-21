let timerDisplay = document.getElementById("timer");
let startButton = document.getElementById("startButton");
let stopButton = document.getElementById("stopButton");
let clearHighlightsButton = document.getElementById("clearHighlightsButton");
let statisdisplay = document.getElementById("statis");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "timerUpdate") {
    console.log("log");
    const minutes = Math.floor(message.timeLeft / 60);
    const seconds = message.timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
  if (message.timerIndex%2==0) {
    statisdisplay.textContent = "Work for ";
  }
  else {
    statisdisplay.textContent = "Break for ";
  }
});

startButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "startTimer" });
});

stopButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "stopTimer" });
});

clearHighlightsButton.addEventListener("click", async () => {
  console.log("attempting to send message");
  await chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { message_id: "clearHighlights" });
    }
  );
});

// const clearHighlights = () => {

//   // chrome.tabs.sendMessage(tab.id, { message_id: "clearHighlights" });
//   // chrome.storage.local.clear();
// };
document.getElementById("flashcard-window-button").addEventListener("click", () => {
  chrome.windows.create({
    url: "flashcards.html",
    type: "popup",
    width: 800, // Adjust the size as needed
    height: 600,
  });
});