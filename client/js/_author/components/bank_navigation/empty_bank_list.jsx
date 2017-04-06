import React from 'react';

export default function EmptyBankList() {
  return (
    <table className="au-c-table is-empty">
      <tbody>
        <tr>
          <td>
            <div>
              There&#39;s nothing here.<br />
              Add a new assessment to get started.
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
