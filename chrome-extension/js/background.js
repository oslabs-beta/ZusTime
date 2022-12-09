chrome.runtime.onInstalled.addListener(() => {
  console.log('hello Zustand');
});

//receiving a message
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension'
  );

  if (request.greeting === 'hello Samantha') {
    sendResponse({ farewell: 'goodbye Kelsey' });
  }
});
