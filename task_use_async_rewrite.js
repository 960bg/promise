// Перепишите, используя async/await
// Перепишите один из примеров раздела Цепочка промисов, используя async/await вместо .then/catch:

async function loadJson(url) {
  const response = await fetch(url);

  if (response.status == 200) {
    let json = await response.json(); // (3)
    console.log('json = ', json);

    return json;
  } else {
    throw new Error(response.status);
  }
}

// console.log(loadJson('no-such-user.json'));

const url = `https://api.github.com/users/8`;
// let  name ;
loadJson(url) // (3)
  .then(console.log)
  .catch(console.log); // Error: 404

// console.log('name', name);
