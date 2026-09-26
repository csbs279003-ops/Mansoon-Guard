import React, { useState } from 'react';
import { 
  CheckCircle, 
  RotateCw, 
  FileSpreadsheet, 
  Layers, 
  Sparkles, 
  TrendingUp, 
  PlusCircle, 
  Award, 
  AlertCircle, 
  HelpCircle, 
  Database 
} from 'lucide-react';
import { PanchayatData, ValidationRecord, Language, ScreenId } from '../../types';
import { APP_TRANSLATIONS } from '../../data/translations';
import { MODEL_EVALUATION_METRICS } from '../../data/mockData';
import { playHapticSound } from '../../utils/audio';

interface Props {
  panchayat: PanchayatData;
  validationRecords: ValidationRecord[];
  onAddValidationRecord: (record: ValidationRecord) => void;
  language: Language;
  onNavigate: (screen: ScreenId) => void;
  showHotspots: boolean;
}

export const ValidateLearnScreen: React.FC<Props> = ({
  panchayat,
  validationRecords,
  onAddValidationRecord,
  language,
  onNavigate,
  showHotspots,
}) => {
  const t = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.en;
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [observedRain, setObservedRain] = useState<string>('24.0');
  const [didFalseOnsetOccur, setDidFalseOnsetOccur] = useState<boolean>(true);
  const [reporterName, setReporterName] = useState<string>('Krishi Mitra');
  const [feedbackNote, setFeedbackNote] = useState<string>('Observed rain matched prediction; farmers successfully protected.');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playHapticSound('success');

    const newRecord: ValidationRecord = {
      id: `val-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      panchayat: panchayat.name,
      predictedRainMm: panchayat.totalRainfallExpectedMm,
      actualObservedMm: parseFloat(observedRain) || 0,
      predictedFalseOnset: panchayat.primaryAdvisory === 'WAIT',
      actualFalseOnsetOccurred: didFalseOnsetOccur,
      reporterName: reporterName,
      reporterRole: 'Ground Volunteer',
      status: 'verified',
      feedbackNotes: feedbackNote,
    };

    onAddValidationRecord(newRecord);
    setShowSubmitModal(false);
    setToastMessage(t.calibrateStatus || 'Model Calibrated with Ground Rain Gauge');
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="flex flex-col min-h-full pb-20 bg-slate-50 text-slate-900 select-none">
      {/* Top Header */}
      <div className="bg-slate-900 text-white px-5 pt-4 pb-5 rounded-b-3xl shadow-sm relative">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1">
            <RotateCw className="w-3 h-3 animate-spin" />
            {t.badgeSystem}
          </span>
          <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300 font-bold">
            ML Calibration
          </span>
        </div>

        <h1 className="text-lg font-bold tracking-tight text-white flex items-center justify-between">
          <span>{t.validateLearnTitle}</span>
          <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded-md font-mono">
            Active
          </span>
        </h1>
        <p className="text-xs text-slate-300 mt-0.5">
          {t.validateLearnSubtitle}
        </p>
      </div>

      {/* Main Container */}
      <div className="p-4 space-y-4">
        {/* Model Evaluation Metric Grid */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>{t.modelEvalBenchmark}</span>
            </span>
            <span className="text-[10px] text-slate-400">Target vs Achieved</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Metric 1: RMSE */}
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="text-[10px] text-slate-500 font-medium">
                Rainfall Error (RMSE)
              </div>
              <div className="text-base font-black text-slate-900 mt-0.5 tabular-nums">
                {MODEL_EVALUATION_METRICS.rmse.achieved}
              </div>
              <div className="text-[9px] text-emerald-700 font-semibold flex items-center justify-between mt-1 pt-1 border-t border-slate-200">
                <span>Target: {MODEL_EVALUATION_METRICS.rmse.target}</span>
                <span>✓ PASS</span>
              </div>
            </div>

            {/* Metric 2: F1-score */}
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="text-[10px] text-slate-500 font-medium">
                Event Detection (F1)
              </div>
              <div className="text-base font-black text-slate-900 mt-0.5 tabular-nums">
                {MODEL_EVALUATION_METRICS.f1.achieved}
              </div>
              <div className="text-[9px] text-emerald-700 font-semibold flex items-center justify-between mt-1 pt-1 border-t border-slate-200">
                <span>Target: {MODEL_EVALUATION_METRICS.f1.target}</span>
                <span>✓ PASS</span>
              </div>
            </div>

            {/* Metric 3: Precision / Recall */}
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="text-[10px] text-slate-500 font-medium">
                Alert Recall (Safety)
              </div>
              <div className="text-base font-black text-slate-900 mt-0.5 tabular-nums">
                {MODEL_EVALUATION_METRICS.recall.achieved}
              </div>
              <div className="text-[9px] text-emerald-700 font-semibold flex items-center justify-between mt-1 pt-1 border-t border-slate-200">
                <span>Target: {MODEL_EVALUATION_METRICS.recall.target}</span>
                <span>✓ PASS</span>
              </div>
            </div>

            {/* Metric 4: Calibration ECE */}
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="text-[10px] text-slate-500 font-medium">
                Probability Calibration
              </div>
              <div className="text-base font-black text-slate-900 mt-0.5 tabular-nums">
                {MODEL_EVALUATION_METRICS.calibration.achieved}
              </div>
              <div className="text-[9px] text-emerald-700 font-semibold flex items-center justify-between mt-1 pt-1 border-t border-slate-200">
                <span>Target: {MODEL_EVALUATION_METRICS.calibration.target}</span>
                <span>✓ RELIABLE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Loop Action Button */}
        <button
          onClick={() => {
            playHapticSound('tap');
            setShowSubmitModal(true);
          }}
          className={`w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all cursor-pointer ${
            showHotspots ? 'ring-4 ring-cyan-400' : ''
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.logGroundTruth}</span>
        </button>

        {/* Success Toast */}
        {toastMessage && (
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 font-medium">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="leading-snug">{toastMessage}</span>
          </div>
        )}

        {/* Recent Validation Entries Feed */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900">
              {t.groundTruthLogs} ({validationRecords.length})
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Ground Ingestion
            </span>
          </div>

          <div className="space-y-2.5">
            {validationRecords.map((rec) => (
              <div
                key={rec.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    {rec.panchayat}
                  </span>
                  <span className="text-[10px] text-slate-400">{rec.date}</span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-600">
                  <span>
                    {t.predicted}: <strong>{rec.predictedRainMm}mm</strong>
                  </span>
                  <span>·</span>
                  <span>
                    {t.actualGauge}: <strong className="text-blue-700">{rec.actualObservedMm}mm</strong>
                  </span>
                  <span>·</span>
                  <span className="text-emerald-700 font-semibold">
                    Δ {Math.abs(rec.predictedRainMm - rec.actualObservedMm).toFixed(1)}mm
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 italic bg-white p-2 rounded-lg border border-slate-100">
                  "{rec.feedbackNotes}"
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Logged by: {rec.reporterName}</span>
                  <span className="text-emerald-700 font-medium">● {t.calibrateStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for adding Ground Truth Reading */}
        {showSubmitModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  {t.submitGroundReading}
                </h3>
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {t.selectPanchayat}
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`${panchayat.name} (${panchayat.nameRegional})`}
                    className="w-full p-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {t.measuredRainMm}
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={observedRain}
                    onChange={(e) => setObservedRain(e.target.value)}
                    required
                    className="w-full p-2 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {t.didDryBreakFollow}
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setDidFalseOnsetOccur(true)}
                      className={`flex-1 py-2 rounded-xl font-semibold border cursor-pointer ${
                        didFalseOnsetOccur
                          ? 'bg-amber-100 border-amber-300 text-amber-900'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {t.yesDryBreak}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDidFalseOnsetOccur(false)}
                      className={`flex-1 py-2 rounded-xl font-semibold border cursor-pointer ${
                        !didFalseOnsetOccur
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {t.noRainsContinued}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {t.observerNotes}
                  </label>
                  <textarea
                    rows={2}
                    value={feedbackNote}
                    onChange={(e) => setFeedbackNote(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold cursor-pointer"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer"
                  >
                    {t.submitAndRetrain}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
