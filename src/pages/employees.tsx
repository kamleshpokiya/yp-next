// packages
import { Fragment } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
// sections
import ActionPanel from '@/sections/employees/ActionPanel';
import Form from '@/sections/employees/Form';
import Table from '@/sections/employees/Table';
// store
import { getCurrentEmployeeTab } from '@/store/selectors/actions';


// employees page component
const Employees = () => {
    const currentTab = useSelector(getCurrentEmployeeTab);

    return (
        <Fragment>
            <Head>
                <title>Employees</title>
            </Head>

            <div className="row" id='employeesPage'>
                <ActionPanel />

                <div className="col-lg-7 rightSide">
                    <div className="col-lg-7 rightSide">
                        <div className="tab-content" id="v-pills-tabContent">
                            {currentTab === 'addEmployee' &&
                                <Form />
                            }
                            {currentTab !== 'addEmployee' &&
                                <Table />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Employees;
