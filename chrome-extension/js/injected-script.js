console.log('hello im inside of injected scripts');

document.addEventListener('click', () => {
  //   window.postMessage({
  //     body: JSON.stringify(document.body.childNodes),
  //   });

  console.log(document.body.childNodes);

  const childNode = document.body.childNodes[0];
  let result;
  for (const key in childNode) {
    if (key.includes('reactFiber')) {
      console.log(key);
      result = childNode[key];
      break;
    }
  }

  console.log(
    'function definition',
    result._debugOwner.memoizedState.next.memoizedState[0][0]
  );
  let newResult = result._debugOwner.memoizedState.next.memoizedState[0][0]();
  console.log('invoked getSnapshot function', newResult);

  window.postMessage({ body: newResult });
});
