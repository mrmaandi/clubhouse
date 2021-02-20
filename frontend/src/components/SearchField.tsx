import React, { FC } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { Grid, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import { useRootStore } from './Wrapper';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

        '& label.Mui-focused': {
            color: theme.palette.common.white,
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.common.white,
            },
        },
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        transition: theme.transitions.create('width'),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0),
        },
        marginLeft: 0,
    },
}));

const SearchField: FC = () => {
    const classes = useStyles();
    const { searchStore } = useRootStore();

    return (
        <div className={classes.root}>
            <div className={classes.search}>
                <Grid container alignItems="center">
                    <Grid item>
                        <IconButton className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs>
                        <TextField
                            color="secondary"
                            id="filled-search"
                            label="Search"
                            type="search"
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={(e) => searchStore.setSearchValue(e.target.value)}
                            value={searchStore.searchValue}
                            inputMode="search"
                        />
                    </Grid>
                    <Grid item>
                        {searchStore.showClearButton && (
                            <IconButton
                                className={classes.iconButton}
                                aria-label="Clear"
                                onClick={() => searchStore.clearSearchValue()}
                                value={searchStore.searchValue}
                            >
                                <ClearIcon />
                            </IconButton>
                        )}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default observer(SearchField);
