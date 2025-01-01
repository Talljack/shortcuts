const SettingsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
      <div className="bg-[#2A2B3C] rounded-lg p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Recent Apps History</h2>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Clear History
            </button>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Practice Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input type="checkbox" id="autoStart" className="mr-3" />
                <label htmlFor="autoStart" className="text-gray-300">
                  Auto-start practice mode when switching apps
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 
