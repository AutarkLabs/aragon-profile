import React, { useState } from 'react'

const ExampleComponent = props => {
  const [count, setCount] = useState(0)
  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>Press</button>
    </div>
  )
}

export default ExampleComponent
