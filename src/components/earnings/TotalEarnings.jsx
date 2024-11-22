import StickyHeadTable from "../ui/StickyHeadTable"

const TotalEarnings = () => {
    const TotalEarningsColumns = [
      { id: 'memberId', label: 'Member ID', minWidth: 150 },
      { id: 'name', label: 'Name', minWidth: 150 },
      { id: 'totalEarnings', label: 'Total Earnings', minWidth: 150, align: 'right', format: (value) => `$${value.toFixed(2)}` },
    ];
      
      const TotalEarningsRows = [
        {
          memberId: 'CS00001',
          name: 'CS DEMO',
          totalEarnings: 499.9,
        },
        {
          memberId: 'CS111859',
          name: 'MADHAN',
          totalEarnings: 250.0,
        },
        {
          memberId: 'CS136819',
          name: 'GAUTAM',
          totalEarnings: 1000.0,
        },
      ];
      
  return (
    <>
      <div className="TotalEarnings">
        <h1 className="MainHeading">Total Earnings</h1>
      <div className="box-container">
        <StickyHeadTable rows={TotalEarningsRows} columns={TotalEarningsColumns} />
      </div>
      </div>
    </>
  )
}

export default TotalEarnings
