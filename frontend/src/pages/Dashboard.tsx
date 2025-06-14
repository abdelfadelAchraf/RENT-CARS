import React, { useEffect, useState } from 'react';
import {
    Car,
    Plus,
    BarChart3,
    Users,
    DollarSign,
    Calendar,
    Settings,
    LogOut,
    Menu,
    X,
    MapPin,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    Heart
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { GrAdd } from 'react-icons/gr';
import { useCars } from '../context/CarContext';
import { FiAlertCircle, FiCheck, FiEdit2, FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BiLocationPlus } from 'react-icons/bi';


// Alert message interface
interface AlertMessage {
    type: 'success' | 'error';
    text: string;
}
const Dashboard: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    const { user } = useAuth();
    const { userCars, loading, error, fetchUserCars, fetchCars, deleteCar, updateCarAvailability } = useCars();
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [alertMessage, setAlertMessage] = useState<AlertMessage | null>(null);

    useEffect(() => {
        let isMounted = true;
        console.log("the user is ",user)
        const loadData = async () => {
            try {
                if (user) {
                    await fetchUserCars();
                }
            } catch (err) {
                if (isMounted) {
                    console.error("Failed to load user cars:", err);
                }
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, [user]); // Only depend on user

    const handleDeleteCar = async (id: string): Promise<void> => {
        try {
            const success = await deleteCar(id);

            if (success) {
                setDeleteConfirm(null);

                // Refresh the car list in context
                fetchCars();

                // Show success message
                setAlertMessage({
                    type: 'success',
                    text: 'Car successfully deleted'
                });
            } else {
                throw new Error('Failed to delete car');
            }

            // Clear alert after 3 seconds
            setTimeout(() => setAlertMessage(null), 3000);
        } catch (err) {
            setAlertMessage({
                type: 'error',
                text: 'Failed to delete car. Please try again.'
            });
            setTimeout(() => setAlertMessage(null), 3000);
        }
    };

    const toggleAvailability = async (id: string, currentStatus: boolean): Promise<void> => {
        try {
            const updatedCar = await updateCarAvailability(id, {
                isAvailable: !currentStatus
            });

            if (updatedCar) {
                // Show success message
                setAlertMessage({
                    type: 'success',
                    text: `Car is now ${!currentStatus ? 'available' : 'unavailable'} for rent`
                });
            } else {
                throw new Error('Failed to update availability');
            }

            // Clear alert after 3 seconds
            setTimeout(() => setAlertMessage(null), 3000);
        } catch (err) {
            setAlertMessage({
                type: 'error',
                text: 'Failed to update availability. Please try again.'
            });
            setTimeout(() => setAlertMessage(null), 3000);
        }
    };

    // if (loading) {
    //     return (
    //         <div className="container mx-auto px-4 py-8 h-screen">
    //             <div className="flex justify-between items-center mb-8">
    //                 <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Cars</h1>
    //             </div>
    //             <div className="flex flex-col items-center justify-center py-16">
    //                 <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    //                 <p className="mt-4 text-gray-600">Loading your cars...</p>
    //             </div>
    //         </div>
    //     );
    // }

    // Show error if user is not authenticated
    if (!user) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Cars</h1>
                </div>
                <div className="bg-red-100 border border-red-200 rounded-lg p-6 flex items-center justify-center">
                    <FiAlertCircle className="text-red-500 text-xl mr-2" />
                    <p className="text-red-700">You must be logged in to view your cars</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Cars</h1>
                </div>
                <div className="bg-red-100 border border-red-200 rounded-lg p-6 flex items-center justify-center">
                    <FiAlertCircle className="text-red-500 text-xl mr-2" />
                    <p className="text-red-700">{error}</p>
                </div>
            </div>
        );
    }


    // Sample data for charts
    const revenueData = [
        { month: 'Jan', revenue: 15000, bookings: 45 },
        { month: 'Feb', revenue: 18000, bookings: 52 },
        { month: 'Mar', revenue: 22000, bookings: 61 },
        { month: 'Apr', revenue: 19000, bookings: 48 },
        { month: 'May', revenue: 25000, bookings: 67 },
        { month: 'Jun', revenue: 28000, bookings: 74 }
    ];

    const carTypeData = [
        { name: 'Sedan', value: 35, color: '#3B82F6' },
        { name: 'SUV', value: 25, color: '#10B981' },
        { name: 'Hatchback', value: 20, color: '#F59E0B' },
        { name: 'Luxury', value: 20, color: '#EF4444' },
    ];

    const sidebarItems = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'cars', label: 'My Cars', icon: Car },
        { id: 'bookings', label: 'Bookings', icon: Calendar },
        { id: 'customers', label: 'Customers', icon: Users },
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'saved', label: 'Saved', icon: Heart }
    ];


    return (
        <div className="flex h-screen bg-gray-50 -z-30">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                        <Car className="w-8 h-8 text-blue-600" />
                        <span className="text-xl font-bold text-gray-800">RentCar</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="mt-6">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors ${activeTab === item.id ? 'bg-blue-50 border-r-4 border-blue-600 text-blue-600' : 'text-gray-600'
                                    }`}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                {/* <div className="absolute bottom-0 w-full p-6">
                    <button className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </button>
                </div> */}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden mr-4"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <h1 className="text-2xl font-semibold text-gray-800 capitalize">{activeTab}</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
                               {user.name.toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Total Revenue</p>
                                            <p className="text-2xl font-bold text-gray-800">127,000 DH</p>
                                            <p className="text-sm text-green-600">+12% from last month</p>
                                        </div>
                                        <div className="bg-green-100 p-3 rounded-full">
                                            <DollarSign className="w-6 h-6 text-green-600" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Total Cars</p>
                                            <p className="text-2xl font-bold text-gray-800">{userCars.length}</p>
                                            <p className="text-sm text-blue-600">{userCars.filter(c => c.isAvailable).length} available</p>
                                        </div>
                                        <div className="bg-blue-100 p-3 rounded-full">
                                            <Car className="w-6 h-6 text-blue-600" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Active Bookings</p>
                                            <p className="text-2xl font-bold text-gray-800">24</p>
                                            <p className="text-sm text-orange-600">3 pending approval</p>
                                        </div>
                                        <div className="bg-orange-100 p-3 rounded-full">
                                            <Calendar className="w-6 h-6 text-orange-600" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Total Customers</p>
                                            <p className="text-2xl font-bold text-gray-800">1,247</p>
                                            <p className="text-sm text-purple-600">+8% this month</p>
                                        </div>
                                        <div className="bg-purple-100 p-3 rounded-full">
                                            <Users className="w-6 h-6 text-purple-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Charts */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={revenueData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold mb-4">Car Types Distribution</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={carTypeData}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                dataKey="value"
                                                label={({ name, value }) => `${name}: ${value}%`}
                                            >
                                                {carTypeData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Bookings Chart */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold mb-4">Monthly Bookings</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={revenueData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="bookings" fill="#10B981" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}


                    {activeTab === 'cars' && (
                        <div className="container mx-auto px-4 py-8">
                            {/* Header with Title and Add Button */}
                            <div className="flex justify-between items-center mb-8">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Cars</h1>
                                <Link
                                    to="/add-car"
                                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                                >
                                    <FiPlus className="text-white" />
                                    <span>Add New Car</span>
                                </Link>
                            </div>

                            {/* Alert Message */}
                            {alertMessage && (
                                <div className={`mb-6 p-4 rounded-lg flex items-center justify-between ${alertMessage.type === 'success' ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'
                                    }`}>
                                    <div className="flex items-center">
                                        {alertMessage.type === 'success' ? (
                                            <FiCheck className="text-green-500 text-xl mr-2" />
                                        ) : (
                                            <FiAlertCircle className="text-red-500 text-xl mr-2" />
                                        )}
                                        <p className={alertMessage.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                                            {alertMessage.text}
                                        </p>
                                    </div>
                                    <button onClick={() => setAlertMessage(null)}>
                                        <FiX className={alertMessage.type === 'success' ? 'text-green-500' : 'text-red-500'} />
                                    </button>
                                </div>
                            )}

                            {/* No Cars Message */}
                            {userCars.length === 0 && (
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">You don't have any cars listed yet</h3>
                                    <p className="text-gray-600 mb-6">Add your first car to start renting it out and make money!</p>
                                    <Link
                                        to="/add-car"
                                        className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
                                    >
                                        <FiPlus className="text-white" />
                                        <span>Add Your First Car</span>
                                    </Link>
                                </div>
                            )}

                            {/* Cars Grid */}
                            {userCars.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {userCars.map(car => (
                                        <div key={car._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                                            {/* Car Image */}
                                            <div className="relative h-48 bg-gray-200">
                                                <img
                                                    src={car.images && car.images.length > 0 ? car.images[0] : '/api/placeholder/400/240'}
                                                    alt={car.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${car.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {car.isAvailable ? 'Available' : 'Unavailable'}
                                                </div>
                                            </div>

                                            {/* Car Details */}
                                            <div className="p-5">
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                    {car.name}
                                                </h3>

                                                <div className="flex items-center text-gray-700 mb-3">
                                                    <span className="text-lg font-semibold text-blue-500">{car.price}DH</span>
                                                    <span className="ml-1 text-gray-500">/day</span>
                                                </div>
                                                <div className="flex items-center text-gray-600 mb-4">
                                                    <BiLocationPlus className="text-blue-500 text-2xl mr-2" />
                                                    <span>{car.location}</span>
                                                </div>



                                                {/* <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="text-gray-700">{car.reviewCount ? (car.reviewCount > 0 ? '4.5' : '0.0') : '0.0'}</span>
                    <span className="text-gray-500 text-sm ml-1">({car.reviewCount || 0} reviews)</span>
                  </div>
                </div> */}

                                                {/* Actions */}
                                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                                    <div className="flex gap-2">
                                                        <Link
                                                            to={`/edit-car/${car._id}`}
                                                            className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md transition-colors duration-200"
                                                        >
                                                            <FiEdit2 className="text-gray-600" size={16} />
                                                            <span>Edit</span>
                                                        </Link>

                                                        {deleteConfirm === car._id ? (
                                                            <div className="flex items-center gap-1">
                                                                <button
                                                                    onClick={() => handleDeleteCar(car._id)}
                                                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md transition-colors duration-200"
                                                                >
                                                                    Confirm
                                                                </button>
                                                                <button
                                                                    onClick={() => setDeleteConfirm(null)}
                                                                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-3 rounded-md transition-colors duration-200"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => setDeleteConfirm(car._id)}
                                                                className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md transition-colors duration-200"
                                                            >
                                                                <FiTrash2 className="text-red-500" size={16} />
                                                                <span>Delete</span>
                                                            </button>
                                                        )}
                                                    </div>

                                                    <button
                                                        onClick={() => toggleAvailability(car._id, car.isAvailable)}
                                                        className={`py-2 px-3 rounded-md transition-colors duration-200 text-sm ${car.isAvailable
                                                            ? 'bg-red-50  text-red-600 hover:bg-red-100'
                                                            : 'bg-green-50  text-green-600 hover:bg-green-100'
                                                            }`}
                                                    >
                                                        {car.isAvailable ? 'Set Unavailable' : 'Set Available'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'bookings' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4">Customer</th>
                                            <th className="text-left py-3 px-4">Car</th>
                                            <th className="text-left py-3 px-4">Date Range</th>
                                            <th className="text-left py-3 px-4">Amount</th>
                                            <th className="text-left py-3 px-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-100">
                                            <td className="py-3 px-4">Ahmed Hassan</td>
                                            <td className="py-3 px-4">BMW X5</td>
                                            <td className="py-3 px-4">Jun 15 - Jun 18</td>
                                            <td className="py-3 px-4">1,800 DH</td>
                                            <td className="py-3 px-4">
                                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="py-3 px-4">Fatima El Mansouri</td>
                                            <td className="py-3 px-4">Audi A6</td>
                                            <td className="py-3 px-4">Jun 20 - Jun 22</td>
                                            <td className="py-3 px-4">1,000 DH</td>
                                            <td className="py-3 px-4">
                                                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4">Youssef Benali</td>
                                            <td className="py-3 px-4">Mercedes S-Class</td>
                                            <td className="py-3 px-4">Jun 25 - Jun 30</td>
                                            <td className="py-3 px-4">4,000 DH</td>
                                            <td className="py-3 px-4">
                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Confirmed</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'customers' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-xl font-semibold mb-4">Customer Management</h2>
                            <div className="text-center py-12 text-gray-500">
                                <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                <p>Customer management features coming soon...</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-xl font-semibold mb-4">Settings</h2>
                            <div className="text-center py-12 text-gray-500">
                                <Settings className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                <p>Settings panel coming soon...</p>
                            </div>
                        </div>
                    )}
                    {activeTab === 'saved' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-xl font-semibold mb-4">Saved</h2>
                            <div className="text-center py-12 text-gray-500">
                                <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                <p>Saved panel coming soon...</p>
                            </div>
                        </div>
                    )}

                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default Dashboard;