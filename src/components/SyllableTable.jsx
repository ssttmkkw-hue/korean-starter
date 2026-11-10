// 가나다표：紧凑网格，点每个音节朗读
export default function SyllableTable({ table, speak, slow }) {
  const rate = slow ? 0.6 : 1

  return (
    <div className="syllable-table-wrap">
      <table className="syllable-table">
        <thead>
          <tr>
            <th></th>
            {table.vowels.map((v) => (
              <th key={v}>{v}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.consonant}>
              <th>{row.consonant}</th>
              {row.cells.map((cell) => (
                <td key={cell.syllable}>
                  <button
                    className="syllable-cell"
                    onClick={() => speak(cell.syllable, { rate })}
                    title={cell.ro}
                  >
                    {cell.syllable}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
