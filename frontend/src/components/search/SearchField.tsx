import React, { FC } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import { useRootStore } from '../section/Wrapper';
import { IUser } from '../../store/UsersStore';
import { Autocomplete } from '@material-ui/lab';

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
    const { searchStore, usersStore } = useRootStore();

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
                        <Autocomplete
                            fullWidth
                            id="search-auto-complete"
                            options={usersStore.filteredUsersWithMusicEntries}
                            getOptionLabel={(user: IUser) => user.name}
                            onInputChange={(e: any, value) => searchStore.setSearchValue(value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    label="Search"
                                    variant="outlined"
                                    size="small"
                                    value={searchStore.searchValue}
                                />
                            )}
                            freeSolo
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default observer(SearchField);
