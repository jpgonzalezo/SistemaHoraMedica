import app from './app';

async function runApi() {
  await app.listen(4000);
  console.log("API run in localhost:4000");
}

;
runApi();