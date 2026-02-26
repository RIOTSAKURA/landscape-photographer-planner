import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            📷 风光摄影师出行规划器
          </h1>
          <nav className="space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-gray-800">
              登录
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              注册
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            智能规划您的摄影之旅
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            根据天气、光线、景点推荐最佳拍摄路线
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600"
            >
              开始使用
            </Link>
            <Link
              to="/spots"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-lg hover:bg-gray-300"
            >
              浏览景点
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl mb-4">🗺️</div>
            <h3 className="text-lg font-semibold mb-2">智能路线规划</h3>
            <p className="text-gray-600">
              根据景点位置、最佳拍摄时间自动规划最优路线
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl mb-4">🌤️</div>
            <h3 className="text-lg font-semibold mb-2">精准天气预报</h3>
            <p className="text-gray-600">
              查看到达景点时的天气、日出日落、月相等信息
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl mb-4">📷</div>
            <h3 className="text-lg font-semibold mb-2">拍摄建议</h3>
            <p className="text-gray-600">
              推荐机位、器材、拍摄技巧，助您拍出大片
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
