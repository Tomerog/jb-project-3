import { useContext } from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Routing from '../routing/Routing'
import './Layout.css'
import { AuthContext } from '../../auth/auth/Auth'

export default function Layout() {
    
    const { user } = useContext(AuthContext)!

    return (
        <div className='Layout'>
            {user ? (
                <>
                    <header>
                        <Header />
                    </header>
                    <main>
                        <Routing />
                    </main>
                    <footer>
                        <Footer />
                    </footer>
                </>
            ) : (
                <div className="auth-main">
                    <Routing />
                </div>
            )}  
        </div>
    )
}