export default function Refris({ refris }) {
    return (
        <ul>
            {refris.map((refri) => (
                <li key={refri.id}>
                    <p>{refri.name}</p>
                </li>
            ))}
        </ul>
    )
}