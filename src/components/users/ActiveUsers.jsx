import StickyHeadTable from "../ui/StickyHeadTable";

const ActiveUsers = () => {
  const ActiveUsersColumns = [
    { id: "id", label: "User ID", minWidth: 120 },
    { id: "name", label: "Name", minWidth: 150 },
    { id: "email", label: "Email", minWidth: 200 },
    { id: "registrationDate", label: "Registration Date", minWidth: 170 },
    { id: "status", label: "Status", minWidth: 100 },
  ];

  const ActiveUsersRows = [
    {
      id: "CS00001",
      name: "John Doe",
      email: "john.doe@example.com",
      registrationDate: "01-01-2024",
      status: "Active",
    },
    {
      id: "CS00003",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      registrationDate: "20-01-2024",
      status: "Active",
    },
    {
      id: "CS00005",
      name: "Chris Wilson",
      email: "chris.wilson@example.com",
      registrationDate: "01-02-2024",
      status: "Active",
    },
  ];

  return (
    <>
      <div className="ActiveUsers">
        <h1 className="MainHeading">All Active Users</h1>
        <div className="box-container">
          <StickyHeadTable
            rows={ActiveUsersRows}
            columns={ActiveUsersColumns}
          />
        </div>
      </div>
    </>
  );
};

export default ActiveUsers;
