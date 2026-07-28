/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  QrCode, 
  FileText, 
  BarChart3, 
  HelpCircle, 
  Printer, 
  User, 
  BookmarkCheck,
  Building,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import FeedbackForm from './components/FeedbackForm';
import QRScanner from './components/QRScanner';
import AdminDashboard from './components/AdminDashboard';
import QRPoster from './components/QRPoster';
import { QRLocation } from './types';
import PNPLogo from './components/PNPLogo';

export default function App() {
  // Navigation Role Switcher: 'citizen' | 'admin'
  const [role, setRole] = useState<'citizen' | 'admin'>('citizen');
  
  // Citizen view tabs: 'form' | 'scan'
  const [citizenTab, setCitizenTab] = useState<'form' | 'scan'>('form');

  // QR token states caught from scanned posters or direct URLs
  const [qrTokenFromUrl, setQrTokenFromUrl] = useState<string | null>(null);
  const [officeCodeFromUrl, setOfficeCodeFromUrl] = useState<string | null>(null);

  // Active printable poster state (when viewing from Admin view)
  const [activePosterLoc, setActivePosterLoc] = useState<QRLocation | null>(null);

  // Dynamic dashboard analytics refresh controller
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  // Parse location search parameters dynamically on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qrParam = params.get('qr');
    const officeParam = params.get('office');

    if (qrParam) {
      setRole('citizen');
      setCitizenTab('form');
      setQrTokenFromUrl(qrParam);
      setOfficeCodeFromUrl(officeParam);
    }
  }, []);

  // When a QR poster scan is detected by camera or emulator
  const handleQRScanSuccess = (token: string, officeCode: string) => {
    setQrTokenFromUrl(token);
    setOfficeCodeFromUrl(officeCode);
    setCitizenTab('form');
    
    // Smooth scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Re-enable manual selections
  const handleClearRoute = () => {
    setQrTokenFromUrl(null);
    setOfficeCodeFromUrl(null);
    // Remove query parameters from address bar cleanly without page reload
    const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.pushState({ path: cleanUrl }, '', cleanUrl);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans selection:bg-police-blue selection:text-white" id="main-app-container">
      
      {/* Visual Header Top Bar - Hidden during Printable Poster Views */}
      <header className="bg-police-blue border-b-2 border-police-gold text-white print:hidden sticky top-0 z-40 shadow-md" id="app-header-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row justify-between items-center gap-3">
          
          {/* Logo Title Group */}
          <div className="flex items-center gap-3" id="header-branding-block">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-police-blue font-extrabold text-xs shrink-0 shadow-inner">
              PNP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-[0.2em] font-extrabold text-amber-500 uppercase">
                  ZNPPPO OFFICIAL SYSTEM
                </span>
              </div>
              <h1 className="text-sm font-black tracking-tight uppercase leading-none mt-0.5 text-white">
                Feedback & QR Poster Registry
              </h1>
            </div>
          </div>

          {/* Navigation Controls Role Toggles */}
          <div className="flex items-center bg-blue-950 p-0.5 rounded-xl border border-blue-800" id="header-role-navigator">
            <button
              onClick={() => { setRole('citizen'); setActivePosterLoc(null); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                role === 'citizen' 
                  ? 'bg-police-gold text-white shadow-sm' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Citizen Portal
            </button>
            <button
              onClick={() => { setRole('admin'); setActivePosterLoc(null); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                role === 'admin' 
                  ? 'bg-police-gold text-white shadow-sm' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              HQ Command Control
            </button>
          </div>

        </div>
      </header>

      {/* Main Body Slot */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0" id="main-content-layout">
        
        {/* VIEW 1: CITIZEN PUBLIC INTERACTIVE FORMS */}
        {role === 'citizen' && (
          <div className="space-y-6 print:hidden" id="view-citizen-portal">
            
            {/* Header banner option with left accent border */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm border-l-4 border-l-police-blue" id="citizen-banner">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight leading-tight uppercase">
                  <span className="text-police-blue">Zamboanga del Norte</span> Police Feedback Registry
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Connect quickly to active desk surveys. Submit complaints, record suggestions, rate PNP service quality, or praise high-performing officers.
                </p>
              </div>

              {/* public navigation tabs utilizing theme color */}
              <div className="flex bg-slate-100 p-1 rounded-xl self-start md:self-auto shrink-0" id="citizen-tabs-switcher">
                <button
                  onClick={() => setCitizenTab('form')}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                    citizenTab === 'form' 
                      ? 'bg-police-blue text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-950'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Feedback Form
                </button>
                <button
                  onClick={() => setCitizenTab('scan')}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                    citizenTab === 'scan' 
                      ? 'bg-police-blue text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-950'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  QR Scan Reader
                </button>
              </div>
            </div>

            {/* active tab routing render */}
            {citizenTab === 'form' ? (
              <div className="space-y-4">
                
                {qrTokenFromUrl && (
                  <div className="max-w-2xl mx-auto bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between text-xs font-semibold text-amber-800" id="active-routing-bar">
                    <div className="flex items-center gap-2">
                       <BookmarkCheck className="w-5 h-5 text-police-gold animate-pulse" />
                      <span>Forms auto-filled for Station Routed Token: <strong className="font-extrabold">{officeCodeFromUrl?.toUpperCase()}</strong></span>
                    </div>
                    <button 
                      onClick={handleClearRoute} 
                      className="cursor-pointer bg-white text-[10px] uppercase font-bold hover:bg-slate-50 px-2.5 py-1 rounded transition text-police-gold border border-amber-300"
                    >
                      Reset / General Walk-In
                    </button>
                  </div>
                )}

                <FeedbackForm 
                  qrTokenFromUrl={qrTokenFromUrl} 
                  officeCodeFromUrl={officeCodeFromUrl}
                  onSubmitSuccess={() => setRefreshTrigger(prev => prev + 1)}
                />
              </div>
            ) : (
              <QRScanner onScanSuccess={handleQRScanSuccess} />
            )}

          </div>
        )}

        {/* VIEW 2: ADMIN PORTAL WITH ACTIVE POSTER INJECT */}
        {role === 'admin' && (
          <div id="view-admin-portal">
            {activePosterLoc ? (
              /* High priority overlay for Print ready poster design layout */
              <QRPoster 
                location={activePosterLoc} 
                onBack={() => setActivePosterLoc(null)} 
              />
            ) : (
              /* Administrative controls dashboard index */
              <AdminDashboard 
                onSelectPoster={(loc) => setActivePosterLoc(loc)} 
                refreshTrigger={refreshTrigger}
              />
            )}
          </div>
        )}

      </main>

      {/* Visual Footer - Hidden during printing */}
      <footer className="bg-police-blue text-slate-100 py-6 border-t-2 border-police-gold text-xs print:hidden mt-12 shadow-inner" id="app-footer-nav-copyright">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <PNPLogo size={25} />
            <span className="font-bold text-white">PNP Zamboanga del Norte Police Provincial Office QR Feedback & Management System</span>
          </div>
          <div className="text-[10px] font-mono text-indigo-200">
            © 2026 Developed Under Protected Citizen Feedback Directives. All Rights Reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
