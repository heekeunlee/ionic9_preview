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
  imagePath: string;
  benefits?: string[];
  financialBenefit?: number; // One-time support, etc.
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
      note: "최적가 (10k)",
      imagePath: "RS컴퍼니_렌트견적.png",
      benefits: ["버텍스 900 썬팅 업그레이드", "세라믹 유리막 코팅", "PPF 2종 (도어컵/엣지)", "코일매트 1/2열", "즉시출고 (4월말)"]
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
      note: "최적가 (15k)",
      imagePath: "RS컴퍼니_렌트견적.png",
      benefits: ["버텍스 900 썬팅 업그레이드", "세라믹 유리막 코팅", "PPF 2종 (도어컵/엣지)", "코일매트 1/2열", "즉시출고 (4월말)"]
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
      note: "안정성 우수",
      imagePath: "에니원_렌트견적.png",
      financialBenefit: 924000, // 1회차 렌트료 지원
      benefits: ["첫 1회차 렌트료 선지원", "프리미엄 썬팅+유리막", "대물보험 3억"]
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
      note: "표준 견적",
      imagePath: "나비드_렌트견적.png",
      benefits: ["차량 용품작업 (썬팅 등)", "중고차 매입/승계 지원", "다이렉트 보험 비교"]
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
      note: "표준 견적",
      imagePath: "나비드_렌트견적.png",
      benefits: ["차량 용품작업 (썬팅 등)", "중고차 매입/승계 지원", "다이렉트 보험 비교"]
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
      note: "안전 위주",
      imagePath: "메리츠_렌트견적1.png"
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
      note: "안전 위주",
      imagePath: "메리츠_렌트견적1.png"
    },
    {
      company: "메리츠",
      type: "리스",
      term: 48,
      mileage: 15000,
      deposit: 22484000,
      monthly: 941280,
      includes_tax_ins: false,
      residual_value: 37472000,
      note: "자동차세/보험료 별도",
      imagePath: "메리츠_리스견적1.png"
    },
    {
      company: "나비드",
      type: "리스",
      term: 48,
      mileage: 15000,
      deposit: 22716799,
      monthly: 953200,
      includes_tax_ins: false,
      residual_value: 40133011,
      note: "자동차세/보험료 별도",
      imagePath: "나비드_리스.png"
    },
    {
      company: "에이원 (A1 Auto)",
      type: "리스",
      term: 48,
      mileage: 15000,
      deposit: 24500000,
      monthly: 962600,
      includes_tax_ins: false,
      residual_value: 39931290,
      note: "자동차세/보험료 별도",
      imagePath: "에이원_리스견적.png"
    },
    {
      company: "RS 컴퍼니",
      type: "리스",
      term: 48,
      mileage: 10000,
      deposit: 23565000,
      monthly: 974500,
      includes_tax_ins: false,
      residual_value: 42417000,
      note: "자동차세/보험료 별도",
      imagePath: "RS컴퍼니_리스견적.png",
      benefits: ["버텍스 900 썬팅 업그레이드", "세라믹 유리막 코팅", "즉시출고 (4월말)"]
    }
  ] as Quote[]
};
