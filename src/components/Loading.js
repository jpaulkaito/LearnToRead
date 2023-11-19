const Loading = () => {
        return (
                <div className="color-changing-text-container">
                        <div style={{ marginTop: '80px' }}>
                                <i className='fa fa-spinner fa-pulse fa-3x fa-fw text-primary' />
                                <p>Loading...</p>
                        </div>
                </div>
        );
};

export default Loading;