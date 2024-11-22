import StickyHeadTable from "../ui/StickyHeadTable"

const AllUsers = () => {
    const allUsersColumns = [
        { id: 'id', label: 'User ID', minWidth: 120 },
        { id: 'name', label: 'Name', minWidth: 150 },
        { id: 'email', label: 'Email', minWidth: 200 },
        { id: 'registrationDate', label: 'Registration Date', minWidth: 170 },
        { id: 'status', label: 'Status', minWidth: 100 },
      ];
      
      const allUsersRows = [
        {
          id: 'CS00001',
          name: 'John Doe',
          email: 'john.doe@example.com',
          registrationDate: '01-01-2024',
          status: 'Active',
          
        },
        {
          id: 'CS00002',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          registrationDate: '15-01-2024',
          status: 'Inactive',
          
        },
        {
          id: 'CS00003',
          name: 'Michael Brown',
          email: 'michael.brown@example.com',
          registrationDate: '20-01-2024',
          status: 'Active',
          
        },
        {
          id: 'CS00004',
          name: 'Emily Davis',
          email: 'emily.davis@example.com',
          registrationDate: '25-01-2024',
          status: 'Pending',
          
        },
        {
          id: 'CS00005',
          name: 'Chris Wilson',
          email: 'chris.wilson@example.com',
          registrationDate: '01-02-2024',
          status: 'Active',
          
        },
      ];
      
  return (
    <>
      <div className="AllUsers">
        <h1 className="MainHeading">All Users</h1>
      <div className="box-container">
        <StickyHeadTable rows={allUsersRows} columns={allUsersColumns} />
      </div>
      </div>
    </>
  )
}

export default AllUsers
