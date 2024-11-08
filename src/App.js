import React, { useState, useEffect, useCallback } from 'react';

function ZoesAccountsApp() {
  const [startingBalance, setStartingBalance] = useState(0);
  const [entries, setEntries] = useState([{ income: '', expense: '', date: '', notes: '' }]);
  const [closingBalance, setClosingBalance] = useState(startingBalance);

  // Memoize calculateClosingBalance to prevent it from changing on every render
  const calculateClosingBalance = useCallback(() => {
    let balance = startingBalance;
    const newEntries = entries.map((entry) => {
      const income = parseFloat(entry.income) || 0;
      const expense = parseFloat(entry.expense) || 0;
      const balanceChange = balance + income - expense;
      balance = balanceChange;
      return { ...entry, balanceChange };
    });
    setEntries(newEntries);
    setClosingBalance(balance);
  }, [startingBalance, entries]);

  // useEffect with memoized calculateClosingBalance
  useEffect(() => {
    calculateClosingBalance();
  }, [calculateClosingBalance]);

  const handleInputChange = (index, field, value) => {
    const updatedEntries = entries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setEntries(updatedEntries);
  };

  const addRow = () => {
    setEntries([...entries, { income: '', expense: '', date: '', notes: '' }]);
  };
  

  return (
    <div className="zoes-accounts p-4 text-center bg-blue-200">
      <h1 className='text-2xl font-extrabold mb-4'>Zoe's Accounts</h1>
      <div className='flex justify-around'>
      <label>
        Starting Balance: 
        <input className='ml-4 p-2 bg-white'
          type="number"
          value={startingBalance}
          onChange={(e) => setStartingBalance(parseFloat(e.target.value) || 0)}
        />
      </label>
      <h2>Closing Balance: <span className={`font-semibold ${
  closingBalance > 0.01 
    ? 'text-green-600' 
    : closingBalance < -0.01 
      ? 'text-red-600' 
      : 'text-black'
}`}>{closingBalance.toFixed(2)}</span></h2>
      </div>

      <section className='flex justify-center'>
        <div className='bg-gray-50 p-6 rounded-2xl m-4'>
          <table>
        <thead>
          <tr className='bg-blue-300'>
            <th className='border-[1px] border-gray-600'>Income</th>
            <th className='border-[1px] border-gray-600'>Expense</th>
            <th className='border-[1px] border-gray-600 px-4'>Balance</th>
            <th className='border-[1px] border-gray-600'>Date</th>
            <th className='border-[1px] border-gray-600'>Notes</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td className='border-[1px] border-gray-600'>
                <input
                  type="number"
                   className='text-green-500 p-1 bg-white'
                  value={entry.income}
                  onChange={(e) => handleInputChange(index, 'income', e.target.value)}
                />
              </td>
              <td className='border-[1px] border-gray-600'>
                <input
                  type="number"
                  className='text-red-500 p-1'
                  value={entry.expense}
                  onChange={(e) => handleInputChange(index, 'expense', e.target.value)}
                />
              </td>
              <td className='border-[1px] border-gray-600'>{entry.balanceChange !== undefined ? entry.balanceChange.toFixed(2) : '0.00'}</td>
              <td className='border-[1px] border-gray-600'>
                <input
                className='p-1'
                  type="date"
                  value={entry.date}
                  onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                />
              </td>
              <td className='border-[1px] border-gray-600'>
                <input
                className='p-1'
                  type="text"
                  value={entry.notes}
                  onChange={(e) => handleInputChange(index, 'notes', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      

      

    
      </section>
      <button onClick={addRow}>Add Row</button>
    </div>
  );
}

export default ZoesAccountsApp;
