// Напишите функцию, которая, получив текстовую строку
// (возможно, с знаками препинания и переносами строк),
//  возвращает массив из 3 наиболее часто встречающихся
// слов в порядке убывания количества вхождений.

// let str = `I JavaScript# love JavaSc'ript+ love JavaScript JavaScript- JavaScript,!`;
let str = `a a a  b  c c  d d d d  e e e e e`;
// let str = `//wont won't won't `;
// let str = `    , e   .. `;
// let str = `    '  `;

// let result = str.match(/Java(Script)/g);

// console.log('result = ', result); // JavaScript
// console.log('result[0] = ', result[0]); // JavaScript
// console.log('result.length = ', result.length); // 1

function countArr(str = '') {
  if (str === '') {
    return [];
  }

  const lowCaseStr = str
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^a-z'\s]/g, '')
    .trim();

  console.log('myStr = ', lowCaseStr);

  if (str === '') {
    console.log('resultArr.slice(0,2) RESULT', []);
    return [];
  }

  const theWord = lowCaseStr.match(/[a-z]/gi);
  console.log('theWord === ', theWord);
  if (!theWord) {
    console.log('resultArr.slice(0,2) RESULT', []);
    return [];
  }

  const arrStr = lowCaseStr.split(' ');
  console.log('arrStr = === ', arrStr);

  const map = new Map();
  const resultArr = [];
  for (const word of arrStr) {
    if (!map.has(word)) {
      map.set(word, word);
    } else {
      continue;
    }

    let regex = new RegExp(`\\b${word}\\b`, 'gi');
    const result = lowCaseStr.match(regex);
    console.log('word = ', word);
    console.log('result = ', result);

    resultArr.push(result);
  }

  if (resultArr.length < 2) {
    return resultArr.slice(0, 3).map((el) => el[0]);
  }

  resultArr.sort((a, b) => {
    return b.length - a.length;
  });

  console.log('resultArr = ', resultArr);

  console.log(
    'resultArr.slice(0,2)',
    resultArr.slice(0, 3).map((el) => el[0])
  );

  return resultArr.slice(0, 3).map((el) => el[0]);
}

console.log(' countArr(str) ==== ', countArr(str));
