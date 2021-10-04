import React from "react"
import "./Modal.css"
import {AddressType, CompanyType} from "../../redux/users-reducer";

type PropsType = {
    active: boolean
    setActive: (active: boolean) => void
    address: AddressType
    company: CompanyType
}

export const Modal: React.FC<PropsType> = (props) => {
    const {active, setActive, address, company} = props

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal_content active" : "modal_content"}
                 onClick={(e) => e.stopPropagation()}>
                <div className="line">
                    Address
                </div>
                <div>
                    <span>Street: </span>{address.street}
                </div>
                <div>
                    <span>Suite: </span>{address.suite}
                </div>
                <div>
                    <span>City: </span>{address.city}
                </div>
                <div>
                    <span>Zipcode: </span>{address.zipcode}
                </div>
                <div className="line">
                    Company
                </div>
                <div>
                    <span>Name: </span>{company.name}
                </div>
                <div>
                    <span>Bs: </span>{company.bs}
                </div>
                <div>
                    <span>Catch phrase: </span>{company.catchPhrase}
                </div>
            </div>
        </div>
    )
}