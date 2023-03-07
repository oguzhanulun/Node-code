const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("I could not write file");
      resolve("success");
    });
  });
};

//ASYNC -- AWAİT CODES----------------
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed : ${data}`);

    const res1Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const img = all.map((el) => el.body.message);
    console.log(img);

    await writeFilePro("dog-image.txt", img.join("\n"));
    console.log("random dog image saved");
  } catch (err) {
    console.log(err.message);

    throw err.message;
  }
  return "2: READY !!!";
};

(async () => {
  try {
    console.log("1:will get dog pics");
    const x = await getDogPic();
    console.log(x);
    console.log("3:done getting dog pics");
  } catch (err) {
    console.log("!!!!!!ERROR!!!!!!!");
  }
})();

/*
console.log("1:will get dog pics");
getDogPic()
  .then((x) => {
    console.log(x);
    console.log("3:done getting dog pics");
  })
  .catch((err) => {
    console.log("!!!!!!ERROR!!!!!!!");
  });
*/

//////////////PROMİSE CODES///////////
/*
readFilePro(`${__dirname}/dog.txt`)
  .then((result) => {
    console.log(`Breed : ${result}`);
    return superagent.get(`https://dog.ceo/api/breed/${result}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro("dog-image.txt", res.body.message);
  })
  .then(() => {
    console.log("random dog image saved");
  })
  .catch((err) => {
    console.log(err.message);
  });
*/
