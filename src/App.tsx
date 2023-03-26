import './App.css'
import Face from './Face'

export default function App(): JSX.Element {
  return (
    <div className="app-container">
      <form>
        <Face />
        <input type="text" />
        <input type="password" />
      </form>
    </div>
  )
}
