// Вызовите async–функцию из "обычной"
// Есть «обычная» функция. Как можно внутри неё получить результат выполнения async–функции?

async function wait() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return 10;
}

function f(flag = null) {
  if (flag) {
    console.log('flag = ', flag);
    return;
  }
  // ...что здесь написать?
  // чтобы вызвать wait() и дождаться результата "10" от async–функции
  // не забывайте, здесь нельзя использовать "await"

  const val = async (cb) => {
    const w = await wait();
    cb(w);
  };

  val((v) => {
    console.log(' v = ', v);

    f(v);
  });
}

f();

// Вызовите async–функцию из "обычной"
// Есть «обычная» функция. Как можно внутри неё получить результат выполнения async–функции?

async function wait2() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return 10;
}

function f2() {
  // ...что здесь написать?
  // чтобы вызвать wait() и дождаться результата "10" от async–функции
  // не забывайте, здесь нельзя использовать "await"

  const z = wait2().then((data) => {
    console.log('z = ', data);
    return data;
  });
}

f2();
