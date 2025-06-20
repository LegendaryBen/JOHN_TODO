

const NotFound = () => {
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>404 - Page Not Found</h2>
        <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#666' }}>
          Oops! The page you're looking for doesn't exist.
        </p>
        <button onClick={() => window.location.href = '/'}>Go Home</button>
      </div>
    </div>
  );
};

export default NotFound;