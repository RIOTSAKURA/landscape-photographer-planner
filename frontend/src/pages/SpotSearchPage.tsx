import { useState } from 'react';
import { Link } from 'react-router-dom';
import { spotService } from '../services/spot.service';
import { Spot } from '../types/spot';

export default function SpotSearchPage() {
  const [keyword, setKeyword] = useState('');
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const results = await spotService.search(keyword);
      setSpots(results);
    } catch (error) {
      console.error('搜索失败', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">
            📷 风光摄影师出行规划器
          </Link>
          <Link to="/trips" className="text-blue-500 hover:text-blue-600">
            我的行程
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 搜索框 */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="搜索景点、城市..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? '搜索中...' : '搜索'}
            </button>
          </form>
        </div>

        {/* 搜索结果 */}
        {searched && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              搜索结果 ({spots.length})
            </h2>

            {spots.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                未找到相关景点
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {spots.map((spot) => (
                  <div
                    key={spot.id}
                    className="bg-white rounded-lg shadow overflow-hidden"
                  >
                    {spot.photos && spot.photos.length > 0 && (
                      <img
                        src={spot.photos[0]}
                        alt={spot.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">
                        {spot.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {spot.province} {spot.city} {spot.district}
                      </p>
                      {spot.rating && (
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-yellow-500">★</span>
                          <span>{spot.rating}</span>
                        </div>
                      )}
                      <button className="mt-3 w-full bg-blue-50 text-blue-600 py-2 rounded hover:bg-blue-100">
                        添加到行程
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 未搜索时的提示 */}
        {!searched && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500">
              输入景点名称或城市开始搜索
            </p>
            <p className="text-gray-400 text-sm mt-2">
              当前支持搜索云南省的摄影景点
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
