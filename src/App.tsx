import { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend, LabelList
} from 'recharts';
import { 
  TrendingDown, CheckCircle2,
  Wallet, ShieldCheck, 
  ArrowRightLeft, Key, Image as ImageIcon, X,
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
        name: q.company.split(' ')[0], // Shorten name
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
      <header className="fade-in" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(0, 113, 227, 0.1)', color: 'var(--accent)', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '20px' }}>
          <UserCheck size={14} /> IONIC 9 전문 금융 상담 서비스
        </div>
        <h1 style={{ fontSize: '4rem', letterSpacing: '-0.02em', color: '#1d1d1f' }}>아이오닉 9 <span style={{ color: 'var(--accent)' }}>구매 전략 컨설팅</span></h1>
        <p style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.2rem', color: '#6e6e73' }}>
          자영업자 전문 상담가로서 귀하의 상황에 맞는 최적의 포트폴리오를 제공합니다.<br/>
          원하시는 퇴거 전략을 선택해 주세요.
        </p>

        {/* Strategy Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setStrategy('return')}
            className={`fade-in ${strategy === 'return' ? 'active' : ''}`}
            style={{ 
              padding: '24px 40px', borderRadius: '24px', border: strategy === 'return' ? '3px solid var(--accent)' : '1px solid #e0e0e0',
              background: strategy === 'return' ? 'rgba(0, 113, 227, 0.05)' : '#fff',
              cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '320px'
            }}
          >
            <ArrowRightLeft size={32} color={strategy === 'return' ? 'var(--accent)' : '#6e6e73'} />
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1d1d1f' }}>만기 시 반납 전략</div>
              <div style={{ fontSize: '0.85rem', color: '#6e6e73', marginTop: '4px' }}>매달 지출 비용 최소화 (반납 기반)</div>
            </div>
          </button>
          
          <button 
            onClick={() => setStrategy('takeover')}
            className={`fade-in ${strategy === 'takeover' ? 'active' : ''}`}
            style={{ 
              padding: '24px 40px', borderRadius: '24px', border: strategy === 'takeover' ? '3px solid var(--success)' : '1px solid #e0e0e0',
              background: strategy === 'takeover' ? 'rgba(40, 205, 65, 0.05)' : '#fff',
              cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '320px'
            }}
          >
            <Key size={32} color={strategy === 'takeover' ? 'var(--success)' : '#6e6e73'} />
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1d1d1f' }}>만기 시 인수 전략</div>
              <div style={{ fontSize: '0.85rem', color: '#6e6e73', marginTop: '4px' }}>최종 내 차로 소유 (인수 기반)</div>
            </div>
          </button>
        </div>
      </header>

      {/* Expert Analysis Report */}
      {strategy && (
        <section className="fade-in" style={{ marginBottom: '80px' }}>
          <div className="glass-panel" style={{ background: '#fff', border: `2px solid ${strategy === 'return' ? 'var(--accent)' : 'var(--success)'}`, padding: '40px', borderRadius: '32px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <MessageSquare color={strategy === 'return' ? 'var(--accent)' : 'var(--success)'} />
              <h2 style={{ marginBottom: 0 }}>전문 상담가 추천 결과 보고</h2>
            </div>
            
            <div className="grid" style={{ alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-sub)', marginBottom: '8px' }}>최적의 금융 파트너</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1d1d1f', marginBottom: '24px' }}>
                  {recommended.company} <span style={{ color: strategy === 'return' ? 'var(--accent)' : 'var(--success)' }}>{recommended.type}</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ padding: '20px', background: '#f5f5f7', borderRadius: '16px' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>핵심 목표: {strategy === 'return' ? '지출 세액 공제 극대화' : '총 취득 원가 절감'}</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, margin: '8px 0' }}>
                      {strategy === 'return' ? `월 ${formatPrice(recommended.monthly)}원` : `${formatPrice(Math.round((recommended.monthly * 48 + recommended.residual_value)/10000))}만원`}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                      {strategy === 'return' ? '* 보험료/자동차세 포함 실질 지불 비용' : '* 4년 대여료 + 잔존가치 합계 (취득세 별도)'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ background: '#f5f5f7', padding: '32px', borderRadius: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lightbulb size={20} color="#ff9500" /> 맞춤형 컨설팅 포인트
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  <li style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
                    <CheckCircle2 size={20} color={strategy === 'return' ? 'var(--accent)' : 'var(--success)'} style={{ flexShrink: 0 }} />
                    {strategy === 'return' ? 
                      '연간 1,500만원 비용 처리 한도에 최적화된 상품입니다. 부가세 환급까지 고려할 때 가장 높은 절세 효과를 누릴 수 있습니다.' : 
                      '잔존 가치를 낮게 잡아 만기 시 인수 금액의 부담을 최소화했습니다. 시중 금리 대비 가장 경쟁력 있는 총 취득 가격입니다.'}
                  </li>
                  <li style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
                    <CheckCircle2 size={20} color={strategy === 'return' ? 'var(--accent)' : 'var(--success)'} style={{ flexShrink: 0 }} />
                    {strategy === 'return' ? 
                      '대출 한도에 영향을 주지 않아 향후 다른 사업 자금 운용 시 유리하며, 사고 시 보험 할증이 없어 관리가 편합니다.' : 
                      '보험 경력을 유지하기 좋은 상품 구성입니다. 장기 무사고 경력이 있으시다면 리스 상품이 더욱 유리할 수 있습니다.'}
                  </li>
                  <li style={{ display: 'flex', gap: '12px' }}>
                    <CheckCircle2 size={20} color={strategy === 'return' ? 'var(--accent)' : 'var(--success)'} style={{ flexShrink: 0 }} />
                    {strategy === 'return' ? 
                      'RS 컴퍼니의 렌트 상품은 타사 대비 월 납입금이 매우 경쟁력 있어, 반납을 전제로 한 구매에서 가장 유리합니다.' : 
                      '메리츠 리스 상품은 총 취득 비용 면에서 압도적인 효율을 자랑합니다. 영구 소유를 위한 최고의 파이낸싱입니다.'}
                  </li>
                </ul>
              </div>
            </div>
            <div style={{ marginTop: '32px', textAlign: 'center' }}>
              <button 
                onClick={() => {
                  const targetSection = document.getElementById('comparison-table');
                  targetSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{ background: strategy === 'return' ? 'var(--accent)' : 'var(--success)', border: 'none', color: '#fff', padding: '16px 32px', borderRadius: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
              >
                상세 견적 리스트 보기
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Hero Stats (Monthly, Deposit, Residual) */}
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
            <p style={{ fontSize: '0.9rem', marginTop: '8px' }}>{bestQuote?.company} - {bestQuote?.type}</p>
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
      <section id="comparison-table" className="fade-in" style={{ animationDelay: '0.2s', marginBottom: '80px' }}>
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
              <Bar dataKey="monthly" name="월 납입금 (x10k)" fill="var(--accent)" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="monthly" position="top" style={{ fontSize: '10px', fill: 'var(--accent)', fontWeight: 700 }} />
              </Bar>
              <Bar dataKey="deposit" name="보증금" fill="#ff9500" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="deposit" position="top" style={{ fontSize: '10px', fill: '#ff9500', fontWeight: 700 }} />
              </Bar>
              <Bar dataKey="residual" name="만기 인수금" fill="#28cd41" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="residual" position="top" style={{ fontSize: '10px', fill: '#28cd41', fontWeight: 700 }} />
              </Bar>
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

      {/* Decision Guide (Static) */}
      <section className="fade-in" style={{ animationDelay: '0.3s', marginBottom: '100px' }}>
        <div className="grid">
          <div className="glass-panel" style={{ background: '#0071e3', color: '#fff' }}>
            <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowRightLeft /> 반납 장기렌트 전략
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '24px' }}>차량을 4년만 타고 교체하신다면, **월 납입금이 가장 낮은 견적**이 무조건 유리합니다.</p>
            <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
              <li>부가세 환급 및 전액 경비처리 용이</li>
              <li>대출 한도 미영양 (신용도 관리)</li>
              <li>RS 컴퍼니 / 에이원 상품군 추천</li>
            </ul>
          </div>
          <div className="glass-panel" style={{ background: '#f5f5f7' }}>
             <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck /> 만기 인수 리스 전략
            </h3>
            <p style={{ color: 'var(--text-sub)', marginBottom: '24px' }}>영구 소유를 원하신다면 만기 시 지불할 **총 인수 비용**을 최소화하는 전략이 필요합니다.</p>
            <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-sub)' }}>
              <li>낮은 잔존가치로 총 이자 절감</li>
              <li>보험 경력 유지 가능 (무사고 시 유리)</li>
              <li>메리츠 리스 상품군 강력 추천</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
