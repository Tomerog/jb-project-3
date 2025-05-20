import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import "./Stats.css"
import { BarChart, Bar, ResponsiveContainer, YAxis, XAxis } from 'recharts';
import VacationsService from "../../../services/auth-aware/Vacations";
import useService from "../../../hooks/useService";
import { init } from "../../../redux/vacationSlice";
import Loading from "../../common/loading/Loading";
import { Link } from "react-router-dom";


export default function Stats(): JSX.Element {

    const { vacations } = useAppSelector(state => state.vacations)
    const [loading, setLoading] = useState(true);
    const vacationServices = useService(VacationsService)
    const dispatch = useAppDispatch()

    useEffect(() => {
        (async () => {
            try {
                if (vacations.length === 0) {
                    setLoading(true);
                    const vacations = await vacationServices.getAllVacations()
                    dispatch(init(vacations))
                }
            } catch (e) {
                console.error('Error fetching vacations:', e)
                alert('Failed to load vacations.')
            } finally {
                setLoading(false);
            }
        })()
    }, [vacationServices, vacations.length, dispatch])

    console.log(vacations);
    const data = vacations.map(vacation => ({ destination: vacation.destination, followers: vacation.followers.length || 0 }))
    console.log(vacations);

    if (loading) {
        return <Loading />
    }
    if (data.length === 0) {
        return <div>No data available</div>;
    }

    const maxFollowers = Math.max(...data.map(d => d.followers));


    const downloadCSV = () => {
        const csvRows = [];
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','));

        data.forEach(row => {
            const values = Object.values(row).map(val => `"${val}"`); // wrap each value in quotes
            csvRows.push(values.join(','));
        });


        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'vacations_data.csv';
        link.click();
    };


    return (
        <div>
            <div className="adminContainer">
                <Link to="/vacations" >
                    Vacations
                </Link>
                <button onClick={downloadCSV} className="download-btn">
                    Download CSV
                </button>
            </div>
            <div className={"chartContainer"}>
                <ResponsiveContainer width="150%" height="100%"  >
                    <BarChart width={100} height={40} data={data} >
                        <YAxis
                            domain={[0, 'dataMax']}
                            dataKey={"followers"}
                            ticks={[...Array(maxFollowers + 1).keys()]}
                        />
                        <XAxis dataKey={"destination"} />
                        <Bar dataKey="followers" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

