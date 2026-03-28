const p = new Promise((resolve, reject) => {
  if (Math.random() > 0.4) {
    resolve('Math.random()>0.4 = true');
  } else {
    reject('Math.random()>0.4 = false');
  }
});

const yes = (value) => value + ' yes ';
// const no = (value) => value + ' no ';
const no = (value) => {
  return new Promise((resolve, reject) => {
    reject(new Error('Ошибка промиса!', value));
  });
};
const first = (value) => console.log(value + ' first ');
const second = (value) => console.log(value + ' second ');

const result = p.then(yes, no).then(first, second);

// console.log(result);

function httpGet(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function () {
      reject(new Error('Network Error'));
    };

    xhr.send();
  });
}
