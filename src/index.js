import React from 'react';
import ReactDOM from 'react-dom';
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import CssBaseline from '@material-ui/core/CssBaseline';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from '@material-ui/styles';

import {GameLevel, Maximind} from './main';

const useStyles = makeStyles({
    app: {
        height: '100%',
        width: '100%',
        position: 'fixed'
    },
    navi: {
        height: '56px',
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    board: {
        height: '100%',
        width: '100%',
        position: 'fixed',
        paddingBottom: '56px',
    }
});

function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                Maximind.setup(newValue);
                Maximind.init(document.getElementById('game-board'));
                Maximind.start();
            }}
            showLabels
            className={classes.navi}
        >
            <BottomNavigationAction label="EASY" value={GameLevel.EASY} href=""/>
            <BottomNavigationAction label="NORMAL" value={GameLevel.NORMAL} href=""/>
            <BottomNavigationAction label="HARD" value={GameLevel.HARD} href=""/>
        </BottomNavigation>
    );
}

const defaultTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

function App() {
    const classes = useStyles();

    return (
        <React.Fragment children={Box}>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline/>
                <div className={classes.app}>
                    <div id="game-board" className={classes.board}/>
                    <SimpleBottomNavigation/>
                </div>
            </ThemeProvider>
        </React.Fragment>
    );
}

ReactDOM.render(<App/>, document.querySelector('#app'));
