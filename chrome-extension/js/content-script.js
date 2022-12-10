//sending a message
chrome.runtime.sendMessage({ greeting: 'hello Samantha' }, (response) => {
  console.log(response.farewell);
});


// console.log('hello this is coming from content-script.ts');

// document.getElementsByClassName("lnXdpd").addEventListener("click", function() {
//   alert(yay);
//   console.log('hey');
//   chrome.runtime.sendMessage({
//     hey: 'sam'
//   })
// });
