import { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell
} from 'recharts';
import { 
  TrendingDown, CheckCircle2, HelpCircle, 
  Wallet, ShieldCheck, AlertCircle, 
  ChevronRight, Award, Coins
} from 'lucide-react';
import { ionicData } from './data';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'all' | '렌트' | '리스'>('all');
  const [activeMileage, setActiveMileage] = useState<10000 | 15000>(15000);

  const filteredQuotes = useMemo(() => {
    return ionicData.quotes.filter(q => {
      if (activeTab !== 'all' && q.type !== activeTab) return false;
      // Filter by mileage only for rent (since lease data might be fewer)
      if (q.type === '렌트' && q.mileage !== activeMileage) return false;
      return true;
    }).sort((a, b) => a.monthly - b.monthly);
  }, [activeTab, activeMileage]);

  const bestQuote = filteredQuotes[0];

  const chartData = useMemo(() => {
    return filteredQuotes.map(q => {
      const diffFromBest = q.monthly - bestQuote.monthly;
      const totalCost48 = q.monthly * 48 / 10000; // in 10k units
      return {
        name: q.company,
        monthly: q.monthly / 10000, // Monthly payment in 10k
        diff: diffFromBest / 10000, // Difference from best in 10k
        total48: totalCost48, // 48 months total in 10k
        type: q.type
      };
    });
  }, [filteredQuotes, bestQuote]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <div className="container" style={{ background: 'var(--bg-color)' }}>
      <header className="fade-in" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(0, 113, 227, 0.1)', color: 'var(--accent)', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '20px' }}>
          <Coins size={14} /> IONIC 9 PRESTIGE QUOTE ANALYSIS
        </div>
        <h1 style={{ fontSize: '4rem', letterSpacing: '-0.02em', color: '#1d1d1f' }}>아이오닉 9 <span style={{ color: 'var(--accent)' }}>구매 가이드</span></h1>
        <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', color: '#6e6e73' }}>
          자영업자 세금 공제 혜택(연 1,500만원)을 극대화하는 가장 효율적인 방법을 분석했습니다. 
          각 업체별 실질적 비용 차이를 데이터로 확인하세요.
        </p>
      </header>

      {/* Top Recommendations */}
      <section className="fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="grid" style={{ marginBottom: '40px' }}>
          <div className="glass-panel" style={{ background: '#fff', border: '1px solid #0071e3', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--accent)', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>최적가 추천</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ padding: '10px', background: 'rgba(0, 113, 227, 0.1)', borderRadius: '12px' }}>
                <TrendingDown color="var(--accent)" />
              </div>
              <h2 style={{ marginBottom: 0, fontSize: '1.4rem' }}>최적의 금융조건</h2>
            </div>
            <p style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px' }}>
              {bestQuote?.company} <span style={{ color: 'var(--accent)' }}>{bestQuote?.type}</span>
            </p>
            <div style={{ padding: '24px', background: '#f5f5f7', borderRadius: '16px', marginTop: '16px' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>월 실납입금 (부가세 포함)</div>
              <div className="price" style={{ fontSize: '2.5rem', color: 'var(--text-main)', margin: '8px 0' }}>
                {formatPrice(bestQuote?.monthly)}<span className="unit">원</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600 }}>
                <CheckCircle2 size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> 자영업자 비용처리 최적 구간 (연 1,500만원 내외)
              </p>
            </div>
            <ul style={{ listStyle: 'none', marginTop: '20px', color: 'var(--text-sub)', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}><Award size={16} color="var(--accent)" /> 동일 모델 대비 최저가 수준</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}><ShieldCheck size={16} color="var(--accent)" /> 보험료 및 자동차세 완비</li>
            </ul>
          </div>

          <div className="glass-panel" style={{ background: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ padding: '10px', background: 'rgba(50, 205, 153, 0.1)', borderRadius: '12px' }}>
                <AlertCircle color="#28cd41" />
              </div>
              <h2 style={{ marginBottom: 0, fontSize: '1.4rem' }}>48개월 총 비용 분석</h2>
            </div>
            <p style={{ marginBottom: '20px' }}>단기 납입금 차이가 장기적으로 만드는 금액입니다.</p>
            <div className="price" style={{ fontSize: '2rem', marginBottom: '24px' }}>
              {formatPrice(bestQuote?.monthly * 48 / 10000)}<span className="unit">만원</span>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-sub)', fontWeight: 400 }}>총 납입 예상 총액</div>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
              <div style={{ padding: '12px', border: '1px solid #e0e0e0', borderRadius: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem' }}>차량 잔존가치 예상</span>
                <span style={{ fontWeight: 700 }}>약 {formatPrice(bestQuote?.residual_value / 10000)}만원</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                * 만기 시 인수 여부에 따라 총 비용은 달라질 수 있습니다. 반납 시 위 총액만 납부하면 됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Visual Comparison */}
      <section className="fade-in" style={{ animationDelay: '0.2s', marginTop: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h2 style={{ marginBottom: '8px' }}>가격 경쟁력 분석</h2>
            <p>시중 견적 중 월별 실납입 비용 차이 (최저가 대비 초과액)</p>
          </div>
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

        <div className="grid" style={{ marginBottom: '40px' }}>
          <div className="glass-panel" style={{ height: '450px', background: '#fff', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '24px', textAlign: 'center', color: 'var(--text-sub)' }}>금융사별 월 납입금 (차이 강조)</h3>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} domain={['dataMin - 5', 'auto']} hide />
                <Tooltip 
                  cursor={{ fill: '#f5f5f7' }}
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      const data = payload[0].payload;
                      const isBest = data.name === bestQuote.company;
                      return (
                        <div style={{ background: '#fff', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                          <p style={{ fontWeight: 800, marginBottom: '8px' }}>{data.name}</p>
                          <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>월 {formatPrice(data.monthly * 10000)}원</p>
                          {!isBest && <p style={{ color: '#ff453a', fontSize: '0.85rem' }}>최적가보다 월 {formatPrice(data.diff * 10000)}원 비쌈</p>}
                          {isBest && <p style={{ color: 'var(--success)', fontSize: '0.85rem' }}>가장 합리적인 견적</p>}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="monthly" radius={[8, 8, 0, 0]} barSize={50}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === bestQuote.company ? 'var(--accent)' : '#e0e0e0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-panel" style={{ height: '450px', background: '#fff', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '24px', textAlign: 'center', color: 'var(--text-sub)' }}>48개월 이용 총액 비교 (만 원)</h3>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis hide domain={['dataMin - 100', 'auto']} />
                <Tooltip cursor={{ fill: '#f5f5f7' }} />
                <Bar dataKey="total48" name="48개월 총액" radius={[8, 8, 0, 0]} barSize={50}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === bestQuote.company ? 'var(--accent)' : '#d2d2d7'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel table-container" style={{ background: '#fff', border: '1px solid #e0e0e0' }}>
          <table>
            <thead>
              <tr>
                <th>금융사</th>
                <th>방식</th>
                <th>보증금</th>
                <th>월 납입금</th>
                <th>월 차이</th>
                <th>세금/보험</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((q, idx) => {
                const isBest = q.company === bestQuote.company;
                const diff = (q.monthly - bestQuote.monthly);
                return (
                  <tr key={idx} style={{ background: isBest ? 'rgba(0, 113, 227, 0.03)' : 'transparent' }}>
                    <td style={{ fontWeight: 600 }}>{q.company}</td>
                    <td><span className={`badge ${q.type === '렌트' ? 'badge-mid' : 'badge-low'}`}>{q.type}</span></td>
                    <td>{formatPrice(q.deposit)}<span className="unit">원</span></td>
                    <td className="price" style={{ color: isBest ? 'var(--accent)' : 'var(--text-main)', fontSize: '1.2rem' }}>
                      {formatPrice(q.monthly)}<span className="unit">원</span>
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>
                      {diff > 0 ? (
                        <span style={{ color: '#ff453a' }}>+{formatPrice(diff)}원</span>
                      ) : (
                        <span style={{ color: 'var(--success)', fontWeight: 700 }}>BEST</span>
                      )}
                    </td>
                    <td>{q.includes_tax_ins ? <CheckCircle2 size={16} color="var(--success)" /> : <AlertCircle size={16} color="#ff9500" />}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button style={{ border: 'none', background: 'transparent', color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                        자세히 <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Guide Section */}
      <section className="fade-in" style={{ animationDelay: '0.3s', marginTop: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.5rem' }}>사업자 필독 가이드</h2>
          <p>내 상황에 맞는 최적의 구매 방식 결정하기</p>
        </div>
        <div className="grid">
          <div className="glass-panel" style={{ background: '#f5f5f7', border: 'none' }}>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={24} color="var(--success)" />
              <h3 style={{ fontSize: '1.4rem' }}>왜 "장기렌트"인가?</h3>
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
                <span style={{ background: '#fff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, flexShrink: 0 }}>1</span>
                <div>
                  <p style={{ color: 'var(--text-main)', fontWeight: 600 }}>세금 공제 효율 극대화</p>
                  <p style={{ fontSize: '0.85rem' }}>연간 1,500만원 경비 처리가 가장 깔끔하게 적용됩니다.</p>
                </div>
              </li>
              <li style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
                <span style={{ background: '#fff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, flexShrink: 0 }}>2</span>
                <div>
                  <p style={{ color: 'var(--text-main)', fontWeight: 600 }}>건보료 및 신용도 영향 無</p>
                  <p style={{ fontSize: '0.85rem' }}>금융 부채로 잡히지 않아 대출 한도 관리에 유리합니다.</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '12px' }}>
                <span style={{ background: '#fff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, flexShrink: 0 }}>3</span>
                <div>
                  <p style={{ color: 'var(--text-main)', fontWeight: 600 }}>사고 시 할증 부담 제로</p>
                  <p style={{ fontSize: '0.85rem' }}>전기차는 수리비가 비싸지만, 렌트사 보험으로 할증 걱정이 없습니다.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="glass-panel" style={{ background: '#f5f5f7', border: 'none' }}>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Wallet size={24} color="var(--accent)" />
              <h3 style={{ fontSize: '1.4rem' }}>"리스" 전략적 선택</h3>
            </div>
            <p style={{ fontSize: '0.9rem', marginBottom: '16px' }}>일반 번호판을 사용해야 하거나, 무사고 경력이 10년 이상인 경우 유리할 수 있습니다.</p>
            <div style={{ padding: '16px', background: '#fff', borderRadius: '12px', border: '1px dashed var(--glass-border)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HelpCircle size={14} /> 리스는 자동차세와 보험료가 별도인 경우가 많습니다. 표기된 월 납입금에 <b>약 10~15만원 정도를 더해야</b> 실제 렌트 비용과 비교가 가능합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Call Action */}
      <section className="fade-in" style={{ animationDelay: '0.4s', marginTop: '100px', marginBottom: '100px', textAlign: 'center' }}>
        <div style={{ background: 'var(--accent)', padding: '60px', borderRadius: '32px', color: '#fff' }}>
          <h2 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '16px' }}>결정을 내리셨나요?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '40px' }}>
            현재 가장 저렴한 <b>RS 컴퍼니 렌트</b> 견적은 재고 상황에 따라 빠르게 소진될 수 있습니다.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button style={{ padding: '18px 40px', borderRadius: '14px', border: 'none', background: '#fff', color: 'var(--accent)', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>견적 상세 파일 받기</button>
            <button style={{ padding: '18px 40px', borderRadius: '14px', border: '1px solid #fff', background: 'transparent', color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>영업 담당자 문의</button>
          </div>
        </div>
        <p style={{ marginTop: '40px', color: 'var(--text-sub)', fontSize: '0.85rem' }}>
          * 본 시뮬레이션은 2026년 4월 기준 견적서를 바탕으로 하며, 개인의 신용등급 및 할인 조건에 따라 달라질 수 있습니다.
        </p>
      </section>
    </div>
  );
}

export default App;
