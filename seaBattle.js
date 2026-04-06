// Должен возвращать false, если присутствуют нежелательные корабли.
// for field:
// 1,0,0,0,0,1,1,0,0,0
// 1,0,1,0,0,0,0,0,1,0
// 1,0,1,0,1,1,1,0,1,0
// 1,0,0,0,0,0,0,0,0,0
// 0,0,0,0,0,0,0,0,1,0
// 0,0,0,0,1,1,1,0,0,0
// 0,1,0,0,0,0,0,0,1,0
// 0,0,0,1,0,0,0,0,0,0
// 0,0,0,0,0,0,0,1,0,0
// 0,0,0,0,0,0,0,0,0,0
// : expected true to equal false
// Completed in 1ms

// Должен возвращать false, если количество кораблей какого-либо типа указано неверно.
// for field:
// 1,0,0,0,0,1,1,0,0,0
// 1,0,1,0,0,0,0,0,1,0
// 1,0,1,0,1,1,1,0,1,0
// 1,0,0,0,0,0,0,0,0,0
// 0,0,0,0,0,0,0,0,1,0
// 0,0,0,1,1,1,1,0,0,0
// 0,0,0,0,0,0,0,0,1,0
// 0,0,0,1,0,0,0,0,0,0
// 0,0,0,0,0,0,0,1,0,0
// 0,0,0,0,0,0,0,0,0,0
// : expected true to equal false
// Completed in 1ms

// Должен возвращаться false, если отсутствует часть кораблей.
// for field:
// 0,0,0,0,0,1,1,0,0,0
// 0,0,1,0,0,0,0,0,1,0
// 0,0,1,0,1,1,1,0,1,0
// 0,0,0,0,0,0,0,0,0,0
// 0,0,0,0,0,0,0,0,1,0
// 0,0,0,0,1,1,1,0,0,0
// 0,0,0,0,0,0,0,0,1,0
// 0,0,0,1,0,0,0,0,0,0
// 0,0,0,0,0,0,0,1,0,0
// 0,0,0,0,0,0,0,0,0,0
// : expected true to equal false

// Должен возвращать false, если корабли находятся в контакте.
// for field:
// 1,0,0,0,0,1,1,0,0,0
// 1,0,1,0,0,0,0,0,1,0
// 1,0,1,0,1,1,1,0,1,0
// 1,0,0,0,0,0,0,0,0,0
// 0,0,0,0,0,0,0,0,1,0
// 0,0,0,0,1,1,1,0,0,0
// 0,0,0,1,0,0,0,0,1,0
// 0,0,0,0,0,0,0,0,0,0
// 0,0,0,0,0,0,0,1,0,0
// 0,0,0,0,0,0,0,0,0,0
// : expected true to equal false

// Функция должна возвращать false, если некоторые корабли имеют неправильную форму (непрямую).
// for field:
// 1,0,0,0,0,1,1,0,0,0
// 1,0,0,0,0,0,0,0,1,0
// 1,1,0,0,1,1,1,0,1,0
// 0,0,0,0,0,0,0,0,0,0
// 0,0,0,0,0,0,0,0,1,0
// 0,0,0,0,1,1,1,0,0,0
// 0,0,0,0,0,0,0,0,1,0
// 0,1,0,1,0,0,0,0,0,0
// 0,1,0,0,0,0,0,1,0,0
// 0,0,0,0,0,0,0,0,0,0
// : expected true to equal false
// Completed in 1ms

// Must return false if the number and length of ships is not ok
// for field:
// 1,0,0,0,0,0,0,0,0,0
// 1,0,1,0,0,0,0,0,1,0
// 1,0,1,0,1,1,1,0,1,0
// 1,0,1,0,0,0,0,0,0,0
// 0,0,1,0,0,0,0,0,1,0
// 0,0,0,0,1,1,1,0,0,0
// 0,0,0,0,0,0,0,0,1,0
// 0,0,0,1,0,0,0,0,0,0
// 0,0,0,0,0,0,0,1,0,0
// 0,0,0,0,0,0,0,0,0,0
// : expected true to equal false

function checkData(field) {
  if (!Array.isArray(field)) {
    return false;
  }

  if (field.length !== 10) {
    return false;
  }

  console.log('field:');
  for (let i = 0; i < field.length; i++) {
    console.log(JSON.stringify(field[i]));
  }

  for (let i = 0; i < field.length; i++) {
    let row = field[i];
    if (row.length !== 10) {
      return false;
    }
  }
  return true;
}

function validateBattlefield(field) {
  const POINTS = [];
  const ships = [];
  const findCells = [];
  // проверка входных данных
  if (!checkData(field)) return false;

  //  поиск ячеек с 1
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      const el = field[r][c];

      if (el === 1) {
        // наискосок вниз вправо
        if (c + 1 < 10 && r + 1 < 10 && field[r + 1][c + 1] === 1) return false;
        // наискосок вниз влево
        if (c - 1 !== -1 && r + 1 < 10 && field[r + 1][c - 1] === 1)
          return false;

        POINTS.push([r, c]);

        //    проверить была ли уже обработана текущая ячейка
        if (findCells.find(([row, col]) => row === r && col === c)) {
          continue;
        }

        // искать след эл вправо
        const cellNextCol = adjCellsNextCol(field, [r, c]);
        if (cellNextCol.status) {
          findCells.push(...cellNextCol.result);
          ships.push(cellNextCol.result);
        }

        // искать след эл вниз
        const cellNextRow = adjCellsNextRow(field, [r, c]);
        if (cellNextRow.status) {
          findCells.push(...cellNextRow.result);
          ships.push(cellNextRow.result);
        }

        // если ни одной рядом с тек ячейкой не нашли
        // значит одиночный корабль
        if (!cellNextRow.status && !cellNextCol.status) {
          findCells.push([r, c]);
          ships.push([[r, c]]);
        }
      }
    }
  }

  // проверка правил
  const result = shipCheck(ships);

  console.log('result = ', result);

  return result;
}

// let adjCell = [point];
// смежные ячейки в строке
function adjCellsNextRow(
  field,
  current,
  cellsToShip = { status: false, result: [] }
) {
  const [r, c] = current;
  if (r + 1 >= 10) {
    return cellsToShip;
  }

  let point = field[r][c];
  let next = field[r + 1][c];
  console.log('point', point);
  console.log('next', next);

  if (point === 1 && 1 === next) {
    // если первый проход то записать текущую ячейку
    if (!cellsToShip.status) {
      cellsToShip.result.push([r, c]);
    }
    // записать найденную ячейку
    cellsToShip.status = true;
    cellsToShip.result.push([r + 1, c]);
    return adjCellsNextRow(field, [r + 1, c], cellsToShip);
  }

  return cellsToShip;
}

// смежные ячейки в столбце
function adjCellsNextCol(
  field,
  current,
  cellsToShip = { status: false, result: [] }
) {
  const [r, c] = current;
  if (c + 1 >= 10) {
    return cellsToShip;
  }

  let point = field[r][c];
  let next = field[r][c + 1];
  console.log('point', point);
  console.log('next', next);

  if (point === 1 && 1 === next) {
    // если первый проход то записать текущую ячейку
    if (!cellsToShip.status) {
      cellsToShip.result.push([r, c]);
    }
    // записать найденную ячейку
    cellsToShip.status = true;
    cellsToShip.result.push([r, c + 1]);
    return adjCellsNextCol(field, [r, c + 1], cellsToShip);
  }

  return cellsToShip;
}

function shipCheck(ships) {
  // кол-во кораблей = 10
  if (ships.length !== 10) {
    console.log('ships.length !== 10', ships.length !== 10);

    return false;
  }

  let ship1 = 0;
  let ship2 = 0;
  let ship3 = 0;
  let ship4 = 0;

  // определение корабля
  for (let i = 0; i < ships.length; i++) {
    const ship = ships[i];
    console.log('-- ship = ', ship);

    // более 4 палуб быть не может
    if (ship.length > 4) {
      console.log('ship.length > 4', ship.length > 4);
      return false;
    }
    switch (ship.length) {
      case 1:
        ship1 += 1;
        console.log('ship1: ', ship1);
        break;
      case 2:
        ship2 += 1;
        console.log('ship2: ', ship2);

        break;
      case 3:
        ship3 += 1;
        console.log('ship3: ', ship3);

        break;
      case 4:
        ship4 += 1;
        console.log('ship4: ', ship4);

        break;
      default:
        break;
    }
  }

  if (ship1 !== 4) {
    console.log('ship1 !== 4', ship1 !== 4);
    return false;
  }
  if (ship2 !== 3) {
    console.log('ship2 !== 3', ship2 !== 3);
    return false;
  }
  if (ship3 !== 2) {
    console.log('ship3 !== 2', ship3 !== 2);
    return false;
  }
  if (ship4 !== 1) {
    console.log('ship4 !== 1', ship4 !== 1);
    return false;
  }

  return true;
}

const field = [
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

validateBattlefield(field);
