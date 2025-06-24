import React, { useState, useEffect } from 'react';
import { PlusCircle, DollarSign, TrendingUp, TrendingDown, Clock, CheckCircle, Eye, Filter, BarChart3, PieChart } from 'lucide-react';

const ExpenseManagementSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Categorías predefinidas
  const categories = [
    'Oficina', 'Marketing', 'Tecnología', 'Recursos Humanos', 
    'Servicios', 'Inventario', 'Transporte', 'Alimentación', 'Otros'
  ];

  // Datos de ejemplo para demostración
  useEffect(() => {
    const sampleTransactions = [
      {
        id: 1,
        type: 'income',
        description: 'Venta de servicios',
        amount: 5000,
        category: 'Servicios',
        date: '2024-06-20',
        status: 'Pagado',
        createdAt: '2024-06-20T10:00:00.000Z'
      },
      {
        id: 2,
        type: 'expense',
        description: 'Compra de equipos',
        amount: 1200,
        category: 'Tecnología',
        date: '2024-06-21',
        status: 'Pendiente',
        dueDate: '2024-06-30',
        createdAt: '2024-06-21T14:30:00.000Z'
      },
      {
        id: 3,
        type: 'expense',
        description: 'Publicidad online',
        amount: 800,
        category: 'Marketing',
        date: '2024-06-22',
        status: 'Pagado',
        createdAt: '2024-06-22T09:15:00.000Z'
      },
      {
        id: 4,
        type: 'income',
        description: 'Consultoría',
        amount: 3000,
        category: 'Servicios',
        date: '2024-06-23',
        status: 'Pagado',
        createdAt: '2024-06-23T16:45:00.000Z'
      },
      {
        id: 5,
        type: 'expense',
        description: 'Arriendo oficina',
        amount: 2000,
        category: 'Oficina',
        date: '2024-06-24',
        status: 'Pendiente',
        dueDate: '2024-07-01',
        createdAt: '2024-06-24T08:00:00.000Z'
      }
    ];
    setTransactions(sampleTransactions);
  }, []);

  const statusColors = {
    'Pendiente': 'bg-yellow-100 text-yellow-800',
    'Pagado': 'bg-green-100 text-green-800',
    'Vencido': 'bg-red-100 text-red-800'
  };

  // Formulario para nueva transacción
  const TransactionForm = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
      type: 'expense',
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Pendiente',
      dueDate: ''
    });

    const handleSubmit = () => {
      if (!formData.description || !formData.amount || !formData.category) {
        alert('Por favor completa todos los campos requeridos');
        return;
      }
      const newTransaction = {
        id: Date.now(),
        ...formData,
        amount: parseFloat(formData.amount),
        createdAt: new Date().toISOString()
      };
      onSave(newTransaction);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <h3 className="text-xl font-bold mb-4">Nueva Transacción</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tipo</label>
              <select 
                className="w-full border rounded-lg px-3 py-2"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="expense">Gasto</option>
                <option value="income">Ingreso</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Descripción</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Monto</label>
              <input
                type="number"
                step="0.01"
                className="w-full border rounded-lg px-3 py-2"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Categoría</label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
              >
                <option value="">Seleccionar categoría</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Fecha</label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Estado</label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Pagado">Pagado</option>
              </select>
            </div>
            
            {formData.status === 'Pendiente' && (
              <div>
                <label className="block text-sm font-medium mb-1">Fecha de Vencimiento</label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                />
              </div>
            )}
            
            <div className="flex gap-2 pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard simplificado
  const Dashboard = () => {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const pendingTransactions = transactions.filter(t => t.status === 'Pendiente');

    // Datos simplificados para gráficos con CSS
    const expensesByCategory = categories.map(category => {
      const categoryExpenses = transactions.filter(t => t.type === 'expense' && t.category === category);
      const amount = categoryExpenses.reduce((sum, t) => sum + t.amount, 0);
      return { category, amount };
    }).filter(item => item.amount > 0);

    const maxAmount = Math.max(...expensesByCategory.map(item => item.amount), 1);

    return (
      <div className="space-y-6">
        {/* Tarjetas de resumen */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-green-600">Ingresos Totales</p>
                <p className="text-2xl font-bold text-green-900">${totalIncome.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <div className="flex items-center">
              <TrendingDown className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-red-600">Gastos Totales</p>
                <p className="text-2xl font-bold text-red-900">${totalExpenses.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-yellow-600">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-900">{pendingTransactions.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-600">Balance</p>
                <p className="text-2xl font-bold text-blue-900">${(totalIncome - totalExpenses).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico simple de barras con CSS */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Gastos por Categoría
          </h3>
          <div className="space-y-3">
            {expensesByCategory.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-24 text-sm text-gray-600 truncate">{item.category}</div>
                <div className="flex-1 mx-3">
                  <div className="bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${(item.amount / maxAmount) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-20 text-sm font-medium text-right">${item.amount.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen visual de ingresos vs gastos */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <PieChart className="h-5 w-5 mr-2" />
            Resumen Financiero
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <p className="text-sm text-gray-600">Ingresos</p>
              <p className="text-xl font-bold text-green-600">${totalIncome.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                <TrendingDown className="h-8 w-8 text-white" />
              </div>
              <p className="text-sm text-gray-600">Gastos</p>
              <p className="text-xl font-bold text-red-600">${totalExpenses.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Transacciones recientes */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Transacciones Recientes</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Descripción</th>
                  <th className="text-left py-2">Tipo</th>
                  <th className="text-left py-2">Monto</th>
                  <th className="text-left py-2">Categoría</th>
                  <th className="text-left py-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(-5).reverse().map(transaction => (
                  <tr key={transaction.id} className="border-b">
                    <td className="py-2">{transaction.description}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type === 'income' ? 'Ingreso' : 'Gasto'}
                      </span>
                    </td>
                    <td className="py-2">${transaction.amount.toLocaleString()}</td>
                    <td className="py-2">{transaction.category}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[transaction.status]}`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Lista de transacciones
  const TransactionList = () => {
    const filteredTransactions = transactions.filter(transaction => {
      if (filter !== 'all' && transaction.type !== filter) return false;
      if (categoryFilter !== 'all' && transaction.category !== categoryFilter) return false;
      return true;
    });

    const toggleStatus = (id) => {
      setTransactions(transactions.map(t => 
        t.id === id 
          ? { ...t, status: t.status === 'Pendiente' ? 'Pagado' : 'Pendiente' }
          : t
      ));
    };

    return (
      <div className="space-y-4">
        {/* Filtros */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo</label>
            <select
              className="border rounded-lg px-3 py-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="income">Ingresos</option>
              <option value="expense">Gastos</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Categoría</label>
            <select
              className="border rounded-lg px-3 py-2"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">Todas</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista de transacciones */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4">Descripción</th>
                  <th className="text-left py-3 px-4">Fecha</th>
                  <th className="text-left py-3 px-4">Tipo</th>
                  <th className="text-left py-3 px-4">Monto</th>
                  <th className="text-left py-3 px-4">Categoría</th>
                  <th className="text-left py-3 px-4">Estado</th>
                  <th className="text-left py-3 px-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map(transaction => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{transaction.description}</td>
                    <td className="py-3 px-4">{new Date(transaction.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type === 'income' ? 'Ingreso' : 'Gasto'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">{transaction.category}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[transaction.status]}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleStatus(transaction.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        {transaction.status === 'Pendiente' ? 'Marcar Pagado' : 'Marcar Pendiente'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredTransactions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No hay transacciones que coincidan con los filtros seleccionados
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Sistema de Gestión Financiera</h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <PlusCircle className="h-5 w-5" />
              Nueva Transacción
            </button>
          </div>
        </div>
      </header>

      {/* Navegación */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'transactions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Transacciones
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'transactions' && <TransactionList />}
        </div>
      </main>

      {/* Modal del formulario */}
      {showForm && (
        <TransactionForm
          onClose={() => setShowForm(false)}
          onSave={addTransaction}
        />
      )}
    </div>
  );
};

export default ExpenseManagementSystem;