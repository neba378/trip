import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { trips as fallbackTrips } from '../data/trips';

const mapStaticTrip = (t) => ({
  ...t,
  category: t.type,
  location: t.destination,
  locationAm: t.destinationAm,
  dateEn: t.dates.displayEn,
  dateAm: t.dates.displayAm,
  departureLocationEn: t.departure.location,
  departureLocationAm: t.departure.locationAm,
  departureTimeEn: t.departure.time,
  departureTimeAm: t.departure.timeAm,
  priceETB: t.pricing.regular,
  priceUSD: t.pricing.foreigner && Math.round(t.pricing.foreigner),
  priceForeignerUSD: t.pricing.foreigner,
  descriptionEn: t.description,
  descriptionAm: t.descriptionAm,
  includesEn: (t.includes || []).map(i => ({ icon: i.icon, text: i.en })),
  includesAm: (t.includes || []).map(i => ({ icon: i.icon, text: i.am })),
  excludesEn: (t.excludes || []).map(i => ({ icon: i.icon, text: i.en })),
  excludesAm: (t.excludes || []).map(i => ({ icon: i.icon, text: i.am })),
  discounts: t.pricing.discounts,
});

const BookingContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [trips, setTrips] = useState(() => fallbackTrips.map(mapStaticTrip));
  const [language, setLanguage] = useState('en'); // 'en' | 'am'
  const [loading, setLoading] = useState(false);
  const [tripsLoading, setTripsLoading] = useState(false);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [adminToken, setAdminToken] = useState(localStorage.getItem('savanna_admin_token'));
  const [bookedTrips, setBookedTrips] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('savanna_booked_trips') || '[]')); }
    catch { return new Set(); }
  });
  const [savedEmail, setSavedEmail] = useState(() => localStorage.getItem('savanna_email') || '');

  const saveEmail = (email) => {
    localStorage.setItem('savanna_email', email);
    setSavedEmail(email);
  };

  useEffect(() => {
    fetchTrips();
    if (adminToken) {
      fetchBookings();
    }
  }, [adminToken]);

  const fetchTrips = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/trips`, { timeout: 5000 });
      if (response.data.success && response.data.data.length > 0) {
        setTrips(response.data.data);
      }
    } catch (error) {
      console.error('API trips sync failed, using local data:', error);
    }
  }, []);

  const fetchBookings = async () => {
    setBookingsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (response.data.success) {
        setBookings(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      if (error.response?.status === 401) {
        logoutAdmin();
      }
    } finally {
      setBookingsLoading(false);
    }
  };

  const loginAdmin = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      if (response.data.success) {
        const { token } = response.data;
        setAdminToken(token);
        localStorage.setItem('savanna_admin_token', token);
        toast.success('Logged in successfully');
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const logoutAdmin = () => {
    setAdminToken(null);
    localStorage.removeItem('savanna_admin_token');
    toast.success('Logged out');
  };

  // ---- Admin account management (all admins are equal level) ----
  const authHeader = () => ({ headers: { Authorization: `Bearer ${adminToken}` } });

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/users`, authHeader());
      if (response.data.success) return response.data.data;
      return [];
    } catch (error) {
      if (error.response?.status === 401) logoutAdmin();
      toast.error('Failed to load admins');
      return [];
    }
  };

  const createAdmin = async ({ name, email, password }) => {
    const loadToast = toast.loading('Creating admin...');
    try {
      const response = await axios.post(`${API_URL}/auth/users`, { name, email, password }, authHeader());
      if (response.data.success) {
        toast.success('Admin created', { id: loadToast });
        return response.data.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create admin', { id: loadToast });
      throw error;
    }
  };

  const setAdminActive = async (id, active) => {
    try {
      const action = active ? 'reactivate' : 'deactivate';
      const response = await axios.patch(`${API_URL}/auth/users/${id}/${action}`, {}, authHeader());
      if (response.data.success) {
        toast.success(active ? 'Admin reactivated' : 'Admin deactivated');
        return response.data.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update admin');
      throw error;
    }
  };

  const addBooking = async (formData) => {
    setLoading(true);
    const loadToast = toast.loading('Submitting your booking...');
    try {
      const response = await axios.post(`${API_URL}/bookings`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      if (response.data.success) {
        const tripId = formData.get('tripId');
        if (tripId) {
          setBookedTrips(prev => {
            const next = new Set(prev);
            next.add(String(tripId));
            localStorage.setItem('savanna_booked_trips', JSON.stringify([...next]));
            return next;
          });
        }
        const email = formData.get('email');
        if (email) saveEmail(email);
        toast.success('Booking submitted successfully!', { id: loadToast });
        return response.data.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit booking', { id: loadToast });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      const response = await axios.patch(`${API_URL}/bookings/${id}`, { status }, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (response.data.success) {
        setBookings(prev => prev.map(b => b.id === id ? response.data.data : b));
        toast.success(`Booking ${status}`);
        return response.data.data;
      }
    } catch (error) {
      toast.error('Failed to update status');
      throw error;
    }
  };

  const manageTrip = async (tripData, method = 'POST', id = null) => {
    const loadToast = toast.loading('Saving trip...');
    try {
      const url = id ? `${API_URL}/trips/${id}` : `${API_URL}/trips`;
      const response = await axios({
        method,
        url,
        data: tripData,
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      
      if (response.data.success) {
        toast.success('Trip saved successfully!', { id: loadToast });
        fetchTrips();
        return response.data.data;
      }
    } catch (error) {
      toast.error('Failed to save trip', { id: loadToast });
      throw error;
    }
  };

  const deleteTrip = async (id) => {
    if (!window.confirm('Are you sure you want to delete this trip?')) return;
    try {
      await axios.delete(`${API_URL}/trips/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      toast.success('Trip deleted');
      fetchTrips();
    } catch (error) {
      toast.error('Failed to delete trip');
    }
  };

  // Admin: upload one or more image files, returns an array of public URLs
  // (e.g. ['/uploads/123.jpg']) to store on a trip.
  const uploadImages = async (files) => {
    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('images', file));
    const response = await axios.post(`${API_URL}/uploads/image`, formData, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.urls;
  };

  const syncBookedTrips = async (email) => {
    try {
      const res = await axios.get(`${API_URL}/bookings/lookup`, { params: { email } });
      if (res.data.success) {
        const tripIds = (res.data.data || []).map(b => String(b.tripId));
        setBookedTrips(new Set(tripIds));
        localStorage.setItem('savanna_booked_trips', JSON.stringify(tripIds));
      }
    } catch {
      // silent – just means no bookings or network issue
    }
  };

  const markTripBooked = (tripId) => {
    setBookedTrips(prev => {
      const next = new Set(prev);
      next.add(String(tripId));
      localStorage.setItem('savanna_booked_trips', JSON.stringify([...next]));
      return next;
    });
  };

  const toggleLanguage = () => setLanguage(l => l === 'en' ? 'am' : 'en');

  return (
    <BookingContext.Provider value={{ 
      bookings, 
      trips,
      addBooking, 
      updateBookingStatus, 
      manageTrip,
      deleteTrip,
      uploadImages,
      language, 
      setLanguage, 
      toggleLanguage,
      bookedTrips,
      syncBookedTrips,
      markTripBooked,
      savedEmail,
      saveEmail,
      loading,
      tripsLoading,
      bookingsLoading,
      adminToken,
      loginAdmin,
      logoutAdmin,
      fetchAdmins,
      createAdmin,
      setAdminActive
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
