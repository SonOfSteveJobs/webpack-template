import { Link, Outlet } from 'react-router-dom';
import cls from './App.module.css'

export const App = () => {
    return (
        <div className={cls.div}>
            Hello world!
            <br />
            <Link to={'/hello'}>Link</Link>
            <br />
            <Outlet />
        </div>
    )
};
