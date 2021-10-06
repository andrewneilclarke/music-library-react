import { Link } from 'react-router-dom'
import Library from './Library'

const Nav = () => {
    return (
        <nav className="nav bg-red-200 text-green-400 text-xl">
            <Link to="/">Library</Link>
            <Link to="/add">Add Music</Link>
        </nav >
    )
}

export default Nav
