import dayjs from 'dayjs';

interface Args {
  customer: number;
}

export function getMrr(args: Args) {
  const { customer } = args;

  const headers: string[] = ['Customer', 'Subscription_Date', 'MRR_Confirm_Date', 'MRR_TOTAL', 'MRR_LAST_MONTH', 'MRR_NEW', 'MRR_UPSELL', 'MRR_LOST'];
  let table: string[][] = [];

  let minDate = '';
  let maxDate = '';

  for (let customerId = 1001; customerId <= customer; customerId += 1) {
    let lastMRR = 0;
    let confirmAt = dayjs('2017-01-01').add(Math.round(Math.random() * 365 * 3) - 1, 'day').subtract(15, 'month');
    const customMrrs: string[][] = [];
    for (let monthCount = 1; monthCount <= 16; monthCount += 1) {
      if (confirmAt.subtract(1, 'month').format('YYYY-MM-DD') >= '2017-01-01') {
        const newMRR = Math.round(Math.random() * 200);
        const upSellMRR = Math.round(Math.random() * 50);
        const lostMRR = Math.round(Math.random() * 9);
        const totalMRR = lastMRR + newMRR + upSellMRR - lostMRR;

        if (confirmAt.format('YYYY-MM-DD') > maxDate || maxDate === '') {
          maxDate = confirmAt.format('YYYY-MM-DD');
        }
        if (confirmAt.format('YYYY-MM-DD') < minDate || minDate === '') {
          minDate = confirmAt.format('YYYY-MM-DD');
        }

        const mrr = [
          String(customerId),
          confirmAt.subtract(1, 'month').format('YYYY-MM-DD'),
          confirmAt.format('YYYY-MM-DD'),
          String(totalMRR),
          String(lastMRR),
          String(newMRR),
          String(upSellMRR),
          String(lostMRR),
        ];
        customMrrs.push(mrr);

        lastMRR = totalMRR;
        confirmAt = confirmAt.add(1, 'month');
      }
    }
    table = [...table, ...customMrrs];
  }

  // eslint-disable-next-line no-console
  console.log('min date:', minDate);
  // eslint-disable-next-line no-console
  console.log('max date:', maxDate);

  return [
    headers,
    ...table,
  ].map((record) => record.join(',')).join('\r\n');
}
