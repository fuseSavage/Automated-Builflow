import React from 'react'
import { Route, Switch, Link } from 'react-router-dom';
import Home from '../contents/Home';
import Main from '../contents/Main';

export default function Content() {

    // const name = useLocation().state.name;

    // function test() {
    //     <Main name='chaiwat.si' />
    // }
    // test()

    return (
            <div className="page-content">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/rdh-ro">Main</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    {/* <Route path='/rdh-ro' component={Main}></Route> */}
                    <Route path='/rdh-ro' component={() => <Main name='chaiwat.si' />}></Route>
                </Switch>
            </div>
    )
}