import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import { useFetchGroup } from "../hooks/fetch-group";
function GroupDetails() {

    const { id } = useParams();
    const [data, loading, error] = useFetchGroup(id);
    const [group, setGroup] = useState(null);

    useEffect(()=>{
        setGroup(data);

    }, [data])

    if (error) return  <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>

    return (
        <div>
            <Link to={'/'}>Back</Link>
            {group &&
            <h1>{group.name} {id}</h1>
                }
        </div>
  );
}

export default GroupDetails;