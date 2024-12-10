interface IExpectedInput {
  code: string;
  language: string;
}

self.addEventListener("message", (event: MessageEvent<IExpectedInput>) => {
  try {
    const result = eval(event.data.code);
    self.postMessage(result);
  } catch (error: any) {
    self.postMessage(error.message);
  }
});
