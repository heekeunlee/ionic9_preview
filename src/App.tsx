import { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell
} from 'recharts';
import { 
  TrendingDown, CheckCircle2, HelpCircle, 
  Wallet, ShieldCheck, FileText 
} from 'lucide-react';
import { ionicData } from './data';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'all' | '렌트' | '리스'>('all');
  const [activeMileage, setActiveMileage] = useState<10000 | 15000>(15000);

  const filteredQuotes = useMemo(() => {
    return ionicData.quotes.filter(q => {
      if (activeTab !== 'all' && q.type !== activeTab) return false;
      if (q.mileage !== activeMileage && q.type === '렌트' && ionicData.quotes.some(o => o.company === q.company && o.mileage === activeMileage)) return false;
      return true;
    }).sort((a, b) => a.monthly - b.monthly);
  }, [activeTab, activeMileage]);

  const chartData = useMemo(() => {
    return filteredQuotes.map(q => ({
      name: q.company,
      monthly: q.monthly / 10000,
      type: q.type
    }));
  }, [filteredQuotes]);

  const bestQuote = filteredQuotes[0];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <div className="container">
      <header className="fade-in">
        <p style={{ color: 'var(--accent)', fontWeight: 700, letterSpacing: '2px', fontSize: '0.9rem' }}>ELECTRIC LUXURY SUV</p>
        <h1>IONIC 9 <span style={{ fontWeight: 200, color: 'var(--text-sub)' }}>QUOTE ANALYSIS</span></h1>
        <p style={{ maxWidth: '600px', marginBottom: '40px' }}>
          자영업자 세금 공제 혜택(연 1,500만원)을 극대화하기 위한 아이오닉 9 리스/렌트 견적 비교 분석 결과입니다. 
          각 업체별 실납입금액과 혜택을 기반으로 최적의 의사결정을 도와드립니다.
        </p>
      </header>

      {/* Summary Recommendations */}
      <section className="fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="grid">
          <div className="glass-panel" style={{ borderLeft: '4px solid var(--success)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <TrendingDown color="var(--success)" />
              <h2 style={{ marginBottom: 0 }}>최적 견적 추천</h2>
            </div>
            <div style={{ marginTop: '20px' }}>
              <p style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 700 }}>
                {bestQuote?.company} - {bestQuote?.type}
              </p>
              <div style={{ padding: '20px', background: 'rgba(50, 215, 75, 0.1)', borderRadius: '12px', marginTop: '16px' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>월 실납입금 (부가세 포함)</div>
                <div className="price" style={{ fontSize: '2rem', color: 'var(--success)' }}>
                  {formatPrice(bestQuote?.monthly)}<span className="unit">원</span>
                </div>
              </div>
              <ul style={{ listStyle: 'none', marginTop: '16px', color: 'var(--text-sub)', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <CheckCircle2 size={16} color="var(--success)" /> 보험료, 자동차세 모두 포함
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <CheckCircle2 size={16} color="var(--success)" /> 연 1,500만원 전액 경비 처리 가능 범위
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--success)" /> 개인 신용 한도 미영향 (렌트 기준)
                </li>
              </ul>
            </div>
          </div>

          <div className="glass-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <ShieldCheck color="var(--accent)" />
              <h2 style={{ marginBottom: 0 }}>차량 상세 구성</h2>
            </div>
            <div style={{ marginTop: '20px' }}>
              <p style={{ color: '#fff', fontWeight: 600 }}>아이오닉 9 항속형 2WD 6인승</p>
              <p style={{ fontSize: '0.85rem' }}>프레스티지 (19인치/세레니티 화이트)</p>
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {ionicData.price_info.options.map(opt => (
                  <div key={opt.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span>{opt.name}</span>
                    <span style={{ color: 'var(--text-main)' }}>+{formatPrice(opt.price)}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700 }}>총 차량 가액</span>
                <span className="price" style={{ color: 'var(--accent)' }}>{formatPrice(ionicData.price_info.total_price)}원</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparisons */}
      <section className="fade-in" style={{ animationDelay: '0.2s', marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <h2>월 납입 금액 비교</h2>
            <p>단위: 만원</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
             <div className="tab-nav" style={{ marginBottom: 0 }}>
              <button className={`tab-btn ${activeMileage === 10000 ? 'active' : ''}`} onClick={() => setActiveMileage(10000)}>연 1만km</button>
              <button className={`tab-btn ${activeMileage === 15000 ? 'active' : ''}`} onClick={() => setActiveMileage(15000)}>연 1.5만km</button>
            </div>
            <div className="tab-nav" style={{ marginBottom: 0 }}>
              <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>전체</button>
              <button className={`tab-btn ${activeTab === '렌트' ? 'active' : ''}`} onClick={() => setActiveTab('렌트')}>렌트</button>
              <button className={`tab-btn ${activeTab === '리스' ? 'active' : ''}`} onClick={() => setActiveTab('리스')}>리스</button>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-sub)" />
              <YAxis stroke="var(--text-sub)" />
              <Tooltip 
                contentStyle={{ background: '#1c1c1e', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              />
              <Bar dataKey="monthly" name="월 납입금" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.type === '렌트' ? 'var(--accent)' : 'var(--accent-light)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel table-container">
          <table>
            <thead>
              <tr>
                <th>금융사</th>
                <th>방식</th>
                <th>주행거리</th>
                <th>보증금</th>
                <th>월 납입금</th>
                <th>세금/보험</th>
                <th>특이사항</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((q, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{q.company}</td>
                  <td><span className={`badge ${q.type === '렌트' ? 'badge-mid' : 'badge-low'}`}>{q.type}</span></td>
                  <td style={{ color: 'var(--text-sub)' }}>{q.mileage / 10000}만km</td>
                  <td>{formatPrice(q.deposit)}<span className="unit">원</span></td>
                  <td className="price" style={{ color: idx === 0 ? 'var(--success)' : 'var(--text-main)' }}>
                    {formatPrice(q.monthly)}<span className="unit">원</span>
                  </td>
                  <td>{q.includes_tax_ins ? <CheckCircle2 size={16} color="var(--success)" /> : <span style={{ color: '#ff453a' }}>별도</span>}</td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>{q.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Guide Section */}
      <section className="fade-in" style={{ animationDelay: '0.3s', marginTop: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <HelpCircle color="var(--accent)" />
          <h2>리스 vs 장기렌트, 무엇이 유리할까?</h2>
        </div>
        <div className="grid">
          <div className="glass-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <ShieldCheck size={20} color="var(--accent)" />
              <h3 style={{ fontSize: '1.1rem' }}>장기렌트의 강점</h3>
            </div>
            <p style={{ fontSize: '0.9rem', marginBottom: '12px' }}>
              현대 아이오닉 9은 고가의 대형 전기차로, 초기 비용과 보험료 부담이 큽니다.
            </p>
            <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-sub)' }}>
              <li style={{ marginBottom: '8px' }}>대출로 잡히지 않아 <b>건보료 상승이나 신용한도 하락이 없음</b></li>
              <li style={{ marginBottom: '8px' }}>사고 시에도 할증이 없고 렌트사 보험으로 처리되어 유리</li>
              <li style={{ marginBottom: '8px' }}>부가세 환급 및 매달 계산서 발행으로 회계처리가 매우 간편</li>
            </ul>
          </div>
          <div className="glass-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Wallet size={20} color="var(--accent-light)" />
              <h3 style={{ fontSize: '1.1rem' }}>리스의 특징</h3>
            </div>
            <p style={{ fontSize: '0.9rem', marginBottom: '12px' }}>
              일반 번호판을 선호하거나 장기간 무사고로 보험료가 매우 낮은 경우 고려합니다.
            </p>
            <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-sub)' }}>
              <li style={{ marginBottom: '8px' }}><b>일반 번호판 사용</b> 가능 (허, 하, 호 아님)</li>
              <li style={{ marginBottom: '8px' }}>보험 경력을 유지할 수 있음 (무사고 시 유리)</li>
              <li style={{ marginBottom: '8px' }}>금융 부채로 인식되어 신용 한도에 영향을 줄 수 있음</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final Decision */}
      <section className="fade-in" style={{ animationDelay: '0.4s', marginTop: '60px', marginBottom: '80px' }}>
        <div className="glass-panel" style={{ background: 'linear-gradient(135deg, rgba(46, 98, 255, 0.1) 0%, rgba(50, 215, 75, 0.05) 100%)', textAlign: 'center', padding: '60px 40px' }}>
          <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '50%', background: 'var(--accent)', marginBottom: '24px' }}>
            <FileText color="#fff" size={32} />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>최종 결정 가이드</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', maxWidth: '700px', margin: '0 auto 32px' }}>
            연간 1,500만원까지 비용 처리가 가능한 사업자라면, 보험료와 세금을 모두 포함해도 월 100만원 이하로 이용 가능한 
            <span style={{ color: 'var(--accent)', fontWeight: 800 }}> RS 컴퍼니 장기렌트</span>를 추천합니다.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ padding: '16px 32px', borderRadius: '12px', border: '1px solid var(--accent)', color: 'var(--accent)', fontWeight: 600 }}>
              RS 컴퍼니 견적 요청
            </div>
            <div style={{ padding: '16px 32px', borderRadius: '12px', background: 'var(--accent)', color: '#fff', fontWeight: 600 }}>
               상담 예약하기
            </div>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '40px 0', borderTop: '1px solid var(--glass-border)', color: 'var(--text-sub)', fontSize: '0.8rem' }}>
        <p>© 2026 Ionic 9 Insight - 사업자 전용 자동차 금융 비교 도구</p>
        <p style={{ marginTop: '8px' }}>본 분석은 제공하신 4개 업체 견적서(RS, 에이원, 나비드, 메리츠)를 기반으로 작성되었습니다.</p>
      </footer>
    </div>
  );
}

export default App;
