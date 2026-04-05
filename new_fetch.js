// ---- ЗАДАНИЕ ----
// Вот несколько классических шуток из рождественских хлопушек.

// Существует вымышленный URL-адрес API ( http://great.jokes/christmas),
//     по которому можно получить список рождественских шуток в формате JSON.

// Ваше задание
// Напишите асинхронную функцию, которая принимает объект apiUrl и jokeId возвращает промис.
// Чтобы получить указанную шутку, данные необходимо отфильтровать id.
// Когда вы поймете шутку, к ней должно быть доступно через простой API с использованием saySetup методов sayPunchLine.
// Обработка случаев ошибок

// Если шутку найти не удаётся, выведите сообщение об ошибке в
// следующем формате new Error('No jokes found id: {jokeId}'): .
// Получение шуток из другого URL-адреса API может вернуть данные другой структуры;
// new Error('No jokes at url: {url}')в случае неожиданной структуры данных может быть выдано следующее сообщение об ошибке.
// Выбрасывать ошибки в стиле промисов

// Информация
// Получите данные, используя фиктивную fetch(url)функцию,
//  которая реализует основные возможности API fetch.
//  Узнайте о fetch . Узнайте об async/await .

// Форма данных для шутки:

// {
//   jokes: [{
//     id: 101,
//     setup: "Who is Santa's favorite singer?",
//     punchLine: "Elf-is Presley!"
//   },
// ...moreJokes]
// Use for your tests ^^

// ---- ЗАДАНИЕ ----

const JOKES = [
  {
    id: 101,
    setup: "Who is Santa's favorite singer?",
    punchLine: 'Elf-is Presley!',
  },
  {
    id: 102,
    setup: 'setup JOKE 2?',
    punchLine: ' punchLine EJOKE 2',
  },
  {
    id: 103,
    setup: 'setup JOKE 3?',
    punchLine: ' punchLine EJOKE 3',
  },
];

const _URL = 'http://great.jokes/christmas';

const Headers = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'max-age=43200',
  date: 'Mon, 21 Oct 2023 14:00:00 GMT',
  server: 'cloudflare',
  'x-powered-by': 'Express',
  'content-length': '148',
};

// sayJoke('http://great.jokes/christmas', 101).then((res) => {
//   console.log('then((res res = ', res);

// });

function sayJoke(apiUrl, jokeId) {
  console.log('[ apiUrl ] = ', apiUrl);
  console.log('[ jokeId ] = ', jokeId);

  return new Promise((resolve, reject) => {
    const request = {
      status: '',
      statusText: '',
      ok: false,
      headers: {},
      json() {
        return new Promise((resolve, reject) => {});
      },
      text() {
        return new Promise((resolve, reject) => {});
      },
      blob() {
        return new Promise((resolve, reject) => {});
      },
      badRequest() {
        this.ok = false;
        this.status = '400';
        this.statusText = 'No data';
      },
      //   _check() {
      //     if (!this.ok) {
      //     }
      //   },
    };

    if (apiUrl !== _URL) {
      request.badRequest();
      console.log('== reject(new Error(`No jokes at url: ${apiUrl}`)) == ');

      return new Error(`No jokes at url: ${apiUrl}`);
      // return reject(new Error(`No jokes at url: ${apiUrl}`));
      //   return reject(request);
    }

    const joke = searchJoke(jokeId);
    // console.log('searchJoke(jokeId) = ', searchJoke(jokeId));

    if (!joke) {
      console.log('reject(new Error(`No jokes found id: ${jokeId}`))');

      return new Error(`No jokes found id: ${jokeId}`);
      // return reject(new Error(`No jokes found id: ${jokeId}`));
    }

    const result = makeJoke(joke);

    // console.log('result joke', result);

    return resolve(result);
  });
  // use mocked `fetch(url)`
  //   return {
  //     saySetup() {
  //       return 'setup';
  //     },
  //     sayPunchLine() {
  //       return 'punchline';
  //     },
  //   };
}

function makeJoke(joke) {
  const result = joke[0];
  //   console.log('makeJoke(joke) result = ', result);

  const proto = {
    saySetup() {
      return this.setup;

      return new Promise((resolve) => {
        console.log('== saySetup() == ', this.setup);
        resolve(this.setup);
      });
    },
    sayPunchLine() {
      return this.punchLine;
      return new Promise((resolve) => {
        console.log('== sayPunchLine() == ', this.punchLine);
        resolve(this.punchLine);
      });
    },
  };

  Object.setPrototypeOf(result, proto);

  return result;
}

function makeJsonRequest(data) {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
}
function makeTextRequest(data) {
  return new Promise((resolve, reject) => {
    resolve(JSON.stringify(data));
  });
}

function searchJoke(jokeId) {
  console.log('searchJoke(jokeId)  = ', jokeId);

  const result = JOKES.filter((joke) => jokeId === joke.id);

  console.log('searchJoke(jokeId) result  = ', result);
  if (result.length === 0) {
    console.log('searchJoke(jokeId) (result.length === 0)  = ', result.length);
    return false;
  }
  return result;
}

async function run() {
  const promise = await fetch('http://great.jokes/christmas');
  const res = await promise.json();
  const jokes = await res.jokes;
  console.log(jokes);
}

run();
