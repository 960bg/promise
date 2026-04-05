// Неудачные приключения Боба, высокооплачиваемого консультанта
// Глава 1: данные и нарушенные обещания
// Ваша компания приобрела новую систему оформления заказов и наняла Боба,
//  высокооплачиваемого консультанта, для разработки пользовательского интерфейса.
//  Однако из-за постоянных задержек и невыполнения обязательств его контракт
//  подошел к концу. Боб исчезает, словно призрак, в тумане, оставляя вас наедине
//  с задачей спасти остатки его работы.

// Одно ясно: Боб оставил после себя целую череду нарушенных обещаний.

// Вы можете помочь исправить ситуацию?

// В тестовом примере ( submitOrder(12345)) в консоль должно быть выведено
// сообщение «Your order was placed successfully». Нажмите «Attempt», чтобы проверить, прошли ли вы задание.

// Несколько замечаний:

// Можно предположить, что функции, которые вызывает Боб,
// действительно существуют и принимают заданные параметры в заданном порядке.

// Пользователь "12345" является допустимым пользователем для тестирования.
// Любая предоставленная функция, имя которой заканчивается на Async, возвращает Promise.
// Любая предоставленная функция, имя которой не заканчивается на Async, является синхронной, например, calculateShipping().
// Как вы, возможно, уже поняли, цель этого задания — ознакомить вас с использованием промисов JavaScript для асинхронного программирования.

function submitOrder(user) {
  var shoppingCart, zipCode, shippingRate, orderSuccessful;
  const arrPromise = [];
  // Get the current user's shopping cart
  arrPromise.push(
    OrderAPI.getShoppingCartAsync(user).then(function (cart) {
      shoppingCart = cart;
    })
  );

  // Also look up the ZIP code from their profile
  arrPromise.push(
    CustomerAPI.getProfileAsync(user).then(function (profile) {
      zipCode = profile.zipCode;
    })
  );

  Promise.all(arrPromise)
    .then((data) => {
      console.log('Promise.all data = ', data);
      // Calculate the shipping fees
      shippingRate = calculateShipping(shoppingCart, zipCode);
    })
    .then((thenData) => {
      console.log('Promise.all thenData = ', thenData);
      // Submit the order
      OrderAPI.placeOrderAsync(shoppingCart, shippingRate).then(
        function (success) {
          orderSuccessful = success;
        }
      );
    })
    .then((thenThenData) => {
      console.log('Promise.all thenThenData = ', thenThenData);
      console.log(
        `Your order ${orderSuccessful ? 'was' : 'was NOT'} placed successfully`
      );
    });
}
