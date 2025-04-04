// events.js
// 게임 내 발생하는 이벤트 데이터 배열

// 'type': 'daily' - 주간 활동 이벤트, 'system' - 게임 시스템 관련 이벤트
const events = [
    // --- 시스템 이벤트 ---
    {
        id: 'start_day_1', type: 'system',
        title: "훈련소 첫날 아침",
        description: "시끄러운 기상나팔 소리에 잠이 깼다. 여기가 군대구나... 정신없는 점호 준비가 시작된다.",
        choices: [
            { text: "허둥지둥 준비한다", fatigueChange: 5, outcomeDescription: "정신없이 준비했지만 뭔가 빠뜨린 것 같다.", nextEventId: 'basic_training' },
            { text: "옆 동기 따라 침착하게 준비한다", fatigueChange: 3, outcomeDescription: "옆 동기를 보며 차분하게 준비를 마쳤다.", nextEventId: 'basic_training' }
        ]
    },
    {
        id: 'end_day', type: 'system',
        title: "취침 시간",
        description: "모든 일과가 끝나고 취침 시간이 되었다.",
        // 선택지는 메인 스크립트의 displayEvent 함수에서 동적으로 생성
    },
    {
         id: 'finalize_day', type: 'system',
         action: finalizeDay // 실제 하루 종료 로직 호출 (메인 스크립트에 정의된 함수)
    },

    // --- 일일 활동 이벤트 (type: 'daily') ---
    {
        id: 'basic_training', type: 'daily',
        title: "제식 훈련",
        description: "교관의 불호령 아래 제식 훈련이 한창이다. 몸이 고되다.",
        choices: [
            { text: "열심히 따라한다", fatigueChange: 10, staminaChange: 1, outcomeDescription: "힘들지만 열심히 따라했다. 교관이 흘끗 칭찬하는 것 같다.", nextEventId: 'personal_time' },
            { text: "요령껏 움직인다", fatigueChange: 7, outcomeDescription: "적당히 눈치를 보며 요령을 피웠다. 들키지 않아 다행이다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'cleaning_duty', type: 'daily',
        title: "생활관 청소",
        description: "오후 일과 후 생활관 청소 시간이다. 어디를 맡을까?",
        choices: [
            { text: "화장실 청소를 자원한다", fatigueChange: 12, outcomeDescription: "가장 힘든 화장실 청소를 했다. 선임들이 좋게 보는 듯하다.", nextEventId: 'personal_time' },
            { text: "복도 청소를 맡는다", fatigueChange: 8, outcomeDescription: "무난한 복도 청소를 맡아 끝냈다.", nextEventId: 'personal_time' },
            { text: "침상 정리를 맡는다", fatigueChange: 5, outcomeDescription: "비교적 편한 침상 정리를 맡았다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'marksmanship_training', type: 'daily',
        title: "사격 훈련",
        description: "사격장에 도착했다. 긴장되는 순간, 어떻게 쏠까?",
        choices: [
            { text: "호흡에 집중하며 신중하게 쏜다", fatigueChange: 8, outcomeDescription: "집중해서 쐈다. 결과는 나쁘지 않은 것 같다.", nextEventId: 'personal_time' },
            { text: "빠르게 조준하고 격발한다", fatigueChange: 6, outcomeDescription: "빠르게 쏘는 데 집중했다. 몇 발은 빗나간 것 같다.", nextEventId: 'personal_time' },
            { text: "옆 사수 탄착군을 훔쳐본다", fatigueChange: 4, outcomeDescription: "슬쩍 옆을 봤지만 크게 도움은 안 됐다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'morning_run', type: 'daily',
        title: "아침 구보",
        description: "아침 점호 후 구보 시간이다. 상쾌하지만 힘들다.",
        choices: [
            { text: "선두 그룹을 따라잡으려 노력한다", fatigueChange: 15, staminaChange: 2, outcomeDescription: "젖 먹던 힘까지 다해 뛰었다. 체력이 늘어난 기분이다.", nextEventId: 'personal_time' },
            { text: "중간 그룹에서 페이스를 유지한다", fatigueChange: 10, staminaChange: 1, outcomeDescription: "무리하지 않고 중간 그룹에서 완주했다.", nextEventId: 'personal_time' },
            { text: "뒤에서 천천히 따라간다", fatigueChange: 7, outcomeDescription: "눈치껏 뒤에서 뛰었다. 덜 힘들지만 약간 민망하다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'fortification_work', type: 'daily',
        title: "진지 공사",
        description: "삽과 곡괭이를 들고 진지 공사 현장에 투입되었다. 흙먼지가 날린다.",
        choices: [
            { text: "열심히 삽질한다", fatigueChange: 18, staminaChange: 1, outcomeDescription: "묵묵히 삽질에 집중했다. 온몸이 땀에 젖었다.", nextEventId: 'personal_time' },
            { text: "비교적 쉬운 작업을 찾아 한다", fatigueChange: 13, outcomeDescription: "눈치를 보며 흙 나르기 등 비교적 편한 일을 했다.", nextEventId: 'personal_time' },
            { text: "잠시 나무 그늘에서 쉰다", fatigueChange: 9, outcomeDescription: "간부의 눈을 피해 잠시 쉬었다. 들키지 않아 다행이다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'equipment_maintenance', type: 'daily',
        title: "장비 정비",
        description: "개인 화기 및 장구류를 정비하는 시간이다.",
        choices: [
            { text: "꼼꼼하게 총기를 분해하고 닦는다", fatigueChange: 7, outcomeDescription: "총기 수입에 정성을 들였다. 반짝이는 총열이 만족스럽다.", nextEventId: 'personal_time' },
            { text: "대충 겉만 닦고 끝낸다", fatigueChange: 4, outcomeDescription: "보이는 부분만 대충 닦았다. 나중에 문제가 생기진 않겠지?", nextEventId: 'personal_time' },
            { text: "동기와 이야기하며 설렁설렁 한다", fatigueChange: 5, outcomeDescription: "동기와 잡담하며 정비 시간을 보냈다. 시간은 잘 간다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'mental_education', type: 'daily',
        title: "정신 교육",
        description: "강당에 모여 정신 교육을 받고 있다. 강사의 목소리가 졸음을 부른다.",
        choices: [
            { text: "최대한 집중해서 듣는다", fatigueChange: 3, outcomeDescription: "유익한 내용... 일 리는 없지만 열심히 들었다.", nextEventId: 'personal_time' },
            { text: "잠시 졸았다 깨기를 반복한다", fatigueChange: -5, outcomeDescription: "깜빡 졸았다. 피로가 조금 회복된 것 같기도 하다.", nextEventId: 'personal_time' },
            { text: "딴 생각을 하며 시간을 보낸다", fatigueChange: 2, outcomeDescription: "사회에 있을 때, 여자친구 생각 등을 하며 시간을 보냈다.", nextEventId: 'personal_time' }
        ]
    },
     {
        id: 'guard_duty', type: 'daily', // 불침번/위병소 근무 등
        title: "경계 근무",
        description: "지정된 초소에서 경계 근무를 서는 중이다. 시간이 더디게 간다.",
        choices: [
            { text: "정신을 바짝 차리고 전방을 주시한다", fatigueChange: 15, outcomeDescription: "한눈팔지 않고 경계에 집중했다. 아무 일도 없었다.", nextEventId: 'personal_time' },
            { text: "잠시 벽에 기대어 눈을 붙인다", fatigueChange: 5, outcomeDescription: "아무도 보지 않을 때 잠시 졸았다. 들켰다면 큰일 날 뻔했다.", nextEventId: 'personal_time' },
            { text: "함께 근무서는 동기/선임과 잡담한다", fatigueChange: 10, outcomeDescription: "근무 중 잡담으로 지루함을 달랬다. 시간은 잘 갔지만 조금 불안하다.", nextEventId: 'personal_time' }
        ]
    }
    // --- 추후 이곳에 더 많은 이벤트를 추가할 수 있습니다 ---
];

// finalizeDay 함수는 메인 스크립트(HTML 파일 내)에 정의되어 있어야 합니다.
// 이 파일은 events 배열만 정의합니다.
