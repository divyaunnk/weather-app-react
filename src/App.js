import './App.css';
import TopButton from './components/TopButton';
import Inputs from './components/Inputs';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureDetails from './components/TemperatureDetail';
function App() {
  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-600">
      <TopButton />
      <Inputs />
      <TimeAndLocation />
      <TemperatureDetails />
    </div>
  );
}

export default App;
