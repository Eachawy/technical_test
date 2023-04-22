import React from 'react';


const DataTableComponent = props => {

    const [dataList, setDataList] = React.useState([]);

    React.useEffect(() => { setDataList(props.data); }, [props.data]);

    const onEditMode = (id) => {
        props.editAction(id);
    }

    const onChangeSearchcontrol = value => {
        let data = props.data.filter(e => e.name.toLowerCase().indexOf(value) > -1);
        setDataList(data);
    }

    return (
        <>
            {props.data &&
                <div className='userList'>
                    <div className="search-control">
                        <input type="text" placeholder='Find by Name' onChange={e => onChangeSearchcontrol(e.target.value)} />
                    </div>
                    <div className="responsive-table">
                        <div className="table-header">
                            <div className="col col-1">{props.header.name}</div>
                            <div className="col col-2">{props.header.username}</div>
                            <div className="col col-3">{props.header.email}</div>
                            <div className="col col-4">{props.header.phone}</div>
                            <div className="col col-5">{props.header.Action}</div>
                        </div>
                        <div className='tBody'>
                            {dataList.map((data, i) =>
                                <div className="table-row" key={i}>
                                    <div className="col col-1" data-label={props.header.name}>{data.name}</div>
                                    <div className="col col-2" data-label={props.header.username}>{data.username}</div>
                                    <div className="col col-3" data-label={props.header.email}>{data.email}</div>
                                    <div className="col col-4" data-label={props.header.phone}>{data.phone}</div>
                                    <div className="col col-5" data-label={props.header.Action}><button onClick={() => onEditMode(data)}>Edit</button></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default DataTableComponent