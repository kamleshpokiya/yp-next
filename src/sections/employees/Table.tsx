import SearchBox from '@/components/SearchBox';
import { RootState } from '@/store/reducers';
import DataTable, { TableColumn, ConditionalStyles } from 'react-data-table-component';
import { useSelector, useDispatch } from 'react-redux';
import { Member } from '@/types';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import Iconify from '@/components/Iconify';
import { Tooltip } from 'react-tooltip';
import { onRemoveMember } from '@/store/reducers/membersSlice';
import { handleEditMemberId, onEmployeeTabChanage } from '@/store/reducers/actionsSlice';


const customStyles = {
  tableWrapper: {
    style: {
      borderLeft: '0.5px solid #dee2e6',
      borderTop: '0.5px solid #dee2e6',
    }
  },
  headCells: {
    style: {
      backgroundColor: '#F2F2F4',
      fontSize: '16px',
      fontWeight: '700',
      minHeight: '50px',
      borderRight: '0.5px solid #dee2e6',
    }
  },
  rows: {
    style: {
      fontSize: '13px',
      fontWeight: 400,
      minHeight: '65px',
    },
  },
  cells: {
    style: {
      borderRight: '0.5px solid #dee2e6',
    }
  },
};

const conditionalRowStyles: ConditionalStyles<Member>[] = [

];

const Table = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const members = useSelector((state: RootState) => state.members);

  const columns: TableColumn<Member>[] = useMemo(
    () => [
      {
        name: 'Profile picture',
        cell: row => <Image src={row.avatar} alt="avatar" width={40} height={40} className='table-avatar-image' />,
        width: '200px',
      },
      {
        name: 'Name',
        selector: row => row.name,
        width: '200px',
      },
      {
        name: 'Email',
        selector: row => row.email,
        grow: 1,
      },
      {
        name: 'Role',
        selector: row => row.designation,
        width: '200px',
      },
      {
        name: 'Actions',
        cell: row => <Actions row={row} />,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: '200px',
      },
    ], []
  );


  return (
    <div className="tab-pane fade show active">
      <div className="padding-box pdlb">
        <div className="data-table-main-box">
          <SearchBox
            options={members}
            value={selectedMember}
            onChange={(selected: Member) => setSelectedMember(selected)}
            getOptionLabel={(option: Member) => option.name}
            placeholder='Search for employees here...'
          />

          <DataTable
            columns={columns}
            data={selectedMember ? [selectedMember] : members}
            customStyles={customStyles}
            conditionalRowStyles={conditionalRowStyles}
            responsive
            highlightOnHover
            pointerOnHover
            noDataComponent="No employees available"
            pagination
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            paginationPerPage={10}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;


const Actions = ({ row }: { row: Member }) => {
  const dispatch = useDispatch();

  const onEditEmployee = (id: string) => {
    dispatch(onEmployeeTabChanage('addEmployee'));
    dispatch(handleEditMemberId(id));
  }

  const onDeleteEmployee = (id: string) => {
    dispatch(onRemoveMember(id));
  }

  return (
    <div className='actions-icons-wrapper'>
      <div
        className="actions-icon"
        data-tooltip-id='actions-tooltip'
        data-tooltip-place='bottom'
        data-tooltip-content='Edit Employee'
        onClick={() => onEditEmployee(row.id)}
      >
        <Iconify icon='fluent-mdl2:text-document-edit' />
      </div>
      <div
        className="actions-icon"
        data-tooltip-id='actions-tooltip'
        data-tooltip-place='bottom'
        data-tooltip-content='Delete Employee'
        onClick={() => onDeleteEmployee(row.id)}
      >
        <Iconify icon='uiw:delete' />
      </div>

      <Tooltip id='actions-tooltip' />
    </div>
  );
}
