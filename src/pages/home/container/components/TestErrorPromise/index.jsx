const TestErrorPromise = () => {

  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  })

  throw promise
};

export default TestErrorPromise;
