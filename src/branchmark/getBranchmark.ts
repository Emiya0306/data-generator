interface ValueOptions {
  count: number;
}

interface GetBranchmarkArgs {
  column: number[];
  row: number[];
  measure: ValueOptions;
}

debugger;

export function getBranchmark(args: GetBranchmarkArgs) {
  const { column, row, measure } = args;

  const headers: string[] = [];
  const table: string[][] = [];

  for (let i = 0; i < column.length; i += 1) {
    headers.push(`ColDim-${i}`);
  }

  for (let i = 0; i < row.length; i += 1) {
    headers.push(`RowDim-${i}`);
  }

  for (let i = 0; i < measure.count; i += 1) {
    headers.push(`Measure-${i}`);
  }

  let colMemberIds = Array.from({ length: column.length }).map(() => 0);
  let rowMemberIds = Array.from({ length: row.length }).map(() => 0);

  function addIds(ids: number[], config: number[]) {
    let lastId = ids[ids.length - 1] + 1;
    let restIds = [...ids].splice(0, ids.length - 1);

    if (lastId > config[config.length - 1]) {
      lastId = 0;
      restIds = addIds(restIds, [...config].splice(0, config.length - 1));
    }
    return [...restIds, lastId];
  }

  do {
    const measureCells = Array
      .from({ length: measure.count })
      .map(() => (Math.random() * 100).toFixed(0));

    table.push([
      ...colMemberIds.map((id) => `col-${id}`),
      ...rowMemberIds.map((id) => `row-${id}`),
      ...measureCells,
    ]);

    if (rowMemberIds.every((id, idx) => row[idx] === id)) {
      colMemberIds = addIds(colMemberIds, column);
      rowMemberIds = Array.from({ length: row.length }).map(() => 0);
    } else {
      rowMemberIds = addIds(rowMemberIds, row);
    }
  } while (
    colMemberIds.some((id, idx) => column[idx] !== id)
    || rowMemberIds.some((id, idx) => row[idx] !== id)
  );

  const measureCells = Array
    .from({ length: measure.count })
    .map(() => (Math.random() * 100).toFixed(0));

  table.push([
    ...colMemberIds.map((id) => `col-${id}`),
    ...rowMemberIds.map((id) => `row-${id}`),
    ...measureCells,
  ]);

  return [
    headers,
    ...table,
  ].map((record) => record.join(',')).join('\r\n');
}
