/* eslint-disable no-console */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Table from '@mui/material/Table';
import FilterListIcon from '@mui/icons-material/FilterList';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BlockIcon from '@mui/icons-material/Block';
import Navbar from '../home/Navbar';
import styles from './AdminScreem.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { blockUserId, getAllUsers } from './AdminSlice';
import { logoutUser } from '../login/loginSlice';

const adminStyles = {
  fontSize: '18px',
  fontFamily: 'Poppins',
  fontWeight: '300',
};

const AdminScreen: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.login.currentUser);
  const token = useAppSelector((state) => state.login.token);
  const users = useAppSelector((state) => state.admin.usersArr);
  const [filterUsers, setFilterUsers] = useState('');
  const [blockAction, setBlockAction] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      if (filterUsers.length === 0) {
        await dispatch(
          getAllUsers({
            token,
            query: {},
          }),
        );
      } else if (filterUsers === 'USER') {
        await dispatch(
          getAllUsers({
            token,
            query: { userType: filterUsers, isActive: true },
          }),
        );
      } else if (filterUsers === 'TYPE') {
        await dispatch(
          getAllUsers({
            token,
            query: { userType: 'USER', isActive: false },
          }),
        );
      }
    };

    if (!token) {
      dispatch(logoutUser);
      history.push('/login');
    } else {
      fetchUsers();
    }
  }, [blockAction, filterUsers, users.length, dispatch]);

  const handleFilterUsers = (event) => {
    setFilterUsers(event.target.value);
  };

  console.log(users);
  return (
    <div className={styles.adminPanelHolder}>
      <Navbar />
      <header
        className={styles.head}
        style={{
          maxWidth: '1296px',
          display: 'flex',
          justifyContent: 'space-between',
          margin: '40px auto',
        }}
      >
        <div>
          <Typography
            variant="h4"
            sx={{ fontWeight: '600', fontFamily: 'Poppins' }}
          >
            <span style={{ color: '#00B960' }}>Good Day</span>, Admin
          </Typography>
        </div>

        <FormControl
          variant="standard"
          sx={{
            minWidth: '150px',
            padding: '20px 0',
          }}
        >
          <InputLabel id="type-label">
            <Typography
              variant="h4"
              sx={{ fontFamily: 'Poppins', color: '#000' }}
            >
              Filter
              <FilterListIcon sx={{ fontSize: '28px', marginLeft: '5px' }} />
            </Typography>
          </InputLabel>
          <Select
            labelId="type-label"
            id="type"
            disableUnderline
            value={filterUsers}
            onChange={handleFilterUsers}
            label="Type"
            sx={{ color: '#000' }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="USER">Status</MenuItem>
            <MenuItem value="TYPE">Type</MenuItem>
          </Select>
        </FormControl>
      </header>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 1296,
          margin: '20px auto',
          fontFamily: 'Poppins',
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.16)',
          borderRadius: '16px',
        }}
      >
        <Table sx={{ minWidth: 650, maxWidth: 1296 }} aria-label="simple table">
          <TableBody>
            {users.length !== 0
              ? users.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      border: '1px solid #EAEAF5',
                      boxSizing: 'border-box',
                      borderRadius: '16px',
                      fontSize: '20px',
                      fontFamily: 'Poppins',
                    }}
                  >
                    <TableCell component="th" scope="row" sx={adminStyles}>
                      {user.username}
                    </TableCell>
                    <TableCell align="right" sx={adminStyles}>
                      @{user.username}
                    </TableCell>
                    <TableCell align="right" sx={adminStyles}>
                      {user.email}
                    </TableCell>
                    <TableCell align="right" sx={adminStyles}>
                      {user.dateOfBirth}
                    </TableCell>
                    <TableCell align="right" sx={adminStyles}>
                      {user.userType}
                    </TableCell>
                    <TableCell align="right">
                      {user.userType === 'USER' && (
                        <button
                          style={
                            user.isActive !== true ? { color: 'red' } : null
                          }
                          type="button"
                          className={styles.btnBlock}
                          onClick={() =>
                            // eslint-disable-next-line implicit-arrow-linebreak
                            dispatch(
                              blockUserId({ obj: {}, token, idUser: user.id }),
                            )
                              .then(() => setBlockAction(!blockAction))
                              .catch((error) => console.log(error))
                          }
                        >
                          <BlockIcon />
                          {user.isActive && 'Block'}
                          {!user.isActive && 'Unblock'}
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default AdminScreen;
