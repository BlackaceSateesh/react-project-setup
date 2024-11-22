/* eslint-disable react/prop-types */
import { Spinner } from 'react-bootstrap';

const PageLoader = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width:'100%',
          backgroundColor: 'rgb(52 52 52 / 62%)',
          position:'fixed',
          top:'0',
          left:'0',
          zIndex:'99',
        }}
      >
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return <>{children}</>;
};

export default PageLoader;
