/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import { Camera, RefreshCw, AlertTriangle, HelpCircle, Laptop, Smartphone, HelpCircle as HelpIcon, CheckCircle2 } from 'lucide-react';
import { QRLocation } from '../types';

interface QRScannerProps {
  onScanSuccess: (token: string, officeCode: string) => void;
}

export default function QRScanner({ onScanSuccess }: QRScannerProps) {
  const [activeLocations, setActiveLocations] = useState<QRLocation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [useCamera, setUseCamera] = useState<boolean>(false);
  const [scannerError, setScannerError] = useState<string | null>(null);
  
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    fetchActiveLocations();
  }, []);

  const fetchActiveLocations = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/locations');
      if (res.ok) {
        const data: QRLocation[] = await res.json();
        setActiveLocations(data.filter(loc => loc.status === 'active'));
      }
    } catch (err) {
      console.error('Failed to load active locations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // HTML5 Camera QR Code Scanner lifecycle
  useEffect(() => {
    if (!useCamera) {
      stopCameraScanner();
      return;
    }

    setScannerError(null);
    
    // Slight delay to ensure DOM element is mounted
    const timer = setTimeout(() => {
      try {
        const html5QrCode = new Html5Qrcode("camera-reader");
        scannerRef.current = html5QrCode;

        html5QrCode.start(
          { facingMode: "environment" }, // back-facing camera
          {
            fps: 10,
            qrbox: (width, height) => {
              const size = Math.min(width, height) * 0.7;
              return { width: size, height: size };
            }
          },
          (rawText) => {
            // Success handler
            stopCameraScanner();
            setUseCamera(false);
            processScannedUrl(rawText);
          },
          (errorMessage) => {
            // Silent error logs (searching for QR)
          }
        ).catch((err) => {
          console.error("Camera startup error:", err);
          setScannerError(
            "Camera permission denied or camera device is in use by another application. Please try 'Poster Interaction Emulator' below."
          );
          setUseCamera(false);
        });
      } catch (e) {
        setScannerError("Camera initialization failed. Your browser sandboxing may prevent direct iframe webcam frames.");
        setUseCamera(false);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      stopCameraScanner();
    };
  }, [useCamera]);

  const stopCameraScanner = () => {
    if (scannerRef.current) {
      if (scannerRef.current.isScanning) {
        scannerRef.current.stop().then(() => {
          scannerRef.current = null;
        }).catch(err => console.error("Error stopping qr scan:", err));
      } else {
        scannerRef.current = null;
      }
    }
  };

  // Extract query variables from scanned URL
  const processScannedUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const token = parsedUrl.searchParams.get('qr');
      const office = parsedUrl.searchParams.get('office');

      if (token && office) {
        onScanSuccess(token, office);
      } else {
        // Fallback checks for direct link matching
        // e.g. /feedback/qr/token formats
        const paths = parsedUrl.pathname.split('/');
        const qrIndex = paths.indexOf('qr');
        if (qrIndex !== -1 && paths[qrIndex + 1]) {
          const tkn = paths[qrIndex + 1];
          onScanSuccess(tkn, '');
        } else {
          alert('Decoded QR URL successfully, but it does not contain a valid ZNPPPO feedback routing payload.');
        }
      }
    } catch (err) {
      // If scanned plain text that might be the raw token
      if (url.includes('-')) {
        onScanSuccess(url, url.split('-')[0]);
      } else {
        alert(`Unrecognized QR Format: "${url}". Please scan an official ZNPPPO Station Public Service poster.`);
      }
    }
  };

  const handleManualSimulate = (loc: QRLocation) => {
    onScanSuccess(loc.qr_token, loc.office_code);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6" id="qr-scanner-card">
      
      {/* 1. Camera Scanning Terminal */}
      <div className="bg-slate-900 text-white rounded-2xl shadow-xl overflow-hidden border-4 border-slate-800" id="camera-terminal">
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="bg-amber-500/20 text-amber-400 p-1.5 rounded-lg">
              <Camera className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold tracking-tight">STATION MONITOR PORTAL</h2>
              <p className="text-[10px] text-slate-500 font-mono">STANDBY / CAMERA ACCESS ENGINE</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${useCamera ? 'bg-emerald-500 animate-ping' : 'bg-slate-600'}`} />
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
              {useCamera ? 'Camera Active' : 'Standby'}
            </span>
          </div>
        </div>

        <div className="p-6 text-center space-y-4 flex flex-col items-center justify-center min-h-[300px]">
          {useCamera ? (
            <div className="w-full space-y-3">
              <div 
                id="camera-reader" 
                className="mx-auto w-full max-w-sm h-64 overflow-hidden rounded-xl border-4 border-amber-500/50 bg-black relative"
              />
              <p className="text-xs text-slate-400 font-medium">
                Hold the printed QR Poster steadily within the guide marks to load the auto-filled feedback logs.
              </p>
              <button
                onClick={() => setUseCamera(false)}
                className="bg-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Cancel Scanner
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-w-md mx-auto" id="standby-screen">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400 border border-slate-700">
                <Smartphone className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-md font-bold">Simulate Scanning on your device</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Access smartphone camera viewfinders to tap and read physical QR posters directly. (Standard secure webcam routing).
                </p>
              </div>

              {scannerError && (
                <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-200 text-left text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-400">
                    <AlertTriangle className="w-4 h-4" /> Camera Stream Notice
                  </div>
                  <p className="text-slate-300 leading-relaxed font-normal">{scannerError}</p>
                </div>
              )}

              <button
                onClick={() => setUseCamera(true)}
                className="bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-extrabold px-6 py-3 rounded-xl inline-flex items-center gap-2 text-sm transition-all shadow-md cursor-pointer"
                id="btn-trigger-camera"
              >
                <Camera className="w-4 h-4" />
                START WEB CAMERA SCANNER
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Interactive Simulator Mode (Extremely useful for review panel) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6" id="simulator-terminal">
        <div className="flex items-center gap-2 mb-4">
          <Laptop className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-extrabold uppercase text-slate-700 tracking-wider">
            Iframe Sandbox / Poster Emulator
          </h3>
          <span className="text-[10px] ml-auto font-mono text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full font-bold">
            100% Testable Pathways
          </span>
        </div>

        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          No camera? No printed poster? Try our interactive scanner simulator. Choose any of the active police stations below to execute a simulated "Poster Scan". This instantly opens the citizen feedback registry with pre-filled, securely validated station details:
        </p>

        {isLoading ? (
          <div className="flex items-center justify-center py-6 animate-pulse text-xs text-slate-400 gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" /> Gathering active units...
          </div>
        ) : activeLocations.length === 0 ? (
          <div className="p-4 rounded-xl bg-slate-50 border text-center text-xs text-slate-400">
            No active QR Poster targets found. Register and activate at least one station in the Admin tab.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="mock-scan-grid">
            {activeLocations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => handleManualSimulate(loc)}
                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-150 rounded-xl transition text-left cursor-pointer group"
                id={`btn-mock-scan-${loc.office_code}`}
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-indigo-900">
                    {loc.office_name}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                    Code: <strong>{loc.office_code}</strong> • Token: {loc.qr_token.slice(0, 10)}...
                  </span>
                </div>
                <div className="text-[11px] font-bold text-slate-500 group-hover:text-indigo-700 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shrink-0 shrink-0 select-none shadow-xs">
                  Simulate QR Scan →
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
