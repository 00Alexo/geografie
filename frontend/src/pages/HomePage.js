import WelcomePage from './WelcomePage';
import { useAuthContext } from '../hooks/useAuthContext';

const HomePage = () => {
    const { user } = useAuthContext();
    
    return(
        <div>
            {!user && <WelcomePage/>}
        </div>
    );
};

export default HomePage;