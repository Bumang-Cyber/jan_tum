const quotes = [
  {
    quote:
      "무언가를 시작할 수 있는 가장 좋은 방법은 말은 그만하고 행동하는 것이다.",
    author: "월트 디즈니",
  },
  {
    quote: "무엇이든 초고는 다 걸레다.",
    author: "어니스트 헤밍웨이",
  },
  {
    quote: "우리 자신 외에 아무도 우리를 구해주지 않는다.",
    author: "싯다르타",
  },
  {
    quote: "오직 스스로를 등불로 삼고 자기를 의지하라.",
    author: "싯다르타",
  },
  {
    quote:
      "결코 과거에 구애 받지 마라. 단지 교훈이었을 뿐이며 그것이 내 남은 삶을 고통스럽게 만드는 것이 아니다.",
    author: "싯다르타",
  },
  {
    quote: "졸속이 지완을 이긴다.",
    author: "손자병법",
  },
  {
    quote:
      "인내심을 가지고 단순한 일을 완벽하게 하는 사람이 어려운 일을 쉽게 하는 기술을 습득할 수 있다.",
    author: "요한 실러",
  },
  {
    quote: "어둠을 저주할 시간에 촛불 하나 밝혀라",
    author: "인도의 격언",
  },
  {
    quote: "사람의 미래는 평상시의 모습에서 나타난다",
    author: "다산 정약용",
  },
  {
    quote: "자신감은 전염된다. 자신감 부족도 그러하다",
    author: "빈스 롬바르디",
  },
  {
    quote:
      "지금 자신이 무얼 못가졌는지가 아니라, 당신이 가진 것으로 무얼 할수 있는지를 생각하라",
    author: "어네스트 헤밍웨이",
  },
  {
    quote:
      "누군가를 설득하기 전에 자신부터 설득하라. 만일 자신을 설득하지 못하는 일이라면 그만 포기하라.",
    author: "존 헨리 피터슨",
  },
  {
    quote: "오랫동안 꿈을 그리는 사람은 그 꿈을 닮아간다.",
    author: "프레드히리 니체",
  },
  {
    quote: "주위 사람들을 웃길 수 있는 사람만이 천국에 갈 수 있다.",
    author: "코란",
  },
  {
    quote:
      "인내는 용기와 굉장히 비슷해서 용기의 언니 혹은 어머니로 보일 정도다.",
    author: "아리스토텔레스",
  },
  {
    quote: "행복은 습관이다. 그걸 몸에 지니라.",
    author: "하버드",
  },
  {
    quote: "지속적인 긍정적 사고는 능력을 배로 높인다.",
    author: "콜린 파월",
  },
  {
    quote: "불가사의한 승리는 있지만 불가사의한 패배는 없다.",
    author: "노무라 가쓰야",
  },
  {
    quote:
      "지금부터 20년 후에는 너는 네가 한 일보다 하지 않은 일 때문에 더욱 실망하게 될 것이다. 그러므로 돛을 올려라.",
    author: "마크 트웨인",
  },
];

const quote = document.querySelector("footer .quote");
const author = document.querySelector("footer .author");
const randomDigit = Math.floor(Math.random() * quotes.length);
const todaysQuote = quotes[randomDigit];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
