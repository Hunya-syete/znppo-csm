/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Send, 
  User, 
  Phone, 
  ShieldAlert, 
  CheckCircle2, 
  Wifi, 
  WifiOff, 
  AlertCircle,
  HelpCircle,
  MessageSquare,
  ThumbsUp,
  Mail,
  Calendar,
  Building2,
  FileText,
  Smile,
  Meh,
  Frown,
  Heart,
  HelpCircle as HelpIcon
} from 'lucide-react';
import { QRLocation, FeedbackRatings, SQDRatings, Feedback } from '../types';
import PNPLogo from './PNPLogo';

interface FeedbackFormProps {
  qrTokenFromUrl?: string | null;
  officeCodeFromUrl?: string | null;
  onSubmitSuccess?: () => void;
}

export default function FeedbackForm({ 
  qrTokenFromUrl = null, 
  officeCodeFromUrl = null,
  onSubmitSuccess 
}: FeedbackFormProps) {
  // Language selection ('en' for English official PNP standard, 'fil' for Tagalog/Filipino)
  const [lang, setLang] = useState<'fil' | 'en'>('fil');

  // Database states
  const [availableLocations, setAvailableLocations] = useState<QRLocation[]>([]);
  const [validatedLocation, setValidatedLocation] = useState<QRLocation | null>(null);
  const [isValidatingQr, setIsValidatingQr] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // General Form input states
  const [category, setCategory] = useState<'complaint' | 'suggestion' | 'compliment' | 'inquiry'>('compliment');
  const [selectedLocationId, setSelectedLocationId] = useState<string>('');
  const [manualOfficeSource, setManualOfficeSource] = useState<string>('');
  const [officerName, setOfficerName] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [citizenName, setCitizenName] = useState<string>('');
  const [citizenContact, setCitizenContact] = useState<string>('');

  // Client Demographics (CSM Standard)
  const [clientType, setClientType] = useState<'Mamamayan' | 'Negosyo' | 'Gobyerno'>('Mamamayan');
  const [gender, setGender] = useState<'Lalaki' | 'Babae'>('Lalaki');
  const [age, setAge] = useState<string>('');
  const [region, setRegion] = useState<string>('Region IX (Zamboanga Peninsula)');
  const [serviceType, setServiceType] = useState<string>('Police Clearance / Blotter / General Inquiry');

  // Citizen's Charter (CC) Awareness Questions
  const [cc1, setCc1] = useState<string>('1. Alam ko ang CC at Nakita ko ito sa napuntahang opisina');
  const [cc2, setCc2] = useState<string>('1. Madaling Makita');
  const [cc3, setCc3] = useState<string>('1. Sobrang nakatulong');

  // Service Quality Dimensions (SQD0 to SQD8)
  const [sqdRatings, setSqdRatings] = useState<SQDRatings>({
    sqd0: 5,
    sqd1: 5,
    sqd2: 5,
    sqd3: 5,
    sqd4: 5,
    sqd5: 5,
    sqd6: 5,
    sqd7: 5,
    sqd8: 5
  });

  // Additional CSM fields
  const [suggestions, setSuggestions] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // Captcha security
  const [captchaQuestion, setCaptchaQuestion] = useState<{ q: string; ans: number }>({ q: '', ans: 0 });
  const [captchaInput, setCaptchaInput] = useState<string>('');
  const [captchaError, setCaptchaError] = useState<boolean>(false);

  // Connection & Offline indicators
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [hasOfflineCache, setHasOfflineCache] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Submission statuses
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Auto handle CC1 selection: If option 4 (Not aware), default CC2 & CC3 to N/A
  const handleCc1Change = (val: string) => {
    setCc1(val);
    if (val.startsWith('4.')) {
      setCc2('5. N/A');
      setCc3('4. N/A');
    }
  };

  // Generate simple anti-spam mathematical captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = Math.random() > 0.5 ? '+' : '-';
    const ans = operator === '+' ? num1 + num2 : num1 - num2;
    setCaptchaQuestion({ q: `${num1} ${operator} ${num2} = ?`, ans });
    setCaptchaInput('');
    setCaptchaError(false);
  };

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineFeedbacks();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const cached = localStorage.getItem('znpppo_offline_feedbacks');
    if (cached) {
      const parsed = JSON.parse(cached);
      setHasOfflineCache(parsed.length > 0);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync cached local inputs
  const syncOfflineFeedbacks = async () => {
    const cached = localStorage.getItem('znpppo_offline_feedbacks');
    if (!cached) return;

    const parsed: Feedback[] = JSON.parse(cached);
    if (parsed.length === 0) return;

    setIsSyncing(true);
    let successCount = 0;

    for (const fb of parsed) {
      try {
        const response = await fetch('/api/feedbacks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: fb.category,
            comments: fb.comments,
            citizen_name: fb.citizen_name,
            citizen_contact: fb.citizen_contact,
            ratings: fb.ratings,
            client_type: fb.client_type,
            gender: fb.gender,
            age: fb.age,
            region: fb.region,
            service_type: fb.service_type,
            cc1: fb.cc1,
            cc2: fb.cc2,
            cc3: fb.cc3,
            sqd_ratings: fb.sqd_ratings,
            suggestions: fb.suggestions,
            email: fb.email,
            qr_token: fb.qr_location_id ? availableLocations.find(l => l.id === fb.qr_location_id)?.qr_token : undefined,
            office_source: fb.office_source
          })
        });

        if (response.ok) {
          successCount++;
        }
      } catch (err) {
        console.error('Failed to sync feedback item:', fb.id, err);
      }
    }

    const remaining = parsed.slice(successCount);
    localStorage.setItem('znpppo_offline_feedbacks', JSON.stringify(remaining));
    setHasOfflineCache(remaining.length > 0);
    setIsSyncing(false);

    if (successCount > 0 && onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  useEffect(() => {
    generateCaptcha();
    fetchLocations();
  }, []);

  useEffect(() => {
    if (qrTokenFromUrl) {
      validateToken(qrTokenFromUrl);
    } else {
      setValidatedLocation(null);
    }
  }, [qrTokenFromUrl]);

  const fetchLocations = async () => {
    try {
      const res = await fetch('/api/locations');
      if (res.ok) {
        const data = await res.json();
        setAvailableLocations(data);
        if (data.length > 0 && !selectedLocationId) {
          setSelectedLocationId(data[0].id);
        }
      }
    } catch (err) {
      console.error('Error getting units list:', err);
    }
  };

  const validateToken = async (token: string) => {
    setIsValidatingQr(true);
    setValidationError(null);
    try {
      const res = await fetch(`/api/locations/validate/${token}`);
      if (res.ok) {
        const data: QRLocation = await res.json();
        setValidatedLocation(data);
        setSelectedLocationId(data.id);
      } else {
        const errData = await res.json();
        setValidationError(errData.error || 'The scanned QR code is invalid.');
        setValidatedLocation(null);
      }
    } catch (err) {
      setValidationError('Could not verify scanned QR source.');
      setValidatedLocation(null);
    } finally {
      setIsValidatingQr(false);
    }
  };

  const updateSqdRating = (key: keyof SQDRatings, val: number | 'N/A') => {
    setSqdRatings(prev => ({ ...prev, [key]: val }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Validate Math CAPTCHA
    if (parseInt(captchaInput.trim()) !== captchaQuestion.ans) {
      setCaptchaError(true);
      generateCaptcha();
      return;
    }

    let targetOfficeName = '';
    let targetQrToken: string | undefined = undefined;

    if (validatedLocation) {
      targetOfficeName = validatedLocation.office_name;
      targetQrToken = validatedLocation.qr_token;
    } else {
      const matched = availableLocations.find(l => l.id === selectedLocationId);
      if (matched) {
        targetOfficeName = matched.office_name;
      } else {
        targetOfficeName = manualOfficeSource || 'General Office Interaction';
      }
    }

    // Convert SQD numeric values to promptness/courtesy/efficiency/cleanliness legacy rating structure
    const getSqdNum = (v: number | 'N/A'): number => (v === 'N/A' ? 5 : Number(v));
    const legacyRatings: FeedbackRatings = {
      promptness: getSqdNum(sqdRatings.sqd1),
      courtesy: getSqdNum(sqdRatings.sqd7),
      efficiency: getSqdNum(sqdRatings.sqd3),
      cleanliness: getSqdNum(sqdRatings.sqd0)
    };

    const feedbackPayload = {
      category,
      comments: comments || suggestions || 'Transacted with office.',
      citizen_name: isAnonymous ? undefined : citizenName,
      citizen_contact: isAnonymous ? undefined : citizenContact,
      officer_name: officerName || undefined,
      ratings: legacyRatings,
      client_type: clientType,
      gender,
      age,
      region,
      service_type: serviceType,
      cc1,
      cc2,
      cc3,
      sqd_ratings: sqdRatings,
      suggestions,
      email,
      qr_token: targetQrToken,
      office_source: targetOfficeName
    };

    setIsSubmitting(true);

    if (!isOnline) {
      const sqdValues = Object.values(sqdRatings).filter(v => v !== 'N/A') as number[];
      const avgSqd = sqdValues.length > 0 ? sqdValues.reduce((a, b) => a + b, 0) / sqdValues.length : 5;

      const localItem: Feedback = {
        id: `fb_offline_${Date.now()}`,
        rating: parseFloat(avgSqd.toFixed(2)),
        category,
        comments: comments || suggestions || 'Transacted with office.',
        citizen_name: isAnonymous ? undefined : citizenName,
        citizen_contact: isAnonymous ? undefined : citizenContact,
        created_at: new Date().toISOString(),
        qr_location_id: validatedLocation?.id || selectedLocationId || undefined,
        office_source: targetOfficeName,
        officer_name: officerName || undefined,
        device_info: navigator.userAgent,
        ip_address: 'Cached-Offline',
        ratings: legacyRatings,
        client_type: clientType,
        gender,
        age,
        region,
        service_type: serviceType,
        cc1,
        cc2,
        cc3,
        sqd_ratings: sqdRatings,
        suggestions,
        email
      };

      const cached = localStorage.getItem('znpppo_offline_feedbacks');
      const list = cached ? JSON.parse(cached) : [];
      list.push(localItem);
      localStorage.setItem('znpppo_offline_feedbacks', JSON.stringify(list));
      
      setHasOfflineCache(true);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      if (onSubmitSuccess) onSubmitSuccess();
      return;
    }

    try {
      const res = await fetch('/api/feedbacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackPayload)
      });

      if (res.ok) {
        setSubmitSuccess(true);
        if (onSubmitSuccess) onSubmitSuccess();
      } else {
        const data = await res.json();
        setServerError(data.error || 'Failed to file feedback. Please try again.');
      }
    } catch (err) {
      setServerError('Server is offline or down. Your entry will be stored offline if you wish.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setCategory('compliment');
    setComments('');
    setOfficerName('');
    setIsAnonymous(true);
    setCitizenName('');
    setCitizenContact('');
    setAge('');
    setSuggestions('');
    setEmail('');
    setSqdRatings({
      sqd0: 5, sqd1: 5, sqd2: 5, sqd3: 5, sqd4: 5, sqd5: 5, sqd6: 5, sqd7: 5, sqd8: 5
    });
    setSubmitSuccess(false);
    setServerError(null);
    setCaptchaInput('');
    generateCaptcha();
  };

  const categoryThemes = {
    compliment: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', icon: ThumbsUp },
    complaint: { bg: 'bg-rose-50 border-rose-200', text: 'text-rose-700', icon: ShieldAlert },
    suggestion: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', icon: HelpCircle },
    inquiry: { bg: 'bg-slate-50 border-slate-200', text: 'text-slate-700', icon: MessageSquare }
  };

  const sqdQuestions = [
    { 
      key: 'sqd0' as const, 
      label: 'SQD0', 
      textFil: 'Nasiyahan ako sa serbisyo na aking natanggap sa napuntahan na tanggapan.', 
      textEn: 'I am satisfied to the service that I availed.',
      desc: 'Overall Satisfaction' 
    },
    { 
      key: 'sqd1' as const, 
      label: 'SQD1', 
      textFil: 'Makatwiran ang oras na aking ginugol para sa pagproseso ng aking transaksyon.', 
      textEn: 'I spent a reasonable amount of time for my transaction.',
      desc: 'Reasonable Time Spent' 
    },
    { 
      key: 'sqd2' as const, 
      label: 'SQD2', 
      textFil: 'Ang opisina ay sumusunod sa mga kinakailangang dokumento at mga hakbang batay sa impormasyong ibinigay.', 
      textEn: "The office followed the transaction's requirements and steps based on the information provided.",
      desc: 'Compliance with Requirements' 
    },
    { 
      key: 'sqd3' as const, 
      label: 'SQD3', 
      textFil: 'Ang mga hakbang sa pagproseso, kasama na ang pagbayad ay madali at simple lamang.', 
      textEn: 'The steps (including payment) I needed to do for my transaction were easy and simple.',
      desc: 'Easy & Simple Steps' 
    },
    { 
      key: 'sqd4' as const, 
      label: 'SQD4', 
      textFil: 'Mabilis at madali akong nakahanap ng impormasyon tungkol sa aking transaksyon mula sa opisina o sa website nito.', 
      textEn: 'I easily found information about my transaction from the office or its website.',
      desc: 'Accessible Information' 
    },
    { 
      key: 'sqd5' as const, 
      label: 'SQD5', 
      textFil: 'Nagbayad ako ng makatwirang halaga para sa aking transaksyon. (Kung ang serbisyo ay ibinigay ng libre, maglagay ng tsek sa hanay ng N/A.)', 
      textEn: 'I paid a reasonable amount of fees for my transaction.',
      desc: 'Reasonable Fees / Free' 
    },
    { 
      key: 'sqd6' as const, 
      label: 'SQD6', 
      textFil: 'Pakiramdam ko ay patas ang opisina sa lahat, o "walang palakasan", sa aking transaksyon.', 
      textEn: 'I feel the office was fair to everyone, or "walang palakasan", during my transaction.',
      desc: 'Fairness & Equity' 
    },
    { 
      key: 'sqd7' as const, 
      label: 'SQD7', 
      textFil: 'Magalang akong trato ng mga tauhan, at (kung sakali ako ay humingi ng tulong) alam ko na sila ay handang tumulong sa akin.', 
      textEn: 'I was treated courteously by the staff, and (if I asked for help) the staff was helpful.',
      desc: 'Courtesy & Respect' 
    },
    { 
      key: 'sqd8' as const, 
      label: 'SQD8', 
      textFil: 'Nakuha ko ang kinakailangan ko mula sa tanggapan ng gobyerno, kung tinanggihan man, ito ay sapat na ipinaliwanag sa akin.', 
      textEn: 'I got what I needed from the government office, or (if denied) denial of request was sufficiently explained to me.',
      desc: 'Outcome & Explanation' 
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden" id="feedback-form-card">
      
      {/* Network Alert Ribbon */}
      {!isOnline && (
        <div className="bg-amber-500 text-white text-center py-2 px-4 flex items-center justify-center text-xs gap-2" id="offline-banner">
          <WifiOff className="w-4 h-4 animate-pulse" />
          <span>Offline Mode Active. Feedbacks will save locally and sync upon reconnecting.</span>
        </div>
      )}

      {hasOfflineCache && isOnline && (
        <div className="bg-indigo-600 text-white text-center py-2 px-4 flex items-center justify-center text-xs gap-2" id="sync-banner">
          <Wifi className="w-4 h-4" />
          <span>Local feedbacks ready to synchronize. </span>
          <button 
            onClick={syncOfflineFeedbacks}
            disabled={isSyncing}
            className="underline ml-2 bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded font-medium text-[11px]"
          >
            {isSyncing ? 'Syncing...' : 'Sync Now'}
          </button>
        </div>
      )}

      {/* Official Header Banner */}
      <div className="bg-police-blue px-6 py-8 border-b-4 border-police-gold text-white relative text-center flex flex-col items-center">
        {/* Language Selector Switcher */}
        <div className="absolute top-4 right-4 flex items-center bg-police-blue-hover p-1 rounded-lg border border-police-gold/30 text-xs">
          <button
            type="button"
            onClick={() => setLang('fil')}
            className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
              lang === 'fil' ? 'bg-police-gold text-police-blue shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            🇵🇭 Tagalog
          </button>
          <button
            type="button"
            onClick={() => setLang('en')}
            className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
              lang === 'en' ? 'bg-police-gold text-police-blue shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            🇺🇸 English
          </button>
        </div>

        <PNPLogo size={70} />
        <h1 className="text-xl md:text-2xl font-black mt-3 tracking-wide uppercase" id="form-hero-title">
          {lang === 'en' ? 'HELP US SERVE YOU BETTER!' : 'TULUNGAN MO KAMI MAS MAPABUTI ANG AMING MGA PROSESO AT SERBISYO!'}
        </h1>
        <p className="text-xs font-semibold text-police-gold mt-1 uppercase tracking-widest">
          Client Satisfaction Measurement (CSM) Form
        </p>
        <p className="text-xs text-slate-300 mt-2 max-w-xl leading-relaxed">
          {lang === 'en' 
            ? 'This Client Satisfaction Measurement (CSM) tracks the customer experience of government offices. Your feedback on your recently concluded transaction will help this office provide a better service. Personal information shared will be kept confidential and you always have the option to not answer this form.'
            : 'Ang Client Satisfaction Measurement (CSM) ay naglalayong masubaybayan ang karanasan ng taumbayan hinggil sa kanilang pakikitransaksyon sa mga tanggapan ng gobyerno. Ang personal na impormasyon na iyong ibabahagi ay mananatiling kumpidensyal.'}
        </p>

        {validatedLocation ? (
          <div className="mt-4 bg-emerald-500/20 border border-emerald-400/30 px-4 py-2 rounded-full flex items-center gap-2 text-emerald-300 text-xs" id="qr-linked-badge">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{lang === 'en' ? 'Transacting Office:' : 'Tanggapan:'} <strong>{validatedLocation.office_name}</strong></span>
          </div>
        ) : (
          availableLocations.find(l => l.id === selectedLocationId) && (
            <div className="mt-4 bg-police-gold/20 border border-police-gold/40 px-4 py-2 rounded-full flex items-center gap-2 text-police-gold text-xs" id="auto-routed-office-badge">
              <span className="w-2 h-2 rounded-full bg-police-gold animate-pulse" />
              <span>{lang === 'en' ? 'Auto-Sorted Office:' : 'Ahensya / Opisina:'} <strong>{availableLocations.find(l => l.id === selectedLocationId)?.office_name}</strong></span>
            </div>
          )
        )}
      </div>

      {submitSuccess ? (
        <div className="p-8 text-center" id="success-submitted-panel">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Maraming Salamat sa Inyong Pagtugon!</h2>
          <p className="text-slate-600 mt-2 text-sm max-w-md mx-auto leading-relaxed">
            Ang inyong mga sagot sa Client Satisfaction Measurement (CSM) ay matagumpay na naitala at direktang makatutulong sa pagpapabuti ng ating pampublikong serbisyo sa Zamboanga del Norte.
          </p>
          {!isOnline && (
            <div className="mt-4 p-3 bg-amber-50 rounded-lg text-amber-800 border border-amber-100 text-xs max-w-sm mx-auto">
              Naitabi Offline! Isasabay ito sa pagpapadala kapag nagkaroon ng koneksyon sa internet.
            </div>
          )}
          <button
            onClick={handleResetForm}
            className="mt-6 bg-police-blue hover:bg-police-blue-hover text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors cursor-pointer shadow-md"
            id="btn-file-another"
          >
            Sagutan Ulit ang Sarbey
          </button>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="p-6 md:p-8 space-y-8" id="feedback-active-form">

          {/* SECTION B: Client Information (Impormasyon ng Kliyente) */}
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-police-blue">
                Impormasyon ng Kliyente (Client Profile)
              </h2>
              <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">Demographics</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Uri ng Kliyente */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Uri ng Kliyente:
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['Mamamayan', 'Negosyo', 'Gobyerno'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setClientType(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        clientType === type
                          ? 'bg-police-blue text-white border-police-blue shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {type === 'Gobyerno' ? 'Gobyerno (Empleyado/Ahensya)' : type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Kasarian */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Kasarian:
                </label>
                <div className="flex gap-2">
                  {(['Lalaki', 'Babae'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer text-center ${
                        gender === g
                          ? 'bg-police-blue text-white border-police-blue shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Edad & Rehiyon */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Edad:
                </label>
                <input
                  type="number"
                  placeholder="Hal. 28"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="12"
                  max="120"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-police-blue"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Rehiyon:
                </label>
                <input
                  type="text"
                  placeholder="Hal. Region IX"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-police-blue"
                  required
                />
              </div>
            </div>

            {/* Uri ng Transaksyon / Serbisyo */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Uri ng Transaksyon o Serbisyo:
              </label>
              <input
                type="text"
                placeholder="Hal. Police Clearance Application, Blotter, Traffic Report, General Inquiry"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-police-blue"
                required
              />
            </div>
          </div>

          {/* SECTION C: Citizen's Charter (CC) Questions */}
          <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-police-blue flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-police-gold" />
                Citizen's Charter (CC) Questions
              </h2>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                <strong>{lang === 'en' ? 'INSTRUCTIONS:' : 'PANUTO:'}</strong> {lang === 'en' 
                  ? 'The Citizen\'s Charter (CC) is an official document that reflects the services of a government agency/office including its requirements, fees, and processing times among others.'
                  : 'Ang Citizen\'s Charter (CC) ay isang opisyal na dokumento na naglalaman ng mga serbisyo sa isang ahensya/opisina ng gobyerno, makikita rito ang mga kinakailangan na dokumento, kaukulang bayarin, at pangkabuuang oras ng pagproseso.'}
              </p>
            </div>

            {/* CC1 */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                CC1. {lang === 'en' 
                  ? 'Which of the following best describes your awareness of a CC?' 
                  : 'Alin sa mga sumusunod ang naglalarawan sa iyong kaalaman sa CC?'}
              </label>
              <div className="space-y-1.5 text-xs">
                {[
                  { fil: '1. Alam ko ang CC at Nakita ko ito sa napuntahang opisina', en: '1. I know what a CC is and I saw this office\'s CC.' },
                  { fil: '2. Alam ko ang CC pero hindi ko ito nakita sa napuntahang opisina', en: '2. I know what a CC is, but I did NOT see this office\'s CC.' },
                  { fil: '3. Nalaman ko ang CC nang Makita ko ito sa napuntahang opisina', en: '3. I learned of the CC only when I saw this office\'s CC.' },
                  { fil: '4. Hindi ko alam kung ano ang CC at wala akong nakita sa napuntahang opisina (Lagyan ng tsek ang N/A sa CC2 at CC3 kapag ito ang iyong sagot)', en: '4. I do not know what a CC is and I did not see one in this office. (Answer \'N/A\' on CC2 and CC3)' }
                ].map((item) => {
                  const labelText = lang === 'en' ? item.en : item.fil;
                  const subText = lang === 'en' ? item.fil : item.en;
                  return (
                    <label key={item.fil} className={`flex items-start gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${
                      cc1.startsWith(item.fil.slice(0, 2)) || cc1 === item.fil || cc1 === item.en ? 'bg-white border-police-blue ring-1 ring-police-blue/20 font-medium' : 'bg-white/60 border-slate-200 hover:bg-white'
                    }`}>
                      <input
                        type="radio"
                        name="cc1_group"
                        checked={cc1.startsWith(item.fil.slice(0, 2)) || cc1 === item.fil || cc1 === item.en}
                        onChange={() => handleCc1Change(item.fil)}
                        className="mt-0.5 text-police-blue focus:ring-police-blue"
                      />
                      <div className="text-slate-700 leading-tight">
                        <div>{labelText}</div>
                        <div className="text-[10px] text-slate-400 font-normal italic mt-0.5">{subText}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* CC2 */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <label className="block text-xs font-bold text-slate-800">
                CC2. {lang === 'en' 
                  ? 'If aware of CC (answered 1-3 in CC1), would you say that the CC of this office was ...?' 
                  : 'Kung alam ang CC (Nag-tsek sa opsyong 1-3 sa CC1), masasabi mo ba na ang CC nang napuntahang opisina ay...'}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                {[
                  { fil: '1. Madaling Makita', en: '1. Easy to see' },
                  { fil: '2. Medyo madaling Makita', en: '2. Somewhat easy to see' },
                  { fil: '3. Mahirap makita', en: '3. Difficult to see' },
                  { fil: '4. Hindi makita', en: '4. Not visible at all' },
                  { fil: '5. N/A', en: '5. N/A' }
                ].map((item) => {
                  const labelText = lang === 'en' ? item.en : item.fil;
                  return (
                    <label key={item.fil} className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${
                      cc2.startsWith(item.fil.slice(0, 2)) || cc2 === item.fil ? 'bg-white border-police-blue ring-1 ring-police-blue/20 font-medium' : 'bg-white/60 border-slate-200 hover:bg-white'
                    }`}>
                      <input
                        type="radio"
                        name="cc2_group"
                        checked={cc2.startsWith(item.fil.slice(0, 2)) || cc2 === item.fil}
                        onChange={() => setCc2(item.fil)}
                        disabled={cc1.startsWith('4.')}
                        className="text-police-blue focus:ring-police-blue"
                      />
                      <span className="text-slate-700">{labelText}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* CC3 */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <label className="block text-xs font-bold text-slate-800">
                CC3. {lang === 'en' 
                  ? 'If aware of CC (answered codes 1-3 in CC1), how much did the CC help you in your transaction?' 
                  : 'Kung alam ang CC (nag-tsek sa opsyong 1-3 sa CC1), gaano nakatulong ang CC sa transaksyon mo?'}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                {[
                  { fil: '1. Sobrang nakatulong', en: '1. Helped very much' },
                  { fil: '2. Nakatulong naman', en: '2. Somewhat helped' },
                  { fil: '3. Hindi nakatulong', en: '3. Did not help' },
                  { fil: '4. N/A', en: '4. N/A' }
                ].map((item) => {
                  const labelText = lang === 'en' ? item.en : item.fil;
                  return (
                    <label key={item.fil} className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${
                      cc3.startsWith(item.fil.slice(0, 2)) || cc3 === item.fil ? 'bg-white border-police-blue ring-1 ring-police-blue/20 font-medium' : 'bg-white/60 border-slate-200 hover:bg-white'
                    }`}>
                      <input
                        type="radio"
                        name="cc3_group"
                        checked={cc3.startsWith(item.fil.slice(0, 2)) || cc3 === item.fil}
                        onChange={() => setCc3(item.fil)}
                        disabled={cc1.startsWith('4.')}
                        className="text-police-blue focus:ring-police-blue"
                      />
                      <span className="text-slate-700">{labelText}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION D: Service Quality Dimensions (SQD 0-8) Matrix */}
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-police-blue">
                Service Quality Dimensions (SQD 0 - 8)
              </h2>
              <p className="text-[11px] text-slate-600 mt-1">
                <strong>{lang === 'en' ? 'INSTRUCTIONS:' : 'PANUTO:'}</strong> {lang === 'en' 
                  ? 'For SQD 0-8, please select the rating column that best corresponds to your answer regarding your recent transaction experience.' 
                  : 'Para sa SQD 0-8, piliin ang antas ng iyong pagsang-ayon sa mga pahayag ukol sa iyong naging karanasan sa opisina.'}
              </p>
            </div>

            {/* Rating Scale Legend Header */}
            <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200 grid grid-cols-6 gap-1 text-center text-[10px] font-bold text-slate-700 hidden md:grid">
              <div className="flex flex-col items-center">
                <span className="text-base">😡</span>
                <span>{lang === 'en' ? '1 - Strongly Disagree' : '1 - Lubos na hindi sumasasang-ayon'}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base">🙁</span>
                <span>{lang === 'en' ? '2 - Disagree' : '2 - Hindi sumasasang-ayon'}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base">😐</span>
                <span>{lang === 'en' ? '3 - Neither Agree nor Disagree' : '3 - Walang kinikilingan'}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base">🙂</span>
                <span>{lang === 'en' ? '4 - Agree' : '4 - Sumasasang-ayon'}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base">😀</span>
                <span>{lang === 'en' ? '5 - Strongly Agree' : '5 - Labis na sumasasang-ayon'}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base">⚪</span>
                <span>{lang === 'en' ? 'N/A - Not Applicable' : 'N/A - Not Applicable'}</span>
              </div>
            </div>

            {/* SQD Questions Rows */}
            <div className="space-y-3">
              {sqdQuestions.map((q) => {
                const currentVal = sqdRatings[q.key];
                const mainText = lang === 'en' ? q.textEn : q.textFil;
                const altText = lang === 'en' ? q.textFil : q.textEn;
                return (
                  <div key={q.key} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-block bg-police-blue text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            {q.label}
                          </span>
                          <span className="text-[10px] text-police-gold font-bold uppercase">{q.desc}</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-800 leading-snug">
                          {mainText}
                        </p>
                        <p className="text-[11px] text-slate-500 font-normal italic mt-0.5">
                          {altText}
                        </p>
                      </div>
                    </div>

                    {/* Radio Options Grid */}
                    <div className="grid grid-cols-6 gap-1 pt-1">
                      {[
                        { score: 1, label: '1', emote: '😡', title: lang === 'en' ? 'Strongly Disagree' : 'Lubos na hindi' },
                        { score: 2, label: '2', emote: '🙁', title: lang === 'en' ? 'Disagree' : 'Hindi' },
                        { score: 3, label: '3', emote: '😐', title: lang === 'en' ? 'Neutral' : 'Neutral' },
                        { score: 4, label: '4', emote: '🙂', title: lang === 'en' ? 'Agree' : 'Sumasasang-ayon' },
                        { score: 5, label: '5', emote: '😀', title: lang === 'en' ? 'Strongly Agree' : 'Labis na sumasasang-ayon' },
                        { score: 'N/A' as const, label: 'N/A', emote: '⚪', title: 'N/A' }
                      ].map((item) => {
                        const isSelected = currentVal === item.score;
                        return (
                          <button
                            key={String(item.score)}
                            type="button"
                            onClick={() => updateSqdRating(q.key, item.score)}
                            className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-police-blue text-white border-police-blue shadow-md scale-105 font-bold'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <span className="text-base md:text-lg">{item.emote}</span>
                            <span className="text-[10px] mt-0.5 font-bold">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION E: Category & Feedback Comments */}
          <div className="space-y-4 pt-2 border-t border-slate-200">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Uri ng Komento / Puna (Transaction Purpose Type)
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {(Object.keys(categoryThemes) as Array<keyof typeof categoryThemes>).map((cat) => {
                  const isSelected = category === cat;
                  const theme = categoryThemes[cat];
                  const Icon = theme.icon;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected 
                          ? `${theme.bg} ${theme.text} border-2 font-bold ring-2 ring-slate-900/10` 
                          : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4 mb-1" />
                      <span className="text-xs capitalize">{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Suhestiyon kung paano pa mapapabuti ang aming mga serbisyo */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Mga suhestiyon kung paano pa mapapabuti ang aming mga serbisyo (opsyonal):
              </label>
              <textarea
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value.slice(0, 1000))}
                placeholder="Isulat dito ang inyong mga mungkahi o suhestiyon upang lalong mapaganda ang aming serbisyo..."
                className="w-full h-20 bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-police-blue text-xs rounded-xl p-3"
              />
            </div>

            {/* Additional narrative/comments */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Karagdagang Detalye o Salaysay (Comments / Narrative):
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value.slice(0, 1000))}
                placeholder="Ibahagi ang iba pang detalye o karanasan sa inyong pakikitransaksyon..."
                className="w-full h-20 bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-police-blue text-xs rounded-xl p-3"
              />
            </div>

            {/* Officer Name (Optional) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Pangalan ng Tauhan o Desk Officer (Opsyonal):
              </label>
              <input
                type="text"
                placeholder="Hal. Pat. Dela Cruz, PMaj. Alonzo"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-police-blue text-xs rounded-xl px-3 py-2.5"
              />
            </div>
          </div>

          {/* SECTION F: Contact / Identity (Anonymity Option) */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between bg-slate-100 p-3 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-800">Ipadala nang Anonymous (Kumpidensyal)</span>
              <button
                type="button"
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none cursor-pointer ${
                  isAnonymous ? 'bg-police-blue' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                    isAnonymous ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {!isAnonymous && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fadeIn" id="citizen-detail-inputs">
                <div className="space-y-1">
                  <label className="block text-slate-700 text-xs font-bold">Pangalan (Name)</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Juan Dela Cruz"
                      value={citizenName}
                      onChange={(e) => setCitizenName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-police-blue"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-700 text-xs font-bold">Numero ng Telepono (Contact)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="0917-XXX-XXXX"
                      value={citizenContact}
                      onChange={(e) => setCitizenContact(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-police-blue"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email Address (Opsyonal) */}
            <div className="space-y-1">
              <label className="block text-slate-700 text-xs font-bold">Email Address (Opsyonal):</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="juan@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-police-blue"
                />
              </div>
            </div>
          </div>

          {/* SECTION G: Anti-Spam Security Verification */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Proteksyon sa Protektadong Portal (Math Security Verification)
              </label>
              <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold">Anti-Bot Shield</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-200 px-4 py-2 rounded-lg font-mono text-sm font-bold text-slate-800 border border-slate-300">
                <span>{captchaQuestion.q}</span>
              </div>
              <input
                type="text"
                placeholder="Ilagay ang sagot"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className={`flex-1 bg-white border ${captchaError ? 'border-red-500 bg-red-50/30' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-police-blue text-xs rounded-lg px-3 py-2`}
                required
              />
              <button
                type="button"
                onClick={generateCaptcha}
                className="text-xs text-slate-500 hover:text-slate-700 underline font-mono cursor-pointer"
              >
                Bagong Math
              </button>
            </div>
            
            {captchaError && (
              <p className="text-[11px] text-red-600 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Mali ang sagot sa math captcha. Pakisubukang muli.
              </p>
            )}
          </div>

          {/* Error Message Display */}
          {serverError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-police-blue hover:bg-police-blue-hover disabled:bg-slate-400 text-white font-extrabold py-3.5 px-6 rounded-xl text-center flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer text-sm tracking-wide uppercase"
            id="btn-submit-feedback"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? 'IPINAPADALA ANG MGA SAGOT...' : 'IPADALA ANG CLIENT SATISFACTION MEASUREMENT REPORT'}
          </button>
        </form>
      )}
    </div>
  );
}
