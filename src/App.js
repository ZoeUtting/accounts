import React, { useState, useEffect } from 'react';

function ZoesAccountsApp() {
  const [startingBalance, setStartingBalance] = useState(0);
  const [entries, setEntries] = useState(Array(30).fill({ income: '', expense: '', date: '', notes: '' }));
  const [closingBalance, setClosingBalance] = useState(startingBalance);

  // Add a new row to the entries
  const addRow = () => {
    setEntries([...entries, { income: '', expense: '', date: '', notes: '' }]);
  };

  // Calculate the closing balance and each row’s running total
  const calculateClosingBalance = (updatedEntries) => {
    let balance = startingBalance;
    const newEntries = updatedEntries.map((entry) => {
      const income = parseFloat(entry.income) || 0;
      const expense = parseFloat(entry.expense) || 0;
      const balanceChange = balance + income - expense;
      balance = balanceChange; // Update balance for the next row
      return { ...entry, balanceChange };
    });
    setEntries(newEntries);
    setClosingBalance(balance);
  };

  // Handle input changes and update the entries array, then recalculate balances
  const handleInputChange = (index, field, value) => {
    const updatedEntries = entries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    calculateClosingBalance(updatedEntries); // Automatically update balance after change
  };

  // Update balance when starting balance changes
  useEffect(() => {
    calculateClosingBalance(entries);
  }, [startingBalance]);

  return (
    <div className="zoes-accounts">
      <h1>Zoe's Accounts</h1>
      <label>
        Starting Balance: 
        <input
          type="number"
          value={startingBalance}
          onChange={(e) => setStartingBalance(parseFloat(e.target.value) || 0)}
        />
      </label>

      <table>
        <thead>
          <tr>
            <th>Income</th>
            <th>Expense</th>
            <th>Balance Change</th>
            <th>Date</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>
                <input
                  type="number"
                  value={entry.income}
                  onChange={(e) => handleInputChange(index, 'income', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={entry.expense}
                  onChange={(e) => handleInputChange(index, 'expense', e.target.value)}
                />
              </td>
              <td>{entry.balanceChange !== undefined ? entry.balanceChange.toFixed(2) : '0.00'}</td>
              <td>
                <input
                  type="date"
                  value={entry.date}
                  onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={entry.notes}
                  onChange={(e) => handleInputChange(index, 'notes', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addRow}>Add Row</button>

      <h2>Closing Balance: {closingBalance.toFixed(2)}</h2>
    </div>
  );
}

export default ZoesAccountsApp;
