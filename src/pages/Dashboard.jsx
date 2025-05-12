import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-pink-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-lg w-full"
        style={{
          animation: 'fadeIn 1s ease-in-out both',
        }}
      >
        <h1 className="text-4xl font-extrabold text-pink-600 mb-4">
          🎉 හදපන් Dashboard එක! 🎉
        </h1>
        <p className="text-gray-700 text-lg">
          ඔබ සාර්ථකව ලොග් වුණා! දැන් බලන්න තියෙන්නේ මේ සුන්දර Dashboard එක 😎
        </p>
        <p className="mt-4 text-sm text-gray-500 italic">
          (ඒත් backend එකක් නැ… හැබැයි ඒක වැඩේට බාධා නෑ 😂)
        </p>

        {/* Internal animation style */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Dashboard;
