import {status} from "../utils";
export function getGroups() {
return fetch(`http://127.0.0.1:8000/api/groups/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'

        }}).then(status).catch(e => {console.log(e)})
}

export function getGroup(id) {
return fetch(`http://127.0.0.1:8000/api/groups/${id}/`)
    .then(status).catch(e => {console.log(e)})
}