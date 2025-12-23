const questions = [
  {
    text: "친구가 공부 때문에 스트레스받는다고 할 때, 넌 뭐라고 해?",
    options: [
      { text: "그래도 꾸준히 하면 언젠가는 다 이해돼.", type: "math" },
      { text: "모르는 거 있으면 내가 알려줄게!", type: "english" },
      { text: "그래서 내가 정리 노트를 만들었지!", type: "korean" },
      { text: "지금 스트레스받는 이유가 뭘까? 같이 분석해보자.", type: "science" }
    ]
  },
  {
    text: "수업 중 발표할 때, 너의 스타일은?",
    options: [
      { text: "감정 넣어서 말하기", type: "korean" },
      { text: "외워온 걸 자연스럽게 풀어내기", type: "english" },
      { text: "구조적으로 정리해서 또박또박", type: "math" },
      { text: "배경 정보까지 다 넣어서 깊게 설명", type: "social" }
    ]
  },
  {
    text: "학급회의 시간에 너는?",
    options: [
      { text: "말 많은 편. 나서서 분위기 만듦", type: "korean" },
      { text: "필요한 말만 딱 하고 조용", type: "math" },
      { text: "의견 정리해서 문서화하려고 함", type: "english" },
      { text: "사회 구조나 문제의 원인부터 따짐", type: "social" }
    ]
  },
  {
    text: "공부할 때 책상 위 모습은?",
    options: [
      { text: "형광펜, 포스트잇으로 가득한 필기노트", type: "korean" },
      { text: "영어 단어 카드랑 노트북", type: "english" },
      { text: "문제집, 연습지, 계산기", type: "math" },
      { text: "마인드맵, 조사 자료, 뉴스 스크랩", type: "science" }
    ]
  },
  {
    text: "누가 '넌 어떤 사람 같아?' 라고 묻는다면?",
    options: [
      { text: "말하는 걸 좋아하는 감성파", type: "korean" },
      { text: "논리적으로 생각하는 언어형", type: "english" },
      { text: "계획적인 실천가", type: "math" },
      { text: "세상 돌아가는 거에 관심 많은 관찰자", type: "social" }
    ]
  },
  {
    text: "시험이 끝난 날, 제일 하고 싶은 건?",
    options: [
      { text: "영화나 책 보면서 감상에 젖기", type: "korean" },
      { text: "외국 콘텐츠 보기", type: "english" },
      { text: "모의고사 분석하기", type: "math" },
      { text: "다큐 보거나 토론하기", type: "social" }
    ]
  },
  {
    text: "너의 강점은 뭐라고 생각해?",
    options: [
      { text: "표현력", type: "korean" },
      { text: "이해력", type: "english" },
      { text: "문제 해결력", type: "math" },
      { text: "분석력", type: "science" }
    ]
  },
  {
    text: "가장 좋아하는 교과서 활동은?",
    options: [
      { text: "시나 소설 읽고 감상문 쓰기", type: "korean" },
      { text: "에세이 쓰기나 발표", type: "english" },
      { text: "개념 문제 풀기", type: "math" },
      { text: "사회적 이슈 분석하기", type: "social" }
    ]
  }
];

const resultInfo = {
  korean: {
    label: "📘 국어 교사",
    description:
      "넌 표현력과 감성이 넘치는 타입이야. 상황을 잘 공감하고 말이나 글로 자신의 생각을 잘 풀어내. 그래서 친구들도 널 대화할 때 편하다고 느껴. 이런 성향은 국어 교사와 닮았어!"
  },
  english: {
    label: "📗 영어 교사",
    description:
      "새로운 것에 대한 호기심이 많고, 외국 문화나 언어에 관심이 많네. 똑부러지고 유연하게 생각하는 넌, 글로벌 감각을 갖춘 영어 교사 스타일이야!"
  },
  math: {
    label: "📙 수학 교사",
    description:
      "계획적이고 문제를 논리적으로 해결하는 걸 좋아하지? 실수를 줄이기 위해 반복하고 정리하는 태도는 전형적인 수학 선생님 스타일이야."
  },
  social: {
    label: "📕 사회 교사",
    description:
      "세상 돌아가는 일에 관심 많고, 생각이 깊은 너! 단순한 사실보다 ‘왜 그런가’를 먼저 생각하잖아. 관찰력과 통찰력은 사회 교사의 핵심이지."
  },
  science: {
    label: "📒 과학 교사",
    description:
      "실험정신과 분석력이 뛰어난 넌, 세상의 원리를 밝히고 싶어 해. 탐구적이고 사실 기반으로 설명하는 태도는 과학 교사에게 꼭 필요한 능력이야."
  }
};

const quizView = document.getElementById("quiz-view");
const resultView = document.getElementById("result-view");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsWrap = document.getElementById("options");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const resultTitle = document.getElementById("result-title");
const resultDescription = document.getElementById("result-description");
const scoreBreakdown = document.getElementById("score-breakdown");
const restartBtn = document.getElementById("restart-btn");

let current = 0;
const selections = Array(questions.length).fill(null);

function renderQuestion() {
  const data = questions[current];
  questionNumber.textContent = `${current + 1} / ${questions.length}`;
  questionText.textContent = data.text;
  progressText.textContent = `${current + 1} / ${questions.length}`;
  const progressPercent = ((current + 1) / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;

  optionsWrap.innerHTML = "";
  data.options.forEach((opt, index) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.textContent = opt.text;
    button.setAttribute("type", "button");

    if (selections[current] === index) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      selections[current] = index;
      Array.from(optionsWrap.children).forEach((child) => child.classList.remove("selected"));
      button.classList.add("selected");
      nextBtn.disabled = false;
      nextBtn.textContent = current === questions.length - 1 ? "결과 보기" : "다음";
    });

    optionsWrap.appendChild(button);
  });

  prevBtn.disabled = current === 0;
  const hasSelection = selections[current] !== null;
  nextBtn.disabled = !hasSelection;
  nextBtn.textContent = current === questions.length - 1 ? "결과 보기" : "다음";
}

function calculateResult() {
  const scores = { korean: 0, english: 0, math: 0, social: 0, science: 0 };

  selections.forEach((choice, index) => {
    if (choice === null) return;
    const chosen = questions[index].options[choice];
    scores[chosen.type] += 1;
  });

  const priorities = ["korean", "english", "math", "social", "science"];
  let topType = priorities[0];
  let bestScore = -1;

  priorities.forEach((type) => {
    if (scores[type] > bestScore) {
      bestScore = scores[type];
      topType = type;
    }
  });

  return { topType, scores };
}

function showResult() {
  const { topType, scores } = calculateResult();
  const info = resultInfo[topType];

  resultTitle.textContent = info.label;
  resultDescription.textContent = info.description;
  scoreBreakdown.innerHTML = "";

  const maxScore = Math.max(...Object.values(scores)) || 1;

  Object.entries(resultInfo).forEach(([type, detail]) => {
    const row = document.createElement("div");
    row.className = "score-row";

    const label = document.createElement("span");
    label.textContent = detail.label;

    const bar = document.createElement("div");
    bar.className = "score-bar";

    const fill = document.createElement("span");
    const percent = (scores[type] / maxScore) * 100;
    fill.style.width = `${percent}%`;
    bar.appendChild(fill);

    const count = document.createElement("span");
    count.textContent = `${scores[type]}점`;

    row.appendChild(label);
    row.appendChild(bar);
    row.appendChild(count);
    scoreBreakdown.appendChild(row);
  });

  quizView.classList.add("hidden");
  resultView.classList.remove("hidden");
}

function handleNext() {
  if (selections[current] === null) return;

  if (current === questions.length - 1) {
    showResult();
    return;
  }

  current += 1;
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handlePrev() {
  if (current === 0) return;
  current -= 1;
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function restartQuiz() {
  selections.fill(null);
  current = 0;
  resultView.classList.add("hidden");
  quizView.classList.remove("hidden");
  renderQuestion();
}

prevBtn.addEventListener("click", handlePrev);
nextBtn.addEventListener("click", handleNext);
restartBtn.addEventListener("click", restartQuiz);

renderQuestion();
