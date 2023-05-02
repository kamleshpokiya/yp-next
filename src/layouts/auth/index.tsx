// packages
import { Fragment, useState } from 'react';
import Head from 'next/head';
// auth
import SignIn from './SignIn';
import SingUp from './SingnUp';


const Auth = () => {
    const [pageType, setPageType] = useState<'signin' | 'signup'>('signin');

    const onSignIn = () => {
        setPageType('signin');
    }

    const onSignUp = () => {
        setPageType('signup');
    }

    return (
        <Fragment>
            <Head>
                <title>{pageType === 'signin' ? 'Sign In' : 'Sign Up'}</title>
            </Head>

            <div className="page" id='myAccount'>
                <div className="wraper">
                    <div className="row" style={{
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {pageType === 'signin' ? (
                            <SignIn onSignUp={onSignUp} />
                        ) : (
                            <SingUp onSignIn={onSignIn} />
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Auth;