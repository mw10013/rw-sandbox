// Button.jsx
import classnames from 'classnames'

function Button({ size, bgColor, textColor, children }) {
  return (
    <button
      className={classnames(
        'bg-blue-500 text-white font-bold py-2 px-4 rounded',
        {
          'text-xs': size === 'sm',
          'text-xl': size === 'lg',
        }
      )}
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
