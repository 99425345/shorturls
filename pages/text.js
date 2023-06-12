const asyncTest = "Async test";

const syncTest = "Sync test";

const asyncFunction = () => {
  const text = asyncTest;
  setTimeout(() => {
    console.log(text);
  }, 10000);
};

const syncFunction = () => {
  const text = syncTest;
  console.log(text);
};

asyncFunction();
syncFunction();
