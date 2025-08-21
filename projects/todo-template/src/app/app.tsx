import { Outlet } from 'react-router-dom'

function App() {
	return (
		<div className='relative min-h-screen flex flex-col select-none'>
			<Outlet />
		</div>
	)
}

export default App
