// packages
import { Fragment, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
// auth
import SignIn from './SignIn';
import SingUp from './SingnUp';
// images
import IMAGES from '@/assets/images';


// authentication component
const Auth = () => {
    const [pageType, setPageType] = useState<'signin' | 'signup'>('signin');
    const { logo } = IMAGES;

    // set sign in page
    const onSignIn = () => {
        setPageType('signin');
    }

    // set sign up page
    const onSignUp = () => {
        setPageType('signup');
    }

    return (
        <Fragment>
            <Head>
                <title>{pageType === 'signin' ? 'Sign In' : 'Sign Up'}</title>
            </Head>

            <div className="page authentication-page" id='myAccount'>
                <div className="brand-logo">
                    <Image src={logo.src} alt={logo.alt} width={50} height={50} />
                </div>

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