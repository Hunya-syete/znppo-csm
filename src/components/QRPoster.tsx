/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Printer, Download, ArrowLeft, RefreshCw, CheckCircle, HelpCircle } from 'lucide-react';
import { QRLocation } from '../types';
import PNPLogo from './PNPLogo';

interface QRPosterProps {
  location: QRLocation;
  onBack?: () => void;
}

export default function QRPoster({ location, onBack }: QRPosterProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [qrUrl, setQrUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQrCode();
  }, [location.id]);

  const fetchQrCode = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/locations/${location.id}/qr-image`);
      if (res.ok) {
        const data = await res.json();
        setQrDataUrl(data.qrDataUrl);
        setQrUrl(data.qrUrl);
      } else {
        setError('Failed to fetch generated QR image data.');
      }
    } catch (err) {
      setError('Cannot connect to QR generator server endpoint.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto" id="qr-poster-parent">
      
      {/* UI Controls - Hidden during Printing */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden px-4" id="poster-ui-controls">
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Location Registry
          </button>
        )}

        <div className="flex items-center gap-2" id="poster-action-group">
          <button
            onClick={fetchQrCode}
            disabled={isLoading}
            className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-800 transition-colors disabled:opacity-30 cursor-pointer"
            title="Refresh QR token"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          
          {qrDataUrl && (
            <a
              href={qrDataUrl}
              download={`ZNPPPO_Poster_${location.office_code}.png`}
              className="inline-flex items-center gap-2 text-sm font-semibold bg-white border border-slate-200 hover:border-slate-300 px-4 py-2 rounded-lg text-slate-700 transition"
              id="btn-download-qr"
            >
              <Download className="w-4 h-4" />
              Download JPG
            </a>
          )}

          <button
            onClick={handlePrint}
            disabled={isLoading || !!error}
            className="inline-flex items-center gap-2 text-sm font-bold bg-police-blue hover:bg-police-blue-hover text-white px-5 py-2 rounded-lg transition shadow-sm cursor-pointer"
            id="btn-print-poster"
          >
            <Printer className="w-4 h-4" />
            Print Public Poster
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white p-20 rounded-2xl shadow-md text-center border animate-pulse">
          <RefreshCw className="w-10 h-10 animate-spin mx-auto text-slate-400 mb-2" />
          <p className="text-slate-500 text-sm">Formatting secure station poster template...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-6 rounded-2xl border border-red-200 text-center">
          <p className="text-red-700 font-medium mb-4">{error}</p>
          <button onClick={fetchQrCode} className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg text-sm">
            Retry Connection
          </button>
        </div>
      ) : (
        /* Printable Poster Container */
        <div 
          className="bg-white rounded-2xl border-2 border-slate-100 shadow-xl overflow-hidden print:border-none print:shadow-none print:m-0 print:rounded-none max-w-2xl mx-auto" 
          id="printable-poster-canvas"
        >
          {/* Aesthetic Poster Frame - Rendered strictly to fit A4 screen & printers */}
          <div className="p-8 md:p-12 text-center flex flex-col items-center justify-between min-h-[700px] border-[12px] border-police-blue m-4 print:m-0 print:border-[16px] print:border-police-blue">
            
            {/* Poster Header */}
            <div className="space-y-3 w-full" id="poster-identity-header">
              <PNPLogo size={90} className="scale-110" />
              <div className="bg-police-blue text-amber-400 py-1.5 px-4 font-mono font-bold tracking-[0.2em] rounded text-[10px] uppercase max-w-xs mx-auto mt-2">
                OFFICIAL SERVICE POSTER
              </div>
            </div>

            {/* Poster Body */}
            <div className="my-8 space-y-6 w-full" id="poster-central-callout">
              <h1 className="text-3xl md:text-4xl font-extrabold text-police-blue font-sans tracking-tight uppercase">
                “We value your feedback.”
              </h1>
              
              <p className="text-slate-500 font-medium text-sm">
                Help us serve you better. Evaluate our station desk interaction.
              </p>

              {/* QR Code Graphic Frame */}
              <div className="relative inline-block bg-slate-50 p-4 rounded-2xl border-4 border-dashed border-police-blue/40 my-4" id="poster-qr-frame">
                <img 
                  src={qrDataUrl} 
                  alt="Station feedback code"
                  className="w-48 h-48 md:w-56 md:h-56 select-none bg-white"
                />
                
                {/* Visual Scanning Guides */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-police-blue" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-police-blue" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-police-blue" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-police-blue" />
              </div>

              {/* Station designation specifics */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto" id="poster-office-meta">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Assigned Location Unit</span>
                <h3 className="text-lg font-extrabold text-police-blue tracking-tight leading-short uppercase">
                  {location.office_name}
                </h3>
                <p className="text-xs font-mono text-slate-500 mt-1">
                  Router Code: <strong className="text-slate-700">{location.office_code}</strong> • Unique Token ID: <span className="font-semibold text-slate-600">{location.qr_token}</span>
                </p>
              </div>
            </div>

            {/* Poster Checklist / Features */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-left py-4 border-t border-b border-slate-100 w-full" id="poster-bullet-points">
              <div className="flex items-center gap-2.5 text-slate-800 text-[13px] font-bold">
                <CheckCircle className="w-4 h-4 text-police-gold shrink-0" />
                <span>Submit Complaints</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-800 text-[13px] font-bold">
                <CheckCircle className="w-4 h-4 text-police-gold shrink-0" />
                <span>Send Suggestions</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-800 text-[13px] font-bold">
                <CheckCircle className="w-4 h-4 text-police-gold shrink-0" />
                <span>Rate Our Service</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-800 text-[13px] font-bold">
                <CheckCircle className="w-4 h-4 text-police-gold shrink-0" />
                <span>Share Compliments</span>
              </div>
            </div>

            {/* Poster Footer */}
            <div className="mt-8 space-y-2 w-full" id="poster-legal-footer">
              <p className="text-[11px] md:text-xs text-slate-500 font-medium max-w-md mx-auto">
                Your feedback helps improve public service transparency and accountability under protected citizen logging guidelines.
              </p>
              <div className="text-[9px] font-mono text-slate-400 mt-2">
                Submissions automatically log secure device footprints with anti-spam protections.
              </div>
              <p className="text-[10px] font-bold text-slate-700 select-all print:block hidden mt-1">
                Short-URL: {qrUrl}
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
