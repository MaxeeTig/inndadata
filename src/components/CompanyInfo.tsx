import { Building2, MapPin, FileText, User, Activity } from 'lucide-react';

interface CompanyInfoProps {
  company: any;
}

export function CompanyInfo({ company }: CompanyInfoProps) {
  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      'ACTIVE': 'Действующая',
      'LIQUIDATING': 'Ликвидируется',
      'LIQUIDATED': 'Ликвидирована',
      'REORGANIZING': 'В процессе реорганизации',
      'BANKRUPT': 'Банкротство'
    };
    return statusMap[status] || status || 'Не указан';
  };

  const getStatusColor = (status: string) => {
    if (status === 'ACTIVE') return 'text-green-700 bg-green-50 border-green-200';
    if (status === 'LIQUIDATED' || status === 'BANKRUPT') return 'text-red-700 bg-red-50 border-red-200';
    return 'text-yellow-700 bg-yellow-50 border-yellow-200';
  };

  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start gap-3 mb-6">
        <Building2 className="text-blue-600 mt-1" size={28} />
        <div className="flex-1">
          <h3 className="text-gray-900 mb-1">
            {company.name?.full_with_opf || company.name?.full || 'Название не указано'}
          </h3>
          {company.name?.short_with_opf && (
            <p className="text-gray-600">{company.name.short_with_opf}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="text-gray-400 mt-1 flex-shrink-0" size={20} />
          <div>
            <p className="text-gray-600 mb-1">Юридический адрес:</p>
            <p className="text-gray-900">
              {company.address?.unrestricted_value || company.address?.value || 'Не указан'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <FileText className="text-gray-400 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-gray-600 mb-1">ИНН:</p>
              <p className="text-gray-900">{company.inn || 'Не указан'}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileText className="text-gray-400 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-gray-600 mb-1">ОГРН:</p>
              <p className="text-gray-900">{company.ogrn || 'Не указан'}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileText className="text-gray-400 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-gray-600 mb-1">КПП:</p>
              <p className="text-gray-900">{company.kpp || 'Не указан'}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileText className="text-gray-400 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-gray-600 mb-1">ОКПО:</p>
              <p className="text-gray-900">{company.okpo || 'Не указан'}</p>
            </div>
          </div>
        </div>

        {company.management?.name && (
          <div className="flex items-start gap-3">
            <User className="text-gray-400 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-gray-600 mb-1">Руководитель:</p>
              <p className="text-gray-900">{company.management.name}</p>
              {company.management.post && (
                <p className="text-gray-600 text-sm">{company.management.post}</p>
              )}
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <Activity className="text-gray-400 mt-1 flex-shrink-0" size={20} />
          <div className="flex-1">
            <p className="text-gray-600 mb-2">Статус:</p>
            <span className={`inline-block px-3 py-1 rounded-full border ${getStatusColor(company.state?.status)}`}>
              {getStatusText(company.state?.status)}
            </span>
          </div>
        </div>

        {company.okved && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-gray-600 mb-1">Основной вид деятельности:</p>
            <p className="text-gray-900">{company.okved}</p>
          </div>
        )}
      </div>
    </div>
  );
}
