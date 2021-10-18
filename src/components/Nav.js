import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <nav className="nav bg-indigo-600 text-indigo-400 text-xl">
            <img className="w-8 h-8 bg-gray-300 rounded-full" src="https://cdn-icons-png.flaticon.com/512/1384/1384061.png" alt="artwork" />
            <Link to="/">Library</Link>
            <Link to="/add">Add Music</Link>
        </nav >
    )
}

export default Nav
