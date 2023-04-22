import { useAppDispatch, useAppSelector } from 'app/config/store';
import React from 'react';
import DataTableComponent from './dataTable.component/dataTable.component';
import { getUsers } from './userList.reducer';

const UsersListPage = () => {

    const [head, setHead] = React.useState<any>({});
    const [dataTable, setDataTable] = React.useState([]);
    const [editMode, setEditMode] = React.useState(false);

    const dispatch = useAppDispatch();
    const [selectedUser, setSelectedUser] = React.useState({
        customerId: '',
        customerName: '',
        username: '',
        email: '',
        phone: ''
    });


    React.useEffect(() => {
        dispatch(getUsers());
        setHead({
            name: 'Customer Name',
            username: 'User Name',
            email: 'E-mail',
            phone: 'Phone',
            Action: 'Action'
        });

    }, []);

    const users = useAppSelector(state => state.users.usersList);

    React.useEffect(() => {
        setDataTable(users);
    }, [users]);


    const onEditMode = rec => {
        setEditMode(!editMode);
        const data = {
            customerId: rec.id,
            customerName: rec.name,
            username: rec.username,
            email: rec.email,
            phone: rec.phone
        }
        setSelectedUser(data);
    }

    const updateUserData = () => {
        const update = dataTable.map(user => {
            if (user.id === selectedUser.customerId) {
                return { ...user, username: selectedUser.username };
            }
            return user;
        });
        setDataTable(update);
        setEditMode(!editMode);
    }

    const onChangeData = (e) => {
        setSelectedUser(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }




    return (
        <>
            {!editMode &&
                <DataTableComponent data={dataTable} header={head} editAction={onEditMode} />
            }
            {editMode &&
                <div className='edit-form form'>
                    <div className='control'>
                        <label htmlFor="username">Customer Name</label>
                        <input type={'text'} id="customerName" value={selectedUser.customerName} onChange={onChangeData} />
                    </div>
                    <div className='control'>
                        <label htmlFor="username">User Name</label>
                        <input type={'text'} id="username" value={selectedUser.username} onChange={onChangeData} />
                    </div>
                    <div className='control'>
                        <label htmlFor="username">E-mail</label>
                        <input type={'text'} id="email" value={selectedUser.email} onChange={onChangeData} />
                    </div>
                    <div className='control'>
                        <label htmlFor="username">Phone</label>
                        <input type={'text'} id="Phone" value={selectedUser.phone} onChange={onChangeData} />
                    </div>
                    <div className='formAction'>
                        <button onClick={() => setEditMode(!editMode)} className="cancel">Cancel</button>
                        <button onClick={updateUserData}>Update</button>
                    </div>
                </div>
            }

        </>
    );
}

export default UsersListPage;