import { useContext, useEffect, useState } from 'react';
import './Vacations.css';
import { motion } from 'framer-motion';
import useService from '../../../hooks/useService';
import VacationsService from '../../../services/auth-aware/Vacations';
import VacationCard from '../card/Card';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { init, setCurrentPage } from '../../../redux/vacationSlice';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/auth/Auth';
import { Filter } from '../../../models/filters/Filters';
import Loading from '../../common/loading/Loading';

export default function Vacations(): JSX.Element {
    const [filter, setActiveFilter] = useState<Filter>(Filter.NONE);
    const [loading, setLoading] = useState(true);
    
    const { user } = useContext(AuthContext)!;
    const isAdmin = user?.isAdmin;

    const vacationServices = useService(VacationsService);
    const { vacations, currentPage } = useAppSelector(state => state.vacations);
    const dispatch = useAppDispatch();
    const itemsPerPage = 10;
    
    const filteredVacations = vacations.filter(vacation => {
        const today = new Date();
        const vacationStart = new Date(vacation.vacationStart);
        const vacationEnd = new Date(vacation.vacationEnd);

        switch (filter) {
            case Filter.FOLLOWING:
                return vacation.followers?.some(follower => follower.id === user?.id);
            case Filter.UPCOMING:
                return vacationStart > today;
            case Filter.ACTIVE:
                return vacationStart <= today && vacationEnd >= today;
            default:
                return true;
        }
    });

    const totalPages = Math.ceil(filteredVacations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentVacations = filteredVacations.slice(startIndex, endIndex);
    
    useEffect(() => {
        (async () => {
            try {
                if (vacations.length === 0) {
                    setLoading(true);
                    const vacations = await vacationServices.getAllVacations();
                    dispatch(init(vacations));
                }
            } catch (e) {
                console.error('Error fetching vacations:', e);
                alert('Failed to load vacations.');
            } finally {
                setLoading(false);
            }
        })();
    }, [dispatch, vacationServices, vacations.length]);

    function changeFilter(newFilter: Filter) {
        setActiveFilter(newFilter);
    }

    function pageChange(page: number) {
        dispatch(setCurrentPage(page));
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
             {isAdmin ? (
                <div className="adminContainer">
                    <Link to="/admin/add" >Add New Vacation</Link>
                    <Link to="/admin/stats" >View Stats</Link>
                </div>
            ) : (
                <div className='filter-container'> 
                    <h3>Filter Vacations:</h3>
                    <div className='filters'>
                        {[Filter.NONE, Filter.ACTIVE, Filter.FOLLOWING, Filter.UPCOMING].map(f => (
                            <label key={f} className="filter-option">
                                <input type="radio" value={f} checked={filter === f} onChange={() => changeFilter(f)} />
                                <span>{f}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        <div className='vacations-container'>
            
           
            <h1 className='title'>Vacations</h1>
            <motion.div className='card-container' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {currentVacations.map(vacation => (
                    <VacationCard key={vacation.id} vacation={vacation} />
                ))}
            </motion.div>
            <div className="pagination">
                <button onClick={() => pageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                {[...Array(totalPages)].map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => pageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}>
                        {index + 1}
                    </button>
                ))}
                <button onClick={() => pageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
        </div>
    );
}
