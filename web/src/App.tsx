import './styles/global.css';

import { Procedure } from './components/Procedure';

function App() {

  return (
    <div>
      <Procedure completed={3} />
      <Procedure completed={10} />
      <Procedure completed={20} />
      <Procedure completed={30} />
    </div>
  )
}

export default App
