import { useContext } from 'react';
import UserOrdersContext from "../../Contexts/UserOrders";
import Line from './Line';

function List() {

    const { list } = useContext(UserOrdersContext)
    
    return (
            <div className="card" style={{margin: "30px 0 0 0"}}>
            <h5 className="card-header">Selected Type</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        list?.map(c => c[1][0].id !== null ? <Line key={c[1][0].id} clothe={c} /> : null)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;