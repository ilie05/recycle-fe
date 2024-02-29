import './App.scss';
import 'boxicons/css/boxicons.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import DSAtNode from './pages/DSAtNode';


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<AppLayout/>}>
					<Route index element={<DSAtNode/>}/>
					<Route path='/started' element={<DSAtNode/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
