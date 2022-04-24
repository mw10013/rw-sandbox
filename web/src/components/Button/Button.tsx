// Button.jsx

function Button({ size, bgColor, textColor, children }) {
  return (
    <button
      className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
        size === 'sm' ? 'text-xs' : 'text-xl'
      }`}
    >
      {children}
    </button>
  )
}

export default Button

// const Button = () => {
//   return (
//     <div>
//       <h2>{'Button'}</h2>
//       <p>{'Find me in ./web/src/components/Button/Button.tsx'}</p>
//     </div>
//   )
// }

// export default Button
