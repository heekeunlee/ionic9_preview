import { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend
} from 'recharts';
import { 
  TrendingDown, 
  Wallet, ShieldCheck, 
  Coins, ArrowRightLeft, Key, Image as ImageIcon, X
} from 'lucide-react';
import { ionicData } from './data';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'all' | '렌트' | '리스'>('all');
  const [activeMileage, setActiveMileage] = useState<10000 | 15000>(15000);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredQuotes = useMemo(() => {
    return ionicData.quotes.filter(q => {
      if (activeTab !== 'all' && q.type !== activeTab) return false;
      if (q.type === '렌트' && q.mileage !== activeMileage) return false;
      return true;
    }).sort((a, b) => a.monthly - b.monthly);
  }, [activeTab, activeMileage]);

  const bestQuote = filteredQuotes[0];

  const chartData = useMemo(() => {
    return filteredQuotes.map(q => {
      const diffFromBest = q.monthly - bestQuote.monthly;
      return {
        name: q.company,
        monthly: q.monthly / 10000,
        deposit: q.deposit / 10000,
        residual: q.residual_value / 10000,
        diff: diffFromBest / 10000,
        type: q.type
      };
    });
  }, [filteredQuotes, bestQuote]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const getImageUrl = (path: string) => {
    // Vite serves public files from root in development and relative to base in production
    // Since base is /ionic9_preview/, we use that prefix
    const base = import.meta.env.BASE_URL;
    return `${base}quotes/${path}`;
  };

  return (
    <div className="container" style={{ background: 'var(--bg-color)' }}>
      <header className="fade-in" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(0, 113, 227, 0.1)', color: 'var(--accent)', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '20px' }}>
          <Coins size={14} /> IONIC 9 PRESTIGE QUOTE ANALYSIS
        </div>
        <h1 style={{ fontSize: '4rem', letterSpacing: '-0.02em', color: '#1d1d1f' }}>아이오닉 9 <span style={{ color: 'var(--accent)' }}>견적 심층 비교</span></h1>
        <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', color: '#6e6e73' }}>
          매달 내는 월 납입금부터 보증금, 만기 인수 금액까지 한눈에 비교하고 원본 견적서를 확인하세요.
        </p>
      </header>

      {/* Hero Stats */}
      <section className="fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="grid" style={{ marginBottom: '60px' }}>
          <div className="glass-panel" style={{ background: '#fff', border: '1px solid #0071e3' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <TrendingDown color="var(--accent)" />
              <h3 style={{ marginBottom: 0 }}>월 납입금 (운용 비용)</h3>
            </div>
            <div className="price" style={{ fontSize: '2.2rem', color: 'var(--accent)' }}>
              {formatPrice(bestQuote?.monthly)}<span className="unit">원</span>
            </div>
            <p style={{ fontSize: '0.9rem', marginTop: '8px' }}>{bestQuote?.company} - {bestQuote?.type} (최적가)</p>
          </div>
          <div className="glass-panel" style={{ background: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Wallet color="#ff9500" />
              <h3 style={{ marginBottom: 0 }}>기본 보증금 (초기 비용)</h3>
            </div>
            <div className="price" style={{ fontSize: '2.2rem' }}>
              {formatPrice(bestQuote?.deposit / 10000)}<span className="unit">만원</span>
            </div>
            <p style={{ fontSize: '0.9rem', marginTop: '8px' }}>차량가액의 약 30% 수준</p>
          </div>
          <div className="glass-panel" style={{ background: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Key color="#28cd41" />
              <h3 style={{ marginBottom: 0 }}>만기 인수금 (잔존 가치)</h3>
            </div>
            <div className="price" style={{ fontSize: '2.2rem' }}>
              {formatPrice(bestQuote?.residual_value / 10000)}<span className="unit">만원</span>
            </div>
            <p style={{ fontSize: '0.9rem', marginTop: '8px' }}>인수 시 추가 납부 금액</p>
          </div>
        </div>
      </section>

      {/* Multimetric Comparison */}
      <section className="fade-in" style={{ animationDelay: '0.2s', marginBottom: '80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <h2>3대 핵심 지표 통합 비교</h2>
          <div style={{ display: 'flex', gap: '12px' }}>
             <div className="tab-nav">
              <button className={`tab-btn ${activeMileage === 10000 ? 'active' : ''}`} onClick={() => setActiveMileage(10000)}>1만km</button>
              <button className={`tab-btn ${activeMileage === 15000 ? 'active' : ''}`} onClick={() => setActiveMileage(15000)}>1.5만km</button>
            </div>
            <div className="tab-nav">
              <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>전체</button>
              <button className={`tab-btn ${activeTab === '렌트' ? 'active' : ''}`} onClick={() => setActiveTab('렌트')}>렌트</button>
              <button className={`tab-btn ${activeTab === '리스' ? 'active' : ''}`} onClick={() => setActiveTab('리스')}>리스</button>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ height: '500px', background: '#fff', padding: '40px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '32px', textAlign: 'center', color: 'var(--text-sub)' }}>금융사별 지표 비교 (단위: 만원)</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} hide />
              <Tooltip 
                cursor={{ fill: '#f5f5f7' }}
                contentStyle={{ borderRadius: '16px', border: '1px solid #e0e0e0', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              />
              <Legend verticalAlign="top" height={36}/>
              <Bar dataKey="monthly" name="월 납입금 (x10k)" fill="var(--accent)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="deposit" name="보증금" fill="#ff9500" radius={[4, 4, 0, 0]} />
              <Bar dataKey="residual" name="만기 인수금" fill="#28cd41" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel table-container" style={{ background: '#fff', marginTop: '40px' }}>
          <table>
            <thead>
              <tr>
                <th>금융사</th>
                <th>방식</th>
                <th>월 납입금</th>
                <th>보증금</th>
                <th>만기 인수금</th>
                <th>총 인수 비용</th>
                <th>원본</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((q, idx) => {
                const totalAcquisition = (q.monthly * 48 + q.residual_value);
                return (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{q.company}</td>
                    <td><span className={`badge ${q.type === '렌트' ? 'badge-mid' : 'badge-low'}`}>{q.type}</span></td>
                    <td className="price" style={{ color: idx === 0 ? 'var(--accent)' : 'inherit' }}>{formatPrice(q.monthly)}원</td>
                    <td className="price">{formatPrice(q.deposit)}원</td>
                    <td className="price">{formatPrice(q.residual_value)}원</td>
                    <td style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                       {formatPrice(Math.round(totalAcquisition / 10000))}만원
                    </td>
                    <td>
                      <button 
                        onClick={() => setSelectedImage(q.imagePath)}
                        style={{ border: 'none', background: 'rgba(0, 113, 227, 0.1)', color: 'var(--accent)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600 }}
                      >
                        <ImageIcon size={14} /> 원본
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '40px' }}
          onClick={() => setSelectedImage(null)}
        >
          <div 
            style={{ position: 'relative', maxWidth: '100%', maxHeight: '100%', background: '#fff', borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>견적서 원본 확인</h3>
              <button 
                onClick={() => setSelectedImage(null)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-sub)' }}
              >
                <X size={24} />
              </button>
            </div>
            <div style={{ overflowY: 'auto', flex: 1, padding: '20px', textAlign: 'center' }}>
              <img 
                src={getImageUrl(selectedImage)} 
                alt="Original Quote" 
                style={{ maxWidth: '100%', height: 'auto', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }} 
              />
            </div>
          </div>
        </div>
      )}

      {/* Decision Guide */}
      <section className="fade-in" style={{ animationDelay: '0.3s', marginBottom: '100px' }}>
        <div className="grid">
          <div className="glass-panel" style={{ background: '#0071e3', color: '#fff' }}>
            <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowRightLeft /> 반납 장기렌트 전략
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '24px' }}>차량을 4년만 타고 교체하신다면, 만기 인수금보다 **월 납입금이 낮은 견적**이 무조건 유리합니다.</p>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '12px' }}>
              <p style={{ fontWeight: 700 }}>추천: RS 컴퍼니 장기렌트</p>
              <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>가장 낮은 월 고정비용으로 사업자 세제 혜택을 극대화할 수 있습니다.</p>
            </div>
          </div>
          <div className="glass-panel" style={{ background: '#f5f5f7' }}>
             <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck /> 만기 인수 리스 전략
            </h3>
            <p style={{ color: 'var(--text-sub)', marginBottom: '24px' }}>내 차로 영구 소유하고 싶다면 만기 시 지불할 **인수 비용의 총합**을 따져야 합니다.</p>
            <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
              <p style={{ fontWeight: 700, color: 'var(--text-main)' }}>추천: 메리츠 리스</p>
              <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>상대적으로 낮은 인수 비용으로 최종 내 차로 만드는 데 효율적입니다.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
