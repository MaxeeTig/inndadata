import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
  onSearch: (inn: string) => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [inn, setInn] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateINN = (inn: string): boolean => {
    // Remove spaces and dashes
    const cleanInn = inn.replace(/[\s-]/g, '');
    
    // Check if INN contains only digits
    if (!/^\d+$/.test(cleanInn)) {
      setValidationError('ИНН должен содержать только цифры');
      return false;
    }

    // Check INN length (10 for organizations, 12 for individuals)
    if (cleanInn.length !== 10 && cleanInn.length !== 12) {
      setValidationError('ИНН должен содержать 10 (для организаций) или 12 (для физических лиц) цифр');
      return false;
    }

    // Validate checksum for 10-digit INN (Legal Entity)
    if (cleanInn.length === 10) {
      const weights = [2, 4, 10, 3, 5, 9, 4, 6, 8, 0];
      let sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanInn[i]) * weights[i];
      }
      let controlNumber = sum % 11;
      if (controlNumber > 9) {
        controlNumber = controlNumber % 10;
      }
      if (controlNumber !== parseInt(cleanInn[9])) {
        setValidationError('Неверная контрольная сумма ИНН');
        return false;
      }
    }

    // Validate checksum for 12-digit INN (Private Person/IP)
    if (cleanInn.length === 12) {
      const weights1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0];
      let sum1 = 0;
      for (let i = 0; i < 11; i++) {
        sum1 += parseInt(cleanInn[i]) * weights1[i];
      }
      let controlNumber1 = sum1 % 11;
      if (controlNumber1 > 9) {
        controlNumber1 = controlNumber1 % 10;
      }
      if (controlNumber1 !== parseInt(cleanInn[10])) {
        setValidationError('Неверная контрольная сумма ИНН');
        return false;
      }
      
      const weights2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0];
      let sum2 = 0;
      for (let i = 0; i < 12; i++) {
        sum2 += parseInt(cleanInn[i]) * weights2[i];
      }
      let controlNumber2 = sum2 % 11;
      if (controlNumber2 > 9) {
        controlNumber2 = controlNumber2 % 10;
      }
      if (controlNumber2 !== parseInt(cleanInn[11])) {
        setValidationError('Неверная контрольная сумма ИНН');
        return false;
      }
    }

    setValidationError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateINN(inn)) {
      const cleanInn = inn.replace(/[\s-]/g, '');
      onSearch(cleanInn);
    }
  };

  const handleInputChange = (value: string) => {
    setInn(value);
    setValidationError(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="inn" className="block text-gray-700 mb-2">
            ИНН организации или физического лица
          </label>
          <input
            type="text"
            id="inn"
            value={inn}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Введите 10 или 12 цифр"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              validationError
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            disabled={isLoading}
          />
          {validationError && (
            <p className="mt-2 text-red-600 text-sm">{validationError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !inn}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Поиск...
            </>
          ) : (
            <>
              <Search size={20} />
              Найти
            </>
          )}
        </button>
      </form>
    </div>
  );
}
