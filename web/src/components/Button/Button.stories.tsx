import Button from './Button'

export const generated = () => {
  return (
    <div className="p-4 flex flex-row justify-around">
      <Button variant="primary">Enable</Button>
      <Button variant="white">Enable</Button>
      <Button variant="red">Enable</Button>
    </div>
  )
}

export default { title: 'Components/Button' }
