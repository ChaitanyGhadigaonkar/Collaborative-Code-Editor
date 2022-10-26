import React from 'react'
import invite from '../Images/invite-icon.png';
import {useParams} from 'react-router-dom';
import toast from 'react-hot-toast'

export default function Invite() {
    const {roomId}=useParams();
    const onClipboardClick=()=>{
        navigator.clipboard.writeText(roomId);
        toast.success("Copied to Clipboard");
    }
    return (
        <>
            <div className="invite" type="button"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <img src={invite} alt="invite" />
                {/* <p>Invite</p> */}
            </div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Room Invitation</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        {roomId}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={onClipboardClick}>Copy to clipboard</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
