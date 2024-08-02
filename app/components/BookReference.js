export default function BookReference({ references }) {
    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold">관련 본문</h3>
        <ul className="list-disc list-inside">
          {references.map((ref, index) => (
            <li key={index}>{ref}</li>
          ))}
        </ul>
      </div>
    )
  }