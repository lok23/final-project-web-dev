import React, {useEffect, useState} from "react";
import axios from "axios";
import {USER_SERVER} from "../../Config";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

// Only make the request if the property user in userData is defined.
// https://stackoverflow.com/questions/65980922/react-on-page-reload-receive-error-typeerror-cannot-read-property-x-of-undefi
const OtherProfilePage = (props) => {

    const params = useParams();
    console.log("PARAMS: ", params)

    const user = useSelector(state => state.user)

    // console.log("props: ", props)
    // console.log("props.location.state", props.location.state)

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    // apparently useful?
    axios.defaults.withCredentials = true;
    useEffect(() => {
            axios.get(`${USER_SERVER}/peepee/${props.location.state}`).then((response) => {
                console.log("response: ", response)
                if (response === undefined) {
                    alert("that profile doesn't exist!");
                } else {
                    setEmail(response.data.email)
                    setName(response.data.name)
                    setRole(response.data.role)
                }
            })

    }, )

    // should refactor this lazy code as soon as possible
    let actualRole = "unknown";
    if (role == 0) {
        actualRole = "user"
    } else if (role == 1) {
        actualRole = "moderator"
    } else {
        actualRole = "admin"
    }

    // Protects against race conditions
    if (!user || !user.userData) {
        return null;
    }
    return (
        <div>
            {user.userData.email === email ?
                <div>
                    click here go to your profile!
                </div>
                :
            <div>
            Someone elses profile!
            <p>email: {email}</p>
            <p>name: {name}</p>
            <p>role: {actualRole}</p>
            </div>
                }
        </div>
    );
}

export default OtherProfilePage;