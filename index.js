// const p = new Promise((resolve, reject) => {
//   if (Math.random() > 0.4) {
//     resolve('Math.random()>0.4 = true');
//   } else {
//     reject('Math.random()>0.4 = false');
//   }
// });

// const yes = (value) => value + ' yes ';
// // const no = (value) => value + ' no ';
// const no = (value) => {
//   return new Promise((resolve, reject) => {
//     reject(new Error('Ошибка промиса!', value));
//   });
// };
// const first = (value) => console.log(value + ' first ');
// const second = (value) => console.log(value + ' second ');

// const result = p.then(yes, no).then(first, second);

// // console.log(result);

// function httpGet(url) {
//   return new Promise(function (resolve, reject) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);

//     xhr.onload = function () {
//       if (this.status == 200) {
//         resolve(this.response);
//       } else {
//         var error = new Error(this.statusText);
//         error.code = this.status;
//         reject(error);
//       }
//     };

//     xhr.onerror = function () {
//       reject(new Error('Network Error'));
//     };

//     xhr.send();
//   });
// }

// ================================================

// function timer(timeout) {
//   return new Promise((resolve, reject) => {
//     throw new Error('--Error-- Ошибка в промисе БЛОК TRY');
//     try {
//       setTimeout(() => {
//         try {
//           console.log('1. Сообщение появилось через ', timeout, ' секунд');
//           resolve(timeout);
//           console.log('2. Сообщение внутри setTimeout блок try с ошибкой ');
//           throw new Error('--Error-- Ошибка в промисе в setTimeout');
//         } catch (error) {
//           console.log(
//             '3. Сообщение внутри setTimeout с ошибкой блок catch. error:',
//             error.message
//           );
//         }
//       }, timeout);
//     } catch (error) {
//       console.log('БЛОК CATCH Ошибка!!!!!!: ', error.message);
//     }
//   });
// }

// // timer(1000).then(yes, no).catch(f_catch);
// timer(1000)
//   .then(yes)
//   .catch(f_catch)
//   .finally(() => {
//     console.log('finnally');
//   });

// function yes(v) {
//   console.log('function yes:', v);
// }
// function no(v) {
//   console.log('function no:', v);
// }
// function f_catch(v) {
//   console.log('function f_catch:', v);
// }
// ================================================

// ---------- промисификация ----------

const async_fn = (cb) => {
  console.log('Получение данных ...');
  setTimeout(() => {
    const data = { status: 500 };
    console.log('setTimeout: Данные получены');
    cb(data);
    return data;
  }, 500);
};

function promisify(f) {
  return function (...args) {
    // возвращает функцию-обёртку
    return new Promise((resolve, reject) => {
      function callback(err, result) {
        console.log('function callback(err, result)');
        console.log('err', err);
        console.log('result', result);

        // наш специальный колбэк для f
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // добавляем колбэк в конец аргументов f

      f.call(this, ...args); // вызываем оригинальную функцию
    });
  };
}

const my_cb = (data) => {
  console.log('Выполение коллбек функции. Данные получены');
  console.log('data = ', data);
  return JSON.stringify(data);
};

const fabric_promise_2 = (fn) => {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function cb(data) {
        console.log(' -- Фабрика 2 -- ');
        if (data) {
          resolve(data);
        } else reject(new Error('--- NO DATA ---'));
      }

      console.log(' args.push(cb);');

      args.push(cb);
      console.log(args);

      fn.call(this, ...args);
    });
  };
};

// использование:
let loadScriptPromise = fabric_promise_2(async_fn);
loadScriptPromise().then((data) => {
  console.log('THEN');
  console.log('Data = ', data);
});

const fabric_promise = (fn, callbacks) => {
  // return function () {
  return new Promise((resolve) => {
    fn((data) => {
      console.log('Фабрика');

      callbacks(data);
      resolve(data);
    });
  });
};
// };

// const my_async_func = fabric_promise(async_fn, my_cb);
// my_async_func.then((data) => {
//   console.log('my_asybc_func');
//   console.log('Эту функцию-промис создала фабрика');
//   console.log('Data = ');
//   console.log(data);
// });

// const promise_async_fn = () => {
//   return new Promise((resolve) => {
//     console.log('Получение данных ...');
//     setTimeout(() => {
//       const data = { status: 500 };
//       console.log('setTimeout: Данные получены');
//       resolve(data);
//     }, 500);
//   });
// };

// const get_data = () => {
//   let our_data = 'our_data';

//   async_fn(my_cb);

//   promise_async_fn().then((data) => {
//     console.log('Выполение промиса. Данные получены');
//     console.log('data = ', data);
//     our_data += JSON.stringify(data);

//     console.log('our_data = ', our_data);
//   });
// };

// get_data();
