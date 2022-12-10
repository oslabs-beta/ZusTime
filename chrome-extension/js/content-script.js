console.log('hello this is coming from content-script.ts');

//sending a message
chrome.runtime.sendMessage({ greeting: 'hello Samantha' }, (response) => {
  console.log(response.farewell);
});

document.getElementById("test").addEventListener("click", function() {
  alert(yay);
  console.log('hey');
  chrome.runtime.sendMessage({
    hey: 'sam'
  })
});
