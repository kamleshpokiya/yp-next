import { Fragment } from 'react';
import Head from 'next/head';
import ActionPanel from '@/sections/employees/ActionPanel';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';

import Form from '@/sections/employees/Form';
import Table from '@/sections/employees/Table';



const Employees = () => {
    const currentTab = useSelector((state: RootState) => state.actions.currentEmployeeTab);

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
