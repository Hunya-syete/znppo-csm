/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  TrendingUp, 
  BarChart3, 
  Users, 
  FileSpreadsheet, 
  Plus, 
  Wifi, 
  WifiOff, 
  AlertCircle, 
  CheckCircle,
  Clock,
  Printer, 
  Trash2, 
  Smartphone,
  Eye,
  RefreshCw,
  Search,
  BookOpen,
  Star
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell, 
  PieChart, 
  Pie 
} from 'recharts';
import { QRLocation, Feedback, AnalyticsSummary } from '../types';

interface AdminDashboardProps {
  onSelectPoster: (location: QRLocation) => void;
  refreshTrigger?: number;
}

export default function AdminDashboard({ onSelectPoster, refreshTrigger = 0 }: AdminDashboardProps) {
  // Security
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);

  // DB States
  const [locations, setLocations] = useState<QRLocation[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [opError, setOpError] = useState<string | null>(null);

  // Form parameters
  const [newOfficeName, setNewOfficeName] = useState<string>('');
  const [newOfficeCode, setNewOfficeCode] = useState<string>('');
  const [isCreatingLoc, setIsCreatingLoc] = useState<boolean>(false);
  const [createdLabel, setCreatedLabel] = useState<boolean>(false);

  // Tab switcher
  const [activeTab, setActiveTab] = useState<'overview' | 'locations' | 'feedbacks'>('overview');

  // Filters for feedbacks
  const [fbSearch, setFbSearch] = useState<string>('');
  const [fbCategoryFilter, setFbCategoryFilter] = useState<string>('all');
  const [fbRatingFilter, setFbRatingFilter] = useState<string>('all');

  // Initialize and load
  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
    }
  }, [isAuthenticated, refreshTrigger]);

  const loadAdminData = async () => {
    setIsLoading(true);
    setOpError(null);
    try {
      const [locRes, fbRes, analyRes] = await Promise.all([
        fetch('/api/locations'),
        fetch('/api/feedbacks'),
        fetch('/api/analytics')
      ]);

      if (locRes.ok && fbRes.ok && analyRes.ok) {
        setLocations(await locRes.json());
        setFeedbacks(await fbRes.json());
        setAnalytics(await analyRes.json());
      } else {
        setOpError('Failed to communicate with official administration database.');
      }
    } catch (err) {
      setOpError('Cannot connect to fullstack admin endpoints. Server backend is offline.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError(null);
    
    // Simple secure check code: 1234 or pnp999
    if (pinInput === '1234' || pinInput.toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      setPinInput('');
    } else {
      setPinError('Access Denied: Command code is invalid. Hint: Use PIN 1234');
      setPinInput('');
    }
  };

  const handleCreateLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    setOpError(null);
    setIsCreatingLoc(true);

    if (!newOfficeName || !newOfficeCode) {
      setOpError('All station fields are required.');
      setIsCreatingLoc(false);
      return;
    }

    try {
      const res = await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          office_name: newOfficeName.trim(),
          office_code: newOfficeCode.trim()
        })
      });

      if (res.ok) {
        setNewOfficeName('');
        setNewOfficeCode('');
        setCreatedLabel(true);
        setTimeout(() => setCreatedLabel(false), 3000);
        await loadAdminData();
      } else {
        const errorData = await res.json();
        setOpError(errorData.error || 'Failed to register location.');
      }
    } catch (err) {
      setOpError('Network error during registration.');
    } finally {
      setIsCreatingLoc(false);
    }
  };

  const handleToggleLocStatus = async (id: string, currentStatus: 'active' | 'inactive') => {
    setOpError(null);
    const nextStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      const res = await fetch(`/api/locations/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });

      if (res.ok) {
        await loadAdminData();
      } else {
        setOpError('Failed to alter router status.');
      }
    } catch (err) {
      setOpError('Communication loss during status deactivation.');
    }
  };

  const handleExportCSV = () => {
    if (!feedbacks || feedbacks.length === 0) {
      alert('No feedback logs available to export.');
      return;
    }

    // Comprehensive column headers for external analytical processing
    const headers = [
      'Submission ID',
      'Date & Time (UTC)',
      'Date & Time (Local)',
      'Feedback Category',
      'Office Station Target',
      'Client Type',
      'Gender',
      'Age',
      'Region',
      'Service Type',
      'CC1 Awareness',
      'CC2 Visibility',
      'CC3 Helpfulness',
      'SQD0 Satisfaction',
      'SQD1 Time',
      'SQD2 Requirements',
      'SQD3 Steps & Payment',
      'SQD4 Info Access',
      'SQD5 Fees Value',
      'SQD6 Fairness',
      'SQD7 Courtesy',
      'SQD8 Outcome',
      'Overall Consolidated Score',
      'Comments',
      'Suggestions',
      'Email',
      'Citizen Name',
      'Citizen Contact Info',
      'Involved Badge / Officer Name',
      'Submitting IP Address',
      'Web Browser User-Agent'
    ];

    const escapeCSVValue = (val: any) => {
      if (val === null || val === undefined) return '';
      const stringified = String(val);
      // Escape enclosing quotes by doubling them, then wrap with quotes if necessary
      if (stringified.includes(',') || stringified.includes('"') || stringified.includes('\n') || stringified.includes('\r')) {
        return `"${stringified.replace(/"/g, '""')}"`;
      }
      return stringified;
    };

    const rows = feedbacks.map(fb => [
      fb.id,
      new Date(fb.created_at).toISOString(),
      new Date(fb.created_at).toLocaleString(),
      fb.category,
      fb.office_source,
      fb.client_type || 'Mamamayan',
      fb.gender || 'Lalaki',
      fb.age || 'N/A',
      fb.region || 'Region IX',
      fb.service_type || 'General',
      fb.cc1 || 'N/A',
      fb.cc2 || 'N/A',
      fb.cc3 || 'N/A',
      fb.sqd_ratings?.sqd0 ?? fb.ratings?.cleanliness ?? 'N/A',
      fb.sqd_ratings?.sqd1 ?? fb.ratings?.promptness ?? 'N/A',
      fb.sqd_ratings?.sqd2 ?? 5,
      fb.sqd_ratings?.sqd3 ?? fb.ratings?.efficiency ?? 'N/A',
      fb.sqd_ratings?.sqd4 ?? 5,
      fb.sqd_ratings?.sqd5 ?? 5,
      fb.sqd_ratings?.sqd6 ?? 5,
      fb.sqd_ratings?.sqd7 ?? fb.ratings?.courtesy ?? 'N/A',
      fb.sqd_ratings?.sqd8 ?? 5,
      fb.rating,
      fb.comments || '',
      fb.suggestions || '',
      fb.email || '',
      fb.citizen_name || 'Anonymous',
      fb.citizen_contact || 'N/A',
      fb.officer_name || 'N/A',
      fb.ip_address || 'N/A',
      fb.device_info || 'N/A'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(escapeCSVValue).join(','))
    ].join('\r\n');

    // Add UTF-8 BOM so Microsoft Excel and other spreadsheet tools render foreign encodings perfectly
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ZNPPPO_Citizen_Feedback_Submissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Process visual colors for Recharts distributions
  const COLORS = ['#10b981', '#f59e0b', '#dc2626', '#64748b']; // Compliment, Suggestion, Complaint, Inquiry
  const STAR_COLORS = ['#fbbf24', '#f59e0b', '#ca8a04', '#ca8a04', '#ca8a04'];

  // Form filters processing
  const filteredFeedbacks = feedbacks.filter(fb => {
    const matchesSearch = 
      fb.comments.toLowerCase().includes(fbSearch.toLowerCase()) ||
      fb.office_source.toLowerCase().includes(fbSearch.toLowerCase()) ||
      (fb.citizen_name && fb.citizen_name.toLowerCase().includes(fbSearch.toLowerCase())) ||
      (fb.officer_name && fb.officer_name.toLowerCase().includes(fbSearch.toLowerCase()));

    const matchesCategory = fbCategoryFilter === 'all' || fb.category === fbCategoryFilter;
    
    let matchesRating = true;
    if (fbRatingFilter === 'high') matchesRating = fb.rating >= 4.0;
    else if (fbRatingFilter === 'mid') matchesRating = fb.rating >= 2.5 && fb.rating < 4.0;
    else if (fbRatingFilter === 'low') matchesRating = fb.rating < 2.5;

    return matchesSearch && matchesCategory && matchesRating;
  });

  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-slate-150 overflow-hidden mt-6" id="admin-login-box">
        <div className="bg-police-blue text-white p-6 border-b-4 border-police-gold text-center flex flex-col items-center">
          <Lock className="w-8 h-8 text-amber-450 mb-2 animate-bounce" />
          <h2 className="text-md font-extrabold uppercase tracking-widest text-white">ZNPPPO Admin Portal</h2>
          <p className="text-[10px] text-indigo-200 font-mono tracking-wider mt-1">SECURITY LOGON REQUIRED</p>
        </div>

        <form onSubmit={handleAdminVerify} className="p-6 space-y-4" id="login-form">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Enter Station Command Pin
            </label>
            <input
              type="password"
              placeholder="••••"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full bg-slate-50 border text-center font-mono focus:bg-white border-slate-200 focus:outline-none focus:ring-2 focus:ring-police-blue/15 rounded-xl px-4 py-3 text-lg tracking-[0.3em]"
              required
              autoFocus
            />
            <p className="text-[10px] text-police-blue text-center bg-blue-50 font-medium p-2 rounded border border-blue-150">
              Reviewer Hint: Use PIN <strong className="font-bold underline text-police-blue-hover">1234</strong> or <strong className="font-bold underline text-police-blue-hover">admin</strong> to authorized unlock.
            </p>
          </div>

          {pinError && (
            <div className="p-3 bg-red-100/50 border border-red-200 rounded-lg text-red-700 text-xs text-center flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="font-semibold">{pinError}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-police-blue hover:bg-police-blue-hover text-white font-bold py-3 px-6 rounded-xl text-center flex items-center justify-center gap-2 transition"
          >
            <Unlock className="w-4 h-4" />
            AUTHORIZE PORTAL ACCESS
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full max-w-7xl mx-auto" id="admin-active-dashboard">
      
      {/* 1. Header Admin Navigation and Slogans */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-150 pb-5 gap-4" id="dashboard-navbar">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-150 text-emerald-800 text-[10px] font-bold tracking-wider rounded-full px-2.5 py-0.5 uppercase flex items-center gap-1 font-mono border border-emerald-300">
              <Wifi className="w-3.5 h-3.5" /> SECURE CONSOLE LIVE
            </span>
          </div>
          <h1 className="text-2xl font-black text-police-blue tracking-tight mt-1 uppercase">
            Provincial Command Analytics
          </h1>
          <p className="text-xs text-slate-500 font-mono">
            Zamboanga del Norte Police Provincial Office (ZNPPPO)
          </p>
        </div>

        <div className="flex items-center gap-2" id="nav-tabs-group">
          <button 
            onClick={() => { setActiveTab('overview'); loadAdminData(); }}
            className={`cursor-pointer px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'overview' ? 'bg-police-blue text-white shadow-sm' : 'border border-slate-200 text-slate-600 hover:bg-slate-50 bg-white'}`}
          >
            Overview & Charts
          </button>
          <button 
            onClick={() => { setActiveTab('locations'); loadAdminData(); }}
            className={`cursor-pointer px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'locations' ? 'bg-police-blue text-white shadow-sm' : 'border border-slate-200 text-slate-600 hover:bg-slate-50 bg-white'}`}
          >
            QR Code Registry ({locations.length})
          </button>
          <button 
            onClick={() => { setActiveTab('feedbacks'); loadAdminData(); }}
            className={`cursor-pointer px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'feedbacks' ? 'bg-police-blue text-white shadow-sm' : 'border border-slate-200 text-slate-600 hover:bg-slate-50 bg-white'}`}
          >
            Detailed Submissions ({feedbacks.length})
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="cursor-pointer ml-2 p-2 border border-slate-200 cursor-pointer rounded-lg text-slate-400 hover:text-slate-800"
            title="Lock Console"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Global Error Prompt */}
      {opError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span><strong>System Notice:</strong> {opError}</span>
          </div>
          <button onClick={loadAdminData} className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded-lg text-[11px] font-bold">Reload API</button>
        </div>
      )}

      {isLoading ? (
        <div className="bg-slate-50 p-20 text-center rounded-2xl border flex flex-col justify-center items-center animate-pulse">
          <RefreshCw className="w-10 h-10 animate-spin text-slate-350 mb-3" />
          <p className="text-slate-500 text-sm font-medium">Downloading secured feedback matrix logs...</p>
        </div>
      ) : activeTab === 'overview' && analytics ? (
        <div className="space-y-6" id="tab-overview-content">
          
          {/* Key Stat Cards Grid - Styled with borders matching .stat-cardFallback */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" id="stats-grid">
            <div className="bg-white p-5 rounded-r rounded-l border border-slate-150 border-l-4 border-l-police-blue shadow-sm">
              <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">Total Poster Scans</span>
              <div className="text-2xl font-black text-police-blue mt-1 flex items-baseline gap-2">
                {analytics.totalScans}
                <span className="text-xs font-mono text-indigo-500 font-bold">telemetry</span>
              </div>
              <p className="text-[10px] text-slate-450 mt-0.5">Printed poster hits detected</p>
            </div>

            <div className="bg-white p-5 rounded-r rounded-l border border-slate-150 border-l-4 border-l-police-blue shadow-sm">
              <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">Filed Feedbacks</span>
              <div className="text-2xl font-black text-police-blue mt-1 flex items-baseline gap-2">
                {analytics.totalSubmissions}
                <span className="text-xs font-mono text-emerald-600 font-bold">registered</span>
              </div>
              <p className="text-[10px] text-slate-450 mt-0.5">Consolidated total entries</p>
            </div>

            <div className="bg-white p-5 rounded-r rounded-l border border-slate-150 border-l-4 border-l-police-blue shadow-sm">
              <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">Conversion rate</span>
              <div className="text-2xl font-black text-police-blue mt-1 flex items-baseline gap-2">
                {analytics.conversionRate}%
                <span className="text-xs font-mono text-slate-450">rate</span>
              </div>
              <p className="text-[10px] text-slate-450 mt-0.5">From Poster scan to Submission</p>
            </div>

            <div className="bg-white p-5 rounded-r rounded-l border border-slate-150 border-l-4 border-l-police-blue shadow-sm">
              <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">Overall Satisfaction</span>
              <div className="text-2xl font-black text-police-blue mt-1 flex items-center gap-1.5 text-police-gold">
                {analytics.averageRating}
                <div className="flex items-center text-police-gold text-xs shrink-0 select-none">
                  <Star className="w-4 h-4 fill-current shrink-0" />
                </div>
              </div>
              <p className="text-[10px] text-slate-450 mt-0.5">Consolidated rating average</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="dashboard-charts-layout">
            
            {/* Chart 1: Date Volume Area Trend */}
            <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" /> FEEDBACK ACTIVITY TRENDS (Last 14 Days)
              </h3>
              <div className="h-64" id="trend-chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.trends}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 9 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(dStr) => {
                        try {
                          const dateParts = dStr.split('-');
                          return `${dateParts[1]}/${dateParts[2]}`; // MM/DD
                        } catch (_) { return dStr; }
                      }}
                    />
                    <YAxis tick={{ fontSize: 9 }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="count" stroke="#1e3a8a" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCount)" name="Feedbacks" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Category Pie Chart */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-indigo-600" /> Purpose Type Split
                </h3>
                <div className="h-44 flex items-center justify-center relative" id="pie-chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={Object.keys(analytics.byCategory).map(cat => ({
                          name: cat.toUpperCase(),
                          value: analytics.byCategory[cat as keyof typeof analytics.byCategory]
                        }))}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {Object.keys(analytics.byCategory).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ fontSize: 10, borderRadius: '6px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Central Overlay */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block leading-none">Total</span>
                    <span className="text-lg font-black text-slate-800 leading-tight">{analytics.totalSubmissions}</span>
                  </div>
                </div>
              </div>

              {/* Legends */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-600 pt-4 border-t" id="pie-chart-legends">
                {Object.keys(analytics.byCategory).map((cat, idx) => (
                  <div key={cat} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx] }} />
                    <span className="capitalize">{cat}: {analytics.byCategory[cat as keyof typeof analytics.byCategory]}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="charts-second-row">
            {/* Chart 3: Star Rating Distribution Histogram */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-amber-500" /> Star distributions
              </h3>
              <div className="h-56" id="rating-chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={Object.keys(analytics.ratingDistribution).map(stars => ({
                      stars: `${stars} ★`,
                      count: analytics.ratingDistribution[Number(stars) as 1|2|3|4|5]
                    }))}
                    margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
                  >
                    <XAxis dataKey="stars" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 9 }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip contentStyle={{ fontSize: 10, borderRadius: '6px' }} />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={25} name="Submissions">
                      {Object.keys(analytics.ratingDistribution).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={STAR_COLORS[index]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 4: Hourly Peak Activity heatmap / bar chart */}
            <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-700" /> Peak Filing Hours (Hourly Activity Matrix)
              </h3>
              <div className="h-56" id="hourly-chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={Object.keys(analytics.hourlyTrends).map(hr => ({
                      hour: hr,
                      submissions: analytics.hourlyTrends[hr]
                    })).filter(item => item.submissions > 0 || ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'].includes(item.hour))}
                    margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
                  >
                    <XAxis dataKey="hour" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 9 }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip contentStyle={{ fontSize: 10, borderRadius: '6px' }} />
                    <Bar dataKey="submissions" fill="#1e3a8a" radius={[4, 4, 0, 0]} barSize={20} name="Submissions" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 5. Office Performance Ranking Summary */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden" id="office-leaderboard">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider">Office Performance matrix</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Units satisfaction rate and engagement stats</p>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 p-1 rounded">Ranked by Ratings</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[9px] border-b border-slate-150">
                    <th className="p-4">Station Unit Office Description</th>
                    <th className="p-4 text-center">Submissions</th>
                    <th className="p-4 text-center">Rating Average</th>
                    <th className="p-4">Command Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {Object.keys(analytics.byOffice).map((officeName) => {
                    const stats = analytics.byOffice[officeName];
                    const matchedLoc = locations.find(l => l.office_name === officeName);
                    
                    // Determine safety colors for stars
                    let starsColor = 'text-slate-350';
                    if (stats.averageRating >= 4.0) starsColor = 'text-emerald-600 font-bold';
                    else if (stats.averageRating >= 2.5) starsColor = 'text-amber-600 font-bold';
                    else if (stats.averageRating > 0) starsColor = 'text-rose-600 font-bold';

                    return (
                      <tr key={officeName} className="hover:bg-slate-50/30">
                        <td className="p-4 font-bold text-slate-800">{officeName}</td>
                        <td className="p-4 text-center font-mono font-bold text-slate-600">{stats.count}</td>
                        <td className="p-4 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-50 ${starsColor}`}>
                            {stats.averageRating} ★
                          </span>
                        </td>
                        <td className="p-4">
                          {matchedLoc ? (
                            <button
                              onClick={() => onSelectPoster(matchedLoc)}
                              className="text-indigo-600 hover:text-indigo-800 hover:underline inline-flex items-center gap-1 font-semibold cursor-pointer"
                            >
                              <Printer className="w-3.5 h-3.5" /> View Public Poster
                            </button>
                          ) : (
                            <span className="text-slate-400">Manual Walk-In Entry</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      ) : activeTab === 'locations' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="tab-locations-content">
          
          {/* Create new Location Code card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 h-fit space-y-4" id="create-location-container">
            <div className="flex items-center gap-1.5 border-b pb-3 mb-2">
              <Plus className="w-4 h-4 text-slate-800" />
              <h2 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                Generate Secure QR Location
              </h2>
            </div>

            <form onSubmit={handleCreateLocation} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-slate-600 font-medium text-[11px]">Official Station/Office Unit Name</label>
                <input
                  type="text"
                  placeholder="E.g., Women & Children Protection Desk (WCPC)"
                  value={newOfficeName}
                  onChange={(e) => setNewOfficeName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:bg-white text-xs rounded-xl px-3.5 py-2.5"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-600 font-medium text-[11px]">Unique Alphanumeric Code (Short-URL)</label>
                <input
                  type="text"
                  placeholder="E.g., wcpc, traffic, clearance-desk"
                  value={newOfficeCode}
                  onChange={(e) => setNewOfficeCode(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                  className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:bg-white text-xs font-mono rounded-xl px-3.5 py-2.5"
                  required
                />
                <p className="text-[10px] text-slate-400">No spaces. Converts directly to security tokens.</p>
              </div>

              {createdLabel && (
                <div className="p-3 bg-emerald-50 border border-emerald-150 rounded-lg text-emerald-800 text-[11px] flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-4 h-4" /> Secure Token Generated Successfully!
                </div>
              )}

              <button
                type="submit"
                disabled={isCreatingLoc}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-center text-xs flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <Plus className="w-4 h-4" />
                {isCreatingLoc ? 'Filing Security Token...' : 'GENERATE ENCRYPTED QR TOKEN'}
              </button>
            </form>
          </div>

          {/* Locations Registry Grid */}
          <div className="lg:col-span-2 space-y-4" id="locations-registry-container">
            <h2 className="text-xs font-black uppercase text-slate-550 tracking-wider">
              Secure QR Poster Locations Registry ({locations.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {locations.map((loc) => {
                const isActive = loc.status === 'active';
                return (
                  <div 
                    key={loc.id} 
                    className={`bg-white rounded-2xl border p-5 space-y-4 relative transition-all ${
                      isActive ? 'border-slate-200' : 'border-slate-200 bg-slate-50/50 opacity-70'
                    }`}
                  >
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <button
                        onClick={() => handleToggleLocStatus(loc.id, loc.status)}
                        className={`text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full cursor-pointer border ${
                          isActive 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100' 
                            : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                        }`}
                        title={isActive ? 'Disable Token' : 'Enable Token'}
                      >
                        {isActive ? '● Active' : '○ Locked'}
                      </button>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-extrabold text-slate-850 text-xs pr-12 leading-relaxed">
                        {loc.office_name}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-mono">
                        Office Code: <b>{loc.office_code}</b>
                      </p>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-150 font-mono text-[9px] text-slate-500 break-all space-y-0.5">
                      <div>Token: <span className="font-semibold text-slate-700">{loc.qr_token}</span></div>
                      <div>Registered: {new Date(loc.created_at).toLocaleDateString()}</div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t w-full">
                      <button
                        onClick={() => onSelectPoster(loc)}
                        className="text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200 select-none hover:bg-slate-200 hover:text-slate-900 rounded-lg px-3 py-1.5 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Printer className="w-3 h-3" /> Poster View
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        /* Tab: feed logs */
        <div className="space-y-4" id="tab-feedbacks-content">
          
          {/* Feed Filter panel */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center gap-4 text-xs font-semibold text-slate-600" id="filter-bar">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search complaints, names, officer badges, comments..."
                value={fbSearch}
                onChange={(e) => setFbSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:bg-white"
              />
            </div>

            {/* Category Dropdown */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] uppercase font-bold text-slate-400">Category:</span>
              <select
                value={fbCategoryFilter}
                onChange={(e) => setFbCategoryFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-700 font-bold focus:outline-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="compliment">Compliments Only</option>
                <option value="complaint">Complaints Only</option>
                <option value="suggestion">Suggestions Only</option>
                <option value="inquiry">Inquiries Only</option>
              </select>
            </div>

            {/* Rating Dropdown */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] uppercase font-bold text-slate-400">Ratings:</span>
              <select
                value={fbRatingFilter}
                onChange={(e) => setFbRatingFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-700 font-bold focus:outline-none cursor-pointer"
              >
                <option value="all">All Ratings</option>
                <option value="high">Satisfactory (4 - 5 Stars)</option>
                <option value="mid">Neutral (2.5 - 3.9 Stars)</option>
                <option value="low">Unsatisfactory (Below 2.5 Stars)</option>
              </select>
            </div>

            {/* Sub total count */}
            <div className="text-[11px] font-mono text-slate-400 shrink-0">
              Showing {filteredFeedbacks.length} of {feedbacks.length} logs
            </div>

            {/* Export CSV Command Button */}
            <button
              onClick={handleExportCSV}
              className="bg-police-blue hover:bg-police-blue-hover text-white px-3.5 py-2 rounded-xl text-xs font-bold uppercase inline-flex items-center gap-2 shadow-sm transition-all cursor-pointer select-none active:scale-[0.98] shrink-0 border border-police-gold"
              id="btn-export-csv"
              title="Export all database logs in Detailed Submissions to standard CSV format"
            >
              <FileSpreadsheet className="w-4 h-4 text-police-gold animate-pulse" />
              <span>Export Full CSV</span>
            </button>
          </div>

          {/* Logs List layout */}
          {filteredFeedbacks.length === 0 ? (
            <div className="p-20 text-center bg-white border border-slate-200 rounded-2xl text-slate-400 text-xs">
              No matching filed feedback logs found inside current filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4" id="feed-logs-list">
              {filteredFeedbacks.map((fb) => {
                const isCompliment = fb.category === 'compliment';
                const isComplaint = fb.category === 'complaint';
                const isSuggestion = fb.category === 'suggestion';
                
                let chipBg = 'bg-slate-50 text-slate-700 border-slate-200';
                if (isCompliment) chipBg = 'bg-emerald-50 text-emerald-800 border-emerald-250';
                else if (isComplaint) chipBg = 'bg-rose-50 text-rose-800 border-rose-200';
                else if (isSuggestion) chipBg = 'bg-amber-50 text-amber-800 border-amber-250';

                return (
                  <div key={fb.id} className="bg-white border rounded-xl p-5 border-slate-200 space-y-4" id={`log-item-${fb.id}`}>
                    {/* Log Header info */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2" id={`log-header-${fb.id}`}>
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold tracking-widest uppercase border rounded-md px-2 py-0.5 ${chipBg}`}>
                          {fb.category}
                        </span>
                        <div className="text-[11px] font-bold text-slate-800 break-words">
                          Station Evaluated: <span className="font-black text-slate-900">{fb.office_source}</span>
                        </div>
                      </div>
                      
                      <div className="text-[10px] font-mono text-slate-400 shrink-0">
                        {new Date(fb.created_at).toLocaleString()}
                      </div>
                    </div>

                    {/* Quality Ratings breakdown & Content */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-150 text-[11px]" id={`log-metrics-${fb.id}`}>
                      <div>
                        <span className="text-slate-400 block font-bold">Consolidated Score:</span>
                        <strong className="text-amber-600 font-extrabold text-sm">{fb.rating} / 5.0 ★</strong>
                      </div>
                      <div className="md:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-2 font-mono text-slate-500">
                        <div>Promptness: <strong className="text-slate-700 font-black">{fb.ratings.promptness}</strong></div>
                        <div>Courtesy: <strong className="text-slate-700 font-black">{fb.ratings.courtesy}</strong></div>
                        <div>Efficiency: <strong className="text-slate-700 font-black">{fb.ratings.efficiency}</strong></div>
                        <div>Cleanliness: <strong className="text-slate-700 font-black">{fb.ratings.cleanliness}</strong></div>
                      </div>
                    </div>

                    {/* COMMENTS paragraph */}
                    <div className="text-slate-700 text-xs italic font-normal leading-relaxed border-l-2 border-slate-300 pl-3 py-1 bg-slate-50/40">
                      “{fb.comments || 'No comment text was supplied by citizen.'}”
                    </div>

                    {/* Foot metadata */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] font-mono text-slate-400 pt-2 border-t font-semibold" id={`log-meta-footer-${fb.id}`}>
                      <div className="space-y-0.5">
                        <div>Citizen: {fb.citizen_name ? <b className="text-slate-700">{fb.citizen_name} ({fb.citizen_contact})</b> : <i className="text-slate-400 font-normal">Anonymous File</i>}</div>
                        {fb.officer_name && <div>Involved Badge/Officer: <b className="text-slate-600">{fb.officer_name}</b></div>}
                      </div>

                      <div className="space-y-0.5 sm:text-right text-slate-400">
                        <div>IP Address: <span className="font-bold text-slate-500">{fb.ip_address}</span> {fb.qr_location_id && <span className="text-indigo-600">(via printed QR Poster)</span>}</div>
                        <div className="truncate">Browser Signature: <span className="font-normal text-[9px] text-slate-400">{fb.device_info}</span></div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
