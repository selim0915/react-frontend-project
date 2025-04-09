import React from 'react';

const AdminHelp: React.FC = () => (
  <table border={1} cellSpacing={0} style={{ fontSize: 10 }}>
    <thead>
      <tr>
        <th>Windows</th>
        <th>Git Bash</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>cd</td>
        <td>pwd</td>
      </tr>
      <tr>
        <td colSpan={2}>cd logs</td>
      </tr>
      <tr>
        <td>dir</td>
        <td>dir, ls</td>
      </tr>
      <tr>
        <td>type 2025-04-03.log</td>
        <td>tail -f 2025-04-04.log</td>
      </tr>
    </tbody>
  </table>
);

export default AdminHelp;
