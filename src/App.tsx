import { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend, LabelList
} from 'recharts';
import { 
  TrendingDown, CheckCircle2,
  Wallet, ShieldCheck, 
  ArrowRightLeft, Key, X,
  UserCheck, MessageSquare, Lightbulb
} from 'lucide-react';
import { ionicData } from './data';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'all' | '렌트' | '리스'>('all');
  const [activeMileage, setActiveMileage] = useState<10000 | 15000>(15000);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [strategy, setStrategy] = useState<'return' | 'takeover' | null>(null);

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
        name: q.company.split(' ')[0],
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
    const base = import.meta.env.BASE_URL;
    return `${base}quotes/${path}`;
  };

  const strategyQuotes = useMemo(() => {
    if (strategy === 'takeover') {
      return [...ionicData.quotes].sort((a, b) => (a.monthly * 48 + a.residual_value) - (b.monthly * 48 + b.residual_value));
    }
    return [...ionicData.quotes].sort((a, b) => a.monthly - b.monthly);
  }, [strategy]);

  const recommended = strategyQuotes[0];

  return (
    <div className="container" style={{ background: 'var(--bg-color)' }}>
      <header className="fade-in" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(0, 113, 227, 0.1)', color: 'var(--accent)', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '20px' }}>
          <UserCheck size={14} /> IONIC 9 전문 금융 상담 서비스
        </div>
        <h1 style={{ fontSize: window.innerWidth < 480 ? '2.2rem' : '4rem', letterSpacing: '-0.02em', color: '#1d1d1f' }}>아이오닉 9 <span style={{ color: 'var(--accent)' }}>구매 전략 컨설팅</span></h1>
        <p style={{ maxWidth: '750px', margin: '0 auto', fontSize: window.innerWidth < 480 ? '1rem' : '1.2rem', color: '#6e6e73' }}>
          자영업자 전문 상담가로서 최적의 포트폴리오를 제공합니다.<br/>
          퇴거 전략을 선택해 주세요.
        </p>

        {/* Strategy Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '32px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setStrategy('return')}
            className={`fade-in ${strategy === 'return' ? 'active' : ''}`}
            style={{ 
              padding: '16px', borderRadius: '24px', border: strategy === 'return' ? '3px solid var(--accent)' : '1px solid #e0e0e0',
              background: strategy === 'return' ? 'rgba(0, 113, 227, 0.05)' : '#fff',
              cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: '1', minWidth: '140px', maxWidth: '300px'
            }}
          >
            <ArrowRightLeft size={window.innerWidth < 480 ? 24 : 32} color={strategy === 'return' ? 'var(--accent)' : '#6e6e73'} />
            <div>
              <div style={{ fontSize: window.innerWidth < 480 ? '0.9rem' : '1.1rem', fontWeight: 800, color: '#1d1d1f' }}>만기 시 반납</div>
              <div style={{ fontSize: '0.7rem', color: '#6e6e73', marginTop: '2px' }}>월 비용 최소화</div>
            </div>
          </button>
          
          <button 
            onClick={() => setStrategy('takeover')}
            className={`fade-in ${strategy === 'takeover' ? 'active' : ''}`}
            style={{ 
              padding: '16px', borderRadius: '24px', border: strategy === 'takeover' ? '3px solid var(--success)' : '1px solid #e0e0e0',
              background: strategy === 'takeover' ? 'rgba(40, 205, 65, 0.05)' : '#fff',
              cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: '1', minWidth: '140px', maxWidth: '300px'
            }}
          >
            <Key size={window.innerWidth < 480 ? 24 : 32} color={strategy === 'takeover' ? 'var(--success)' : '#6e6e73'} />
            <div>
              <div style={{ fontSize: window.innerWidth < 480 ? '0.9rem' : '1.1rem', fontWeight: 800, color: '#1d1d1f' }}>만기 시 인수</div>
              <div style={{ fontSize: '0.7rem', color: '#6e6e73', marginTop: '2px' }}>최종 내 차로 소유</div>
            </div>
          </button>
        </div>
      </header>

      {/* Expert Analysis Report */}
      {strategy && (
        <section className="fade-in" style={{ marginBottom: '40px' }}>
          <div className="glass-panel" style={{ background: '#fff', border: `2px solid ${strategy === 'return' ? 'var(--accent)' : 'var(--success)'}`, padding: window.innerWidth < 480 ? '20px 16px' : '40px', borderRadius: '24px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <MessageSquare color={strategy === 'return' ? 'var(--accent)' : 'var(--success)'} size={20} />
              <h2 style={{ marginBottom: 0, fontSize: window.innerWidth < 480 ? '1.2rem' : '1.6rem' }}>맞춤형 분석 보고</h2>
            </div>
            
            <div className="grid" style={{ alignItems: 'start', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '4px' }}>최적 견적 업체</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1d1d1f', marginBottom: '20px' }}>
                  {recommended.company} <span style={{ color: strategy === 'return' ? 'var(--accent)' : 'var(--success)' }}>{recommended.type}</span>
                </div>
                
                <div style={{ padding: '16px', background: '#f5f5f7', borderRadius: '16px', marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>{strategy === 'return' ? '월 예상 지출' : '총 취득 예상 원가'}</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '4px 0' }}>
                    {strategy === 'return' ? `월 ${formatPrice(recommended.monthly)}원` : `${formatPrice(Math.round((recommended.monthly * 48 + recommended.residual_value)/10000))}만원`}
                  </div>
                </div>
              </div>
              
              <div style={{ background: '#f5f5f7', padding: '20px', borderRadius: '20px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lightbulb size={18} color="#ff9500" /> 핵심 상담 포인트
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem' }}>
                  <li style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
                    <CheckCircle2 size={16} color={strategy === 'return' ? 'var(--accent)' : 'var(--success)'} style={{ flexShrink: 0 }} />
                    {strategy === 'return' ? '사업자 절세 혜택(연 1.5천만)에 최적화된 리스크 관리 모델' : '잔존가치를 전략적으로 설계한 최저 총액 인수 모델'}
                  </li>
                  <li style={{ display: 'flex', gap: '10px' }}>
                    <CheckCircle2 size={16} color={strategy === 'return' ? 'var(--accent)' : 'var(--success)'} style={{ flexShrink: 0 }} />
                    {strategy === 'return' ? '사고 이력 걱정 없는 면책금 기반 렌트 관리 체계' : '보험 경력 유지 및 자산 소유 가치 극대화'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hero Stats */}
      <section className="fade-in" style={{ animationDelay: '0.1s', marginBottom: '40px' }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
          <div className="glass-panel" style={{ background: '#fff', border: '1px solid #0071e3', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <TrendingDown size={14} color="var(--accent)" />
              <h3 style={{ marginBottom: 0, fontSize: '0.85rem' }}>월 납입</h3>
            </div>
            <div className="price" style={{ fontSize: '1.4rem', color: 'var(--accent)' }}>
              {formatPrice(bestQuote?.monthly)}<span className="unit">원</span>
            </div>
          </div>
          <div className="glass-panel" style={{ background: '#fff', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Wallet size={14} color="#ff9500" />
              <h3 style={{ marginBottom: 0, fontSize: '0.85rem' }}>보증금</h3>
            </div>
            <div className="price" style={{ fontSize: '1.4rem' }}>
              {formatPrice(bestQuote?.deposit / 10000)}<span className="unit">만</span>
            </div>
          </div>
          <div className="glass-panel" style={{ background: '#fff', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Key size={14} color="#28cd41" />
              <h3 style={{ marginBottom: 0, fontSize: '0.85rem' }}>인수금</h3>
            </div>
            <div className="price" style={{ fontSize: '1.4rem' }}>
              {formatPrice(bestQuote?.residual_value / 10000)}<span className="unit">만</span>
            </div>
          </div>
        </div>
      </section>

      {/* Multimetric Comparison */}
      <section id="comparison-table" className="fade-in" style={{ animationDelay: '0.2s', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <h2 style={{ fontSize: '1.2rem' }}>핵심 지표 비교</h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
             <div className="tab-nav">
              <button className={`tab-btn ${activeMileage === 10000 ? 'active' : ''}`} onClick={() => setActiveMileage(10000)}>1만</button>
              <button className={`tab-btn ${activeMileage === 15000 ? 'active' : ''}`} onClick={() => setActiveMileage(15000)}>1.5만</button>
            </div>
            <div className="tab-nav">
              <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>전체</button>
              <button className={`tab-btn ${activeTab === '렌트' ? 'active' : ''}`} onClick={() => setActiveTab('렌트')}>렌트</button>
              <button className={`tab-btn ${activeTab === '리스' ? 'active' : ''}`} onClick={() => setActiveTab('리스')}>리스</button>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ height: window.innerWidth < 480 ? '280px' : '450px', background: '#fff', padding: window.innerWidth < 480 ? '12px' : '32px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 5, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9 }} />
              <YAxis axisLine={false} tickLine={false} hide />
              <Tooltip 
                cursor={{ fill: '#f5f5f7' }}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '10px' }}
              />
              <Legend verticalAlign="top" height={30} wrapperStyle={{ fontSize: '9px', paddingBottom: '10px' }}/>
              <Bar dataKey="monthly" name="월 납입" fill="var(--accent)" radius={[3, 3, 0, 0]}>
                <LabelList dataKey="monthly" position="top" style={{ fontSize: '8px', fill: 'var(--accent)', fontWeight: 700 }} />
              </Bar>
              <Bar dataKey="deposit" name="보증금" fill="#ff9500" radius={[3, 3, 0, 0]}>
                <LabelList dataKey="deposit" position="top" style={{ fontSize: '8px', fill: '#ff9500', fontWeight: 700 }} />
              </Bar>
              <Bar dataKey="residual" name="인수금" fill="#28cd41" radius={[3, 3, 0, 0]}>
                <LabelList dataKey="residual" position="top" style={{ fontSize: '8px', fill: '#28cd41', fontWeight: 700 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel table-container" style={{ background: '#fff', marginTop: '24px', padding: '0' }}>
          <table>
            <thead>
              <tr>
                <th>금융사</th>
                <th>방식</th>
                <th>월 납입금</th>
                <th>원본</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((q, idx) => {
                return (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{q.company}</td>
                    <td><span className={`badge ${q.type === '렌트' ? 'badge-mid' : 'badge-low'}`} style={{ fontSize: '0.7rem' }}>{q.type}</span></td>
                    <td className="price" style={{ color: idx === 0 ? 'var(--accent)' : 'inherit' }}>{formatPrice(q.monthly)}원</td>
                    <td>
                      <button 
                        onClick={() => setSelectedImage(q.imagePath)}
                        style={{ border: 'none', background: 'rgba(0, 113, 227, 0.1)', color: 'var(--accent)', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.7rem' }}
                      >
                         보기
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
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: window.innerWidth < 480 ? '10px' : '40px' }}
          onClick={() => setSelectedImage(null)}
        >
          <div 
            style={{ position: 'relative', width: '100%', maxWidth: '800px', height: 'fit-content', maxHeight: '95%', background: '#fff', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1rem' }}>견적서 원본</h3>
              <button 
                onClick={() => setSelectedImage(null)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-sub)' }}
              >
                <X size={20} />
              </button>
            </div>
            <div style={{ overflowY: 'auto', flex: 1, padding: '10px', textAlign: 'center' }}>
              <img 
                src={getImageUrl(selectedImage)} 
                alt="Original Quote" 
                style={{ width: '100%', height: 'auto' }} 
              />
            </div>
          </div>
        </div>
      )}

      {/* Decision Guide (Static) */}
      <section className="fade-in" style={{ animationDelay: '0.3s', marginBottom: '60px' }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <div className="glass-panel" style={{ background: '#0071e3', color: '#fff', padding: '24px' }}>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowRightLeft size={20} /> 반납형 전략
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '16px', fontSize: '0.85rem' }}>매달 지출을 최소화하며 신용도 영향을 받지 않는 장기렌트 상품군 추천</p>
          </div>
          <div className="glass-panel" style={{ background: '#f5f5f7', padding: '24px' }}>
             <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} /> 인수형 전략
            </h3>
            <p style={{ color: 'var(--text-sub)', marginBottom: '16px', fontSize: '0.85rem' }}>만기 인수 가격을 낮게 설계하여 저렴한 할부 효과를 누리는 리스 상품군 추천</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
