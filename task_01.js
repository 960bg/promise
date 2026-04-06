function doFirstThing() {
  return new Promise((resolve) => {
    console.log('First thing done');
    resolve();
  });
}

function doSecondThing() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Second thing done');
      resolve();
    }, 1000);
  });
}

function doThirdThing() {
  return new Promise((resolve) => {
    console.log('Third thing done');
    resolve();
  });
}

function doFourThing() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('FourThing thing done');
      resolve();
    }, 1001);
  });
}

// doFirstThing().then(doSecondThing).then(doThirdThing);
// doFirstThing();
// doSecondThing();
// doThirdThing();
doFourThing().then(doSecondThing).then(doThirdThing).then(doFirstThing);

на что повлият если я исправлю в коде в строке (1) запись на ...eslintPluginUnicorn.configs.recommended


import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default [
  // …
  eslintPluginUnicorn.configs.recommended, //(1)
  {
    rules: {
      'unicorn/better-regex': 'warn',
    },
  },
];
