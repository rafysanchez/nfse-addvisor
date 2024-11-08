import React, { useState } from 'react';
import { format } from 'date-fns';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Calendar, Filter, RefreshCcw } from 'lucide-react';

// Mock data
const data = [
  { id: '5889025200711', name: 'DHL EXPRESS 5889025200711', total: 30507.62, pis: 0.00, cofins: 0.00, iss: 2729.88, csll: 0.00, irrf: 0.00 },
  { id: '5889025207630', name: 'DHL EXPRESS 5889025207630', total: 456.20, pis: 0.00, cofins: 0.00, iss: 0.00, csll: 0.00, irrf: 0.00 },
  { id: '5889025207550', name: 'DHL EXPRESS 5889025207550', total: 38666.77, pis: 51.21, cofins: 236.34, iss: 826.78, csll: 78.78, irrf: 78.78 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

function App() {
  const [startDate] = useState(new Date(2024, 0, 1));
  const [endDate] = useState(new Date(2024, 8, 25));

  const totalSum = data.reduce((acc, item) => acc + item.total, 0);

  const pieData = data.map(item => ({
    name: item.name,
    value: item.total
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <RefreshCcw className="w-5 h-5" />
            <span>Última Atualização: {format(new Date(), 'dd/MM/yyyy HH:mm:ss')}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{format(startDate, 'dd/MM/yyyy')} - {format(endDate, 'dd/MM/yyyy')}</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Total dos Tributos por Empresa</h2>
              <Filter className="w-5 h-5" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-700">
                    <th className="py-2">Razão Social</th>
                    <th className="py-2">Total de Notas</th>
                    <th className="py-2">Total PIS</th>
                    <th className="py-2">Total COFINS</th>
                    <th className="py-2">Total ISS</th>
                    <th className="py-2">Total CSLL</th>
                    <th className="py-2">Total IRRF</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className="border-b border-gray-700">
                      <td className="py-2">{item.name}</td>
                      <td className="py-2">{item.total.toFixed(2)}</td>
                      <td className="py-2">{item.pis.toFixed(2)}</td>
                      <td className="py-2">{item.cofins.toFixed(2)}</td>
                      <td className="py-2">{item.iss.toFixed(2)}</td>
                      <td className="py-2">{item.csll.toFixed(2)}</td>
                      <td className="py-2">{item.irrf.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Distribuição por Empresa</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    innerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name} (${((value/totalSum)*100).toFixed(2)}%)`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;