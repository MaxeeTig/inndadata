import { useState } from 'react';
import { SearchForm } from './components/SearchForm';
import { SettingsPanel } from './components/SettingsPanel';
import { CompanyInfo } from './components/CompanyInfo';
import { Settings, Search } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'search' | 'settings'>('search');
  const [companyData, setCompanyData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (inn: string) => {
    setIsLoading(true);
    setError(null);
    setCompanyData(null);

    const apiKey = localStorage.getItem('dadata_api_key');
    
    if (!apiKey) {
      setError('Необходимо указать API ключ в настройках');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${apiKey}`,
        },
        body: JSON.stringify({ query: inn }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при запросе к Dadata API');
      }

      const data = await response.json();
      
      if (data.suggestions && data.suggestions.length > 0) {
        setCompanyData(data.suggestions[0].data);
      } else {
        setError('Организация с указанным ИНН не найдена');
      }
    } catch (err) {
      // If API call fails, show mock data for demonstration
      console.error('API Error:', err);
      setCompanyData({
        name: {
          full_with_opf: 'ООО "ПРИМЕР КОМПАНИИ"'
        },
        address: {
          unrestricted_value: '119021, г Москва, ул Льва Толстого, д 16'
        },
        ogrn: '1234567890123',
        kpp: '773101001',
        inn: inn,
        management: {
          name: 'Иванов Иван Иванович'
        },
        state: {
          status: 'ACTIVE'
        }
      });
      setError('Демонстрационные данные (проверьте API ключ)');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-center mb-6">Проверка ИНН</h1>
          <div className="flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                activeTab === 'search'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Search size={20} />
              Поиск
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                activeTab === 'settings'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Settings size={20} />
              Настройки
            </button>
          </div>
        </header>

        <main>
          {activeTab === 'search' ? (
            <div>
              <SearchForm onSearch={handleSearch} isLoading={isLoading} />
              
              {error && (
                <div className={`mt-6 p-4 rounded-lg ${
                  error.includes('Демонстрационные') 
                    ? 'bg-yellow-50 border border-yellow-200 text-yellow-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {error}
                </div>
              )}

              {companyData && <CompanyInfo company={companyData} />}
            </div>
          ) : (
            <SettingsPanel />
          )}
        </main>
      </div>
    </div>
  );
}
