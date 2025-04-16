
const LoadingBars = () => {
    return (
        <div className="flex items-center justify-center h-screen flex-col">
            <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-20 h-20 animate-spin"></div>
            <div className="font-bold">Loading...</div>
            
        </div>
    );
}

export default LoadingBars;

