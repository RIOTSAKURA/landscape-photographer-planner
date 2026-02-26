import { useState } from 'react';
import { Link } from 'react-router-dom';
import { tripService } from '../services/trip.service';

export default function TripPage() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTrip, setNewTrip] = useState({
    name: '',
    startDate: '',
    endDate: '',
    transport: 'driving' as const,
  });

  const loadTrips = async () => {
    setLoading(true);
    try {
      const response = await tripService.getAll();
      setTrips(response.trips);
    } catch (error) {
      console.error('加载行程失败', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await tripService.create(newTrip);
      setShowCreateModal(false);
      setNewTrip({ name: '', startDate: '', endDate: '', transport: 'driving' });
      loadTrips();
    } catch (error) {
      console.error('创建行程失败', error);
    }
  };

  // 页面加载时获取行程列表
  useState(() => {
    loadTrips();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">
            📷 风光摄影师出行规划器
          </Link>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            创建行程
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">我的行程</h2>

        {loading ? (
          <div className="text-center py-8 text-gray-500">加载中...</div>
        ) : trips.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            暂无行程，点击"创建行程"开始规划您的摄影之旅
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <Link
                key={trip.id}
                to={`/trips/${trip.id}`}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold mb-2">{trip.name}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {new Date(trip.startDate).toLocaleDateString()} -{' '}
                  {new Date(trip.endDate).toLocaleDateString()}
                </p>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  {trip.transport === 'driving'
                    ? '自驾'
                    : trip.transport === 'public'
                    ? '公共交通'
                    : '混合'}
                </span>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* 创建行程弹窗 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">创建新行程</h3>
            <form onSubmit={handleCreateTrip}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">行程名称</label>
                <input
                  type="text"
                  value={newTrip.name}
                  onChange={(e) =>
                    setNewTrip({ ...newTrip, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">开始日期</label>
                <input
                  type="date"
                  value={newTrip.startDate}
                  onChange={(e) =>
                    setNewTrip({ ...newTrip, startDate: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">结束日期</label>
                <input
                  type="date"
                  value={newTrip.endDate}
                  onChange={(e) =>
                    setNewTrip({ ...newTrip, endDate: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">交通方式</label>
                <select
                  value={newTrip.transport}
                  onChange={(e) =>
                    setNewTrip({
                      ...newTrip,
                      transport: e.target.value as any,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="driving">自驾</option>
                  <option value="public">公共交通</option>
                  <option value="mixed">混合</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  创建
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
