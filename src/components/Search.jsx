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

import { useEffect, useRef } from 'react'

export function Search({ query, setQuery }) {
  const InputEl = useRef(null)
  useEffect(() => {
    InputEl.current.focus()
    function callback(e) {
      if (document.activeElement === InputEl.current) return

      if (e.code === 'Enter') {
        InputEl.current.focus()
        setQuery('')
      }
    }
    document.addEventListener('keydown', callback)
    return () => document.removeEventListener('keydown', callback)
  }, [setQuery])
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      ref={InputEl}
    />
  )
}
