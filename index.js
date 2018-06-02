const fs = require('fs')
const parse = require('csv-parse/lib/sync')

const csv = fs.readFileSync('./transactions.csv')
const [, ...transactions] = parse(csv)

const formattedTransactions = transactions.map(transaction => {
  const [date, , amount, , payee] = transaction

  const [year, month, day] = date.split('-')

  const qifText = `
D${month}/${day}/${year}
T${amount}
P${payee}
^
`

  return qifText.trim()
})

const text = '!Type:Bank\n' + formattedTransactions.join('\n')

fs.writeFile('transactions.qif', text, err => {
  if (err) throw err

  console.log('QIF File Made!')
})
