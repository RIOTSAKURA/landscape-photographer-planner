import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tripService } from '../services/trip.service';
import { Trip, TripSpot } from '../types/trip';

export default function TripDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrip();
  }, [id]);

  const loadTrip = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await tripService.getById(id);
      setTrip(data);
    } catch (error) {
      console.error('加载行程详情失败', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">行程不存在</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/trips" className="text-gray-600 hover:text-gray-800">
            ← 返回行程列表
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">{trip.name}</h1>
          <div className="text-gray-600">
            <span>
              {new Date(trip.startDate).toLocaleDateString()} -{' '}
              {new Date(trip.endDate).toLocaleDateString()}
            </span>
            <span className="mx-2">|</span>
            <span>
              {trip.transport === 'driving'
                ? '自驾'
                : trip.transport === 'public'
                ? '公共交通'
                : '混合交通'}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">行程景点</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              + 添加景点
            </button>
          </div>

          {!trip.tripSpots || trip.tripSpots.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              暂无景点，点击"添加景点"开始规划
            </div>
          ) : (
            <div className="space-y-4">
              {trip.tripSpots
                .sort((a, b) => a.order - b.order)
                .map((tripSpot: TripSpot, index: number) => (
                  <div
                    key={tripSpot.id}
                    className="border rounded-lg p-4 flex items-start gap-4"
                  >
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {tripSpot.spot?.name || '未知景点'}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {tripSpot.spot?.city}, {tripSpot.spot?.province}
                      </p>
                      {tripSpot.arriveDate && (
                        <p className="text-gray-500 text-sm mt-1">
                          到达时间:{' '}
                          {new Date(tripSpot.arriveDate).toLocaleDateString()}{' '}
                          {tripSpot.arriveTime}
                        </p>
                      )}
                      <p className="text-gray-500 text-sm">
                        建议停留: {tripSpot.stayHours} 小时
                      </p>
                    </div>
                    <button className="text-red-500 hover:text-red-600">
                      删除
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
