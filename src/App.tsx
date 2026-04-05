import { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend, LabelList
} from 'recharts';
import { 
  TrendingDown, CheckCircle2,
  Wallet, 
  ArrowRightLeft, Key, X,
  UserCheck, MessageSquare, Gift, Sparkles
} from 'lucide-react';
import { ionicData } from './data';
import type { Quote } from './data';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'all' | '렌트' | '리스'>('all');
  const [activeMileage, setActiveMileage] = useState<10000 | 15000>(15000);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [strategy, setStrategy] = useState<'return' | 'takeover' | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const getTotalCost = (q: Quote) => {
    const baseTotal = q.monthly * 48 + q.residual_value;
    const finBenefit = q.financialBenefit || 0;
    return baseTotal - finBenefit;
  };

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

  const getImageUrl = (path: string) => {
    const base = import.meta.env.BASE_URL;
    return `${base}quotes/${path}`;
  };

  const strategyQuotes = useMemo(() => {
    if (strategy === 'takeover') {
      return [...ionicData.quotes].sort((a, b) => getTotalCost(a) - getTotalCost(b));
    }
    return [...ionicData.quotes].sort((a, b) => a.monthly - b.monthly);
  }, [strategy, getTotalCost]); // Added getTotalCost to deps for safety

  const recommended = strategyQuotes[0];

  return (
    <div className="container" style={{ background: 'var(--bg-color)' }}>
      <header className="fade-in" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(0, 113, 227, 0.1)', color: 'var(--accent)', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '20px' }}>
          <UserCheck size={14} /> IONIC 9 전문 금융 상담 서비스
        </div>
        <h1 style={{ fontSize: window.innerWidth < 480 ? '2.2rem' : '4rem', letterSpacing: '-0.02em', color: '#1d1d1f' }}>아이오닉 9 <span style={{ color: 'var(--accent)' }}>구매 전략 컨설팅</span></h1>
        <p style={{ maxWidth: '750px', margin: '0 auto', fontSize: window.innerWidth < 480 ? '1rem' : '1.2rem', color: '#6e6e73' }}>
          자영업자 전문 상담가로서 각 사별 단독 혜택까지 반영한 최적의 포트폴리오를 제공합니다.
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
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <MessageSquare color={strategy === 'return' ? 'var(--accent)' : 'var(--success)'} size={20} />
              <h2 style={{ marginBottom: 0, fontSize: window.innerWidth < 480 ? '1.2rem' : '1.6rem' }}>사별 단독 혜택 반영 분석 보고</h2>
            </div>
            
            <div className="grid" style={{ alignItems: 'start', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '4px' }}>종합 추천 파트너</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1d1d1f', marginBottom: '20px' }}>
                  {recommended.company} <span style={{ color: strategy === 'return' ? 'var(--accent)' : 'var(--success)' }}>{recommended.type}</span>
                </div>
                
                <div style={{ padding: '16px', background: '#f5f5f7', borderRadius: '16px', marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>{strategy === 'return' ? '월 실질 부담' : '혜택 포함 총 취득가'}</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '4px 0' }}>
                    {strategy === 'return' ? `월 ${formatPrice(recommended.monthly)}원` : `${formatPrice(Math.round(getTotalCost(recommended)/10000))}만원`}
                  </div>
                </div>

                {recommended.benefits && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Gift size={16} color="var(--accent)" /> 단독 혜택 리스트
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {recommended.benefits.map((b: string, i: number) => (
                        <span key={i} style={{ background: 'rgba(0,113,227,0.05)', color: 'var(--accent)', padding: '4px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 600 }}>{b}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div style={{ background: '#f5f5f7', padding: '24px', borderRadius: '20px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} color="#ff9500" /> 전략 및 혜택 분석
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem' }}>
                  <li style={{ marginBottom: '12px', display: 'flex', gap: '10px' }}>
                    <CheckCircle2 size={16} color={strategy === 'return' ? 'var(--accent)' : 'var(--success)'} style={{ flexShrink: 0 }} />
                    <div>
                      {recommended.company === 'RS 컴퍼니' ? 
                        '버텍스 900 썬팅 업그레이드 등 약 150만원 상당의 프리미엄 신차 패키지가 제공되어 반납 시에도 가장 쾌적한 운행이 가능합니다.' :
                        recommended.company.includes('에이원') ?
                        '첫 달 렌트료 전액 지원으로 초기 비용 부담을 획기적으로 낮췄습니다. 실질적인 현금 혜택이 가장 큽니다.' :
                        '사후 관리 및 승계 지원 혜택이 우수하여 장기적인 운용 안정성이 높습니다.'}
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '10px' }}>
                    <CheckCircle2 size={16} color={strategy === 'return' ? 'var(--accent)' : 'var(--success)'} style={{ flexShrink: 0 }} />
                    <div>{strategy === 'return' ? '월 지출 증빙을 통한 최고 수준의 절세 효율을 보장합니다.' : '금융 혜택과 잔존가치 설계를 종합했을 때 가장 합리적인 인수 조건입니다.'}</div>
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
          <h2 style={{ fontSize: '1.2rem' }}>핵심 지표 및 혜택 비교</h2>
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

        <div className="glass-panel" style={{ background: '#fff', marginTop: '24px', padding: '0', overflow: 'hidden' }}>
          {/* Desktop Table View */}
          <div className="desktop-only" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f5f5f7' }}>
                  <th style={{ textAlign: 'left', padding: '20px' }}>금융사 / 방식</th>
                  <th style={{ textAlign: 'left', padding: '20px' }}>월 납입금</th>
                  <th style={{ textAlign: 'left', padding: '20px' }}>주요 단독 혜택</th>
                  <th style={{ textAlign: 'center', padding: '20px' }}>증빙</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.map((q: Quote, idx: number) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f5f5f7' }}>
                    <td style={{ padding: '20px' }}>
                      <div style={{ fontWeight: 700, fontSize: '1rem' }}>{q.company}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginTop: '4px' }}>
                        {q.type} | {q.mileage}km | {q.term}개월
                      </div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div className="price" style={{ color: idx === 0 ? 'var(--accent)' : 'inherit', fontSize: '1.2rem', fontWeight: 800 }}>
                        {formatPrice(q.monthly)}원
                      </div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {q.benefits?.map((b: string, i: number) => (
                          <span key={i} style={{ padding: '4px 10px', background: 'rgba(0,113,227,0.05)', borderRadius: '8px', fontSize: '0.75rem', color: 'var(--accent)', border: '1px solid rgba(0,113,227,0.1)' }}>{b}</span>
                        )) || <span style={{ color: '#ccc', fontSize: '0.8rem' }}>-</span>}
                      </div>
                    </td>
                    <td style={{ padding: '20px', textAlign: 'center' }}>
                      <button 
                        onClick={() => setSelectedImage(q.imagePath)}
                        style={{ border: 'none', background: '#f5f5f7', color: '#1d1d1f', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
                      >
                         원본 확인
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View */}
          <div className="mobile-only" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredQuotes.map((q: Quote, idx: number) => (
              <div 
                key={idx} 
                style={{ 
                  background: '#f9f9fb', 
                  borderRadius: '20px', 
                  padding: '16px', 
                  border: idx === 0 ? '1px solid var(--accent)' : '1px solid #eee',
                  boxShadow: idx === 0 ? '0 4px 12px rgba(0, 113, 227, 0.1)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1d1d1f' }}>{q.company}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginTop: '4px' }}>{q.type} • {q.mileage}km • {q.term}개월</div>
                  </div>
                  <button 
                    onClick={() => setSelectedImage(q.imagePath)}
                    style={{ background: '#fff', color: 'var(--accent)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, border: '1px solid #e0e0e0' }}
                  >
                    원본
                  </button>
                </div>
                
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)', marginBottom: '2px' }}>월 납입금</div>
                  <div style={{ color: idx === 0 ? 'var(--accent)' : '#1d1d1f', fontSize: '1.4rem', fontWeight: 800 }}>
                    {formatPrice(q.monthly)}<span style={{ fontSize: '1rem', fontWeight: 600 }}>원</span>
                  </div>
                </div>

                {q.benefits && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {q.benefits.slice(0, 3).map((b: string, i: number) => (
                      <span key={i} style={{ padding: '4px 8px', background: '#fff', borderRadius: '6px', fontSize: '0.65rem', color: '#6e6e73', border: '1px solid #e0e0e0' }}>{b}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
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
    </div>
  );
}

export default App;
