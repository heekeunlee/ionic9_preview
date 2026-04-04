export interface Quote {
  company: string;
  type: '렌트' | '리스';
  term: number;
  mileage: number;
  deposit: number;
  monthly: number;
  includes_tax_ins: boolean;
  residual_value: number;
  note: string;
}

export const ionicData = {
  price_info: {
    base_price: 77670000,
    options: [
      { name: "파노라마 선루프", price: 1190000 },
      { name: "빌트인 캠 2", price: 590000 },
      { name: "컴포트 플러스", price: 630000 },
      { name: "2열 프리미엄 릴렉션 시트", price: 1000000 }
    ],
    total_price: 81180000
  },
  quotes: [
    {
      company: "RS 컴퍼니",
      type: "렌트",
      term: 48,
      mileage: 10000,
      deposit: 23865000,
      monthly: 904500,
      includes_tax_ins: true,
      residual_value: 42957000,
      note: "최저가 (10k)"
    },
    {
      company: "RS 컴퍼니",
      type: "렌트",
      term: 48,
      mileage: 15000,
      deposit: 23865000,
      monthly: 926800,
      includes_tax_ins: true,
      residual_value: 41763750,
      note: "최저가 (15k)"
    },
    {
      company: "에이원 (A1 Auto)",
      type: "렌트",
      term: 48,
      mileage: 15000,
      deposit: 24500000,
      monthly: 924000,
      includes_tax_ins: true,
      residual_value: 42619500,
      note: "안정성 우수"
    },
    {
      company: "나비드",
      type: "렌트",
      term: 48,
      mileage: 10000,
      deposit: 24354000,
      monthly: 923900,
      includes_tax_ins: true,
      residual_value: 43837200,
      note: "표준 견적"
    },
    {
      company: "나비드",
      type: "렌트",
      term: 48,
      mileage: 15000,
      deposit: 24354000,
      monthly: 946600,
      includes_tax_ins: true,
      residual_value: 42619500,
      note: "표준 견적"
    },
    {
      company: "메리츠",
      type: "렌트",
      term: 48,
      mileage: 10000,
      deposit: 24165000,
      monthly: 996710,
      includes_tax_ins: true,
      residual_value: 41081000,
      note: "안전 위주"
    },
    {
      company: "메리츠",
      type: "렌트",
      term: 48,
      mileage: 15000,
      deposit: 24165000,
      monthly: 1011670,
      includes_tax_ins: true,
      residual_value: 40275000,
      note: "안전 위주"
    },
    {
      company: "리스 (메리츠/RS 등)",
      type: "리스",
      term: 48,
      mileage: 15000,
      deposit: 22500000,
      monthly: 941000,
      includes_tax_ins: false,
      residual_value: 38000000,
      note: "자동차세/보험료 별도 납부"
    }
  ] as Quote[]
};
