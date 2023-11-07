export default function Loading() {
  return (
    <main>
      <h1>Users</h1>

      <table>
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Email</th>
            <th>Name</th>
            <th style={{ width: '10%', textAlign: 'center' }}>Verified</th>
            <th style={{ width: '10%', textAlign: 'right' }} />
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }, (_, i) => (
            <tr key={i}>
              <td>…</td>
              <td>…</td>
              <td style={{ textAlign: 'center' }}>…</td>
              <td>
                <button style={{ visibility: 'hidden' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>&nbsp;</nav>
    </main>
  );
}
