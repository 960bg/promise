// Перепишите, используя async/await
// Ниже пример из раздела Цепочка промисов, перепишите его, используя async/await вместо .then/catch.

// В функции demoGithubUser замените рекурсию на цикл: используя async/await, сделать это будет просто.

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  async function fnResponseJson(response) {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new HttpError(response);
    }
  }
  let response = await fetch(url);
  let user = await fnResponseJson(response);
  return user;
}

// Запрашивать логин, пока github не вернёт существующего пользователя.
async function demoGithubUser() {
  let flag = false;
  do {
    try {
      let name = prompt('Введите логин?', 'iliakan');
      let user = await loadJson(`https://api.github.com/users/${name}`);
      alert(`Полное имя: ${user.name}.`);
      return user;
    } catch (err) {
      if (err instanceof HttpError && err.response.status == 404) {
        alert('Такого пользователя не существует, пожалуйста, повторите ввод.');
        flag = true;
      } else {
        throw err;
      }
    }
  } while (flag);
}

demoGithubUser();
