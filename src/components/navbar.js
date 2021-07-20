import {Link,Switch,Route, useRouteMatch, useHistory} from 'react-router-dom';
import {Visit} from './visit.js';
import {Doctor} from './doctor.js';
import Button from '@material-ui/core/Button';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
export function NavBar(){
    const {url} = useRouteMatch();
    const history = useHistory();
    const logout = () => {
        localStorage.removeItem("t");
        history.push("/");
    }
    return(
        <>
        <nav style={{padding:'25px 0px',background:'black',color:'white'}}>
            <h1>Hospital Management System</h1>
        <ul style={{display:'flex',flexDirection:'row',justifyContent:'space-around',listStyleType:'none'}}>
            <li><Link to={`${url}/visit`}><h1>Visit</h1>   </Link> </li>
            <li><Link to={`${url}/doctor`}><h1>Doctor</h1>  </Link> </li>
            <li><Button
                onClick={logout}
                variant="contained"
                color="default"
                endIcon={<PowerSettingsNewIcon>Logout</PowerSettingsNewIcon>}
                >
                    Logout
                </Button> </li>
        </ul>
        </nav>
        <div style={{padding:'25px'}}>
        <Switch>
            <Route exact path={`${url}`}>
                <Visit />
            </Route>
            <Route path={`${url}/visit`}>
                <Visit />
            </Route>
            <Route path={`${url}/doctor`}>
                <Doctor />
            </Route>
        </Switch>
        </div>
    </>
    )
}