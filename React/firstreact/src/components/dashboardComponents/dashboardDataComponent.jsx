import DashboardHeaderDrawer from './dashboardHeaderDrawerComponent';

import {Box} from '@material-ui/core';
import HeaderComponentStyles from './dashboardHeaderConfig';

import Newrestaurant from '../newRestaurantComponent'
import Dashboardcontent from './dashboardContentComponent'

let Childcomponent = null;

const Dashboarddata = (props) => {

    const styles = HeaderComponentStyles(props);

    if (window.location.pathname === '/dashboard'){
        Childcomponent =  Dashboardcontent
    }else if (window.location.pathname === '/dashboard/addrestaurant'){
        Childcomponent =  Newrestaurant
    }

    return(
        <div>
            <DashboardHeaderDrawer {...props.dashheaddata}/>
            <Box className={styles.dashcontent}>
                <Childcomponent />
            </Box>
        </div>
    )
}

export default Dashboarddata