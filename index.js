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

function timer(timeout) {
  return new Promise((resolve, reject) => {
    throw new Error('--Error-- Ошибка в промисе БЛОК TRY');
    try {
      setTimeout(() => {
        try {
          console.log('1. Сообщение появилось через ', timeout, ' секунд');
          resolve(timeout);
          console.log('2. Сообщение внутри setTimeout блок try с ошибкой ');
          throw new Error('--Error-- Ошибка в промисе в setTimeout');
        } catch (error) {
          console.log(
            '3. Сообщение внутри setTimeout с ошибкой блок catch. error:',
            error.message
          );
        }
      }, timeout);
    } catch (error) {
      console.log('БЛОК CATCH Ошибка!!!!!!: ', error.message);
    }
  });
}

// timer(1000).then(yes, no).catch(f_catch);
timer(1000)
  .then(yes)
  .catch(f_catch)
  .finally(() => {
    console.log('finnally');
  });

function yes(v) {
  console.log('function yes:', v);
}
function no(v) {
  console.log('function no:', v);
}
function f_catch(v) {
  console.log('function f_catch:', v);
}
