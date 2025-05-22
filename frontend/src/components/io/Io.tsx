import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAppDispatch } from "../../redux/hooks";
import { v4 } from "uuid";
import SocketMessages from "socket-enums-vacations-tomerogn";
import { addVacation, editVacation, followVacation, removeVacation, unfollowVacation } from "../../redux/vacationSlice";
import Vacation from "../../models/vacation/Vacation";
import User from "../../models/user/User";

interface SocketContextInterface {
    xClientId: string
}

export const SocketContext = createContext<SocketContextInterface>({
    xClientId: ''
})


export default function Io(props: PropsWithChildren): JSX.Element {

    const { children } = props

    const [xClientId] = useState<string>(v4())
    const value = { xClientId }

    const dispatch = useAppDispatch()

    useEffect(() => {
        const socket = io(import.meta.env.VITE_IO_SERVER_URL)

        socket.onAny((eventName, payload) => {

            if (payload.from !== xClientId) {
                switch (eventName) {
                    case SocketMessages.NEW_VACATION:
                        {
                            const newVacationPayload = payload.data as Vacation
                            dispatch(addVacation(newVacationPayload))
                            break;
                        }
                    case SocketMessages.DELETE_VACATION:
                        {
                            const deleteVacationPayload = payload.data as { id: string }
                            dispatch(removeVacation(deleteVacationPayload))
                            break;
                        }
                    case SocketMessages.UPDATE_VACATION:
                        {
                            const updateVacationPayload = payload.data as Vacation
                            dispatch(editVacation(updateVacationPayload))
                            break;
                        }
                    case SocketMessages.FOLLOW:
                        {
                            const followVacationsPayload = payload.data as { vacationId: string, user: User }
                            dispatch(followVacation(followVacationsPayload))
                            break;
                        }
                    case SocketMessages.UNFOLLOW:
                        {
                            const unfollowVacationsPayload = payload.data as { vacationId: string, user: User }
                            dispatch(unfollowVacation(unfollowVacationsPayload))
                            break;
                        }
                }
            }


        })

        return () => {
            socket.disconnect()
        }

    }, [])

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )

}