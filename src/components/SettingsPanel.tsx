import { useState, useEffect } from 'react';
import { Key, Save, Eye, EyeOff, CheckCircle, Info } from 'lucide-react';

export function SettingsPanel() {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('dadata_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('dadata_api_key', apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleClear = () => {
    setApiKey('');
    localStorage.removeItem('dadata_api_key');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Key className="text-blue-600" size={24} />
        <h2 className="text-gray-900">Настройки API</h2>
      </div>

      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex gap-3">
          <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
          <div className="text-sm text-blue-900">
            <p className="mb-2">
              Для работы приложения необходим API ключ от сервиса Dadata.ru
            </p>
            <p className="mb-2">
              Получить ключ можно на сайте:{' '}
              <a
                href="https://dadata.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-700"
              >
                dadata.ru
              </a>
            </p>
            <p className="text-xs text-blue-700">
              API ключ сохраняется локально в вашем браузере и не передается третьим лицам
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="api-key" className="block text-gray-700 mb-2">
          Dadata API Token
        </label>
        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            id="api-key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Введите ваш API ключ"
            className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={!apiKey}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {saved ? (
            <>
              <CheckCircle size={20} />
              Сохранено
            </>
          ) : (
            <>
              <Save size={20} />
              Сохранить
            </>
          )}
        </button>

        {apiKey && (
          <button
            onClick={handleClear}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Очистить
          </button>
        )}
      </div>

      {saved && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
          <CheckCircle size={20} />
          <span>API ключ успешно сохранен</span>
        </div>
      )}
    </div>
  );
}
