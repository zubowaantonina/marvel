
import { Link } from 'react-router-dom';
import  ErrorMessage  from '../errorMessage/ErrorMessage';


const Page404 = () => {
    return (
        <div >
            <ErrorMessage />
            <p style={{"textAlign": "center", "fontSize": "28px", "fontWeight": 700}}>Error: 404 - Page not found</p>
            <Link style={{"display": "block", "textAlign": "center", "fontSize": "24px", "fontWeight": 700, "margin-top":"30px"}} to="/">Go to Home page</Link>
        </div>
    )
}
export default Page404;