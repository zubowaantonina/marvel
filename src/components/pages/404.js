
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import  ErrorMessage  from '../errorMessage/ErrorMessage';


const Page404 = () => {
    return (
        <div >
             <Helmet>
                <meta
                    name="description"
                    content="This page is not found"
                />
                <title>Comics page</title>
            </Helmet>
            <ErrorMessage />
            <p style={{"textAlign": "center", "fontSize": "28px", "fontWeight": 700}}>Error: 404 - Page not found</p>
            <Link style={{"display": "block", "textAlign": "center", "fontSize": "24px", "fontWeight": 700, "margin-top":"30px"}} to="/">Go to Home page</Link>
        </div>
    )
}
export default Page404;