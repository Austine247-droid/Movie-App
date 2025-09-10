// function WatchedBox() {
//
//   const [isOpen2, setIsOpen2] = useState(true)
//   return (
//     <div className="box">
//       <button className="btn-toggle" onClick={() => setIsOpen2(open => !open)}>
//         {isOpen2 ? '–' : '+'}
//       </button>
//       {isOpen2 && (
//         <>
//
//         </>
//       )}
//     </div>
//   )
// }

export function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  )
}
