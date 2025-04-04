// events.js - Part 1 of 7: 입대 및 훈련소 (초반)
// 전체 게임을 위해서는 모든 파트를 하나의 events.js 파일로 합쳐야 합니다.

const events = [ // 실제 파일에서는 이 줄로 시작합니다.

    // ====================================
    // 시스템 이벤트 
    // ====================================
    {
        id: 'start_day_1', type: 'system', // 실제 게임 시작 시 이 이벤트 대신 아래 'enlistment_notice' 부터 시작하도록 로직 수정 필요
        title: "훈련소 첫날 아침",
        description: "시끄러운 기상나팔 소리에 잠이 깼다. 여기가 군대구나... 정신없는 점호 준비가 시작된다.",
        choices: [
            { text: "허둥지둥 준비한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "정신없이 준비했지만 뭔가 빠뜨린 것 같다.", nextEventId: 'basic_training' },
            { text: "옆 동기 따라 침착하게 준비한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "옆 동기를 보며 차분하게 준비를 마쳤다.", nextEventId: 'basic_training' }
        ]
    },
    {
        id: 'end_day', type: 'system',
        title: "취침 시간",
        description: "모든 일과가 끝나고 취침 시간이 되었다.",
        // 선택지는 메인 스크립트의 displayEvent 함수에서 동적으로 생성 ('잠자리에 든다')
        choices: [
            { text: "잠자리에 든다", fatigueChange: -15, staminaChange: 5, outcomeDescription: "피곤한 하루를 마치고 잠에 든다.", nextEventId: 'finalize_day' }
        ]
    },
    {
        id: 'finalize_day', type: 'system',
        action: 'finalizeDay', // 메인 스크립트의 finalizeDay 함수 호출 (문자열로!)
        description: "하루를 마무리하는 중...",
        choices: [
            { text: "계속하기", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'personal_time', // 이 ID는 메인 스크립트에서 동적으로 처리됨 (endDaySequence 함수)
        type: 'system', // 시스템 처리로 분류
        title: "개인 정비 시간",
        description: "개인 정비 시간입니다. 무엇을 하시겠습니까?",
        // 선택지는 메인 스크립트의 endDaySequence 함수에서 동적으로 생성
        choices: [
            { text: "운동하기", fatigueChange: 5, staminaChange: 2, outcomeDescription: "체력 단련을 위해 운동을 했다.", nextEventId: 'end_day' },
            { text: "독서하기", fatigueChange: 2, staminaChange: 0, outcomeDescription: "책을 읽으며 시간을 보냈다.", nextEventId: 'end_day' },
            { text: "편지 쓰기", fatigueChange: 3, staminaChange: 0, outcomeDescription: "가족에게 편지를 썼다.", nextEventId: 'end_day' },
            { text: "명상하기", fatigueChange: -5, staminaChange: 1, outcomeDescription: "조용히 명상하며 마음의 안정을 찾았다.", nextEventId: 'end_day' }
        ]
    },

    // ====================================
    // 입대 및 훈련소 단계 (상세화된 이벤트)
    // ====================================
    {
        id: 'enlistment_notice', type: 'milestone',
        title: "입영통지서 수령",
        description: "우편함에 국방부에서 보낸 입영통지서가 도착했다. 드디어 올 것이 왔구나...",
        choices: [
            { text: "담담하게 받아들인다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "마음의 준비는 하고 있었다. 입대 날짜를 확인한다.", nextEventId: 'last_meal_family' },
            { text: "부모님께 보여드린다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "부모님께 통지서를 보여드리니 걱정스러운 표정을 지으신다.", nextEventId: 'last_meal_family' },
            { text: "친구들에게 알린다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "친구들에게 입대 날짜를 알리니 놀라면서도 격려해준다.", nextEventId: 'last_meal_family' }
        ]
    },
    {
        id: 'last_meal_family', type: 'milestone',
        title: "가족과의 마지막 식사",
        description: "입대 전날, 가족들과 함께 마지막 저녁 식사를 한다. 어색한 침묵과 걱정이 오간다.",
        choices: [
            { text: "씩씩한 척하며 농담한다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "걱정하시는 부모님을 안심시켜 드리려 애써 밝게 행동했다.", nextEventId: 'enlistment_bus' },
            { text: "솔직하게 걱정을 나눈다", fatigueChange: 0, staminaChange: 0, outcomeDescription: "가족들과 군 생활에 대한 걱정과 당부를 나누었다. 마음이 조금 무겁다.", nextEventId: 'enlistment_bus' },
            { text: "묵묵히 식사만 한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "무슨 말을 해야 할지 몰라 밥만 먹었다. 분위기가 가라앉는다.", nextEventId: 'enlistment_bus' }
        ]
    },
    {
        id: 'enlistment_bus', type: 'milestone',
        title: "입영 버스 탑승",
        description: "가족, 친구들과의 짧은 작별 인사를 마치고 입영 장정들을 태운 버스에 오른다. 창밖 풍경이 낯설게 느껴진다.",
        choices: [
            { text: "창밖을 보며 생각에 잠긴다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "앞으로 펼쳐질 군 생활에 대한 막연한 불안감이 밀려온다.", nextEventId: 'haircut_uniform' },
            { text: "옆자리 동기에게 말을 건다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "어색함을 깨고 옆자리 동기와 간단한 이야기를 나누었다.", nextEventId: 'haircut_uniform' },
            { text: "애써 잠을 청한다", fatigueChange: -2, staminaChange: 1, outcomeDescription: "불안한 마음을 달래려 눈을 감았지만 잠이 오지 않는다.", nextEventId: 'haircut_uniform' }
        ]
    },
    {
        id: 'haircut_uniform', type: 'training',
        title: "삭발 및 군복 지급",
        description: "훈련소에 도착하자마자 삭발을 하고, 몸에 맞는지 안 맞는지 모를 군복과 군화를 지급받았다. 거울 속 내 모습이 어색하다.",
        choices: [
            { text: "어색하지만 받아들인다", fatigueChange: 5, staminaChange: 0, outcomeDescription: "짧은 머리와 군복이 아직은 영 어색하다. 이게 군인이구나.", nextEventId: 'barracks_assignment' },
            { text: "동기들과 서로 놀린다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "동기들과 서로의 머리 스타일을 보며 웃었다. 조금이나마 긴장이 풀린다.", nextEventId: 'barracks_assignment' },
            { text: "불편한 군복에 대해 불평한다", fatigueChange: 7, staminaChange: -1, outcomeDescription: "몸에 맞지 않는 군복과 군화가 벌써부터 불편하게 느껴진다.", nextEventId: 'barracks_assignment' }
        ]
    },
    {
        id: 'barracks_assignment', type: 'training',
        title: "내무반(생활관) 배정",
        description: "앞으로 생활하게 될 내무반에 배정받았다. 수십 개의 관물대와 침상이 줄지어 있다. 여기서 어떻게 지내야 할까.",
        choices: [
            { text: "지정된 자리를 확인하고 짐을 푼다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "내 관물대와 침상을 확인하고 지급받은 물품을 정리하기 시작했다.", nextEventId: 'meeting_peers' },
            { text: "먼저 와 있는 동기들에게 인사한다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "어색하지만 먼저 와 있는 동기들에게 다가가 인사를 건넸다.", nextEventId: 'meeting_peers' },
            { text: "멍하니 서서 주변을 둘러본다", fatigueChange: 4, staminaChange: -1, outcomeDescription: "낯선 환경에 아직 적응이 되지 않아 멍하니 서 있었다.", nextEventId: 'meeting_peers' }
        ]
    },
    {
        id: 'meeting_peers', type: 'relationship',
        title: "동기들과 첫 인사",
        description: "내무반에서 동기들과 정식으로 통성명을 하고 자기소개를 하는 시간을 가졌다. 다들 긴장한 표정이다.",
        choices: [
            { text: "간단하고 솔직하게 나를 소개한다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "내 이름과 사는 곳 등 기본적인 정보를 이야기했다.", nextEventId: 'meeting_instructor' },
            { text: "분위기를 띄우려 농담을 섞는다", fatigueChange: -1, staminaChange: 1, outcomeDescription: "어색한 분위기를 풀어보려 가벼운 농담을 던졌는데, 반응은 그저 그렇다.", nextEventId: 'meeting_instructor' },
            { text: "다른 동기들의 소개를 경청한다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "앞으로 함께 지낼 동기들의 이름과 특징을 기억하려 애썼다.", nextEventId: 'meeting_instructor' }
        ]
    },
    {
        id: 'meeting_instructor', type: 'training',
        title: "훈련소 교관과의 첫 만남",
        description: "드디어 훈련소 교관이 내무반에 들어섰다. 날카로운 눈빛과 목소리에서 강한 카리스마가 느껴진다.",
        choices: [
            { text: "긴장해서 부동자세를 취한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "교관의 포스에 압도되어 숨쉬기조차 힘들었다.", nextEventId: 'learning_etiquette' },
            { text: "눈을 마주치지 않으려 노력한다", fatigueChange: 4, staminaChange: -1, outcomeDescription: "괜히 눈에 띄면 안 될 것 같아 시선을 피했다.", nextEventId: 'learning_etiquette' },
            { text: "교관의 지시에 집중한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "앞으로의 훈련 생활이 순탄치 않을 것 같다. 정신 바짝 차려야겠다.", nextEventId: 'learning_etiquette' }
        ]
    },
     {
        id: 'learning_etiquette', type: 'training',
        title: "군대 예절 및 경례 배우기",
        description: "군대에서의 말투, 행동 요령, 그리고 가장 기본인 경례 방법을 배웠다. 생각보다 어렵다.",
        choices: [
            { text: "열심히 따라하며 익힌다", fatigueChange: 4, staminaChange: 1, outcomeDescription: "몇 번의 지적 끝에 경례 자세가 조금은 자연스러워졌다.", nextEventId: 'first_inspection_fail' },
            { text: "자꾸 틀려서 지적받는다", fatigueChange: 7, staminaChange: -1, outcomeDescription: "마음처럼 몸이 따라주지 않아 계속 지적을 받았다. 벌써부터 힘들다.", nextEventId: 'first_inspection_fail' },
            { text: "동기에게 도움을 청한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "잘하는 동기에게 물어보며 자세를 교정했다.", nextEventId: 'first_inspection_fail' }
        ]
    },
    {
        id: 'first_inspection_fail', type: 'training',
        title: "첫 내무검사 실패와 단체 기합",
        description: "정리 상태 불량으로 첫 내무검사에서 지적을 받고 말았다. 결국 동기들과 함께 단체 기합을 받았다.",
        choices: [
            { text: "묵묵히 기합을 받는다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "내 잘못 때문에 동기들까지 고생하는 것 같아 미안한 마음이 들었다.", nextEventId: 'physical_test' },
            { text: "억울함을 느낀다", fatigueChange: 12, staminaChange: -2, outcomeDescription: "나름 열심히 정리했는데 지적받으니 억울한 생각이 든다.", nextEventId: 'physical_test' },
            { text: "다음엔 잘하겠다고 다짐한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "군대에서는 정리정돈이 정말 중요하다는 것을 깨달았다.", nextEventId: 'physical_test' }
        ]
    },
    {
        id: 'physical_test', type: 'training',
        title: "기초 체력 검사",
        description: "팔굽혀펴기, 윗몸일으키기, 3km 달리기 등 기초 체력 검사를 실시했다.",
        choices: [
            { text: "최선을 다해 좋은 기록을 낸다", fatigueChange: 12, staminaChange: 2, outcomeDescription: "힘들었지만 좋은 기록을 받아 뿌듯하다.", nextEventId: 'noticed_by_drill_sergeant' },
            { text: "평균적인 기록을 낸다", fatigueChange: 10, staminaChange: 1, outcomeDescription: "딱 중간 정도의 기록을 냈다. 더 노력해야겠다.", nextEventId: 'noticed_by_drill_sergeant' },
            { text: "체력이 부족해 낮은 기록을 낸다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "체력 부족을 절감했다. 앞으로 운동을 열심히 해야겠다.", nextEventId: 'noticed_by_drill_sergeant' }
        ]
    },
    {
        id: 'noticed_by_drill_sergeant', type: 'relationship',
        title: "조교에게 눈에 띄다",
        description: "훈련 중 무언가 잘못했는지, 아니면 잘했는지 조교가 나를 유심히 지켜보는 것 같다.",
        choices: [
            { text: "더욱 열심히 훈련에 임한다", fatigueChange: 8, staminaChange: 1, outcomeDescription: "조교의 시선을 의식하며 더 열심히 했다.", nextEventId: 'rifle_safety_training' },
            { text: "실수하지 않으려 조심한다", fatigueChange: 6, staminaChange: 0, outcomeDescription: "괜히 밉보이지 않도록 행동 하나하나에 신경 썼다.", nextEventId: 'rifle_safety_training' },
            { text: "왜 쳐다보는지 궁금해한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "조교가 왜 나를 주목하는지 이유를 알 수 없어 불안하다.", nextEventId: 'rifle_safety_training' }
        ]
    },
    {
        id: 'rifle_safety_training', type: 'training',
        title: "총기 안전수칙 교육 및 소총 수령",
        description: "총기 안전수칙에 대한 교육을 받고 드디어 개인 소총을 지급받았다. 묵직한 무게에서 책임감이 느껴진다.",
        choices: [
            { text: "교육 내용을 숙지하고 총기를 소중히 다룬다", fatigueChange: 4, staminaChange: 0, outcomeDescription: "총기는 내 생명과 같다는 말을 되새기며 조심스럽게 다루었다.", nextEventId: 'marksmanship_practice_competition' },
            { text: "무거운 소총 때문에 벌써 피곤하다", fatigueChange: 7, staminaChange: -1, outcomeDescription: "생각보다 무거운 소총 때문에 어깨가 아파온다.", nextEventId: 'marksmanship_practice_competition' },
            { text: "동기들과 소총을 비교해본다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "지급받은 소총의 상태에 대해 동기들과 이야기를 나누었다.", nextEventId: 'marksmanship_practice_competition' }
        ]
    },
     {
        id: 'marksmanship_practice_competition', type: 'training',
        title: "사격 훈련과 명사수 경쟁",
        description: "드디어 실탄 사격 훈련이다. 동기들 사이에서 누가 더 잘 쏘는지 은근한 경쟁이 벌어진다.",
        choices: [
            { text: "숨을 참고 격발에 집중한다 (사격술)", fatigueChange: 8, staminaChange: 1, outcomeDescription: "집중해서 쏜 덕분에 좋은 성적을 거뒀다. '특등사수' 소리를 들었다!", nextEventId: 'gas_chamber_training' },
            { text: "긴장해서 손이 떨린다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "총소리와 긴장감 때문에 제대로 조준하기 어려웠다. 결과는 좋지 않다.", nextEventId: 'gas_chamber_training' },
            { text: "빨리 쏘고 끝내고 싶다", fatigueChange: 7, staminaChange: 0, outcomeDescription: "대충 쏘고 빨리 끝냈다. 탄착군이 형편없다.", nextEventId: 'gas_chamber_training' }
        ]
    },
    {
        id: 'gas_chamber_training', type: 'training',
        title: "화생방 훈련",
        description: "화생방 훈련장에 들어섰다. 방독면을 벗는 순간, 지옥이 시작되었다. 눈물, 콧물이 멈추지 않는다.",
        choices: [
            { text: "정화통 교체까지 버틴다", fatigueChange: 25, staminaChange: -5, outcomeDescription: "정말 죽을 것 같았지만, 간신히 버텨냈다. 다시는 하고 싶지 않다.", nextEventId: 'grenade_training_mistake' },
            { text: "너무 고통스러워 뛰쳐나간다", fatigueChange: 15, staminaChange: -3, outcomeDescription: "고통을 참지 못하고 결국 뛰쳐나왔다. 교관에게 크게 혼났다.", nextEventId: 'grenade_training_mistake' },
            { text: "동기를 붙잡고 겨우 버틴다", fatigueChange: 20, staminaChange: -4, outcomeDescription: "옆 동기와 서로 의지하며 간신히 훈련을 마쳤다.", nextEventId: 'grenade_training_mistake' }
        ]
    },
    {
        id: 'grenade_training_mistake', type: 'training',
        title: "수류탄 투척 훈련 중 실수",
        description: "수류탄 투척 훈련 중 너무 긴장한 나머지 실수를 하고 말았다. 교관의 불호령이 떨어진다.",
        choices: [
            { text: "즉시 잘못을 인정하고 사과한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "크게 혼났지만, 솔직하게 잘못을 인정했다.", nextEventId: 'hell_week_march_accident' },
            { text: "변명하려다 더 혼난다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "긴장해서 그랬다고 변명했지만, 교관은 더 크게 화를 냈다.", nextEventId: 'hell_week_march_accident' },
            { text: "다음 투척은 제대로 하겠다고 다짐한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "실수를 만회하기 위해 다음 투척에 더욱 집중했다.", nextEventId: 'hell_week_march_accident' }
        ]
    },
    {
        id: 'hell_week_march_accident', type: 'training',
        title: "극기주 훈련과 행군 중 사고",
        description: "가장 힘들다는 극기주 훈련. 야간 행군 중 발을 헛디뎌 넘어지고 말았다.",
        choices: [
            { text: "이를 악물고 일어나 다시 걷는다", fatigueChange: 30, staminaChange: -5, outcomeDescription: "아픈 것을 참고 동기들의 도움을 받아 겨우 완주했다.", nextEventId: 'first_night_watch_fear' },
            { text: "의무병의 도움을 받는다", fatigueChange: 20, staminaChange: -3, outcomeDescription: "통증이 심해 결국 의무병의 응급처치를 받고 잠시 뒤처졌다.", nextEventId: 'first_night_watch_fear' },
            { text: "포기하고 싶다는 생각이 든다", fatigueChange: 25, staminaChange: -4, outcomeDescription: "몸과 마음이 너무 지쳐 포기하고 싶은 생각이 간절했다.", nextEventId: 'first_night_watch_fear' }
        ]
    },
    {
        id: 'first_night_watch_fear', type: 'training',
        title: "첫 야간 보초 근무와 공포 체험",
        description: "태어나서 처음으로 야간 보초 근무를 선다. 칠흑 같은 어둠 속에서 작은 소리에도 깜짝 놀란다.",
        choices: [
            { text: "정신을 바짝 차리고 경계한다", fatigueChange: 18, staminaChange: -2, outcomeDescription: "무서웠지만 책임감을 갖고 근무 시간을 무사히 마쳤다.", nextEventId: 'px_snack_time' },
            { text: "함께 근무서는 동기와 계속 이야기한다", fatigueChange: 15, staminaChange: -1, outcomeDescription: "동기와 계속 떠들며 무서움을 달랬다. 시간이 잘 갔다.", nextEventId: 'px_snack_time' },
            { text: "꾸벅꾸벅 존다", fatigueChange: 10, staminaChange: 1, outcomeDescription: "피곤함을 이기지 못하고 잠시 졸았다. 다행히 걸리지는 않았다.", nextEventId: 'px_snack_time' }
        ]
    },
    {
        id: 'px_snack_time', type: 'daily',
        title: "훈련소 PX 이용",
        description: "드디어 PX에 갈 수 있는 시간이 주어졌다! 천국이 따로 없다. 무엇을 살까?",
        choices: [
            { text: "평소 먹고 싶었던 과자를 잔뜩 산다", fatigueChange: -10, staminaChange: 2, outcomeDescription: "과자와 음료수를 양껏 사서 동기들과 나눠 먹었다. 행복하다.", nextEventId: 'letter_writing_homesick' },
            { text: "필요한 생필품 위주로 구매한다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "면도기, 세면도구 등 필요한 물품을 구매했다.", nextEventId: 'letter_writing_homesick' },
            { text: "돈을 아끼기 위해 구경만 한다", fatigueChange: -2, staminaChange: 0, outcomeDescription: "아직 월급 전이라 돈을 아꼈다. 다음 기회를 노려야지.", nextEventId: 'letter_writing_homesick' }
        ]
    },
     {
        id: 'letter_writing_homesick', type: 'relationship',
        title: "편지 쓰는 시간과 가족 그리움",
        description: "개인정비 시간에 가족과 친구들에게 편지를 쓴다. 글자 하나하나에 그리움이 묻어난다.",
        choices: [
            { text: "꾹꾹 눌러 진심을 담아 편지를 쓴다", fatigueChange: -8, staminaChange: 1, outcomeDescription: "가족들에게 사랑과 감사의 마음을 전했다. 답장이 기다려진다.", nextEventId: 'peer_desertion_attempt' },
            { text: "힘든 내색 없이 밝은 내용만 쓴다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "걱정하실까 봐 힘든 얘기는 빼고 즐거운 이야기만 적었다.", nextEventId: 'peer_desertion_attempt' },
            { text: "쓸 말이 없어 짧게 마무리한다", fatigueChange: -3, staminaChange: 0, outcomeDescription: "막상 쓰려니 무슨 말을 해야 할지 몰라 짧게 안부만 전했다.", nextEventId: 'peer_desertion_attempt' }
        ]
    },
    {
        id: 'peer_desertion_attempt', type: 'special',
        title: "동기의 탈영 시도와 전체 기합",
        description: "한 동기가 군 생활에 적응하지 못하고 탈영을 시도하다 붙잡혔다. 그 때문에 우리 분대 전체가 기합을 받았다.",
        choices: [
            { text: "동기를 원망하며 기합을 받는다", fatigueChange: 20, staminaChange: -3, outcomeDescription: "나까지 피해를 보는 것 같아 동기가 원망스러웠다.", nextEventId: 'training_completion_ceremony' },
            { text: "동기를 걱정하며 기합을 받는다", fatigueChange: 18, staminaChange: -2, outcomeDescription: "오죽 힘들었으면 그랬을까. 동기가 안쓰럽게 느껴졌다.", nextEventId: 'training_completion_ceremony' },
            { text: "아무 생각 없이 기합만 받는다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "힘들지만 어쩔 수 없다. 그저 시키는 대로 할 뿐이다.", nextEventId: 'training_completion_ceremony' }
        ]
    },
    {
        id: 'training_completion_ceremony', type: 'milestone',
        title: "훈련소 수료식과 자대 배정 발표",
        description: "드디어 길고 길었던 훈련소 생활이 끝났다! 수료식 후, 앞으로 내가 복무할 자대가 발표되었다.",
        choices: [
            { text: "기대했던 부대에 배정되어 기뻐한다", fatigueChange: -15, staminaChange: 3, outcomeDescription: "원하던 곳은 아니지만, 그래도 나쁘지 않은 곳 같다. 새로운 시작이다!", nextEventId: 'transfer_to_unit_bus' },
            { text: "낯선 이름의 부대에 배정되어 불안하다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "처음 들어보는 이름의 부대다. 어떤 곳일지 걱정이 앞선다.", nextEventId: 'transfer_to_unit_bus' },
            { text: "동기들과 헤어지는 것이 아쉽다", fatigueChange: 0, staminaChange: 0, outcomeDescription: "정들었던 동기들과 헤어져 각자 다른 부대로 가야 한다니 아쉽다.", nextEventId: 'transfer_to_unit_bus' }
        ]
    },
    { 
        id: 'first_day_unpacking', 
        type: 'training', 
        title: "훈련소 첫날 짐 정리하기", 
        description: "지급받은 물품과 개인 짐을 관물대에 정리한다.", 
        choices: [
            { text: "각 잡아서 정리한다", fatigueChange: 5, staminaChange: 0, outcomeDescription:"깔끔하게 정리했다.", nextEventId:'group_shower_experience'}, 
            { text: "대충 정리한다", fatigueChange: 3, staminaChange: -1, outcomeDescription:"일단 되는대로 정리했다.", nextEventId:'group_shower_experience' }
        ] 
    },
    { 
        id: 'group_shower_experience', 
        type: 'training', 
        title: "단체 샤워 경험", 
        description: "처음으로 겪는 단체 샤워. 사생활은 없다.", 
        choices: [
            { text: "빠르게 씻고 나온다", fatigueChange: 3, staminaChange: 0, outcomeDescription:"필요한 부분만 후딱 씻었다.", nextEventId:'first_mess_hall_meal'}, 
            { text: "동기들과 장난치며 씻는다", fatigueChange: 1, staminaChange: 1, outcomeDescription:"동기들과 물장난을 치며 긴장을 풀었다.", nextEventId:'first_mess_hall_meal' }
        ] 
    },
    // events.js - Part 2 of 7: 훈련소 (후반) + 자대 배치/적응기 (초반)
// 전체 게임을 위해서는 모든 파트를 하나의 events.js 파일로 합쳐야 합니다.

// Part 1에서 이어짐 - 이 문구는 실제 병합 시 삭제하세요
// const events = [ 로 시작하는 배열 선언 이후 쉼표를 넣고 이어서 작성합니다.

    { 
        id: 'first_mess_hall_meal', 
        type: 'training', 
        title: "첫 군대 급식 체험", 
        description: "식판에 배식된 음식을 받았다. 맛은...", 
        choices: [
            { text: "맛있게 먹는다", fatigueChange: -2, staminaChange: 2, outcomeDescription: "생각보다 먹을 만하다. 배고파서 그런가?", nextEventId: 'manual_memorization_test'}, 
            { text: "억지로 먹는다", fatigueChange: 4, staminaChange: 1, outcomeDescription: "맛이 없지만 살기 위해 먹는다.", nextEventId: 'manual_memorization_test' }
        ] 
    },
    { 
        id: 'manual_memorization_test', 
        type: 'training', 
        title: "훈련소 교범 암기 테스트", 
        description: "두꺼운 교범 내용을 암기해야 한다. 머리가 아프다.", 
        choices: [
            { text: "밤새 외운다", fatigueChange: 10, staminaChange: -2, outcomeDescription: "밤새 노력한 덕분에 테스트를 잘 통과했다.", nextEventId: 'learning_military_songs'}, 
            { text: "대충 보고 찍는다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "역시나 결과는 좋지 않다. 혼났다.", nextEventId: 'learning_military_songs' }
        ] 
    },
    { 
        id: 'learning_military_songs', 
        type: 'training', 
        title: "군가 배우기와 단체 합창", 
        description: "힘찬 군가를 배우고 목청껏 부른다. 군인이 된 기분이다.", 
        choices: [
            { text: "열정적으로 부른다", fatigueChange: 2, staminaChange: 1, outcomeDescription: "목이 쉬도록 불렀다. 스트레스가 풀리는 것 같다.", nextEventId: 'adapting_military_jargon'}, 
            { text: "입만 벙긋거린다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "가사를 잘 몰라서 눈치껏 따라 불렀다.", nextEventId: 'adapting_military_jargon' }
        ] 
    },
    { 
        id: 'adapting_military_jargon', 
        type: 'training', 
        title: "처음 쓰는 군대 용어에 적응하기", 
        description: "'관등성명', '다나까' 등 낯선 군대 용어에 적응해야 한다.", 
        choices: [
            { text: "의식적으로 사용하며 익숙해진다", fatigueChange: 3, staminaChange: 1, outcomeDescription: "자꾸 쓰다 보니 조금씩 입에 붙는다.", nextEventId: 'violating_forbidden_actions'}, 
            { text: "자꾸 실수해서 지적받는다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "사회 말투가 튀어나와 지적을 받았다.", nextEventId: 'violating_forbidden_actions' }
        ] 
    },
    { 
        id: 'violating_forbidden_actions', 
        type: 'training', 
        title: "훈련소 내 금지된 행동 위반과 처벌", 
        description: "모르고 금지된 행동(취식 등)을 하다가 걸렸다.", 
        choices: [
            { text: "즉시 반성하고 처벌을 받는다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "규칙 위반으로 얼차려를 받았다. 조심해야겠다.", nextEventId: 'teamwork_training_mission'}, 
            { text: "억울하다고 항변한다", fatigueChange: 10, staminaChange: -2, outcomeDescription: "몰랐다고 항변했지만 소용없었다. 더 혼났다.", nextEventId: 'teamwork_training_mission' }
        ] 
    },
    { 
        id: 'teamwork_training_mission', 
        type: 'training', 
        title: "팀워크 훈련과 단체 미션 수행", 
        description: "분대원들과 협력하여 주어진 미션을 수행해야 한다.", 
        choices: [
            { text: "적극적으로 의견을 내고 협력한다", fatigueChange: 6, staminaChange: 1, outcomeDescription: "분대원들과 힘을 합쳐 미션을 성공적으로 완수했다.", nextEventId: 'squad_activity_belonging'}, 
            { text: "다른 분대원의 지시에 따른다", fatigueChange: 4, staminaChange: 0, outcomeDescription: "주도적으로 나서진 않았지만, 맡은 역할은 해냈다.", nextEventId: 'squad_activity_belonging' }
        ] 
    },
    { 
        id: 'squad_activity_belonging', 
        type: 'training', 
        title: "소속감 형성을 위한 분대 활동", 
        description: "분대별로 단합 활동 시간을 가졌다.", 
        choices: [
            { text: "즐겁게 참여하며 친목을 다진다", fatigueChange: -3, staminaChange: 1, outcomeDescription: "분대원들과 운동도 하고 이야기도 나누며 가까워졌다.", nextEventId: 'physical_examination_health_check'}, 
            { text: "혼자 조용히 시간을 보낸다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "아직 어색해서 혼자 있었다.", nextEventId: 'physical_examination_health_check' }
        ] 
    },
    { 
        id: 'physical_examination_health_check', 
        type: 'training', 
        title: "신체검사와 건강 상태 점검", 
        description: "훈련소 내에서 간단한 신체검사를 받았다.", 
        choices: [
            { text: "건강 상태 양호 판정을 받는다", fatigueChange: 0, staminaChange: 1, outcomeDescription: "다행히 별다른 이상은 없다고 한다.", nextEventId: 'learning_bed_making'}, 
            { text: "불편한 곳을 이야기하고 진료받는다", fatigueChange: 2, staminaChange: -1, outcomeDescription: "아픈 곳이 있어 군의관에게 진료를 받았다.", nextEventId: 'learning_bed_making' }
        ] 
    },
    { 
        id: 'learning_bed_making', 
        type: 'training', 
        title: "처음 배우는 군대식 침상 정리법", 
        description: "각 잡힌 모포와 베개 정리. 생각보다 어렵다.", 
        choices: [
            { text: "조교 시범을 보고 열심히 따라 한다", fatigueChange: 4, staminaChange: 0, outcomeDescription: "몇 번의 시도 끝에 그럴듯하게 모양이 잡혔다.", nextEventId: 'understanding_training_schedule'}, 
            { text: "자꾸 흐트러져서 다시 한다", fatigueChange: 6, staminaChange: -1, outcomeDescription: "아무리 해도 각이 살지 않는다. 쉽지 않다.", nextEventId: 'understanding_training_schedule' }
        ] 
    },
    { 
        id: 'understanding_training_schedule', 
        type: 'training', 
        title: "훈련소 훈련 일정표 숙지하기", 
        description: "앞으로 받을 훈련 일정이 빼곡히 적힌 표를 받았다.", 
        choices: [
            { text: "꼼꼼히 읽어보고 일정을 파악한다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "앞으로 어떤 훈련들이 기다리고 있는지 대략 알겠다.", nextEventId: 'receiving_military_id'}, 
            { text: "봐도 잘 모르겠다", fatigueChange: 2, staminaChange: -1, outcomeDescription: "복잡한 일정표가 눈에 잘 들어오지 않는다.", nextEventId: 'receiving_military_id' }
        ] 
    },
    { 
        id: 'receiving_military_id', 
        type: 'training', 
        title: "군인 신분증 발급 받기", 
        description: "군인 신분증이 나왔다. 사진 속 내 모습이 낯설다.", 
        choices: [
            { text: "신기해서 계속 들여다본다", fatigueChange: 0, staminaChange: 0, outcomeDescription: "이제 정말 군인이 된 기분이다.", nextEventId: 'learning_rank_system'}, 
            { text: "잃어버리지 않게 잘 챙긴다", fatigueChange: 0, staminaChange: 0, outcomeDescription: "분실하면 큰일 난다고 하니 잘 보관해야겠다.", nextEventId: 'learning_rank_system' }
        ] 
    },
    { 
        id: 'learning_rank_system', 
        type: 'training', 
        title: "군대 계급 체계 배우기", 
        description: "이등병부터 병장, 간부까지 복잡한 계급 체계를 배운다.", 
        choices: [
            { text: "집중해서 듣고 외운다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "계급과 상징을 외우려고 노력했다.", nextEventId: 'rifle_assembly_disassembly'}, 
            { text: "너무 많아서 헷갈린다", fatigueChange: 4, staminaChange: -1, outcomeDescription: "계급이 너무 많아서 누가 누구인지 헷갈린다.", nextEventId: 'rifle_assembly_disassembly' }
        ] 
    },
    { 
        id: 'rifle_assembly_disassembly', 
        type: 'training', 
        title: "소총 분해결합 훈련", 
        description: "개인 소총을 분해하고 다시 결합하는 방법을 배운다.", 
        choices: [
            { text: "설명을 잘 듣고 침착하게 따라 한다", fatigueChange: 5, staminaChange: 1, outcomeDescription: "몇 번의 연습 끝에 성공적으로 분해결합을 마쳤다.", nextEventId: 'first_aid_basic_training'}, 
            { text: "부품을 잃어버릴까 봐 조심한다", fatigueChange: 6, staminaChange: 0, outcomeDescription: "작은 부품들이 많아 잃어버리지 않도록 신경 썼다.", nextEventId: 'first_aid_basic_training' }
        ] 
    },
    { 
        id: 'first_aid_basic_training', 
        type: 'training', 
        title: "응급처치 기본 교육", 
        description: "전장에서 필요한 기본적인 응급처치 방법을 배운다.", 
        choices: [
            { text: "실습에 적극적으로 참여한다", fatigueChange: 4, staminaChange: 1, outcomeDescription: "심폐소생술과 지혈법 등을 직접 해보며 익혔다.", nextEventId: 'military_law_discipline_education'}, 
            { text: "이론 교육에 집중한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "응급 상황 시 대처 요령을 머릿속으로 숙지했다.", nextEventId: 'military_law_discipline_education' }
        ] 
    },
    { 
        id: 'military_law_discipline_education', 
        type: 'training', 
        title: "군법 및 군인복무규율 교육", 
        description: "군인으로서 지켜야 할 법규와 규율에 대해 교육받는다.", 
        choices: [
            { text: "중요 내용을 필기하며 듣는다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "처벌 규정 등을 들으니 정신이 번쩍 든다.", nextEventId: 'adapting_communal_life'}, 
            { text: "지루해서 졸음이 온다", fatigueChange: 1, staminaChange: -1, outcomeDescription: "딱딱한 내용이라 조금 지루하게 느껴졌다.", nextEventId: 'adapting_communal_life' }
        ] 
    },
    { 
        id: 'adapting_communal_life', 
        type: 'training', 
        title: "사생활이 없는 공동생활 적응", 
        description: "모든 것을 동기들과 함께하는 공동생활. 사생활 보장이 어렵다.", 
        choices: [
            { text: "불편하지만 점차 적응해나간다", fatigueChange: 4, staminaChange: 0, outcomeDescription: "불편함 속에서도 공동체 생활의 규칙을 배워간다.", nextEventId: 'competing_popular_positions'}, 
            { text: "혼자만의 시간을 가지려 노력한다", fatigueChange: 2, staminaChange: -1, outcomeDescription: "잠깐이라도 혼자 있을 수 있는 시간을 찾으려 애쓴다.", nextEventId: 'competing_popular_positions' }
        ] 
    },
    { 
        id: 'competing_popular_positions', 
        type: 'training', 
        title: "훈련소 내 인기 있는 보직 경쟁", 
        description: "훈련소 내에서 비교적 편하다고 알려진 보직(예: 행정)에 대한 경쟁이 있다.", 
        choices: [
            { text: "경쟁에 참여하여 좋은 인상을 주려 노력한다", fatigueChange: 5, staminaChange: 0, outcomeDescription: "조교에게 잘 보이기 위해 훈련에 더 열심히 참여했다.", nextEventId: 'first_full_gear_march'}, 
            { text: "어떤 보직이든 상관없다고 생각한다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "어차피 다 힘들 텐데 보직은 크게 신경 쓰지 않는다.", nextEventId: 'first_full_gear_march'}
        ] 
    },
    { 
        id: 'first_full_gear_march', 
        type: 'training', 
        title: "첫 군장 배낭 메고 행군하기", 
        description: "무거운 군장을 메고 처음으로 행군에 나선다. 어깨가 빠질 것 같다.", 
        choices: [
            { text: "이를 악물고 뒤처지지 않으려 노력한다", fatigueChange: 20, staminaChange: -3, outcomeDescription: "정말 힘들었지만, 동기들과 함께 완주했다.", nextEventId: 'caught_talking_after_lights_out'}, 
            { text: "너무 힘들어 중간에 잠시 뒤처진다", fatigueChange: 25, staminaChange: -5, outcomeDescription: "군장의 무게를 이기지 못하고 잠시 뒤처졌지만, 다시 따라잡았다.", nextEventId: 'caught_talking_after_lights_out'}
        ] 
    },
    { 
        id: 'caught_talking_after_lights_out', 
        type: 'training', 
        title: "취침 소등 후 몰래 대화하다 걸리기", 
        description: "소등 후 동기와 몰래 이야기하다 순찰 중인 조교에게 걸렸다.", 
        choices: [
            { text: "잘못했다고 즉시 사과한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "변명 없이 잘못을 인정하고 얼차려를 받았다.", nextEventId: 'realizing_importance_personal_time'}, 
            { text: "동기 탓으로 돌린다", fatigueChange: 10, staminaChange: -2, outcomeDescription: "동기가 먼저 말을 걸었다고 했지만, 결국 같이 벌 받았다.", nextEventId: 'realizing_importance_personal_time'}
        ] 
    },
    { 
        id: 'realizing_importance_personal_time', 
        type: 'training', 
        title: "개인정비 시간의 중요성 깨닫기", 
        description: "짧은 개인정비 시간이 얼마나 소중한지 깨닫게 된다.", 
        choices: [
            { text: "시간을 쪼개 필요한 일을 한다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "전화하고, 편지 쓰고, 전투화 닦고... 시간이 부족하다.", nextEventId: 'chaotic_morning_wake_up'}, 
            { text: "멍하니 쉬면서 에너지를 충전한다", fatigueChange: -8, staminaChange: 2, outcomeDescription: "아무것도 안 하고 쉬는 것만으로도 회복이 된다.", nextEventId: 'chaotic_morning_wake_up'}
        ] 
    },
    { 
        id: 'chaotic_morning_wake_up', 
        type: 'training', 
        title: "처음 겪는 단체 기상과 혼란", 
        description: "기상나팔 소리와 함께 모두가 동시에 일어나 준비하는 아침. 정신이 하나도 없다.", 
        choices: [
            { text: "허둥대지만 최대한 빨리 준비한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "정신없는 와중에도 늦지 않으려 서둘렀다.", nextEventId: 'peer_injured_response'}, 
            { text: "느긋하게 준비하다 지적받는다", fatigueChange: 7, staminaChange: -1, outcomeDescription: "여유 부리다가 결국 지적을 받고 말았다.", nextEventId: 'peer_injured_response'}
        ] 
    },
    { 
        id: 'peer_injured_response', 
        type: 'training', 
        title: "훈련소 동기 중 부상자 발생과 대처", 
        description: "훈련 중 한 동기가 부상을 당했다. 어떻게 대처해야 할까?", 
        choices: [
            { text: "즉시 조교에게 보고한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "빠르게 상황을 보고하여 동기가 조치를 받을 수 있게 했다.", nextEventId: 'adapting_military_greetings_titles'}, 
            { text: "부상당한 동기를 부축한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "동기를 도와 의무실로 함께 이동했다.", nextEventId: 'adapting_military_greetings_titles'}
        ] 
    },
    { 
        id: 'adapting_military_greetings_titles', 
        type: 'training', 
        title: "군대식 인사와 호칭 적응하기", 
        description: "간부와 선임에게 맞는 인사법과 호칭을 사용해야 한다.", 
        choices: [
            { text: "의식적으로 정확히 사용하려 노력한다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "헷갈리지만 계속 사용하며 익숙해지고 있다.", nextEventId: 'enduring_blisters_during_march'}, 
            { text: "실수할까 봐 말을 아낀다", fatigueChange: 3, staminaChange: -1, outcomeDescription: "틀릴까 봐 차라리 말을 덜 하게 된다.", nextEventId: 'enduring_blisters_during_march'}
        ] 
    },
    { 
        id: 'enduring_blisters_during_march', 
        type: 'training', 
        title: "행군 중 물집 생기고 참기", 
        description: "행군 중 발에 물집이 잡혔다. 통증이 상당하다.", 
        choices: [
            { text: "아프지만 참고 계속 걷는다", fatigueChange: 18, staminaChange: -2, outcomeDescription: "물집이 터질 것 같았지만, 뒤처지지 않기 위해 참았다.", nextEventId: 'instructor_touching_advice'}, 
            { text: "쉬는 시간에 응급처치를 한다", fatigueChange: 15, staminaChange: -1, outcomeDescription: "쉬는 시간을 이용해 물집에 반창고를 붙였다.", nextEventId: 'instructor_touching_advice'}
        ] 
    },
    { 
        id: 'instructor_touching_advice', 
        type: 'relationship', 
        title: "훈련소 교관의 감동적인 조언", 
        description: "힘들어하는 나에게 교관이 다가와 의외로 따뜻한 조언을 건넸다.", 
        choices: [
            { text: "진심으로 감사하다고 말한다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "교관의 말에 위로를 받고 다시 힘을 낼 수 있었다.", nextEventId: 'first_bathhouse_time_limit'}, 
            { text: "어색해서 대답만 한다", fatigueChange: 0, staminaChange: 0, outcomeDescription: "갑작스러운 격려에 조금 어색했지만, 나쁘지 않았다.", nextEventId: 'first_bathhouse_time_limit'}
        ] 
    },
    { 
        id: 'first_bathhouse_time_limit', 
        type: 'training', 
        title: "첫 목욕탕 이용과 시간 제한 경험", 
        description: "훈련소 목욕탕을 처음 이용한다. 짧은 시간 안에 씻어야 한다.", 
        choices: [
            { text: "최대한 빠르게 씻는다", fatigueChange: -3, staminaChange: 1, outcomeDescription: "시간 안에 씻기 위해 서둘렀다. 개운하다.", nextEventId: 'first_sunday_religious_activity'}, 
            { text: "느긋하게 씻다가 쫓겨난다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "시간 가는 줄 모르고 씻다가 결국 쫓겨나듯 나왔다.", nextEventId: 'first_sunday_religious_activity'}
        ] 
    },
    { 
        id: 'first_sunday_religious_activity', 
        type: 'training', 
        title: "훈련소 첫 일요일 종교 활동", 
        description: "첫 일요일, 종교 활동에 참여할 기회가 주어졌다.", 
        choices: [
            { text: "원하는 종교 활동에 참여한다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "종교 활동에 참여해 간식을 먹고 잠시나마 위안을 얻었다.", nextEventId: 'first_conflict_resolution_peer'}, 
            { text: "생활관에 남아 휴식을 취한다", fatigueChange: -8, staminaChange: 2, outcomeDescription: "종교는 없어서 생활관에서 조용히 쉬었다.", nextEventId: 'first_conflict_resolution_peer'}
        ] 
    },
    { 
        id: 'first_conflict_resolution_peer', 
        type: 'relationship', 
        title: "훈련소 동기와의 첫 갈등과 화해", 
        description: "사소한 오해로 동기와 다툼이 생겼다.", 
        choices: [
            { text: "먼저 다가가 사과하고 화해한다", fatigueChange: -2, staminaChange: 0, outcomeDescription: "어색했지만 먼저 사과했고, 동기도 받아주어 관계를 회복했다.", nextEventId: 'transfer_to_unit_bus'}, 
            { text: "갈등을 무시하고 거리를 둔다", fatigueChange: 3, staminaChange: -1, outcomeDescription: "껄끄러워서 그 동기와는 당분간 거리를 두기로 했다.", nextEventId: 'transfer_to_unit_bus'}
        ] 
    },

    // ====================================
    // 자대 배치 및 적응기
    // ====================================
    {
        id: 'transfer_to_unit_bus', 
        type: 'milestone',
        title: "자대로 이동하는 버스 안",
        description: "훈련소를 떠나 자대로 향하는 버스 안. 긴장감이 감돈다.",
        choices: [
            { text: "긴장된다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "앞으로 어떤 일이 벌어질지 몰라 긴장된다.", nextEventId: 'arrival_new_unit_seniors' },
            { text: "기대된다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "새로운 환경에 대한 약간의 기대감도 있다.", nextEventId: 'arrival_new_unit_seniors' }
        ]
    },
    {
        id: 'arrival_new_unit_seniors', 
        type: 'milestone',
        title: "새로운 부대 도착과 선임들과의 첫 만남",
        description: "드디어 자대에 도착. 선임들의 날카로운 눈빛이 느껴진다.",
        choices: [
            { text: "씩씩하게 인사한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "최대한 예의 바르고 씩씩하게 첫인사를 했다.", nextEventId: 'job_assignment_training' },
            { text: "주눅 든 모습을 보인다", fatigueChange: 6, staminaChange: -1, outcomeDescription: "선임들의 포스에 눌려 자신감 없는 모습을 보였다.", nextEventId: 'job_assignment_training' }
        ]
    },
    {
        id: 'job_assignment_training', 
        type: 'milestone',
        title: "보직 배정 및 업무 교육",
        description: "나의 보직이 정해지고 관련 업무 교육을 받기 시작했다.",
        choices: [
            { text: "열심히 배운다", fatigueChange: 5, staminaChange: 1, outcomeDescription: "하나라도 놓치지 않으려 열심히 배우고 있다.", nextEventId: 'dealing_with_senior_hazing' },
            { text: "어렵다고 느낀다", fatigueChange: 7, staminaChange: -1, outcomeDescription: "처음 해보는 일이라 그런지 어렵게 느껴진다.", nextEventId: 'dealing_with_senior_hazing' }
        ]
    },
    {
        id: 'dealing_with_senior_hazing', 
        type: 'relationship',
        title: "선임의 갑질에 대한 대처",
        description: "한 선임이 유독 나에게 부당한 요구나 장난을 친다.",
        choices: [
            { text: "참고 넘어간다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "신병이라 어쩔 수 없다고 생각하며 참았다.", nextEventId: 'first_barracks_cleaning_inspection' },
            { text: "다른 선임에게 도움을 구한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "친절해 보이는 다른 선임에게 조심스럽게 이야기했다.", nextEventId: 'first_barracks_cleaning_inspection' },
            { text: "정식으로 문제를 제기한다", fatigueChange: 10, staminaChange: -2, outcomeDescription: "용기를 내어 간부에게 보고했지만, 상황이 더 복잡해질까 걱정된다.", nextEventId: 'first_barracks_cleaning_inspection' }
        ]
    },
    { 
        id: 'first_barracks_cleaning_inspection', 
        type: 'daily', 
        title: "첫 병영 생활관 정리 및 내무검사", 
        description: "자대에서의 첫 내무검사. 훈련소보다 더 엄격한 것 같다.", 
        choices: [
            { text: "선임들 눈치 보며 정리한다", fatigueChange: 6, staminaChange: -1, outcomeDescription: "선임들이 알려주는 팁을 참고해 정리했다.", nextEventId: 'designated_special_attention_soldier' }, 
            { text: "내 방식대로 정리하다 혼난다", fatigueChange: 8, staminaChange: -2, outcomeDescription: "나름대로 깔끔하게 했다고 생각했는데 기준이 다른 모양이다.", nextEventId: 'designated_special_attention_soldier' }
        ] 
    },
    { 
        id: 'designated_special_attention_soldier', 
        type: 'special', 
        title: "자대 적응 실패와 관심병사 지정", 
        description: "자대 생활에 적응하지 못하는 모습을 보여 관심병사로 지정될 위기에 처했다.", 
        choices: [
            { text: "간부 상담에 솔직하게 임한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "고충을 솔직하게 털어놓고 도움을 요청했다.", nextEventId: 'learning_unit_surroundings' }, 
            { text: "괜찮은 척 연기한다", fatigueChange: 7, staminaChange: -2, outcomeDescription: "문제없다고 강조했지만 간부는 의심스러운 눈치다.", nextEventId: 'learning_unit_surroundings' }
        ] 
    },
    { 
        id: 'learning_unit_surroundings', 
        type: 'daily', 
        title: "부대 주변 지리 익히기", 
        description: "부대 내 시설 위치와 주변 지리를 파악해야 한다.", 
        choices: [
            { text: "선임에게 물어보며 익힌다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "선임들에게 이곳저곳을 물어가며 익혔다.", nextEventId: 'first_leave_request_denied' }, 
            { text: "혼자 돌아다니며 익힌다", fatigueChange: 4, staminaChange: -1, outcomeDescription: "지리를 파악하며 몇 번 길을 잃기도 했다.", nextEventId: 'first_leave_request_denied' }
        ] 
    },
    { 
        id: 'first_leave_request_denied', 
        type: 'leave', 
        title: "처음으로 받은 휴가 신청 거부", 
        description: "기대했던 첫 휴가 신청이 거부되었다. 실망감이 크다.", 
        choices: [
            { text: "이유를 묻고 납득한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "부대 상황이 있어서 어쩔 수 없다고 이해했다.", nextEventId: 'learning_unspoken_rules' }, 
            { text: "크게 실망하고 의욕을 잃는다", fatigueChange: 10, staminaChange: -2, outcomeDescription: "기대가 컸던 만큼 실망감도 크다.", nextEventId: 'learning_unspoken_rules' }
        ] 
    },
    { 
        id: 'learning_unspoken_rules', 
        type: 'daily', 
        title: "선임들의 암묵적인 규칙 배우기", 
        description: "명문화되지 않았지만 지켜야 하는 부대 내 규칙들을 눈치껏 배워야 한다.", 
        choices: [
            { text: "눈치껏 보고 따라 한다", fatigueChange: 4, staminaChange: 0, outcomeDescription: "암묵적인 규칙들을 하나씩 배워가고 있다.", nextEventId: 'finding_place_in_unit' }, 
            { text: "모르고 어겼다가 혼난다", fatigueChange: 7, staminaChange: -1, outcomeDescription: "알려주지 않은 규칙을 어겨 혼났다.", nextEventId: 'finding_place_in_unit' }
        ] 
    },
    { 
        id: 'finding_place_in_unit', 
        type: 'relationship', 
        title: "부대 내 자신만의 위치 찾기", 
        description: "선임과 동기들 사이에서 나만의 역할과 위치를 만들어가야 한다.", 
        choices: [
            { text: "맡은 일을 묵묵히 한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "묵묵히 내 역할을 해내면서 인정받기 시작했다.", nextEventId: 'first_unit_morning_roll_call' }, 
            { text: "적극적으로 나서서 관계를 만든다", fatigueChange: 2, staminaChange: 1, outcomeDescription: "적극적으로 다가가며 동료들과 친해졌다.", nextEventId: 'first_unit_morning_roll_call' }
        ] 
    },
    { 
        id: 'first_unit_morning_roll_call', 
        type: 'daily', 
        title: "자대 첫 아침점호와 긴장감", 
        description: "자대에서의 첫 아침 점호. 훈련소와는 다른 분위기에 긴장된다.", 
        choices: [
            { text: "긴장해서 실수한다", fatigueChange: 6, staminaChange: -1, outcomeDescription: "긴장한 탓에 인원 보고를 틀렸다.", nextEventId: 'seniors_newbie_test' }, 
            { text: "침착하게 점호에 임한다", fatigueChange: 4, staminaChange: 0, outcomeDescription: "침착하게 점호를 마쳤다.", nextEventId: 'seniors_newbie_test' }
        ] 
    },
    { 
        id: 'seniors_newbie_test', 
        type: 'relationship', 
        title: "선임들의 신병 테스트와 대응", 
        description: "선임들이 짓궂은 질문이나 장난으로 신병을 떠본다.", 
        choices: [
            { text: "재치있게 받아넘긴다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "침착하게 대응하여 선임들에게 좋은 인상을 주었다.", nextEventId: 'witnessing_bullying_dilemma' }, 
            { text: "어쩔 줄 몰라 당황한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "당황해서 제대로 대응하지 못했다.", nextEventId: 'witnessing_bullying_dilemma' }
        ] 
    },
    { 
        id: 'witnessing_bullying_dilemma', 
        type: 'relationship', 
        title: "부대 내 약자 괴롭힘 목격과 고민", 
        description: "한 선임이 동기나 후임을 괴롭히는 것을 목격했다. 어떻게 해야 할까?", 
        choices: [
            { text: "못 본 척한다", fatigueChange: 6, staminaChange: -1, outcomeDescription: "괜히 끼어들었다가 상황이 더 악화될까 봐 모른 척했다.", nextEventId: 'first_duty_assignment_unit' }, 
            { text: "용기를 내 말린다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "위험을 무릅쓰고 개입했다. 긴장되는 순간이었다.", nextEventId: 'first_duty_assignment_unit' }, 
            { text: "간부에게 익명으로 보고한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "익명으로 부대 내 괴롭힘을 보고했다.", nextEventId: 'first_duty_assignment_unit' }
        ] 
    },
    { 
        id: 'first_duty_assignment_unit', 
        type: 'daily', 
        title: "자대 배치 후 첫 당직 근무", 
        description: "처음으로 당직 근무(불침번 등)에 투입되었다.", 
        choices: [
            { text: "선임의 지시에 따라 근무한다", fatigueChange: 12, staminaChange: -2, outcomeDescription: "첫 근무라 긴장했지만 무사히 마쳤다.", nextEventId: 'learning_unit_daily_schedule' }, 
            { text: "긴장해서 실수를 연발한다", fatigueChange: 15, staminaChange: -3, outcomeDescription: "너무 긴장한 나머지 여러 실수를 저질렀다.", nextEventId: 'learning_unit_daily_schedule' }
        ] 
    },
    { 
        id: 'learning_unit_daily_schedule', 
        type: 'daily', 
        title: "부대 내 일과표 숙지하기", 
        description: "자대의 일과표는 훈련소와 다르다. 빨리 숙지해야 한다.", 
        choices: [
            { text: "일과표를 보고 외운다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "일과표를 철저히 외워 실수하지 않으려 노력했다.", nextEventId: 'assigned_cleaning_area' }, 
            { text: "선임에게 물어본다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "선임에게 물어보며 일과표를 익혔다.", nextEventId: 'assigned_cleaning_area' }
        ] 
    },
    { 
        id: 'assigned_cleaning_area', 
        type: 'daily', 
        title: "생활관 청소 구역 배정받기", 
        description: "내가 담당할 청소 구역이 정해졌다.", 
        choices: [
            { text: "책임감을 갖고 깨끗이 청소한다", fatigueChange: 5, staminaChange: 0, outcomeDescription: "내 구역은 완벽하게 청소하겠다는 마음으로 임했다.", nextEventId: 'exploring_unit_facilities' }, 
            { text: "대충 눈치껏 청소한다", fatigueChange: 3, staminaChange: -1, outcomeDescription: "그냥 눈에 띄게 더럽지 않을 정도로만 청소했다.", nextEventId: 'exploring_unit_facilities' }
        ] 
    },
    { 
        id: 'exploring_unit_facilities', 
        type: 'daily', 
        title: "부대 주변 편의시설 탐색", 
        description: "PX, 사이버지식정보방 등 부대 내 편의시설 위치를 알아둔다.", 
        choices: [
            { text: "직접 돌아다니며 확인한다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "직접 돌아다니며 편의시설 위치를 파악했다.", nextEventId: 'deciding_first_weekend_plan' }, 
            { text: "선임에게 물어본다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "선임에게 물어보고 위치를 파악했다.", nextEventId: 'deciding_first_weekend_plan' }
        ] 
    },
    { 
        id: 'deciding_first_weekend_plan', 
        type: 'daily', 
        title: "자대 배치 후 첫 주말 어떻게 보낼지 결정", 
        description: "자대에서의 첫 주말. 무엇을 하며 보낼까?", 
        choices: [
            { text: "밀린 잠을 잔다", fatigueChange: -10, staminaChange: 3, outcomeDescription: "오랜만에 실컷 자니 개운하다.", nextEventId: 'understanding_informal_hierarchy' }, 
            { text: "동기들과 시간을 보낸다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "동기들과 이야기하며 친해지는 시간을 가졌다.", nextEventId: 'understanding_informal_hierarchy' }, 
            { text: "개인정비 및 공부를 한다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "여가 시간을 효율적으로 활용했다.", nextEventId: 'understanding_informal_hierarchy' }
        ] 
    },
    { 
        id: 'understanding_informal_hierarchy', 
        type: 'relationship', 
        title: "자대 내 비공식 서열 파악하기", 
        description: "계급 외에 선임들 간의 비공식적인 서열이 존재하는 것 같다.", 
        choices: [
            { text: "눈치껏 행동하며 파악한다", fatigueChange: 3, staminaChange: -1, outcomeDescription: "선임들 사이의 미묘한 관계를 파악하기 시작했다.", nextEventId: 'first_conversation_with_senior' }, 
            { text: "크게 신경 쓰지 않는다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "나는 나대로 행동하기로 했다.", nextEventId: 'first_conversation_with_senior' }
        ] 
    },
    // events.js - Part 3 of 7: 일상 생활과 근무
// 전체 게임을 위해서는 모든 파트를 하나의 events.js 파일로 합쳐야 합니다.

// Part 2에서 이어짐 - 이 문구는 실제 병합 시 삭제하세요
// const events = [ 로 시작하는 배열 선언 이후 쉼표를 넣고 이어서 작성합니다.

    { 
        id: 'first_conversation_with_senior', 
        type: 'relationship', 
        title: "선임과의 첫 대화와 인상", 
        description: "선임 중 한 명과 처음으로 개인적인 대화를 나누었다.", 
        choices: [
            { text: "좋은 인상을 주려 노력한다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "좋은 첫인상을 남기려고 노력했다.", nextEventId: 'learning_unit_taboos' }, 
            { text: "솔직하게 내 생각을 말한다", fatigueChange: 3, staminaChange: -1, outcomeDescription: "솔직한 생각을 말했더니 의외로 호감을 얻었다.", nextEventId: 'learning_unit_taboos' }
        ] 
    },
    { 
        id: 'learning_unit_taboos', 
        type: 'daily', 
        title: "부대 내 금기사항 배우기", 
        description: "부대 내에서 절대 해서는 안 되는 행동이나 말들을 배운다.", 
        choices: [
            { text: "주의 깊게 듣고 기억한다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "금기사항들을 잘 숙지했다.", nextEventId: 'receiving_military_life_tips' }, 
            { text: "실수하며 배운다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "직접 당해봐야 기억에 남는다.", nextEventId: 'receiving_military_life_tips' }
        ] 
    },
    { 
        id: 'receiving_military_life_tips', 
        type: 'relationship', 
        title: "군 생활 노하우 전수받기", 
        description: "선임이 군 생활을 잘하는 요령이나 팁을 알려준다.", 
        choices: [
            { text: "감사히 듣고 참고한다", fatigueChange: -2, staminaChange: 0, outcomeDescription: "선임의 조언을 귀담아 들었다.", nextEventId: 'discovering_secret_snack_spot' }, 
            { text: "한 귀로 듣고 흘린다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "별로 도움 될 것 같지 않아 대충 듣고 넘겼다.", nextEventId: 'discovering_secret_snack_spot' }
        ] 
    },
    { 
        id: 'discovering_secret_snack_spot', 
        type: 'daily', 
        title: "자대 내 비밀 간식 장소 발견", 
        description: "선임들만 아는 비밀스러운 간식 보관 장소를 우연히 발견했다.", 
        choices: [
            { text: "못 본 척한다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "모른 척 지나쳤다.", nextEventId: 'understanding_commander_personality' }, 
            { text: "나중에 몰래 이용한다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "아무도 없을 때 잠깐 이용해 봤다.", nextEventId: 'understanding_commander_personality' }
        ] 
    },
    { 
        id: 'understanding_commander_personality', 
        type: 'relationship', 
        title: "부대 지휘관 성향 파악하기", 
        description: "부대 지휘관(대대장 등)의 성격이나 중요하게 생각하는 점을 파악하는 것이 중요하다.", 
        choices: [
            { text: "선임들의 이야기를 참고한다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "선임들의 경험담을 토대로 지휘관의 성향을 파악했다.", nextEventId: 'overcoming_loneliness_without_peers' }, 
            { text: "직접 겪어보며 파악한다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "직접 관찰하며 지휘관의 스타일을 파악하려 했다.", nextEventId: 'overcoming_loneliness_without_peers' }
        ] 
    },

    // ====================================
    // 일상 생활과 근무 이벤트
    // ====================================
    { 
        id: 'morning_roll_call_exercise', 
        type: 'daily', 
        title: "아침 점호와 체조 시간", 
        description: "매일 아침 반복되는 점호와 체조. 졸리고 피곤하다.", 
        choices: [
            { text: "정신 차리고 참여한다", fatigueChange: 5, staminaChange: 1, outcomeDescription: "졸린 눈을 비비며 체조에 참여했다.", nextEventId: 'personal_time' }, 
            { text: "비몽사몽으로 따라 한다", fatigueChange: 7, staminaChange: -1, outcomeDescription: "몸은 움직이지만 정신은 아직 잠들어 있다.", nextEventId: 'personal_time' }
        ] 
    },
    { 
        id: 'nco_briefing_before_work', 
        type: 'daily', 
        title: "일과 시작 전 간부 브리핑", 
        description: "간부가 오늘 해야 할 일과 주의사항을 전달한다.", 
        choices: [
            { text: "집중해서 듣는다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "오늘의 중요한 일정을 숙지했다.", nextEventId: 'personal_time' }, 
            { text: "딴생각을 한다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "브리핑 내용이 한쪽 귀로 들어오고 한쪽 귀로 나갔다.", nextEventId: 'personal_time' }
        ] 
    },
    { 
        id: 'kitchen_duty_cook', 
        type: 'daily', 
        title: "취사병으로 주방 근무 투입", 
        description: "오늘은 내가 취사 지원 근무자. 새벽부터 일어나 식사 준비를 돕는다.", 
        choices: [
            { text: "열심히 돕는다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "힘들었지만 식사 준비를 열심히 도왔다.", nextEventId: 'personal_time' }, 
            { text: "요령껏 일한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "최소한의 일만 하며 체력을 아꼈다.", nextEventId: 'personal_time' }
        ] 
    },
    { 
        id: 'doing_chores_as_junior', 
        type: 'daily', 
        title: "부대 막내로 온갖 잡일 도맡기", 
        description: "막내는 부대의 모든 잡일을 도맡아 하는 경우가 많다.", 
        choices: [
            { text: "군말 없이 한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "불평하지 않고 맡은 일을 다 했다.", nextEventId: 'personal_time' }, 
            { text: "힘들다고 투덜댄다", fatigueChange: 10, staminaChange: -2, outcomeDescription: "불만을 표출했더니 더 많은 일을 맡게 되었다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'fighting_sleep_night_watch', 
        type: 'daily', 
        title: "야간 불침번 근무 중 졸음과의 싸움", 
        description: "새벽 근무는 졸음과의 싸움이다.", 
        choices: [
            { text: "찬물로 세수하며 잠을 쫓는다", fatigueChange: 12, staminaChange: -2, outcomeDescription: "여러 방법으로 졸음을 이겨냈다.", nextEventId: 'personal_time' }, 
            { text: "몰래 기대어 존다", fatigueChange: 8, staminaChange: 2, outcomeDescription: "잠깐 눈을 붙였는데 다행히 들키지 않았다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'reporting_unusual_activity_guard_post', 
        type: 'daily', 
        title: "초소 근무 중 특이사항 발견", 
        description: "근무 중 평소와 다른 움직임이나 소리를 감지했다.", 
        choices: [
            { text: "즉시 상황실에 보고한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "상황실에 보고했지만 별일은 아니었다.", nextEventId: 'personal_time' }, 
            { text: "잘못 본 것이라 생각하고 넘어간다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "신경이 예민해진 것 같다. 아무 일도 없었다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'weekend_duty_tv_remote_fight', 
        type: 'daily', 
        title: "주말 근무와 TV 시청 다툼", 
        description: "주말 근무 후 TV 채널 선택 문제로 선임/동기와 다툼이 생겼다.", 
        choices: [
            { text: "양보한다", fatigueChange: 3, staminaChange: -1, outcomeDescription: "원하는 프로그램을 못 봤지만 갈등은 피했다.", nextEventId: 'personal_time' }, 
            { text: "내가 보고 싶은 채널을 고집한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "결국 내 채널로 보긴 했지만 분위기가 어색해졌다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'cleaning_area_duty_inspection', 
        type: 'daily', 
        title: "부대 내 청소 구역 담당과 검사", 
        description: "담당 청소 구역을 깨끗하게 청소하고 검사를 받는다.", 
        choices: [
            { text: "꼼꼼하게 청소해서 칭찬받는다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "깨끗한 청소 상태에 간부가 칭찬해줬다.", nextEventId: 'personal_time' }, 
            { text: "대충 해서 지적받는다", fatigueChange: 6, staminaChange: -1, outcomeDescription: "청소가 제대로 안 됐다고 다시 하라는 지시를 받았다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'promoted_squad_leader_responsibility', 
        type: 'milestone', 
        title: "분대장으로 승격과 책임감", 
        description: "분대장으로 임명되었다. 책임감이 무겁게 느껴진다.", 
        choices: [
            { text: "분대원들을 잘 이끌겠다고 다짐한다", fatigueChange: 2, staminaChange: 1, outcomeDescription: "새로운 책임감을 갖고 최선을 다하겠다고 마음먹었다.", nextEventId: 'personal_time' }, 
            { text: "부담감을 느낀다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "갑작스런 책임에 어깨가 무거워졌다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'participating_religious_activities', 
        type: 'daily', 
        title: "부대 내 종교 활동 참여", 
        description: "주말 종교 활동에 참여하여 마음의 위안을 얻는다.", 
        choices: [
            { text: "경건한 마음으로 참여한다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "마음의 평화를 얻었다.", nextEventId: 'personal_time' }, 
            { text: "간식 때문에 참여한다", fatigueChange: -3, staminaChange: 1, outcomeDescription: "종교 활동 후 나오는 간식이 주 목적이다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'participating_military_contest', 
        type: 'special', 
        title: "군대 내 공모전 참가", 
        description: "부대 내에서 열리는 글짓기, 포스터 등 공모전에 참가해본다.", 
        choices: [
            { text: "최선을 다해 준비한다", fatigueChange: 5, staminaChange: 0, outcomeDescription: "열심히 준비한 결과 좋은 성적을 거두었다.", nextEventId: 'personal_time' }, 
            { text: "참가에 의의를 둔다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "형식적으로만 참여했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'mistake_following_orders_consequences', 
        type: 'special', 
        title: "상급자 지시 실수로 인한 문제 발생", 
        description: "상급자의 지시를 잘못 이해하고 처리하여 문제가 발생했다.", 
        choices: [
            { text: "즉시 보고하고 해결책을 찾는다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "솔직하게 실수를 인정하고 해결하려 노력했다.", nextEventId: 'personal_time' }, 
            { text: "실수를 덮으려 한다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "숨기려다 더 큰 문제가 되었다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'handling_classified_info_security_training', 
        type: 'training', 
        title: "군사기밀 취급과 보안 교육", 
        description: "군사기밀의 중요성과 보안 규정에 대해 교육받는다.", 
        choices: [
            { text: "보안의 중요성을 인지한다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "군사기밀 보안의 중요성을 깊이 이해했다.", nextEventId: 'personal_time' }, 
            { text: "나와는 상관없는 일이라 생각한다", fatigueChange: 0, staminaChange: 0, outcomeDescription: "내 업무와 직접 관련이 없어 대충 들었다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'counseling_session_with_officer', 
        type: 'relationship', 
        title: "간부와의 면담 시간", 
        description: "정기적인 간부와의 면담 시간. 무슨 이야기를 할까?", 
        choices: [
            { text: "솔직하게 고충을 이야기한다", fatigueChange: -3, staminaChange: 1, outcomeDescription: "간부가 내 고충을 이해해주고 조언해줬다.", nextEventId: 'personal_time' }, 
            { text: "별 문제 없다고 이야기한다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "특별한 문제가 없다고 했다. 형식적인 면담이었다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'unit_physical_fitness_test', 
        type: 'training', 
        title: "부대 내 체력 측정 및 평가", 
        description: "정기적으로 체력 측정을 실시하고 평가를 받는다.", 
        choices: [
            { text: "좋은 기록을 위해 노력한다", fatigueChange: 10, staminaChange: 1, outcomeDescription: "열심히 노력해 좋은 성적을 거두었다.", nextEventId: 'personal_time' }, 
            { text: "현상 유지에 만족한다", fatigueChange: 8, staminaChange: 0, outcomeDescription: "평균 정도의 성적으로 무난하게 통과했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'assigned_mentor_new_recruit', 
        type: 'relationship', 
        title: "전입신병 케어 담당자 지정", 
        description: "새로 들어온 신병의 적응을 돕는 역할을 맡게 되었다.", 
        choices: [
            { text: "책임감을 갖고 잘 챙겨준다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "내가 겪었던 어려움을 겪지 않도록 잘 도와주었다.", nextEventId: 'personal_time' }, 
            { text: "귀찮다고 생각한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "마지못해 도와주는 티가 났다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'participating_unit_beautification', 
        type: 'daily', 
        title: "부대 환경미화 작업에 투입", 
        description: "부대 내 화단 정리, 페인트칠 등 환경미화 작업에 참여한다.", 
        choices: [
            { text: "즐겁게 참여한다", fatigueChange: 6, staminaChange: 0, outcomeDescription: "힘들지만 부대가 깨끗해지는 것을 보니 보람차다.", nextEventId: 'personal_time' }, 
            { text: "힘들다고 느낀다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "육체노동에 지쳐버렸다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'armory_management_weapon_check', 
        type: 'daily', 
        title: "무기고 관리 및 총기 점검", 
        description: "무기고 관리 담당으로 총기 및 탄약 상태를 점검한다.", 
        choices: [
            { text: "꼼꼼하게 확인하고 기록한다", fatigueChange: 4, staminaChange: 0, outcomeDescription: "모든 장비를 세심하게 점검했다.", nextEventId: 'personal_time' }, 
            { text: "대충 확인한다", fatigueChange: 2, staminaChange: -1, outcomeDescription: "겉으로 보이는 상태만 대충 확인했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'going_on_first_leave', 
        type: 'leave', 
        title: "군 생활 중 첫 휴가 나가기", 
        description: "드디어 기다리고 기다리던 첫 휴가다!", 
        choices: [
            { text: "설레는 마음으로 부대를 나선다", fatigueChange: -30, staminaChange: 5, outcomeDescription: "오랜만의 자유, 가슴이 벅차다!", nextEventId: 'adjusting_after_leave_return' }, 
            { text: "휴가 계획을 다시 점검한다", fatigueChange: -25, staminaChange: 4, outcomeDescription: "짧은 휴가를 알차게 보내기 위해 계획을 다시 점검했다.", nextEventId: 'adjusting_after_leave_return' }
        ]
    },
    { 
        id: 'adjusting_after_leave_return', 
        type: 'leave', 
        title: "휴가 복귀 후 적응하기", 
        description: "달콤했던 휴가가 끝나고 부대로 복귀했다. 다시 군 생활 모드.", 
        choices: [
            { text: "빠르게 다시 적응한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "아쉽지만 현실로 돌아와 빠르게 적응했다.", nextEventId: 'personal_time' }, 
            { text: "휴가 후유증을 겪는다", fatigueChange: 15, staminaChange: -3, outcomeDescription: "휴가병이 심하게 걸렸다. 적응이 힘들다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'internet_usage_time_limit', 
        type: 'daily', 
        title: "부대 내 인터넷 사용 시간 제한", 
        description: "사이버지식정보방 이용 시간이 제한되어 있다.", 
        choices: [
            { text: "정해진 시간만 이용한다", fatigueChange: 0, staminaChange: 0, outcomeDescription: "규칙을 잘 지키며 이용했다.", nextEventId: 'personal_time' }, 
            { text: "시간이 부족하다고 느낀다", fatigueChange: 2, staminaChange: -1, outcomeDescription: "너무 짧은 시간에 뭘 하라는 건지...", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'using_off_duty_time_self_improvement', 
        type: 'daily', 
        title: "일과 후 자기계발 시간 활용", 
        description: "일과 후 개인 시간을 활용하여 자기계발을 한다.", 
        choices: [
            { text: "자격증 공부를 한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "미래를 위해 자격증 공부에 집중했다.", nextEventId: 'personal_time' }, 
            { text: "운동을 한다", fatigueChange: -2, staminaChange: 1, outcomeDescription: "체력 단련에 시간을 투자했다.", nextEventId: 'personal_time' }, 
            { text: "휴식을 취한다", fatigueChange: -5, staminaChange: 2, outcomeDescription: "그냥 쉬는 게 최고다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'using_unit_library', 
        type: 'daily', 
        title: "군대 내 도서관 이용", 
        description: "부대 내 도서관에서 책을 빌려 읽는다.", 
        choices: [
            { text: "다양한 책을 읽는다", fatigueChange: -3, staminaChange: 1, outcomeDescription: "다양한 분야의 책을 읽으며 지식을 넓혔다.", nextEventId: 'personal_time' }, 
            { text: "만화책 위주로 본다", fatigueChange: -2, staminaChange: 1, outcomeDescription: "가벼운 만화책으로 스트레스를 해소했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'using_unit_gym_facilities', 
        type: 'daily', 
        title: "부대 내 운동 시설 이용", 
        description: "체력 단련실에서 운동하며 체력을 관리한다.", 
        choices: [
            { text: "꾸준히 운동한다", fatigueChange: -5, staminaChange: 2, outcomeDescription: "규칙적인 운동으로 체력이 향상되고 있다.", nextEventId: 'personal_time' }, 
            { text: "가끔 이용한다", fatigueChange: -1, staminaChange: 1, outcomeDescription: "시간 날 때만 운동하는 정도다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'adhering_to_lights_out_sleep_disturbances', 
        type: 'daily', 
        title: "취침 시간 엄수와 취침 방해 요소", 
        description: "정해진 시간에 잠자리에 들어야 하지만, 코골이 등 방해 요소가 있다.", 
        choices: [
            { text: "최대한 잠을 청하려 노력한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "소음에도 불구하고 잠을 청하려 노력했다.", nextEventId: 'personal_time' }, 
            { text: "잠을 설친다", fatigueChange: 8, staminaChange: -2, outcomeDescription: "밤새 잠을 설쳤다. 피곤하다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'waking_up_late_peer', 
        type: 'daily', 
        title: "아침 기상 시간에 늦은 동료 깨우기", 
        description: "옆자리 동료가 기상 시간에 일어나지 못하고 있다.", 
        choices: [
            { text: "흔들어 깨운다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "동료가 지각하지 않도록 깨워줬다.", nextEventId: 'personal_time' }, 
            { text: "못 본 척한다", fatigueChange: 0, staminaChange: 0, outcomeDescription: "본인의 책임이라 생각하고 그냥 뒀다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'writing_reporting_weekly_work_plan', 
        type: 'daily', 
        title: "주간 업무 계획 작성과 보고", 
        description: "자신의 주간 업무 계획을 작성하여 보고해야 한다.", 
        choices: [
            { text: "꼼꼼하게 작성하여 보고한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "계획을 상세히 작성하여 보고했다.", nextEventId: 'personal_time' }, 
            { text: "대충 작성한다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "형식적으로 대충 작성했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'participating_weekly_unit_cleanup', 
        type: 'daily', 
        title: "매주 부대 미화의 날 참여", 
        description: "매주 정해진 시간에 부대 전체 대청소를 실시한다.", 
        choices: [
            { text: "열심히 청소한다", fatigueChange: 6, staminaChange: -1, outcomeDescription: "구석구석 열심히 청소했다.", nextEventId: 'personal_time' }, 
            { text: "요령껏 참여한다", fatigueChange: 4, staminaChange: 0, outcomeDescription: "보이는 곳만 대충 치웠다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'maintaining_shaving_haircut_rules', 
        type: 'daily', 
        title: "면도 및 두발 규정 준수", 
        description: "용모 단정 규정에 따라 면도와 두발 상태를 유지해야 한다.", 
        choices: [
            { text: "매일 깔끔하게 관리한다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "규정에 맞게 깔끔하게 관리했다.", nextEventId: 'personal_time' }, 
            { text: "가끔 지적받는다", fatigueChange: 3, staminaChange: -1, outcomeDescription: "관리를 소홀히 해서 지적을 받았다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'participating_no_smoking_drinking_campaign', 
        type: 'special', 
        title: "금연/금주 캠페인 참여", 
        description: "부대 내에서 진행하는 금연/금주 캠페인에 참여한다.", 
        choices: [
            { text: "적극 동참한다", fatigueChange: 0, staminaChange: 1, outcomeDescription: "건강한 생활 습관에 동참했다.", nextEventId: 'personal_time' }, 
            { text: "형식적으로 참여한다", fatigueChange: 0, staminaChange: 0, outcomeDescription: "캠페인이 형식적으로 느껴졌다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'military_diet_nutrition_management', 
        type: 'daily', 
        title: "군대 내 식단과 영양 관리", 
        description: "정해진 식단이지만, 건강을 위해 영양을 신경 써서 섭취한다.", 
        choices: [
            { text: "골고루 먹으려 노력한다", fatigueChange: -1, staminaChange: 1, outcomeDescription: "영양 균형을 위해 다양한 반찬을 먹었다.", nextEventId: 'personal_time' }, 
            { text: "편식한다", fatigueChange: 2, staminaChange: -1, outcomeDescription: "좋아하는 것만 골라 먹었다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'organizing_personal_items_barracks', 
        type: 'daily', 
        title: "생활관 내 개인물품 정리 방법", 
        description: "관물대와 침상 주변을 항상 깔끔하게 정리해야 한다.", 
        choices: [
            { text: "항상 정리정돈한다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "물건마다 자리를 정해 항상 깔끔하게 유지했다.", nextEventId: 'personal_time' }, 
            { text: "검사 전에만 정리한다", fatigueChange: 3, staminaChange: -1, outcomeDescription: "검사 직전에 급하게 정리했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'handling_unit_recycling', 
        type: 'daily', 
        title: "부대 내 분리수거 담당", 
        description: "분리수거 담당으로 지정되어 쓰레기를 분리 배출한다.", 
        choices: [
            { text: "꼼꼼하게 분리수거한다", fatigueChange: 4, staminaChange: -1, outcomeDescription: "환경을 생각해 철저히 분리수거했다.", nextEventId: 'personal_time' }, 
            { text: "대충 처리한다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "눈에 띄게 대충만 하지 않았다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'utilizing_break_time', 
        type: 'daily', 
        title: "휴식 시간 활용법", 
        description: "짧은 휴식 시간을 어떻게 활용할까?", 
        choices: [
            { text: "잠깐 눈을 붙인다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "짧은 낮잠으로 에너지를 충전했다.", nextEventId: 'personal_time' }, 
            { text: "동기와 잡담한다", fatigueChange: -2, staminaChange: 0, outcomeDescription: "동기와 이야기하며 스트레스를 풀었다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'joy_receiving_letters_parcels', 
        type: 'relationship', 
        title: "편지와 소포 받는 날의 기쁨", 
        description: "가족이나 친구에게서 온 편지나 소포를 받았다. 정말 기쁘다.", 
        choices: [
            { text: "답장을 바로 쓴다", fatigueChange: -8, staminaChange: 1, outcomeDescription: "감사한 마음으로 바로 답장을 썼다.", nextEventId: 'personal_time' }, 
            { text: "동기들에게 자랑한다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "받은 물건을 동기들과 나누며 기쁨을 나눴다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'hearing_strange_noises_night_watch', 
        type: 'daily', 
        title: "야간 경계 근무 중 이상한 소리 듣기", 
        description: "근무 중 정적 속에서 이상한 소리가 들려온다.", 
        choices: [
            { text: "긴장하며 주변을 살핀다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "경계를 강화하고 주변을 살폈지만 특이사항은 없었다.", nextEventId: 'personal_time' }, 
            { text: "잘못 들은 것이라 생각한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "신경이 곤두서서 그런 것 같다고 생각했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'discovering_hidden_rest_area', 
        type: 'daily', 
        title: "부대 내 숨겨진 휴식 공간 발견", 
        description: "우연히 간부나 선임들 눈에 잘 띄지 않는 조용한 휴식 공간을 발견했다.", 
        choices: [
            { text: "혼자 조용히 이용한다", fatigueChange: -4, staminaChange: 1, outcomeDescription: "나만의 비밀 공간이 생겨 기분이 좋다.", nextEventId: 'personal_time' }, 
            { text: "친한 동기에게만 알려준다", fatigueChange: -3, staminaChange: 1, outcomeDescription: "믿을 만한 친구에게만 장소를 공유했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'meditation_stress_management_military', 
        type: 'daily', 
        title: "군대 내 명상과 스트레스 관리", 
        description: "스트레스 해소를 위해 명상이나 다른 방법을 시도해본다.", 
        choices: [
            { text: "조용히 명상 시간을 갖는다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "마음을 비우고 명상하니 평온해졌다.", nextEventId: 'personal_time' }, 
            { text: "운동으로 스트레스를 푼다", fatigueChange: -3, staminaChange: 1, outcomeDescription: "땀을 흘리며 스트레스를 날려버렸다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'asking_senior_questions_technique', 
        type: 'relationship', 
        title: "선임에게 업무 질문하는 기술", 
        description: "업무 중 모르는 것을 선임에게 물어봐야 한다. 어떻게 물어볼까?", 
        choices: [
            { text: "최대한 예의를 갖춰 질문한다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "정중하게 질문하니 친절히 알려주셨다.", nextEventId: 'personal_time' }, 
            { text: "눈치껏 타이밍을 봐서 질문한다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "선임이 바쁘지 않을 때를 골라 질문했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'spending_time_with_peers_after_work', 
        type: 'relationship', 
        title: "동기와 함께하는 일과 후 시간", 
        description: "일과 후 동기들과 모여 이야기를 나누거나 함께 시간을 보낸다.", 
        choices: [
            { text: "즐겁게 어울린다", fatigueChange: -4, staminaChange: 1, outcomeDescription: "함께 웃고 떠들며 즐거운 시간을 보냈다.", nextEventId: 'personal_time' }, 
            { text: "피곤해서 먼저 쉰다", fatigueChange: -2, staminaChange: 2, outcomeDescription: "오늘은 너무 피곤해서 일찍 잠자리에 들었다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'using_communal_washing_machine_rules', 
        type: 'daily', 
        title: "부대 내 공용 세탁기 사용 규칙", 
        description: "공용 세탁기 사용 순서와 규칙을 지켜야 한다.", 
        choices: [
            { text: "규칙에 따라 사용한다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "순서를 지키고 사용 후 깔끔하게 정리했다.", nextEventId: 'personal_time' }, 
            { text: "규칙을 어겨 눈총을 받는다", fatigueChange: 3, staminaChange: -1, outcomeDescription: "너무 급해서 새치기했다가 눈총을 받았다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'overcoming_loneliness_without_peers', 
        type: 'relationship', 
        title: "동기 없는 부대에서 외로움 극복하기", 
        description: "자대에 동기가 없어 외로움을 느낀다.", 
        choices: [
            { text: "선임/후임과 친해지려 노력한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "새로운 관계를 만들기 위해 노력했다.", nextEventId: 'first_weekend_leave_return' }, 
            { text: "혼자만의 시간을 즐긴다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "오히려 혼자 있는 시간을 즐기기로 했다.", nextEventId: 'first_weekend_leave_return' }
        ]
    },
    // events.js - Part 4 of 7: 훈련 및 작전
// 전체 게임을 위해서는 모든 파트를 하나의 events.js 파일로 합쳐야 합니다.

// Part 3에서 이어짐 - 이 문구는 실제 병합 시 삭제하세요
// const events = [ 로 시작하는 배열 선언 이후 쉼표를 넣고 이어서 작성합니다.

    { 
        id: 'first_weekend_leave_return', 
        type: 'leave', 
        title: "첫 주말 출타와 복귀", 
        description: "짧은 첫 주말 출타(외출/외박)를 다녀왔다. 복귀하니 현실이다.", 
        choices: [
            { text: "아쉬움을 뒤로하고 복귀한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "짧은 자유였지만 다시 현실로 돌아왔다.", nextEventId: 'learning_military_slang' }, 
            { text: "복귀 시간을 아슬아슬하게 맞춘다", fatigueChange: 8, staminaChange: -2, outcomeDescription: "마지막까지 놀다가 간신히 제시간에 돌아왔다.", nextEventId: 'learning_military_slang' }
        ] 
    },
    { 
        id: 'learning_military_slang', 
        type: 'daily', 
        title: "군대 특유의 은어와 속어 배우기", 
        description: "선임들이 사용하는 알아들을 수 없는 은어와 속어들을 배운다.", 
        choices: [
            { text: "따라 하며 익숙해진다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "군대 용어를 따라 말하며 익숙해졌다.", nextEventId: 'night_march_injury' }, 
            { text: "무슨 뜻인지 물어본다", fatigueChange: 0, staminaChange: 0, outcomeDescription: "모르는 용어는 물어보며 배웠다.", nextEventId: 'night_march_injury' }
        ] 
    },

    // ====================================
    // 훈련 및 작전 이벤트
    // ====================================
    { 
        id: 'night_march_injury', 
        type: 'training', 
        title: "야간 행군 훈련 중 부상", 
        description: "야간 행군 중 발목을 접질렸다. 통증이 심하다.", 
        choices: [
            { text: "참고 계속 걷는다", fatigueChange: 25, staminaChange: -5, outcomeDescription: "아픔을 참고 계속 행군했다. 악화될까 걱정된다.", nextEventId: 'personal_time' }, 
            { text: "의무병에게 보고한다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "의무병에게 상태를 알리고 치료받았다.", nextEventId: 'personal_time' }
        ] 
    },
    { 
        id: 'winter_training_cold_adapt', 
        type: 'training', 
        title: "동계 훈련과 혹한기 적응", 
        description: "혹한기 훈련이 시작되었다. 살을 에는 추위와의 싸움이다.", 
        choices: [
            { text: "추위를 이겨낸다", fatigueChange: 20, staminaChange: -3, outcomeDescription: "극한의 추위에 맞서 훈련을 완수했다.", nextEventId: 'personal_time' }, 
            { text: "방한에 신경 쓴다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "동상 방지를 위해 보온에 신경 썼다.", nextEventId: 'personal_time' }
        ] 
    },
    { 
        id: 'live_fire_exercise_record_compete', 
        type: 'training', 
        title: "실전 사격 훈련과 기록 경쟁", 
        description: "실제 전투 상황을 가정한 사격 훈련. 기록 경쟁이 치열하다.", 
        choices: [
            { text: "높은 명중률을 기록한다", fatigueChange: 8, staminaChange: 1, outcomeDescription: "집중력을 발휘해 좋은 성적을 거두었다.", nextEventId: 'personal_time' }, 
            { text: "평균적인 기록을 낸다", fatigueChange: 6, staminaChange: 0, outcomeDescription: "무난한 성적으로 통과했다.", nextEventId: 'personal_time' }
        ] 
    },
    { 
        id: 'participating_recon_operation_training', 
        type: 'training', 
        title: "수색 작전 훈련 참여", 
        description: "적진이나 특정 지역을 수색하는 훈련에 참여한다.", 
        choices: [
            { text: "지형을 주의 깊게 살피며 수색한다", fatigueChange: 12, staminaChange: -1, outcomeDescription: "지형지물을 활용한 효과적인 수색 방법을 배웠다.", nextEventId: 'personal_time' }, 
            { text: "피로 때문에 집중력이 떨어진다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "훈련 중 집중력이 떨어져 몇 번 놓친 부분이 있었다.", nextEventId: 'personal_time' }
        ] 
    },
    { 
        id: 'tactical_training_mistake_retraining', 
        type: 'training', 
        title: "전술 훈련 중 실수와 재교육", 
        description: "전술 훈련 중 중요한 실수를 하여 재교육을 받게 되었다.", 
        choices: [
            { text: "실수를 인정하고 열심히 재교육받는다", fatigueChange: 10, staminaChange: 0, outcomeDescription: "실수를 통해 더 정확히 전술을 이해하게 되었다.", nextEventId: 'personal_time' }, 
            { text: "자존심이 상한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "지적받는 것이 불편했지만 참고 재교육을 받았다.", nextEventId: 'personal_time' }
        ] 
    },
    { 
        id: 'participating_regiment_large_scale_training', 
        type: 'training', 
        title: "연대급 대규모 훈련 참가", 
        description: "여러 부대가 함께 참여하는 대규모 훈련에 참가했다.", 
        choices: [
            { text: "긴장되지만 제 역할을 다한다", fatigueChange: 18, staminaChange: -2, outcomeDescription: "큰 규모의 훈련이었지만 맡은 임무를 잘 수행했다.", nextEventId: 'personal_time' }, 
            { text: "혼란스러운 상황에 정신이 없다", fatigueChange: 20, staminaChange: -3, outcomeDescription: "너무 많은 인원과 복잡한 상황에 혼란스러웠다.", nextEventId: 'personal_time' }
        ] 
    },
    { 
        id: 'enemy_infiltration_scenario_training', 
        type: 'training', 
        title: "적 침투 상황 가정 훈련", 
        description: "부대에 적이 침투한 상황을 가정한 훈련을 실시한다.", 
        choices: [
            { text: "훈련 절차에 따라 침착하게 대응한다", fatigueChange: 10, staminaChange: 0, outcomeDescription: "훈련된 대로 냉정하게 상황에 대처했다.", nextEventId: 'personal_time' }, 
            { text: "실제 상황처럼 긴장한다", fatigueChange: 12, staminaChange: -1, outcomeDescription: "실전처럼 생각하며 긴장감 속에 훈련에 임했다.", nextEventId: 'personal_time' }
        ] 
    },
    { 
        id: 'reconnaissance_mission_operational_area', 
        type: 'training', 
        title: "작전 지역 정찰 임무", 
        description: "작전 투입 전, 해당 지역을 정찰하는 임무를 맡았다.", 
        choices: [
            { text: "위험 요소를 꼼꼼히 파악한다", fatigueChange: 12, staminaChange: -1, outcomeDescription: "주변 환경과 위험 요소를 철저히 파악했다.", nextEventId: 'personal_time' }, 
            { text: "정해진 경로만 따라 정찰한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "지시받은 경로를 따라 임무를 완수했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'evacuation_drill_emergency', 
        type: 'training', 
        title: "유사시 대피 훈련", 
        description: "비상 상황 발생 시 신속하게 대피하는 훈련을 한다.", 
        choices: [
            { text: "대피 경로와 절차를 숙지한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "비상시 행동요령을 정확히 익혔다.", nextEventId: 'personal_time' }, 
            { text: "훈련이지만 귀찮게 느껴진다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "형식적인 훈련이라 생각하며 대충 참여했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'fire_response_training_firefighting_education', 
        type: 'training', 
        title: "화재 대응 훈련 및 소방 교육", 
        description: "부대 내 화재 발생 시 대처 요령과 소화기 사용법을 배운다.", 
        choices: [
            { text: "실습에 적극 참여한다", fatigueChange: 4, staminaChange: 0, outcomeDescription: "소화기 사용법을 직접 실습하며 완벽히 익혔다.", nextEventId: 'personal_time' }, 
            { text: "이론 교육에만 집중한다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "실습은 적극적이지 않았지만 이론은 잘 이해했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'wartime_emergency_recall', 
        type: 'training', 
        title: "전시 상황 대비 비상 소집", 
        description: "전시 상황을 가정하여 예고 없이 비상 소집 훈련을 실시한다.", 
        choices: [
            { text: "신속하게 집결 장소로 이동한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "신속하게 지정된 장소로 이동해 대기했다.", nextEventId: 'personal_time' }, 
            { text: "늑장 부리다 혼난다", fatigueChange: 10, staminaChange: -2, outcomeDescription: "준비가 늦어져 지적을 받았다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'cbrn_alert_response', 
        type: 'training', 
        title: "화생방 경보 발령과 대응", 
        description: "화생방 경보가 발령되었다. 신속하게 방독면을 착용하고 대응해야 한다.", 
        choices: [
            { text: "숙달된 대로 신속하게 대응한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "훈련된 대로 신속하게 방독면을 착용하고 대피했다.", nextEventId: 'personal_time' }, 
            { text: "허둥대며 방독면을 찾는다", fatigueChange: 12, staminaChange: -2, outcomeDescription: "긴장한 나머지 방독면을 찾는데 시간이 걸렸다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'communication_equipment_failure_alternative', 
        type: 'training', 
        title: "통신 장비 고장과 대체 통신 수단 활용", 
        description: "작전 중 통신 장비가 고장 났다. 대체 수단을 활용해야 한다.", 
        choices: [
            { text: "수신호 등 대체 수단을 활용한다", fatigueChange: 8, staminaChange: 0, outcomeDescription: "대체 통신 방법을 사용해 임무를 계속했다.", nextEventId: 'personal_time' }, 
            { text: "통신 두절로 당황한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "통신 두절 상황에 잠시 혼란스러웠다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'teamwork_improvement_group_training', 
        type: 'training', 
        title: "팀워크 향상을 위한 단체 훈련", 
        description: "분대원 또는 팀원 간의 협동심과 팀워크를 기르는 훈련이다.", 
        choices: [
            { text: "동료들과 호흡을 맞추려 노력한다", fatigueChange: 6, staminaChange: 0, outcomeDescription: "팀원들과 호흡을 맞추며 협력했다.", nextEventId: 'personal_time' }, 
            { text: "개인 플레이 위주로 한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "팀보다는 개인 능력에 의존했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'assigned_special_mission_success', 
        type: 'special', 
        title: "특수 임무 부여 및 성공적 수행", 
        description: "중요하고 어려운 특수 임무를 부여받아 성공적으로 완수했다.", 
        choices: [
            { text: "뿌듯함과 성취감을 느낀다", fatigueChange: -10, staminaChange: 2, outcomeDescription: "어려운 임무를 성공적으로 완수해 큰 성취감을 느꼈다.", nextEventId: 'personal_time' }, 
            { text: "포상을 기대한다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "임무 성공으로 휴가나 포상이 있을까 기대한다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'camouflage_training_using_terrain', 
        type: 'training', 
        title: "지형지물을 이용한 위장 훈련", 
        description: "주변 환경을 이용하여 자신의 몸을 숨기는 위장술을 배운다.", 
        choices: [
            { text: "효과적으로 위장한다", fatigueChange: 5, staminaChange: 0, outcomeDescription: "주변 환경과 완벽히 동화되어 위장했다.", nextEventId: 'personal_time' }, 
            { text: "위장이 어설퍼 지적받는다", fatigueChange: 7, staminaChange: -1, outcomeDescription: "위장이 미숙해 몇 번 지적을 받았다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'night_tactical_movement_training', 
        type: 'training', 
        title: "야간 전술 이동 훈련", 
        description: "야간에 소리 없이 은밀하게 이동하는 방법을 훈련한다.", 
        choices: [
            { text: "조용하고 신속하게 이동한다", fatigueChange: 12, staminaChange: -1, outcomeDescription: "소리 없이 목표 지점까지 이동하는데 성공했다.", nextEventId: 'personal_time' }, 
            { text: "소리를 내거나 넘어져 들킨다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "어두운 가운데 실수로 소리를 내 위치가 노출되었다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'survival_training_various_climates', 
        type: 'training', 
        title: "다양한 기후 조건에서의 생존 훈련", 
        description: "악천후 등 다양한 기후 속에서 생존하는 방법을 배운다.", 
        choices: [
            { text: "생존 기술을 습득한다", fatigueChange: 18, staminaChange: -2, outcomeDescription: "어려운 환경에서도 생존할 수 있는 기술을 배웠다.", nextEventId: 'personal_time' }, 
            { text: "극한 환경에 힘들어한다", fatigueChange: 22, staminaChange: -3, outcomeDescription: "힘든 환경 속에서 지치고 힘들었다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'enemy_rear_infiltration_operation_practice', 
        type: 'training', 
        title: "적진 후방 침투 작전 연습", 
        description: "적진 깊숙이 침투하여 특정 임무를 수행하는 작전을 연습한다.", 
        choices: [
            { text: "긴장감 속에서 임무를 수행한다", fatigueChange: 20, staminaChange: -2, outcomeDescription: "강한 집중력으로 적진 침투 작전을 성공적으로 마쳤다.", nextEventId: 'personal_time' }, 
            { text: "실수하여 작전이 실패할 뻔한다", fatigueChange: 25, staminaChange: -3, outcomeDescription: "중요한 시점에서 실수가 있었지만 가까스로 만회했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'rescue_escape_training', 
        type: 'training', 
        title: "구조 및 탈출 훈련", 
        description: "고립되거나 위험한 상황에서 구조되거나 탈출하는 방법을 훈련한다.", 
        choices: [
            { text: "탈출 경로를 확보한다", fatigueChange: 12, staminaChange: -1, outcomeDescription: "여러 탈출 경로를 확보하고 가장 안전한 길을 선택했다.", nextEventId: 'personal_time' }, 
            { text: "구조를 기다린다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "구조대를 기다리며 위치를 알리는 신호를 보냈다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'hill_capture_training', 
        type: 'training', 
        title: "고지 점령 훈련", 
        description: "중요한 고지를 점령하기 위한 공격 및 방어 훈련을 한다.", 
        choices: [
            { text: "맹렬하게 공격하여 고지를 점령한다", fatigueChange: 22, staminaChange: -3, outcomeDescription: "격렬한 공격으로 목표 고지를 성공적으로 점령했다.", nextEventId: 'personal_time' }, 
            { text: "방어선을 구축하고 고지를 사수한다", fatigueChange: 18, staminaChange: -2, outcomeDescription: "견고한 방어선을 구축해 적의 공격을 성공적으로 방어했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'water_survival_river_crossing_training', 
        type: 'training', 
        title: "수중 생존 및 도하 훈련", 
        description: "물 속에서 생존하고 강을 건너는 훈련을 받는다.", 
        choices: [
            { text: "수영 실력을 발휘한다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "수영 실력을 발휘해 도하 훈련을 잘 마쳤다.", nextEventId: 'personal_time' }, 
            { text: "물을 무서워한다", fatigueChange: 18, staminaChange: -3, outcomeDescription: "물에 대한 두려움 때문에 훈련이 어려웠다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'enemy_surprise_attack_response_training', 
        type: 'training', 
        title: "적의 기습 공격 대응 훈련", 
        description: "예상치 못한 적의 기습 공격에 대응하는 훈련이다.", 
        choices: [
            { text: "즉각적으로 엄폐하고 응사한다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "신속하게 엄폐 후 효과적으로 대응사격을 했다.", nextEventId: 'personal_time' }, 
            { text: "당황하여 제대로 대응하지 못한다", fatigueChange: 18, staminaChange: -3, outcomeDescription: "갑작스러운 상황에 당황해 적절히 대응하지 못했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'ambush_raid_tactics_practice', 
        type: 'training', 
        title: "매복 및 기습 전술 연습", 
        description: "적을 효과적으로 공격하기 위한 매복 및 기습 전술을 연습한다.", 
        choices: [
            { text: "유리한 지형을 선점한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "전술적으로 유리한 위치를 선점해 성공적인 매복을 실행했다.", nextEventId: 'personal_time' }, 
            { text: "기습 타이밍을 잡는다", fatigueChange: 12, staminaChange: -1, outcomeDescription: "완벽한 타이밍을 기다렸다가 기습 공격을 감행했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'urban_warfare_building_clearing_operation', 
        type: 'training', 
        title: "도시전 훈련과 건물 소탕 작전", 
        description: "시가지 전투 상황을 가정한 건물 내부 소탕 작전을 훈련한다.", 
        choices: [
            { text: "동료와 협력하여 건물을 확보한다", fatigueChange: 18, staminaChange: -2, outcomeDescription: "팀원과 완벽한 협력으로 건물 내부를 안전하게 확보했다.", nextEventId: 'personal_time' }, 
            { text: "좁은 공간에서의 전투에 어려움을 느낀다", fatigueChange: 20, staminaChange: -3, outcomeDescription: "좁은 실내 공간에서의 전술 이동이 어려웠다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'precision_shooting_sniper_training', 
        type: 'training', 
        title: "정밀 사격 및 저격 훈련", 
        description: "먼 거리의 목표물을 정확히 맞추는 정밀 사격 훈련을 받는다.", 
        choices: [
            { text: "뛰어난 사격 실력을 보인다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "정확한 사격으로 목표물을 명중시켰다.", nextEventId: 'personal_time' }, 
            { text: "집중력 유지가 어렵다", fatigueChange: 12, staminaChange: -2, outcomeDescription: "장시간 집중하는 것이 힘들어 성적이 좋지 않았다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'long_distance_march_stamina_limit_challenge', 
        type: 'training', 
        title: "장거리 행군과 체력 한계 도전", 
        description: "수십 km에 달하는 장거리 행군에 참여하여 체력의 한계를 시험한다.", 
        choices: [
            { text: "포기하지 않고 완주한다", fatigueChange: 40, staminaChange: -10, outcomeDescription: "극도의 피로와 고통 속에서도 끝까지 완주했다.", nextEventId: 'personal_time' }, 
            { text: "결국 낙오한다", fatigueChange: 35, staminaChange: -8, outcomeDescription: "한계에 도달해 결국 낙오하고 말았다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'enemy_pow_handling_interrogation_procedure_training', 
        type: 'training', 
        title: "적 포로 처리 및 심문 절차 훈련", 
        description: "적 포로를 안전하게 관리하고 필요한 정보를 얻는 절차를 배운다.", 
        choices: [
            { text: "규정에 따라 처리한다", fatigueChange: 5, staminaChange: 0, outcomeDescription: "국제법과 군 규정에 따른 포로 처리 절차를 배웠다.", nextEventId: 'personal_time' }, 
            { text: "포로에게 위압적으로 대한다", fatigueChange: 7, staminaChange: -1, outcomeDescription: "너무 위압적인 태도로 지적을 받았다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'building_maintaining_defensive_positions', 
        type: 'training', 
        title: "방어진지 구축 및 유지", 
        description: "적의 공격에 대비하여 방어 진지를 구축하고 관리한다.", 
        choices: [
            { text: "튼튼하게 진지를 구축한다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "견고한 방어 진지를 성공적으로 구축했다.", nextEventId: 'personal_time' }, 
            { text: "진지 보수 작업을 한다", fatigueChange: 12, staminaChange: -1, outcomeDescription: "기존 진지를 점검하고 보수하는 작업을 했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'participating_operation_planning', 
        type: 'training', 
        title: "작전 계획 수립 참여", 
        description: "작전 계획을 세우는 회의에 참여하여 의견을 제시한다.", 
        choices: [
            { text: "적극적으로 아이디어를 낸다", fatigueChange: 4, staminaChange: 0, outcomeDescription: "작전 계획에 몇 가지 유용한 아이디어를 제안했다.", nextEventId: 'personal_time' }, 
            { text: "상급자의 의견을 따른다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "주로 들으며 상급자의 지시를 따랐다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'reading_tactical_map_navigation', 
        type: 'training', 
        title: "전술 지도 읽기와 방향 찾기", 
        description: "지도를 보고 자신의 위치와 목표 지점을 파악하는 방법을 배운다.", 
        choices: [
            { text: "지도를 능숙하게 읽는다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "지형지물을 통해 정확히 위치를 파악하는 능력이 향상되었다.", nextEventId: 'personal_time' }, 
            { text: "길을 잃고 헤맨다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "지도 읽기가 어려워 방향을 헷갈렸다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'communication_security_encryption_training', 
        type: 'training', 
        title: "통신 보안 및 암호 사용 훈련", 
        description: "적에게 통신 내용이 노출되지 않도록 보안 및 암호 사용법을 배운다.", 
        choices: [
            { text: "암호 체계를 정확히 사용한다", fatigueChange: 4, staminaChange: 0, outcomeDescription: "암호화된 통신 방식을 정확히 익혔다.", nextEventId: 'personal_time' }, 
            { text: "암호 사용에 실수가 잦다", fatigueChange: 6, staminaChange: -1, outcomeDescription: "복잡한 암호 체계에 자꾸 실수를 했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'emergency_medical_support_evacuation_training', 
        type: 'training', 
        title: "긴급 의료 지원 및 후송 훈련", 
        description: "전투 중 발생한 부상자를 응급처치하고 안전하게 후송하는 훈련이다.", 
        choices: [
            { text: "신속하고 정확하게 응급처치를 한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "부상자 상태를 정확히 파악하고 적절한 응급처치를 했다.", nextEventId: 'personal_time' }, 
            { text: "부상자를 안전하게 후송한다", fatigueChange: 12, staminaChange: -2, outcomeDescription: "부상자를 최대한 안전하게 후송하는 방법을 배웠다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'participating_coastal_defense_operation', 
        type: 'training', 
        title: "해안 방어 작전 참여", 
        description: "해안으로 침투하는 적을 막기 위한 방어 작전에 참여한다.", 
        choices: [
            { text: "해안 경계를 철저히 한다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "해안선을 따라 경계 임무를 수행했다.", nextEventId: 'personal_time' }, 
            { text: "적 상륙 저지 훈련을 한다", fatigueChange: 18, staminaChange: -2, outcomeDescription: "적의 상륙 시도를 저지하는 훈련에 참여했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'movement_techniques_rough_terrain', 
        type: 'training', 
        title: "험준한 지형에서의 이동 기술", 
        description: "산악 등 험준한 지형에서 안전하고 빠르게 이동하는 기술을 익힌다.", 
        choices: [
            { text: "숙련된 기술로 이동한다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "험난한 지형을 효율적으로 극복하는 기술을 익혔다.", nextEventId: 'personal_time' }, 
            { text: "이동 중 자주 넘어진다", fatigueChange: 18, staminaChange: -3, outcomeDescription: "어려운 지형에서 몇 번 넘어지고 미끄러졌다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'learning_mountain_combat_skills', 
        type: 'training', 
        title: "산악 전투 기술 습득", 
        description: "산악 지형에서의 전투에 필요한 기술들을 배운다.", 
        choices: [
            { text: "고지대 전투 기술을 익힌다", fatigueChange: 16, staminaChange: -2, outcomeDescription: "고지대 특성을 활용한 전술을 배웠다.", nextEventId: 'personal_time' }, 
            { text: "체력 소모가 크다", fatigueChange: 20, staminaChange: -3, outcomeDescription: "가파른 지형에서의 훈련은 체력 소모가 매우 컸다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'jungle_environment_adaptation_training', 
        type: 'training', 
        title: "정글 환경 적응 훈련", 
        description: "고온다습한 정글 환경에서의 생존 및 작전 수행 능력을 기른다.", 
        choices: [
            { text: "더위와 벌레와의 싸움이다", fatigueChange: 22, staminaChange: -3, outcomeDescription: "극심한 더위와 해충에 시달리며 훈련했다.", nextEventId: 'personal_time' }, 
            { text: "독충 및 독사에 주의한다", fatigueChange: 18, staminaChange: -2, outcomeDescription: "독충과 독사를 피하는 법을 배우며 조심스럽게 행동했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'securing_preparing_survival_food', 
        type: 'training', 
        title: "생존 식량 확보 및 조리법", 
        description: "자연에서 식량을 구하고 안전하게 조리하는 방법을 배운다.", 
        choices: [
            { text: "먹을 수 있는 식물을 구별한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "안전한 식물을 구별하고 채집하는 방법을 배웠다.", nextEventId: 'personal_time' }, 
            { text: "사냥이나 낚시를 시도한다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "간단한 도구로 사냥과 낚시를 해봤다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'ied_detection_disposal', 
        type: 'training', 
        title: "급조 폭발물 탐지 및 처리", 
        description: "위험한 급조 폭발물(IED)을 탐지하고 안전하게 처리하는 방법을 배운다.", 
        choices: [
            { text: "탐지 장비를 능숙하게 사용한다", fatigueChange: 12, staminaChange: -1, outcomeDescription: "폭발물 탐지 장비 사용법을 완벽히 익혔다.", nextEventId: 'personal_time' }, 
            { text: "처리 과정에서 극도의 긴장감을 느낀다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "폭발물 처리 훈련 중 극도의 긴장감을 경험했다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'using_special_mission_equipment', 
        type: 'training', 
        title: "특수 임무 장비 사용법", 
        description: "야간 투시경, 특수 통신 장비 등 특수 임무에 필요한 장비 사용법을 익힌다.", 
        choices: [
            { text: "장비 사용법을 완벽히 숙지한다", fatigueChange: 8, staminaChange: 0, outcomeDescription: "첨단 장비 사용법을 빠르게 익혔다.", nextEventId: 'personal_time' }, 
            { text: "장비 고장 시 대처법을 배운다", fatigueChange: 6, staminaChange: 0, outcomeDescription: "장비 문제 발생 시 대처법도 함께 배웠다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'civilian_evacuation_protection_training', 
        type: 'training', 
        title: "민간인 대피 및 보호 훈련", 
        description: "전쟁 또는 재난 상황에서 민간인을 안전하게 대피시키고 보호하는 절차를 훈련한다.", 
        choices: [
            { text: "민간인 통제 및 유도를 연습한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "대규모 인원을 효과적으로 통제하고 유도하는 방법을 배웠다.", nextEventId: 'personal_time' }, 
            { text: "구호 물품 분배를 돕는다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "제한된 구호 물품을 효율적으로 분배하는 방법을 배웠다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'participating_search_rescue_operation', 
        type: 'special', 
        title: "수색 및 구조 작전 참여", 
        description: "실종자나 조난자를 찾기 위한 수색 및 구조 작전에 투입된다.", 
        choices: [
            { text: "험한 지형을 수색한다", fatigueChange: 25, staminaChange: -4, outcomeDescription: "험난한 지형을 샅샅이 수색했다.", nextEventId: 'personal_time' }, 
            { text: "구조 대상자를 발견하고 안도한다", fatigueChange: -10, staminaChange: 2, outcomeDescription: "구조 대상자를 무사히 발견해 큰 보람을 느꼈다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'counter_terrorism_suppression_training', 
        type: 'training', 
        title: "대테러 진압 훈련", 
        description: "테러 상황 발생 시 인질 구출 및 테러범 진압 훈련을 받는다.", 
        choices: [
            { text: "신속하고 정확하게 목표를 제압한다", fatigueChange: 20, staminaChange: -2, outcomeDescription: "정확하고 신속한 목표 제압 기술을 배웠다.", nextEventId: 'personal_time' }, 
            { text: "인질의 안전을 최우선으로 생각한다", fatigueChange: 18, staminaChange: -2, outcomeDescription: "인질의 안전을 최우선으로 고려하는 전술을 배웠다.", nextEventId: 'personal_time' }
        ]
    },
    { 
        id: 'joint_operation_cooperation_other_units', 
        type: 'training', 
        title: "합동 작전 수행과 타 부대와의 협력", 
        description: "다른 부대와 함께 합동 작전을 수행하며 협력하는 방법을 배운다.", 
        choices: [
            { text: "원활한 의사소통을 위해 노력한다", fatigueChange: 12, staminaChange: -1, outcomeDescription: "부대 간 효과적인 의사소통 방법을 익혔다.", nextEventId: 'personal_time' }, 
            { text: "부대 간 경쟁심을 느낀다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "부대 간 미묘한 경쟁 관계를 느꼈다.", nextEventId: 'personal_time' }
        ]
    },
    // events.js - Part 5 of 7: 특수 상황 및 위기 관리
// 전체 게임을 위해서는 모든 파트를 하나의 events.js 파일로 합쳐야 합니다.

// Part 4에서 이어짐 - 이 문구는 실제 병합 시 삭제하세요
// const events = [ 로 시작하는 배열 선언 이후 쉼표를 넣고 이어서 작성합니다.

    // ====================================
    // 특수 상황 및 위기 관리 이벤트
    // ====================================
    { 
        id: 'infectious_disease_outbreak', 
        type: 'special', 
        title: "부대 내 감염병 발생과 격리",
        description: "부대 내 감염병이 돌아 일부 인원이 격리되었다. 불안감이 퍼진다.",
        choices: [
            { text: "위생 수칙을 철저히 지킨다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "개인 위생에 더욱 신경썼다.", nextEventId: 'personal_time' },
            { text: "불안감을 느낀다", fatigueChange: 8, staminaChange: -2, outcomeDescription: "나도 감염될까 봐 불안하다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'natural_disaster_response', 
        type: 'special',
        title: "자연재해 발생 시 대응",
        description: "부대 인근에 태풍, 홍수 등 자연재해가 발생하여 지원에 투입되었다.",
        choices: [
            { text: "피해 복구 작업에 힘쓴다", fatigueChange: 25, staminaChange: -4, outcomeDescription: "힘들지만 복구 작업을 도왔다.", nextEventId: 'personal_time' },
            { text: "안전한 곳에서 대기한다", fatigueChange: 10, staminaChange: -2, outcomeDescription: "안전 확보 후 지시에 따랐다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'witnessing_violence_in_military', 
        type: 'special',
        title: "군대 내 폭력 사건 목격",
        description: "선임이 후임을 폭행하는 장면을 목격했다. 충격적이다.",
        choices: [
            { text: "즉시 보고한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "고민 끝에 간부에게 사실대로 보고했다.", nextEventId: 'personal_time' },
            { text: "못 본 척 외면한다", fatigueChange: 12, staminaChange: -2, outcomeDescription: "엮이고 싶지 않아 못 본 척했다. 마음이 불편하다.", nextEventId: 'personal_time' },
            { text: "피해자를 위로한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "나중에 피해 후임을 찾아가 위로의 말을 건넸다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'military_secret_leak_incident', 
        type: 'special',
        title: "군사 기밀 유출 사고",
        description: "부대 내에서 군사 기밀이 유출되는 사고가 발생했다. 보안 검사가 강화되었다.",
        choices: [
            { text: "보안 규정을 더욱 철저히 지킨다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "보안의 중요성을 다시 한번 깨닫고 조심한다.", nextEventId: 'personal_time' },
            { text: "누가 유출했는지 궁금해한다", fatigueChange: 3, staminaChange: -1, outcomeDescription: "동기들과 누가 그랬을지 수군거렸다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'accidental_firearm_discharge_response', 
        type: 'special',
        title: "총기 오발 사고 대응",
        description: "훈련 또는 근무 중 총기 오발 사고가 발생했다. 다행히 인명 피해는 없었다.",
        choices: [
            { text: "사고 경위를 정확히 보고한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "목격한 대로 정확하게 진술했다.", nextEventId: 'personal_time' },
            { text: "크게 놀라 정신이 없다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "총소리에 너무 놀라 아무 생각도 나지 않았다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'deserter_occurrence_search', 
        type: 'special',
        title: "탈영병 발생과 수색",
        description: "부대에서 탈영병이 발생하여 수색 작전에 투입되었다.",
        choices: [
            { text: "수색에 적극적으로 참여한다", fatigueChange: 20, staminaChange: -3, outcomeDescription: "지시받은 구역을 꼼꼼히 수색했다.", nextEventId: 'personal_time' },
            { text: "왜 탈영했는지 생각한다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "오죽 힘들었으면 탈영했을까 하는 생각이 든다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'intruder_detection_military_facility', 
        type: 'special',
        title: "군사 시설 침입자 발견",
        description: "경계 근무 중 군사 시설에 무단으로 침입하려는 사람을 발견했다.",
        choices: [
            { text: "절차에 따라 즉시 보고 및 대응한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "배운 대로 신속하게 보고하고 대응하여 침입자를 제압했다.", nextEventId: 'personal_time' },
            { text: "당황하여 어쩔 줄 모른다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "갑작스러운 상황에 당황하여 제대로 대처하지 못했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'fire_outbreak_response_unit', 
        type: 'special',
        title: "부대 내 화재 발생과 대처",
        description: "부대 내 건물에서 화재가 발생했다!",
        choices: [
            { text: "초기 진화를 시도한다", fatigueChange: 12, staminaChange: -2, outcomeDescription: "소화기를 들고 초기 진화를 시도했다.", nextEventId: 'personal_time' },
            { text: "신속하게 대피하고 보고한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "안전하게 대피한 후 상황을 보고했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'emergency_patient_transport', 
        type: 'special',
        title: "응급 환자 발생과 후송",
        description: "부대 내 응급 환자가 발생하여 긴급 후송을 도와야 한다.",
        choices: [
            { text: "환자 이송을 돕는다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "들것을 이용해 환자를 앰뷸런스까지 옮겼다.", nextEventId: 'personal_time' },
            { text: "필요한 물품을 챙긴다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "군의관의 지시에 따라 필요한 물품을 챙겼다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'major_accident_during_military_training', 
        type: 'special',
        title: "군사 훈련 중 중대 사고",
        description: "훈련 도중 예상치 못한 큰 사고가 발생했다.",
        choices: [
            { text: "사고 수습을 돕는다", fatigueChange: 20, staminaChange: -3, outcomeDescription: "통제에 따라 사고 현장 수습을 도왔다.", nextEventId: 'personal_time' },
            { text: "충격적인 장면에 정신을 차리기 힘들다", fatigueChange: 18, staminaChange: -3, outcomeDescription: "사고 현장의 모습이 머릿속에서 떠나지 않는다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'witnessing_reporting_hostile_act', 
        type: 'special',
        title: "적대 행위 목격과 보고",
        description: "경계 근무 중 명백한 적대 행위(총격 등)를 목격했다.",
        choices: [
            { text: "즉시 대응 및 보고한다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "교전 수칙에 따라 즉각 대응하고 상황을 보고했다.", nextEventId: 'personal_time' },
            { text: "두려움을 느낀다", fatigueChange: 18, staminaChange: -3, outcomeDescription: "실제 상황이라는 생각에 극도의 긴장과 두려움을 느꼈다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'local_conflict_situation', 
        type: 'special',
        title: "국지적 충돌 상황 발생",
        description: "부대 인근에서 아군과 적군 간의 국지적 충돌이 발생했다.",
        choices: [
            { text: "명령에 따라 전투 준비를 한다", fatigueChange: 20, staminaChange: -3, outcomeDescription: "긴장감 속에서 전투 준비 태세를 갖추었다.", nextEventId: 'personal_time' },
            { text: "무슨 상황인지 파악하려 애쓴다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "정확한 상황을 알 수 없어 답답하고 불안하다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'military_equipment_damage_report', 
        type: 'special',
        title: "군 장비 파손 사고와 보고",
        description: "자신의 실수 또는 관리 소홀로 군 장비가 파손되었다.",
        choices: [
            { text: "즉시 사실대로 보고한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "혼날 것을 각오하고 사실대로 보고했다.", nextEventId: 'personal_time' },
            { text: "숨기려다 들킨다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "숨기려 했지만 결국 들켜서 더 큰 처벌을 받게 될 것 같다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'mishandling_classified_material', 
        type: 'special',
        title: "군사 기밀 취급 실수",
        description: "군사 기밀 문서를 잘못 취급하여 문제가 발생할 뻔했다.",
        choices: [
            { text: "실수를 깨닫고 즉시 바로잡는다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "다행히 큰 문제로 번지기 전에 실수를 바로잡았다.", nextEventId: 'personal_time' },
            { text: "상급자에게 보고하고 지시를 따른다", fatigueChange: 6, staminaChange: -1, outcomeDescription: "상급자에게 보고하고 질책을 받았다. 보안의 중요성을 다시 느낀다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'communication_blackout_during_operation', 
        type: 'special',
        title: "작전 중 통신 두절 상황",
        description: "중요한 작전 수행 중 갑자기 통신이 두절되었다.",
        choices: [
            { text: "예비 통신 수단을 확보한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "미리 준비된 예비 통신 수단으로 연락을 시도한다.", nextEventId: 'personal_time' },
            { text: "불안하지만 침착하게 대기한다", fatigueChange: 12, staminaChange: -2, outcomeDescription: "통신이 복구되기를 기다리며 상황을 주시한다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'spotting_suspicious_person_guard_duty', 
        type: 'special',
        title: "경계 근무 중 수상한 인물 발견",
        description: "경계 근무 중 부대 주변을 서성이는 수상한 인물을 발견했다.",
        choices: [
            { text: "수하 및 보고 절차를 따른다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "배운 대로 수하를 하고 상부에 보고했다.", nextEventId: 'personal_time' },
            { text: "별일 아니라고 생각하고 넘어간다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "대수롭지 않게 생각하고 넘어갔다. 찝찝하다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'live_ammo_mistake_training', 
        type: 'special',
        title: "훈련 중 실탄 오인 사고",
        description: "공포탄을 사용해야 하는 훈련에서 누군가 실수로 실탄을 장전했다는 소문이 돈다.",
        choices: [
            { text: "사실 여부를 확인하려 한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "소문의 진위를 파악하려 했지만 알 수 없었다.", nextEventId: 'personal_time' },
            { text: "불안감에 훈련에 집중하기 어렵다", fatigueChange: 10, staminaChange: -2, outcomeDescription: "혹시 모를 사고에 대한 불안감 때문에 훈련에 집중할 수 없다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'catching_unauthorized_photography_military_area', 
        type: 'special',
        title: "군사 지역 무단 촬영 적발",
        description: "민간인이 군사 보호 구역 내에서 사진을 찍는 것을 발견했다.",
        choices: [
            { text: "즉시 제지하고 보고한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "촬영을 제지하고 규정에 따라 상부에 보고했다.", nextEventId: 'personal_time' },
            { text: "못 본 척한다", fatigueChange: 3, staminaChange: -1, outcomeDescription: "괜히 엮이기 싫어서 못 본 척했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'handling_serious_discipline_violation_unit', 
        type: 'special',
        title: "부대 내 중대한 규율 위반 처리",
        description: "동료가 심각한 규율 위반(구타, 가혹행위 등)을 저지른 것을 알게 되었다.",
        choices: [
            { text: "양심에 따라 신고한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "고민 끝에 마음에 걸려 신고했다. 후폭풍이 걱정된다.", nextEventId: 'personal_time' },
            { text: "모른 척 덮어준다", fatigueChange: 12, staminaChange: -2, outcomeDescription: "동료와의 관계 때문에 모른 척했지만, 마음이 불편하다.", nextEventId: 'personal_time' },
            { text: "당사자에게 직접 경고한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "직접 찾아가 다시는 그러지 말라고 경고했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'losing_military_map_incident', 
        type: 'special',
        title: "군사 지도 분실 사고",
        description: "중요한 군사 지도를 분실했다. 큰일이다.",
        choices: [
            { text: "즉시 보고하고 함께 찾는다", fatigueChange: 20, staminaChange: -3, outcomeDescription: "바로 보고하고 필사적으로 찾아다녔다. 다행히 찾았다.", nextEventId: 'personal_time' },
            { text: "혼자 몰래 찾으려 한다", fatigueChange: 25, staminaChange: -4, outcomeDescription: "혼자 찾으려 했지만 결국 찾지 못하고 보고했다. 크게 문책당했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'vip_visit_heightened_security', 
        type: 'special',
        title: "부대 내 중요 인사 방문과 경계 강화",
        description: "높은 분이 부대를 방문하여 경계 태세가 강화되고 분위기가 삼엄하다.",
        choices: [
            { text: "평소보다 더 긴장하고 근무한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "실수하지 않기 위해 평소보다 더 긴장하며 근무했다.", nextEventId: 'personal_time' },
            { text: "별다른 감흥 없이 근무한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "높은 사람이 오든 말든 내 할 일만 한다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'personnel_missing_night_training', 
        type: 'special',
        title: "야간 훈련 중 인원 실종",
        description: "야간 훈련 도중 한 명의 인원이 보이지 않는다. 실종된 것 같다.",
        choices: [
            { text: "즉시 보고하고 수색에 참여한다", fatigueChange: 18, staminaChange: -3, outcomeDescription: "상황을 보고하고 동료들과 함께 실종된 인원을 찾아 나섰다.", nextEventId: 'personal_time' },
            { text: "무사하기를 기도한다", fatigueChange: 12, staminaChange: -2, outcomeDescription: "걱정되는 마음으로 실종된 인원이 무사히 발견되기를 바랐다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'serious_injury_during_military_life', 
        type: 'special',
        title: "군 생활 중 심각한 부상 발생",
        description: "훈련이나 작업 중 크게 다쳐 병원에 입원하게 되었다.",
        choices: [
            { text: "치료에 전념한다", fatigueChange: 15, staminaChange: -10, outcomeDescription: "당분간 병원에서 치료를 받으며 회복에 집중해야 한다.", nextEventId: 'personal_time' },
            { text: "동료들에게 미안함을 느낀다", fatigueChange: 10, staminaChange: -2, outcomeDescription: "나 때문에 다른 동료들이 더 힘들어진 것 같아 미안하다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'operation_halted_due_bad_weather', 
        type: 'special',
        title: "악천후로 인한 작전 중단",
        description: "갑작스러운 악천후(폭우, 폭설 등)로 인해 진행 중이던 작전이 중단되었다.",
        choices: [
            { text: "안전한 곳에서 대기한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "날씨가 좋아질 때까지 안전한 곳에서 대기하라는 지시를 받았다.", nextEventId: 'personal_time' },
            { text: "장비를 점검하며 대기한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "대기하는 동안 장비 상태를 점검했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'military_equipment_malfunction_emergency_repair', 
        type: 'special',
        title: "군사 장비 고장과 긴급 수리",
        description: "중요한 군사 장비가 갑자기 고장 났다. 긴급 수리가 필요하다.",
        choices: [
            { text: "수리 작업을 돕는다", fatigueChange: 12, staminaChange: -1, outcomeDescription: "정비병을 도와 장비 수리 작업을 보조했다.", nextEventId: 'personal_time' },
            { text: "대체 장비를 준비한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "수리가 불가능할 경우를 대비해 대체 장비를 준비했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'enemy_spy_detection_operation', 
        type: 'special',
        title: "적대 세력 간첩 색출 작전",
        description: "부대 내에 간첩이 있다는 첩보가 있어 색출 작전이 비밀리에 진행된다.",
        choices: [
            { text: "주변 사람들을 유심히 관찰한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "평소와 다른 행동을 하는 사람이 있는지 주의 깊게 살폈다.", nextEventId: 'personal_time' },
            { text: "작전에 대해 함구한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "비밀 작전이므로 절대 외부에 누설하지 않았다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'suicide_attempt_incident_unit', 
        type: 'special',
        title: "부대 내 자살 시도자 발생",
        description: "한 병사가 자살을 시도했다는 충격적인 소식을 들었다.",
        choices: [
            { text: "해당 병사를 위로하고 돕는다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "힘들어하는 병사에게 다가가 이야기를 들어주고 위로했다.", nextEventId: 'personal_time' },
            { text: "충격과 안타까움을 느낀다", fatigueChange: 10, staminaChange: -2, outcomeDescription: "군 생활이 얼마나 힘들면 그런 선택을 했을까 하는 생각에 마음이 무겁다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'participating_life_saving_operation', 
        type: 'special',
        title: "인명 구조 작전 참여",
        description: "사고 현장에서 인명 구조 작전에 참여하게 되었다.",
        choices: [
            { text: "위험을 무릅쓰고 구조 활동을 한다", fatigueChange: 25, staminaChange: -4, outcomeDescription: "힘들고 위험했지만, 생명을 구하는 보람된 일이었다.", nextEventId: 'personal_time' },
            { text: "구조된 사람들을 보고 안도한다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "무사히 구조된 사람들을 보니 마음이 놓인다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'deployed_riot_control_operation', 
        type: 'special',
        title: "시위 진압 작전 투입",
        description: "부대 인근에서 대규모 시위가 발생하여 진압 작전에 투입되었다.",
        choices: [
            { text: "명령에 따라 질서 유지에 힘쓴다", fatigueChange: 18, staminaChange: -3, outcomeDescription: "시위대와 직접적인 충돌은 피하며 질서 유지에 집중했다.", nextEventId: 'personal_time' },
            { text: "험악한 분위기에 긴장한다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "험악한 시위 현장 분위기에 위압감을 느꼈다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'terror_threat_near_military_base', 
        type: 'special',
        title: "군사 기지 주변 테러 위협",
        description: "군사 기지를 대상으로 한 테러 위협 첩보가 입수되어 경계 태세가 최고조에 달했다.",
        choices: [
            { text: "한 치의 빈틈없이 경계 근무를 선다", fatigueChange: 20, staminaChange: -3, outcomeDescription: "테러 위협에 대비하여 평소보다 훨씬 철저하게 경계 근무를 섰다.", nextEventId: 'personal_time' },
            { text: "실제 상황 발생에 대비한다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "만일의 사태에 대비하여 개인 장비와 행동 절차를 점검했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'border_area_military_clash', 
        type: 'special',
        title: "국경 지역 군사 충돌",
        description: "국경 지역에서 아군과 적군 간의 군사적 충돌이 발생했다는 소식이 들려온다.",
        choices: [
            { text: "전쟁 발발 가능성에 불안해한다", fatigueChange: 18, staminaChange: -3, outcomeDescription: "상황이 악화되어 전쟁으로 번지지 않을까 불안하다.", nextEventId: 'personal_time' },
            { text: "명령 하달 시 즉각 투입될 준비를 한다", fatigueChange: 12, staminaChange: -2, outcomeDescription: "언제든 출동 명령이 내려올 수 있으므로 대비 태세를 갖춘다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'handling_civilian_casualties_support', 
        type: 'special',
        title: "민간인 피해 발생과 지원",
        description: "작전 또는 재난 상황 중 민간인 피해가 발생하여 지원 활동을 해야 한다.",
        choices: [
            { text: "피해 민간인을 위로하고 돕는다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "피해를 입은 민간인들에게 구호품을 전달하고 위로했다.", nextEventId: 'personal_time' },
            { text: "참혹한 모습에 마음이 아프다", fatigueChange: 12, staminaChange: -2, outcomeDescription: "전쟁이나 재난의 참혹함을 느끼며 마음 아파했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'dispatched_major_accident_site_support', 
        type: 'special',
        title: "대형 사고 현장 지원 출동",
        description: "대형 사고(건물 붕괴, 열차 탈선 등) 현장에 지원 인력으로 파견되었다.",
        choices: [
            { text: "구조 및 복구 작업을 돕는다", fatigueChange: 28, staminaChange: -5, outcomeDescription: "사고 현장에서 구조대원들을 도와 인명 구조 및 복구 작업을 지원했다.", nextEventId: 'personal_time' },
            { text: "사고 현장의 비극에 침통해한다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "사고로 희생된 사람들을 보며 깊은 슬픔을 느꼈다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'explosive_accident_military_training_ground', 
        type: 'special',
        title: "군사 훈련장 폭발물 사고",
        description: "훈련장에서 불발탄이나 폭발물 관련 사고가 발생했다.",
        choices: [
            { text: "사고 현장 접근을 통제한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "추가 사고를 막기 위해 사고 현장 주변 접근을 통제했다.", nextEventId: 'personal_time' },
            { text: "안전 불감증에 대해 경각심을 갖는다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "안전 수칙 준수의 중요성을 다시 한번 깨달았다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'family_emergency_during_military_service', 
        type: 'special',
        title: "군 생활 중 가족 위급상황 발생",
        description: "군 복무 중 집에 계신 가족에게 위급한 일이 생겼다는 연락을 받았다.",
        choices: [
            { text: "간부에게 보고하고 청원휴가를 신청한다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "상황을 보고하고 급히 청원휴가를 신청했다. 걱정이 태산 같다.", nextEventId: 'personal_time' },
            { text: "걱정되지만 군 복무에 집중하려 노력한다", fatigueChange: 20, staminaChange: -3, outcomeDescription: "가족 걱정에 일이 손에 잡히지 않지만, 맡은 바 임무를 다하려 애쓴다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'identity_exposed_during_intelligence_activity', 
        type: 'special',
        title: "첩보 활동 중 정체 노출",
        description: "비밀리에 수행하던 첩보 활동 중 신분이 노출될 위기에 처했다.",
        choices: [
            { text: "신속하게 현장을 벗어난다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "위험을 감지하고 신속하게 현장을 이탈하여 위기를 모면했다.", nextEventId: 'personal_time' },
            { text: "침착하게 위장 신분을 유지한다", fatigueChange: 12, staminaChange: -2, outcomeDescription: "들키지 않은 척 침착하게 행동하여 의심을 피했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'surrounded_by_enemy_forces_during_operation', 
        type: 'special',
        title: "작전 중 적대 세력 포위",
        description: "작전 수행 중 적에게 포위되어 고립되었다. 절체절명의 위기다.",
        choices: [
            { text: "동료들과 함께 항전한다", fatigueChange: 35, staminaChange: -6, outcomeDescription: "살아남기 위해 동료들과 함께 필사적으로 저항했다.", nextEventId: 'personal_time' },
            { text: "탈출로를 확보하기 위해 노력한다", fatigueChange: 30, staminaChange: -5, outcomeDescription: "포위망을 뚫고 탈출하기 위해 가능한 모든 방법을 시도했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'declaration_of_war_response', 
        type: 'special',
        title: "전시 상황 선포와 대응",
        description: "국가 비상사태가 선포되고 전시 상황에 돌입했다. 모든 것이 달라진다.",
        choices: [
            { text: "명령에 따라 전투 준비에 만전을 기한다", fatigueChange: 25, staminaChange: -4, outcomeDescription: "실제 전쟁 상황에 대비하여 모든 준비를 마쳤다.", nextEventId: 'personal_time' },
            { text: "가족과 국가를 지키겠다고 다짐한다", fatigueChange: 10, staminaChange: -2, outcomeDescription: "비장한 각오로 전투에 임할 준비를 한다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'vip_protection_duty', 
        type: 'special',
        title: "중요 인물 경호 임무 수행",
        description: "매우 중요한 인물의 경호를 맡게 되었다. 한 치의 실수도 용납되지 않는다.",
        choices: [
            { text: "철저한 경호 계획을 수립하고 실행한다", fatigueChange: 18, staminaChange: -2, outcomeDescription: "빈틈없는 경호 작전으로 임무를 성공적으로 완수했다.", nextEventId: 'personal_time' },
            { text: "극도의 긴장감 속에서 임무를 수행한다", fatigueChange: 22, staminaChange: -3, outcomeDescription: "임무 수행 내내 극도의 긴장 상태를 유지했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'awol_soldier_occurrence_search', 
        type: 'special',
        title: "부대 이탈자 발생과 수색",
        description: "휴가 미복귀 등 부대 이탈자가 발생하여 수색에 나서야 한다.",
        choices: [
            { text: "이탈 경로를 추적하며 수색한다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "가능한 모든 단서를 활용하여 이탈자를 추적했다.", nextEventId: 'personal_time' },
            { text: "무사히 복귀하기를 바란다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "이탈자가 별 탈 없이 복귀하기를 바라는 마음이다.", nextEventId: 'personal_time' }
        ]
    },
    // events.js - Part 6 of 7: 특별 이벤트, 관계, 자기계발, 성장
// 전체 게임을 위해서는 모든 파트를 하나의 events.js 파일로 합쳐야 합니다.

// Part 5에서 이어짐 - 이 문구는 실제 병합 시 삭제하세요
// const events = [ 로 시작하는 배열 선언 이후 쉼표를 넣고 이어서 작성합니다.

    // ====================================
    // 군 생활 특별 이벤트
    // ====================================
    { 
        id: 'unit_sports_day', 
        type: 'special',
        title: "부대 체육대회 참가",
        description: "모처럼 부대 전체가 참여하는 체육대회가 열렸다. 축구, 족구 등 다양한 경기가 진행된다.",
        choices: [
            { text: "축구 경기에 참여한다", fatigueChange: 15, staminaChange: 2, outcomeDescription: "오랜만에 공을 차니 힘들지만 재미있다.", nextEventId: 'personal_time' },
            { text: "족구 경기에 참여한다", fatigueChange: 10, staminaChange: 1, outcomeDescription: "동료들과 호흡을 맞춰 족구를 즐겼다.", nextEventId: 'personal_time' },
            { text: "응원하며 구경한다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "경기에 참여하진 않았지만, 응원하며 즐거운 시간을 보냈다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'preparing_for_equipment_inspection', 
        type: 'special',
        title: "군장 검사 전날 밤샘 준비",
        description: "내일 있을 군장 검사를 앞두고 밤늦게까지 장비들을 정비하고 준비한다.",
        choices: [
            { text: "꼼꼼하게 모든 장비를 점검한다", fatigueChange: 12, staminaChange: -2, outcomeDescription: "밤늦게까지 장비를 닦고 정비했다. 내일 지적받지 않기를.", nextEventId: 'personal_time' },
            { text: "필수적인 것만 점검하고 잔다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "너무 피곤해서 중요한 것들만 확인하고 잠자리에 들었다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'commander_visit_unit_tension', 
        type: 'special',
        title: "지휘관 순시와 부대 긴장감",
        description: "높은 지휘관이 부대를 순시한다는 소식에 부대 전체가 긴장 상태다.",
        choices: [
            { text: "맡은 바 임무에 최선을 다한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "지휘관의 눈에 띄지 않도록, 혹은 잘 보이도록 평소보다 열심히 했다.", nextEventId: 'personal_time' },
            { text: "실수할까 봐 불안하다", fatigueChange: 10, staminaChange: -2, outcomeDescription: "괜히 실수해서 혼날까 봐 불안한 마음으로 시간을 보냈다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'promotion_review_interview_prep', 
        type: 'milestone',
        title: "진급 심사와 면접 준비",
        description: "다음 계급으로의 진급 심사 대상이 되어 면접을 준비해야 한다.",
        choices: [
            { text: "예상 질문을 준비하고 연습한다", fatigueChange: 5, staminaChange: 0, outcomeDescription: "진급을 위해 면접 준비를 철저히 했다.", nextEventId: 'personal_time' },
            { text: "될 대로 되라는 식으로 임한다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "특별히 준비하지 않고 평소대로 면접에 임하기로 했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'earning_reward_leave_planning', 
        type: 'leave',
        title: "포상 휴가 획득과 일정 계획",
        description: "훈련이나 모범적인 생활로 포상 휴가를 받게 되었다! 어떻게 사용할지 계획을 세운다.",
        choices: [
            { text: "가족/친구와 보낼 계획을 세운다", fatigueChange: -15, staminaChange: 3, outcomeDescription: "오랜만에 만날 사람들을 생각하니 벌써 설렌다.", nextEventId: 'personal_time' },
            { text: "혼자만의 휴식을 계획한다", fatigueChange: -10, staminaChange: 2, outcomeDescription: "이번 휴가는 조용히 혼자 쉬면서 재충전하기로 했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'participating_armed_forces_day_event', 
        type: 'special',
        title: "국군의 날 행사 참여",
        description: "국군의 날을 맞아 부대 또는 외부에서 열리는 기념행사에 참여한다.",
        choices: [
            { text: "자부심을 느끼며 행사에 참여한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "군인으로서 자부심을 느끼는 시간이었다.", nextEventId: 'personal_time' },
            { text: "힘들지만 의무감으로 참여한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "행사 준비와 참여 과정이 힘들었지만, 무사히 마쳤다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'special_meal_holiday_atmosphere', 
        type: 'special',
        title: "기념일 특식과 부대 분위기",
        description: "명절이나 기념일을 맞아 평소보다 훨씬 좋은 특식이 나왔다. 부대 분위기도 들떠있다.",
        choices: [
            { text: "맛있게 특식을 즐긴다", fatigueChange: -8, staminaChange: 2, outcomeDescription: "오랜만에 맛있는 음식을 먹으니 기분이 좋다.", nextEventId: 'personal_time' },
            { text: "집 생각이 더 간절해진다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "맛있는 음식을 먹으니 가족 생각이 더 난다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'exchange_event_with_other_unit', 
        type: 'special',
        title: "다른 부대와의 교류 행사",
        description: "체육 활동이나 합동 작업 등으로 다른 부대와 교류할 기회가 생겼다.",
        choices: [
            { text: "새로운 사람들과 어울린다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "다른 부대 사람들과 이야기하며 정보를 교환했다.", nextEventId: 'personal_time' },
            { text: "우리 부대원들과만 시간을 보낸다", fatigueChange: 0, staminaChange: 0, outcomeDescription: "낯선 사람들과 어울리는 것이 어색해서 원래 알던 사람들과 있었다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'supporting_base_open_house_event', 
        type: 'special',
        title: "민간인 대상 군부대 개방행사 지원",
        description: "부대 개방 행사에 지원 인력으로 참여하여 민간인들을 안내하거나 시범을 보인다.",
        choices: [
            { text: "친절하게 민간인들을 대한다", fatigueChange: 6, staminaChange: -1, outcomeDescription: "방문객들에게 친절하게 설명하고 안내했다.", nextEventId: 'personal_time' },
            { text: "귀찮지만 맡은 역할을 수행한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "많은 사람들을 상대하는 것이 피곤했지만, 임무를 완수했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'visiting_military_museum', 
        type: 'special',
        title: "군사 박물관 견학 기회",
        description: "부대에서 단체로 군사 박물관을 견학할 기회가 주어졌다.",
        choices: [
            { text: "흥미롭게 관람한다", fatigueChange: -3, staminaChange: 1, outcomeDescription: "우리 군의 역사와 유물들을 보며 많은 것을 느꼈다.", nextEventId: 'personal_time' },
            { text: "지루함을 느낀다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "역사나 유물에는 별로 관심이 없어 지루했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'taking_military_specialty_exam', 
        type: 'milestone',
        title: "군 특기 자격증 시험 준비",
        description: "군 생활에 도움이 되는 특기 자격증 시험을 준비한다.",
        choices: [
            { text: "열심히 공부하여 합격한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "노력 끝에 자격증 시험에 합격했다.", nextEventId: 'personal_time' },
            { text: "준비가 미흡해 불합격한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "준비가 부족해 아쉽게 불합격했다. 다음 기회를 노려야겠다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'participating_higher_unit_contest', 
        type: 'special',
        title: "상급부대 경연대회 참가",
        description: "우리 부대 대표로 상급부대 경연대회에 참가하게 되었다.",
        choices: [
            { text: "열심히 준비하여 좋은 성적을 거둔다", fatigueChange: 12, staminaChange: -1, outcomeDescription: "많은 준비 끝에 좋은 성적을 거두었다.", nextEventId: 'personal_time' },
            { text: "부담감에 실수를 연발한다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "긴장한 나머지 실수가 많았다. 아쉽다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'personality_prevention_education', 
        type: 'special',
        title: "부대 내 인성교육 및 예방교육",
        description: "군내 문제 예방을 위한 인성교육 및 각종 예방교육을 받는다.",
        choices: [
            { text: "진지하게 교육에 임한다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "교육 내용을 새겨들으며 진지하게 참여했다.", nextEventId: 'personal_time' },
            { text: "형식적인 교육이라 생각한다", fatigueChange: 4, staminaChange: -1, outcomeDescription: "또 같은 내용의 반복이라 지루했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'attending_morale_boosting_performance', 
        type: 'special',
        title: "위문공연 참석과 사기 증진",
        description: "연예인들이 부대를 찾아 위문공연을 한다. 모처럼 즐거운 시간이다.",
        choices: [
            { text: "신나게 공연을 즐긴다", fatigueChange: -10, staminaChange: 2, outcomeDescription: "오랜만에 신나는 공연을 보며 스트레스를 풀었다.", nextEventId: 'personal_time' },
            { text: "조용히 관람만 한다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "과하게 흥분하지 않고 조용히 공연을 즐겼다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'unit_memorial_photo_shoot', 
        type: 'special',
        title: "부대 기념사진 촬영",
        description: "부대 기념사진을 찍는 날이다. 모두 정복을 갖춰 입고 모였다.",
        choices: [
            { text: "환하게 웃으며 포즈를 취한다", fatigueChange: -2, staminaChange: 0, outcomeDescription: "좋은 추억이 될 사진에 밝게 웃었다.", nextEventId: 'personal_time' },
            { text: "형식적으로 자리만 지킨다", fatigueChange: 0, staminaChange: 0, outcomeDescription: "별 의미 없이 그저 자리만 지켰다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'soldier_family_invitation_event', 
        type: 'special',
        title: "장병 가족 초청 행사",
        description: "부대에서 장병 가족들을 초청하는 행사가 열렸다. 가족들이 군 생활을 엿볼 수 있는 자리다.",
        choices: [
            { text: "가족에게 자랑스럽게 내 임무를 보여준다", fatigueChange: -8, staminaChange: 1, outcomeDescription: "가족들에게 내 역할과 생활을 자랑스럽게 보여주었다.", nextEventId: 'personal_time' },
            { text: "부모님이 걱정할까 봐 힘든 점은 감춘다", fatigueChange: -5, staminaChange: 0, outcomeDescription: "부모님이 걱정하실까 봐 좋은 모습만 보여드렸다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'preparing_military_competition', 
        type: 'special',
        title: "각종 군 경연대회 준비",
        description: "체력, 사격, 군가 등 다양한 분야의 군 경연대회를 준비한다.",
        choices: [
            { text: "열심히 준비하여 참가한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "대회 준비를 위해 많은 시간을 투자했다.", nextEventId: 'personal_time' },
            { text: "대회 참가를 피하려 한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "되도록 눈에 띄지 않게 행동하여 선발을 피했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'holiday_season_unit_event', 
        type: 'special',
        title: "명절 연휴 부대 행사",
        description: "명절 연휴 동안 부대에서 특별한 행사와 음식으로 명절 분위기를 느낄 수 있게 해준다.",
        choices: [
            { text: "명절 음식과 프로그램을 즐긴다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "특별한 음식과 프로그램으로 명절 분위기를 느꼈다.", nextEventId: 'personal_time' },
            { text: "명절에 가족 생각이 더 난다", fatigueChange: 3, staminaChange: -1, outcomeDescription: "명절에 가족과 함께 하지 못해 더욱 그리움이 커졌다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'commander_inauguration_ceremony_preparation', 
        type: 'special',
        title: "부대장 이취임식 준비",
        description: "부대장 이취임식을 앞두고 여러 준비 작업에 동원되었다.",
        choices: [
            { text: "맡은 업무를 완벽히 수행한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "중요한 행사인 만큼 맡은 임무를 완벽하게 준비했다.", nextEventId: 'personal_time' },
            { text: "최소한의 업무만 수행한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "피할 수 없는 일이니 최소한의 업무만 처리했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'veteran_invitation_event', 
        type: 'special',
        title: "참전용사 초청 행사",
        description: "6.25 참전용사 등을 초청하여 감사의 마음을 전하는 행사가 열렸다.",
        choices: [
            { text: "참전용사들의 이야기에 귀 기울인다", fatigueChange: -3, staminaChange: 0, outcomeDescription: "전쟁의 역사와 참전용사들의 희생에 대해 깊이 생각하게 되었다.", nextEventId: 'personal_time' },
            { text: "행사 지원 업무에 집중한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "행사가 원활히 진행되도록 뒤에서 지원했다.", nextEventId: 'personal_time' }
        ]
    },

    // ====================================
    // 인간관계 및 갈등 이벤트
    // ====================================
    {
        id: 'peer_friendship_teamwork', 
        type: 'relationship',
        title: "동기 간 우정과 팀워크 형성",
        description: "힘든 훈련과 생활을 함께하며 동기들과의 우정이 깊어지고 있다.",
        choices: [
            { text: "동기들을 돕고 의지한다", fatigueChange: -3, staminaChange: 1, outcomeDescription: "서로 돕고 의지하며 힘든 시기를 함께 이겨내고 있다.", nextEventId: 'personal_time' },
            { text: "가끔 경쟁심을 느낀다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "친하면서도 가끔은 동기보다 더 잘하고 싶은 마음이 든다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'resolving_conflict_with_senior', 
        type: 'relationship',
        title: "선임과의 갈등 해결하기",
        description: "업무나 생활 방식 차이로 선임과 갈등이 생겼다.",
        choices: [
            { text: "대화를 통해 오해를 푼다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "용기를 내어 선임과 대화했고, 서로의 입장을 이해하게 되었다.", nextEventId: 'personal_time' },
            { text: "갈등을 회피한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "괜히 말을 꺼냈다가 더 안 좋아질까 봐 갈등을 피했다.", nextEventId: 'personal_time' },
            { text: "다른 선임이나 간부에게 중재를 요청한다", fatigueChange: 4, staminaChange: -1, outcomeDescription: "다른 사람의 도움을 받아 갈등을 해결하려 시도했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'difficulty_training_junior', 
        type: 'relationship',
        title: "후임 교육의 어려움",
        description: "새로 들어온 후임을 가르치고 지도하는 것이 생각보다 어렵다.",
        choices: [
            { text: "인내심을 갖고 차근차근 가르친다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "답답하지만 참고 후임이 잘 적응하도록 도와주었다.", nextEventId: 'personal_time' },
            { text: "화를 내거나 포기한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "자꾸 실수를 반복하는 후임에게 결국 화를 내고 말았다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'communication_issues_officer_soldier', 
        type: 'relationship',
        title: "간부와 병사 간 소통 문제",
        description: "간부와 병사 간의 입장 차이로 인해 소통에 어려움을 겪는다.",
        choices: [
            { text: "간부의 입장을 이해하려 노력한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "간부의 지시나 생각을 이해하려고 노력했다.", nextEventId: 'personal_time' },
            { text: "불만을 속으로 삭인다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "말해도 소용없을 것 같아 불만을 속으로 삭였다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'witnessing_group_bullying', 
        type: 'relationship',
        title: "부대 내 집단 따돌림 목격",
        description: "부대 내에서 한 병사가 집단 따돌림을 당하고 있는 것을 목격했다.",
        choices: [
            { text: "따돌림 당하는 동료에게 다가간다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "소외된 동료에게 먼저 다가가 말을 걸었다.", nextEventId: 'personal_time' },
            { text: "간부에게 상황을 알린다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "간부에게 따돌림 상황을 조심스럽게 알렸다.", nextEventId: 'personal_time' },
            { text: "상황을 모른 척한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "나까지 관련되고 싶지 않아 모른 척했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'hometown_friend_transfer_same_unit', 
        type: 'relationship',
        title: "고향 친구의 같은 부대 전입",
        description: "놀랍게도 고향 친구가 같은 부대로 전입해 왔다. 반갑기도 하고 묘하기도 하다.",
        choices: [
            { text: "적극적으로 도와주고 함께 지낸다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "반가운 마음에 친구의 적응을 적극적으로 도왔다.", nextEventId: 'personal_time' },
            { text: "평소처럼 대하며 거리를 유지한다", fatigueChange: -2, staminaChange: 0, outcomeDescription: "군대에서는 친구라도 군인으로서 예의를 지키며 지냈다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'birthday_surprise_party_fellow_soldiers', 
        type: 'relationship',
        title: "생일 파티와 동료들의 깜짝 선물",
        description: "부대에서 맞이한 생일. 동료들이 깜짝 파티를 준비해 주었다.",
        choices: [
            { text: "감동받고 고마워한다", fatigueChange: -10, staminaChange: 2, outcomeDescription: "뜻밖의 축하에 감동받아 눈시울이 붉어졌다.", nextEventId: 'personal_time' },
            { text: "쑥스러워한다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "관심 받는 것이 쑥스럽지만 기분은 좋았다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'becoming_unit_relationship_counselor', 
        type: 'relationship',
        title: "부대 내 연애 상담소 역할",
        description: "어느새 부대에서 연애 상담을 해주는 역할을 맡게 되었다.",
        choices: [
            { text: "진심으로 조언해준다", fatigueChange: -2, staminaChange: 0, outcomeDescription: "경험을 바탕으로 진심 어린 조언을 해주었다.", nextEventId: 'personal_time' },
            { text: "재미로 상담해준다", fatigueChange: -1, staminaChange: 0, outcomeDescription: "가볍게 상담해주며 즐거운 시간을 보냈다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'competition_jealousy_military', 
        type: 'relationship',
        title: "군대 내 경쟁과 질투 상황",
        description: "진급이나 휴가 등을 놓고 동료들 간에 경쟁과 질투가 생겼다.",
        choices: [
            { text: "공정한 경쟁으로 받아들인다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "경쟁은 어디에나 있는 것이라 받아들이고 최선을 다했다.", nextEventId: 'personal_time' },
            { text: "분위기가 안 좋아져 스트레스받는다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "동료 간 경쟁으로 팀워크가 약해지는 것 같아 걱정된다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'farewell_to_discharged_soldier', 
        type: 'relationship',
        title: "전역자와의 작별 인사",
        description: "함께 지낸 선임이 드디어 전역하는 날이다. 복잡한 감정이 든다.",
        choices: [
            { text: "진심으로 축하하고 작별인사를 나눈다", fatigueChange: -3, staminaChange: 0, outcomeDescription: "선임의 전역을 축하하며 앞날을 응원했다.", nextEventId: 'personal_time' },
            { text: "부러움과 서운함을 느낀다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "선임이 먼저 나가는 것이 부럽기도 하고 서운하기도 하다.", nextEventId: 'personal_time' }
        ]
    },
    
    // ====================================
    // 자기계발 및 취미 이벤트
    // ====================================
    {
        id: 'certificate_preparation', 
        type: 'daily',
        title: "군 복무 중 자격증 취득 준비",
        description: "개인정비 시간이나 주말을 활용해 자격증 공부를 시작했다.",
        choices: [
            { text: "꾸준히 공부하여 시험에 응시한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "열심히 공부한 결과 자격증 시험에 합격했다!", nextEventId: 'personal_time' },
            { text: "피곤해서 자주 미룬다", fatigueChange: -2, staminaChange: 1, outcomeDescription: "공부보다는 쉬고 싶은 마음이 더 커서 진도가 잘 나가지 않는다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'learning_foreign_language', 
        type: 'daily',
        title: "외국어 학습으로 시간 활용",
        description: "짬짬이 시간을 내어 외국어(영어, 일본어 등) 공부를 한다.",
        choices: [
            { text: "매일 꾸준히 단어를 외우고 공부한다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "조금씩이지만 실력이 느는 것 같다.", nextEventId: 'personal_time' },
            { text: "작심삼일로 끝난다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "처음에는 열심히 했지만 금방 흥미를 잃었다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'reading_for_knowledge_expansion', 
        type: 'daily',
        title: "독서를 통한 지식 확장",
        description: "부대 도서관이나 주문한 책을 통해 독서를 즐긴다.",
        choices: [
            { text: "다양한 분야의 책을 읽는다", fatigueChange: -3, staminaChange: 1, outcomeDescription: "다양한 주제의 책을 통해 견문을 넓혔다.", nextEventId: 'personal_time' },
            { text: "가벼운 소설만 읽는다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "재미있는 소설로 시간을 보내며 스트레스를 풀었다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'creating_exercise_routine', 
        type: 'daily',
        title: "운동 루틴 만들고 체력 향상",
        description: "개인 시간을 활용해 규칙적인 운동 루틴을 만들었다.",
        choices: [
            { text: "꾸준히 운동하여 체력을 키운다", fatigueChange: -2, staminaChange: 2, outcomeDescription: "꾸준한 운동으로 눈에 띄게 체력이 향상되었다.", nextEventId: 'personal_time' },
            { text: "간헐적으로 운동한다", fatigueChange: -1, staminaChange: 1, outcomeDescription: "기분 내킬 때만 운동해서 큰 효과는 없었다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'starting_creative_activities', 
        type: 'daily',
        title: "군대 내 창작 활동 시작",
        description: "글쓰기, 그림 그리기 등 창작 활동을 시작했다.",
        choices: [
            { text: "작품을 완성하여 성취감을 느낀다", fatigueChange: -3, staminaChange: 1, outcomeDescription: "작품을 완성하는 기쁨을 알게 되었다.", nextEventId: 'personal_time' },
            { text: "창작의 어려움을 느낀다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "생각보다 창작이 어려워 좌절감을 느꼈다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'continuing_major_studies', 
        type: 'daily',
        title: "전공 관련 공부 유지하기",
        description: "전역 후 학업이나 취업을 위해 전공 관련 공부를 계속한다.",
        choices: [
            { text: "틈틈이 전공 서적을 읽는다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "전공 지식을 잊지 않기 위해 꾸준히 공부했다.", nextEventId: 'personal_time' },
            { text: "군 생활에 집중하고 전공은 잠시 미룬다", fatigueChange: 0, staminaChange: 0, outcomeDescription: "전역 후 다시 시작하기로 하고 지금은 군 생활에 집중했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'discovering_new_hobby', 
        type: 'daily',
        title: "군대에서 새로운 취미 발견",
        description: "군 생활 중 새롭게 알게 된 취미에 빠졌다.",
        choices: [
            { text: "열정적으로 취미 활동에 몰두한다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "새로운 취미를 통해 즐거움과 보람을 찾았다.", nextEventId: 'personal_time' },
            { text: "가끔 즐기는 정도로 유지한다", fatigueChange: -2, staminaChange: 0, outcomeDescription: "시간 날 때만 취미 활동을 하며 기분 전환했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'self_development_during_leave', 
        type: 'leave',
        title: "휴가 중 자기계발 계획 실행",
        description: "휴가 기간 동안 미리 계획한 자기계발 활동을 실행한다.",
        choices: [
            { text: "계획대로 자기계발에 시간을 투자한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "휴식도 중요하지만 계획한 자기계발을 실천했다.", nextEventId: 'personal_time' },
            { text: "휴가는 쉬는 시간, 계획을 포기한다", fatigueChange: -10, staminaChange: 2, outcomeDescription: "자기계발보다는 충분한 휴식을 선택했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'planning_career_post_military', 
        type: 'daily',
        title: "전역 후 진로 계획 세우기",
        description: "전역 후 무엇을 할지 진로를 고민하고 계획을 세운다.",
        choices: [
            { text: "구체적인 계획을 세우고 준비한다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "미래를 위한 구체적인 계획을 세우고 준비하기 시작했다.", nextEventId: 'personal_time' },
            { text: "아직 결정하지 못하고 고민한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "여러 가능성을 놓고 고민하느라 결정을 내리지 못했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'joining_unit_study_group', 
        type: 'relationship',
        title: "부대 내 스터디 그룹 참여",
        description: "비슷한 관심사를 가진 동료들과 함께 스터디 그룹을 만들었다.",
        choices: [
            { text: "적극적으로 참여하고 주도한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "스터디 그룹을 이끌며 함께 성장하는 기쁨을 느꼈다.", nextEventId: 'personal_time' },
            { text: "간헐적으로 참여한다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "시간이 될 때만 참여하며 가볍게 스터디했다.", nextEventId: 'personal_time' }
        ]
    },
    
    // ====================================
    // 군 생활 속 성장 이벤트
    // ====================================
    {
        id: 'leadership_skill_development', 
        type: 'milestone',
        title: "리더십 기술 함양과 적용",
        description: "분대장이나 조장 역할을 맡으며 자연스럽게 리더십을 배우고 적용하게 된다.",
        choices: [
            { text: "책임감을 갖고 팀을 이끈다", fatigueChange: 5, staminaChange: 0, outcomeDescription: "팀원들을 독려하고 이끌면서 리더십이 향상되는 것을 느낀다.", nextEventId: 'personal_time' },
            { text: "리더 역할에 부담을 느낀다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "팀을 이끄는 것이 어렵고 부담스럽게 느껴진다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'improved_judgment_crisis_situation', 
        type: 'milestone',
        title: "위기 상황에서의 판단력 향상",
        description: "여러 위기 상황을 겪으며 침착하게 상황을 판단하는 능력이 향상되었다.",
        choices: [
            { text: "과거 경험을 바탕으로 침착하게 대응한다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "예전 같으면 당황했을 상황도 이제는 침착하게 대처할 수 있다.", nextEventId: 'personal_time' },
            { text: "여전히 위기 상황은 어렵다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "많이 나아졌지만, 여전히 위기 상황은 긴장되고 어렵다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'endurance_development_in_extreme_environment', 
        type: 'milestone',
        title: "극한 환경에서의 인내심 개발",
        description: "추위, 더위, 극심한 피로 등 극한 상황에서도 견디는 인내심이 생겼다.",
        choices: [
            { text: "극한 상황을 이겨내는 정신력이 생겼다", fatigueChange: -3, staminaChange: 1, outcomeDescription: "예전 같았으면 포기했을 상황도 이제는 견딜 수 있다.", nextEventId: 'personal_time' },
            { text: "한계 상황에서 여전히 힘들어한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "인내심이 생겼지만 극한 상황은 여전히 버티기 힘들다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'adaptability_integration_organization', 
        type: 'milestone',
        title: "조직 내 적응력과 융화 능력",
        description: "다양한 성격과 배경을 가진 사람들과 함께 생활하며 적응력이 향상되었다.",
        choices: [
            { text: "다양한 사람들과 원만하게 지낸다", fatigueChange: -2, staminaChange: 0, outcomeDescription: "어떤 사람과도 적절히 소통하고 지내는 방법을 배웠다.", nextEventId: 'personal_time' },
            { text: "특정 유형의 사람들과만 잘 지낸다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "모든 사람과 잘 지내기는 어렵지만, 나와 맞는 사람들은 찾았다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'responsibility_sense_of_mission', 
        type: 'milestone',
        title: "책임감과 사명감 형성",
        description: "맡은 임무의 중요성을 인식하고 책임감과 사명감이 생겼다.",
        choices: [
            { text: "임무에 대한 책임감이 강해졌다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "내 역할의 중요성을 깨닫고 더욱 책임감 있게 행동하게 되었다.", nextEventId: 'personal_time' },
            { text: "의무감으로 임무를 수행한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "진정한 사명감보다는 의무감으로 임무를 수행한다.", nextEventId: 'personal_time' }
        ]
    },
    // events.js - Part 7 of 7: 휴가, 외부 활동, 전역 준비
// 전체 게임을 위해서는 모든 파트를 하나의 events.js 파일로 합쳐야 합니다.

// Part 6에서 이어짐 - 이 문구는 실제 병합 시 삭제하세요
// const events = [ 로 시작하는 배열 선언 이후 쉼표를 넣고 이어서 작성합니다.

    // ====================================
    // 휴가 및 외부 활동 이벤트
    // ====================================
    { 
        id: 'first_leave_plan_execution', 
        type: 'leave',
        title: "첫 휴가 계획과 실행",
        description: "드디어 기다리고 기다리던 첫 휴가다! 무엇을 할지 계획을 세우고 실행에 옮긴다.",
        choices: [
            { text: "집에서 푹 쉬며 가족과 시간을 보낸다", fatigueChange: -25, staminaChange: 5, outcomeDescription: "오랜만에 집밥을 먹고 가족들과 시간을 보내니 피로가 풀린다.", nextEventId: 'hometown_visit_family_reunion' },
            { text: "친구들을 만나 회포를 푼다", fatigueChange: -15, staminaChange: 3, outcomeDescription: "친구들과 만나 밤새 군대 이야기를 하며 즐거운 시간을 보냈다.", nextEventId: 'hometown_visit_family_reunion' }
        ]
    },
    {
        id: 'hometown_visit_family_reunion', 
        type: 'leave',
        title: "고향 방문과 가족 재회",
        description: "휴가를 나와 오랜만에 고향 집에 도착했다. 가족들이 반갑게 맞아준다.",
        choices: [
            { text: "가족들과 밀린 이야기를 나눈다", fatigueChange: -10, staminaChange: 2, outcomeDescription: "그동안 못했던 이야기를 나누며 가족의 소중함을 느낀다.", nextEventId: 'meeting_friends_during_leave' },
            { text: "어색함을 느낀다", fatigueChange: 0, staminaChange: 0, outcomeDescription: "오랜만에 보니 가족들과도 약간의 어색함이 느껴진다.", nextEventId: 'meeting_friends_during_leave' }
        ]
    },
    {
        id: 'meeting_friends_during_leave', 
        type: 'leave',
        title: "휴가 중 친구들과의 만남",
        description: "휴가를 맞아 친구들을 만났다. 다들 그대로인 것 같기도, 변한 것 같기도 하다.",
        choices: [
            { text: "군대 이야기를 실컷 한다", fatigueChange: -8, staminaChange: 1, outcomeDescription: "친구들에게 군대 '썰'을 풀며 즐거워했다.", nextEventId: 'crisis_late_return_from_leave' },
            { text: "친구들의 이야기에 소외감을 느낀다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "나만 다른 세계에 있는 듯한 느낌에 조금 소외감을 느꼈다.", nextEventId: 'crisis_late_return_from_leave' }
        ]
    },
    {
        id: 'crisis_late_return_from_leave', 
        type: 'leave',
        title: "휴가 복귀 지각 위기",
        description: "늦잠을 자거나 차를 놓쳐 휴가 복귀 시간에 늦을 위기에 처했다!",
        choices: [
            { text: "택시를 타고 서둘러 복귀한다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "비싼 택시비를 내고 아슬아슬하게 복귀 시간에 맞춰 도착했다.", nextEventId: 'personal_time' },
            { text: "부대에 전화해서 상황을 알린다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "미리 부대에 연락하여 양해를 구하고 조금 늦게 복귀했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'understanding_leave_regulations', 
        type: 'leave',
        title: "외출/외박 규정 숙지",
        description: "부대의 외출/외박 규정과 절차를 정확히 이해하는 것은 중요하다.",
        choices: [
            { text: "규정을 꼼꼼히 숙지한다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "규정을 확실히 이해하고 실수 없이 휴가를 신청하게 되었다.", nextEventId: 'personal_time' },
            { text: "선임들에게 물어본다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "경험 많은 선임들의 조언으로 휴가 신청 요령을 배웠다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'planning_leave_trip', 
        type: 'leave',
        title: "휴가지 여행 계획",
        description: "짧은 휴가 시간을 활용해 여행을 계획한다.",
        choices: [
            { text: "철저하게 계획을 세운다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "짧은 시간을 최대한 활용하기 위해 꼼꼼히 계획을 세웠다.", nextEventId: 'personal_time' },
            { text: "즉흥적으로 여행한다", fatigueChange: 0, staminaChange: 0, outcomeDescription: "계획 없이 즉흥적으로 여행하며 자유를 만끽했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'dating_during_military_service', 
        type: 'leave',
        title: "군 복무 중 데이트 경험",
        description: "휴가 중 연인과의 소중한 시간을 갖는다.",
        choices: [
            { text: "오래 기다려준 연인에게 감사함을 표현한다", fatigueChange: -15, staminaChange: 3, outcomeDescription: "소중한 시간을 함께하며 연인에 대한 사랑과 감사함을 느꼈다.", nextEventId: 'personal_time' },
            { text: "군 생활로 서로 어색해졌다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "오랜 시간 떨어져 있어 약간의 어색함이 느껴졌다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'enjoying_civilian_clothes_during_leave', 
        type: 'leave',
        title: "휴가 중 민간인 옷 착용의 자유",
        description: "오랜만에 군복이 아닌 평상복을 입는 기분이 묘하다.",
        choices: [
            { text: "최신 유행 패션을 즐긴다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "군복에서 벗어나 자유롭게 패션을 즐겼다.", nextEventId: 'personal_time' },
            { text: "편안한 옷이 그립다", fatigueChange: -3, staminaChange: 1, outcomeDescription: "그저 편안한 옷을 입는 것만으로도 행복하다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'efficient_use_of_leave_time', 
        type: 'leave',
        title: "휴가 시간 효율적 활용",
        description: "짧은 휴가 시간을 어떻게 효율적으로 쓸지 고민한다.",
        choices: [
            { text: "계획적으로 시간을 관리한다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "시간을 효율적으로 활용하여 많은 일을 해결했다.", nextEventId: 'personal_time' },
            { text: "여유롭게 시간을 보낸다", fatigueChange: -8, staminaChange: 2, outcomeDescription: "일정에 쫓기지 않고 여유롭게 휴가를 즐겼다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'requesting_special_occasion_leave', 
        type: 'leave',
        title: "특별한 기념일 휴가 신청",
        description: "가족 행사, 기념일 등 특별한 날에 맞춰 휴가를 신청하고 싶다.",
        choices: [
            { text: "일찍부터 준비하고 부탁한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "미리 준비하여 원하는 날짜에 휴가를 얻을 수 있었다.", nextEventId: 'personal_time' },
            { text: "휴가 조정이 안 되어 아쉬워한다", fatigueChange: 10, staminaChange: -2, outcomeDescription: "부대 상황 때문에 원하는 날짜에 휴가를 못 가게 되어 아쉽다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'welcoming_visitors_at_military_base', 
        type: 'leave',
        title: "면회객 맞이하기",
        description: "가족이나 친구가 부대로 면회를 왔다.",
        choices: [
            { text: "반갑게 맞이하고 부대 이야기를 들려준다", fatigueChange: -10, staminaChange: 2, outcomeDescription: "오랜만에 가족/친구를 만나 즐거운 시간을 보냈다.", nextEventId: 'personal_time' },
            { text: "면회객 앞에서 긴장한다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "반가우면서도 어색한 시간이었다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'experiencing_changes_outside_world', 
        type: 'leave',
        title: "외부 세계의 변화 체감",
        description: "휴가를 나가보니 군대 있는 동안 세상이 많이 변했다.",
        choices: [
            { text: "새로운 변화에 적응하려 노력한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "변화된 세상에 호기심을 갖고 적응하려 했다.", nextEventId: 'personal_time' },
            { text: "변화에 놀라고 당황한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "많은 변화에 적응하기 어려워 당황스러웠다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'worrying_about_unit_during_leave', 
        type: 'leave',
        title: "휴가 중 부대 걱정하기",
        description: "휴가 중에도 문득문득 부대의 동료들과 일이 생각난다.",
        choices: [
            { text: "잠시 연락해본다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "동료에게 연락해 부대 소식을 들었다.", nextEventId: 'personal_time' },
            { text: "휴가에 집중한다", fatigueChange: -3, staminaChange: 1, outcomeDescription: "짧은 휴가 동안은 부대 생각을 잊고 휴식에 집중했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'buying_gifts_during_leave', 
        type: 'leave',
        title: "휴가 선물 구매와 나눔",
        description: "휴가 중 부대 동료들을 위한 간식이나 선물을 구매한다.",
        choices: [
            { text: "모두를 위한 간식을 사간다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "동료들을 위해 넉넉히 간식을 준비했다.", nextEventId: 'personal_time' },
            { text: "친한 사람들을 위한 선물만 산다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "가까운 친구들을 위한 작은 선물을 준비했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'readjusting_after_leave', 
        type: 'leave',
        title: "휴가 후 군 생활 재적응",
        description: "휴가가 끝나고 다시 군 생활로 돌아오는 것이 쉽지 않다.",
        choices: [
            { text: "빠르게 일상으로 돌아온다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "휴가병을 짧게 앓고 다시 일상에 적응했다.", nextEventId: 'personal_time' },
            { text: "휴가 후유증이 길게 간다", fatigueChange: 12, staminaChange: -2, outcomeDescription: "민간인 생활이 그리워 적응하는데 시간이 걸렸다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'using_military_discounts_during_outings', 
        type: 'leave',
        title: "외출 시 군인 할인 혜택 활용",
        description: "외출 시 영화관, 대중교통 등에서 군인 할인을 받을 수 있다.",
        choices: [
            { text: "적극적으로 할인 혜택을 활용한다", fatigueChange: -2, staminaChange: 0, outcomeDescription: "다양한 군인 할인 혜택을 활용해 알뜰하게 외출을 즐겼다.", nextEventId: 'personal_time' },
            { text: "군인임을 드러내지 않으려 한다", fatigueChange: 0, staminaChange: 0, outcomeDescription: "군인임을 밝히기 꺼려 할인 혜택을 잘 활용하지 않았다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'exploring_tourist_spots_near_base', 
        type: 'leave',
        title: "주변 관광지 탐방",
        description: "부대 근처의 관광지나 명소를 방문한다.",
        choices: [
            { text: "유명 관광지를 찾아간다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "유명한 관광 명소를 방문해 색다른 경험을 했다.", nextEventId: 'personal_time' },
            { text: "조용한 장소에서 휴식한다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "한적한 장소에서 여유로운 시간을 보냈다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'calculating_return_date_time_management', 
        type: 'leave',
        title: "복귀일 계산과 시간 관리",
        description: "휴가 종료 시간과 복귀 경로를 고려해 계획을 세운다.",
        choices: [
            { text: "여유 있게 계획한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "만일의 상황을 대비해 여유 있게 복귀 계획을 세웠다.", nextEventId: 'personal_time' },
            { text: "마지막까지 시간을 활용한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "휴가 시간을 최대한 활용하기 위해 타이트하게 계획했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'unexpected_situation_during_leave', 
        type: 'leave',
        title: "휴가 중 예상치 못한 상황",
        description: "휴가 중 갑작스러운 상황(교통 문제, 건강 이슈 등)이 발생했다.",
        choices: [
            { text: "침착하게 대처한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "예상치 못한 상황에도 침착하게 대처하여 문제를 해결했다.", nextEventId: 'personal_time' },
            { text: "당황하여 도움을 요청한다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "당황스러운 상황에 주변의 도움을 받아 해결했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'requesting_leave_extension', 
        type: 'leave',
        title: "휴가 연장 신청과 처리",
        description: "불가피한 사정으로 휴가 연장이 필요한 상황이 발생했다.",
        choices: [
            { text: "정식으로 연장 신청을 한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "정당한 사유로 휴가 연장 신청을 했고 승인받았다.", nextEventId: 'personal_time' },
            { text: "연장 실패로 급히 복귀한다", fatigueChange: 15, staminaChange: -2, outcomeDescription: "연장이 불가능해 급하게 복귀해야 했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'interacting_with_locals_during_leave', 
        type: 'leave',
        title: "지역 주민과의 교류",
        description: "휴가 중 지역 주민들과 대화하거나 교류할 기회가 생겼다.",
        choices: [
            { text: "친절하게 대화에 참여한다", fatigueChange: -3, staminaChange: 1, outcomeDescription: "지역 주민들과 대화하며 즐거운 시간을 보냈다.", nextEventId: 'personal_time' },
            { text: "최소한의 교류만 한다", fatigueChange: 0, staminaChange: 0, outcomeDescription: "필요한 대화만 짧게 나누고 자신의 시간에 집중했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'sharing_military_stories_during_leave', 
        type: 'leave',
        title: "휴가 중 군 생활 이야기 나누기",
        description: "가족이나 친구들이 군 생활에 대해 물어본다.",
        choices: [
            { text: "재미있는 에피소드 위주로 이야기한다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "군 생활의 재미있는 면을 중심으로 이야기했다.", nextEventId: 'personal_time' },
            { text: "힘든 점도 솔직하게 이야기한다", fatigueChange: -2, staminaChange: 0, outcomeDescription: "군 생활의 양면을 솔직하게 공유했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'mixed_feelings_before_return', 
        type: 'leave',
        title: "복귀 전날의 복잡한 감정",
        description: "휴가가 끝나고 부대로 복귀해야 하는 전날, 복잡한 감정이 든다.",
        choices: [
            { text: "긍정적인 마음으로 준비한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "휴식을 잘 취했으니 남은 군 생활도 잘 해내리라 다짐했다.", nextEventId: 'personal_time' },
            { text: "아쉬움과 우울함을 느낀다", fatigueChange: 8, staminaChange: -1, outcomeDescription: "짧은 자유가 끝난다는 생각에 우울한 기분이 들었다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'encountering_military_perception_outside', 
        type: 'leave',
        title: "외부인의 군대 인식 경험",
        description: "휴가 중 민간인들이 군대에 대해 가진 인식을 경험한다.",
        choices: [
            { text: "군에 대한 잘못된 인식을 바로잡는다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "군대에 대한 오해나 편견을 정정하려 노력했다.", nextEventId: 'personal_time' },
            { text: "그냥 듣고 넘긴다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "다양한 의견이 있을 수 있다고 생각하고 크게 신경 쓰지 않았다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'chance_encounter_during_leave', 
        type: 'leave',
        title: "휴가지에서의 우연한 만남",
        description: "휴가 중 예상치 못하게 아는 사람을 만났다.",
        choices: [
            { text: "반갑게 인사하고 대화한다", fatigueChange: -3, staminaChange: 1, outcomeDescription: "우연한 만남에 반가워하며 즐거운 시간을 보냈다.", nextEventId: 'personal_time' },
            { text: "어색하게 짧은 인사만 나눈다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "예상치 못한 만남이라 어색하게 짧은 인사만 나누었다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'budgeting_saving_leave_expenses', 
        type: 'leave',
        title: "휴가비 절약과 지출 계획",
        description: "제한된 휴가비를 어떻게 효율적으로 사용할지 계획한다.",
        choices: [
            { text: "계획적으로 지출한다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "예산을 세워 계획적으로 지출했다.", nextEventId: 'personal_time' },
            { text: "즐기는 데 중점을 둔다", fatigueChange: -3, staminaChange: 1, outcomeDescription: "돈 걱정보다는 즐거운 경험에 투자했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'noticing_difference_civilian_conversation', 
        type: 'leave',
        title: "민간인과의 대화 방식 차이",
        description: "오랜 군 생활 후 민간인과 대화할 때 어투나 표현 방식의 차이를 느낀다.",
        choices: [
            { text: "의식적으로 일반 대화 방식으로 전환한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "군대식 말투를 자제하고 일반적인 어투로 대화했다.", nextEventId: 'personal_time' },
            { text: "자연스럽게 군대 말투가 나온다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "가끔 군대식 표현이 튀어나와 주변 사람들이 웃었다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'catching_up_news_during_leave', 
        type: 'leave',
        title: "휴가 중 사회 뉴스 접하기",
        description: "휴가 중 최근 사회 이슈나 뉴스를 접할 기회가 있다.",
        choices: [
            { text: "적극적으로 뉴스를 찾아본다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "사회 소식에 관심을 갖고 다양한 뉴스를 찾아봤다.", nextEventId: 'personal_time' },
            { text: "가벼운 뉴스만 본다", fatigueChange: -1, staminaChange: 0, outcomeDescription: "무거운 뉴스보다는 가벼운 소식이나 연예 뉴스에 집중했다.", nextEventId: 'personal_time' }
        ]
    },
    
    // ====================================
    // 전역 준비 단계 이벤트
    // ====================================
    {
        id: 'discharge_100_days_countdown', 
        type: 'milestone',
        title: "전역 100일 카운트다운 시작",
        description: "드디어 전역일이 100일 앞으로 다가왔다. '말년'이 되었다는 실감이 난다.",
        choices: [
            { text: "전역일 계산만 하며 시간을 보낸다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "달력에 X표를 치며 전역일만 기다린다.", nextEventId: 'handover_duties_to_junior' },
            { text: "남은 군 생활을 의미있게 보내려 한다", fatigueChange: 0, staminaChange: 0, outcomeDescription: "얼마 남지 않은 군 생활, 유종의 미를 거두기로 다짐한다.", nextEventId: 'handover_duties_to_junior' }
        ]
    },
    {
        id: 'handover_duties_to_junior', 
        type: 'milestone',
        title: "후임에게 업무 인수인계",
        description: "전역이 다가오면서 맡았던 업무를 후임에게 인수인계하기 시작했다.",
        choices: [
            { text: "꼼꼼하게 모든 노하우를 전수한다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "후임이 잘 적응할 수 있도록 내가 아는 모든 것을 알려주었다.", nextEventId: 'preparing_discharge_report_paperwork' },
            { text: "필요한 것만 간단히 알려준다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "핵심적인 내용 위주로 인수인계를 마쳤다.", nextEventId: 'preparing_discharge_report_paperwork' }
        ]
    },
    {
        id: 'preparing_discharge_report_paperwork', 
        type: 'milestone',
        title: "전역 신고 준비와 서류 작성",
        description: "전역을 위해 필요한 서류들을 준비하고 작성한다.",
        choices: [
            { text: "누락된 서류 없이 꼼꼼히 챙긴다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "전역 절차에 필요한 서류들을 빠짐없이 준비했다.", nextEventId: 'participating_last_training_before_discharge' },
            { text: "귀찮아서 미루다 급하게 처리한다", fatigueChange: 4, staminaChange: -1, outcomeDescription: "미루다가 마지막에 급하게 서류를 준비했다.", nextEventId: 'participating_last_training_before_discharge' }
        ]
    },
    {
        id: 'participating_last_training_before_discharge', 
        type: 'milestone',
        title: "전역 전 마지막 훈련 참가",
        description: "전역을 앞두고 마지막으로 훈련에 참가하게 되었다.",
        choices: [
            { text: "유종의 미를 거두기 위해 열심히 참여한다", fatigueChange: 10, staminaChange: -1, outcomeDescription: "마지막 훈련이라고 생각하니 감회가 새롭다. 최선을 다했다.", nextEventId: 'planning_discharge_leave' },
            { text: "몸을 사리며 안전하게 참여한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "전역 직전에 다치면 안 되니 최대한 안전하게 훈련을 마쳤다.", nextEventId: 'planning_discharge_leave' }
        ]
    },
    {
        id: 'planning_discharge_leave', 
        type: 'leave',
        title: "전역 휴가 계획 세우기",
        description: "마지막 휴가, 즉 전역 휴가 계획을 세운다. 사회로 나갈 준비를 한다.",
        choices: [
            { text: "여행 계획을 세운다", fatigueChange: -10, staminaChange: 2, outcomeDescription: "그동안 못 갔던 여행을 가기로 했다.", nextEventId: 'preparing_for_civilian_job_return_to_school' },
            { text: "취업/복학 준비를 한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "휴가 기간 동안 사회에 나가 할 일을 미리 준비하기로 했다.", nextEventId: 'preparing_for_civilian_job_return_to_school' }
        ]
    },
    {
        id: 'preparing_for_civilian_job_return_to_school', 
        type: 'milestone',
        title: "민간 취업/복학 준비 및 고민",
        description: "전역 후 무엇을 할지 구체적으로 고민하고 준비하기 시작한다.",
        choices: [
            { text: "관련 정보를 찾아보고 계획을 세운다", fatigueChange: 3, staminaChange: 0, outcomeDescription: "인터넷이나 책을 통해 정보를 얻으며 미래를 계획한다.", nextEventId: 'discharge_celebration_party_peers' },
            { text: "막막함을 느낀다", fatigueChange: 6, staminaChange: -1, outcomeDescription: "무엇부터 해야 할지 막막하고 불안한 마음이 든다.", nextEventId: 'discharge_celebration_party_peers' }
        ]
    },
    {
        id: 'discharge_celebration_party_peers', 
        type: 'relationship',
        title: "전역 기념 파티와 동료들의 축하",
        description: "동기 및 선후임들이 나의 전역을 축하해주기 위해 작은 파티를 열어주었다.",
        choices: [
            { text: "진심으로 고마움을 표현한다", fatigueChange: -15, staminaChange: 3, outcomeDescription: "함께 했던 동료들의 축하에 감동받았다.", nextEventId: 'final_barracks_cleanup_returning_items' },
            { text: "쑥스러워한다", fatigueChange: -10, staminaChange: 2, outcomeDescription: "이런 자리가 익숙하지 않아 쑥스러웠지만 기분은 좋다.", nextEventId: 'final_barracks_cleanup_returning_items' }
        ]
    },
    {
        id: 'final_barracks_cleanup_returning_items', 
        type: 'milestone',
        title: "마지막 내무반 정리 및 물품 반납",
        description: "정들었던 내무반을 정리하고 지급받았던 물품들을 반납한다.",
        choices: [
            { text: "깨끗하게 정리하고 물품을 반납한다", fatigueChange: 5, staminaChange: -1, outcomeDescription: "마지막까지 깔끔하게 정리하고 물품을 반납했다.", nextEventId: 'discharge_interview_with_commander' },
            { text: "후임에게 정리를 부탁한다", fatigueChange: 2, staminaChange: 0, outcomeDescription: "말년이니 이 정도는 괜찮겠지. 후임에게 정리를 부탁했다.", nextEventId: 'discharge_interview_with_commander' }
        ]
    },
    {
        id: 'discharge_interview_with_commander', 
        type: 'milestone',
        title: "부대장과의 전역 면담",
        description: "전역 신고를 위해 부대장(지휘관)과 마지막 면담을 한다.",
        choices: [
            { text: "감사의 인사를 전한다", fatigueChange: 1, staminaChange: 0, outcomeDescription: "그동안의 지도에 대해 감사의 인사를 드렸다.", nextEventId: 'receiving_discharge_certificate_leaving_unit' },
            { text: "건의사항을 이야기한다", fatigueChange: 0, staminaChange: 0, outcomeDescription: "마지막으로 부대 발전을 위한 건의사항을 조심스럽게 이야기했다.", nextEventId: 'receiving_discharge_certificate_leaving_unit' }
        ]
    },
    {
        id: 'receiving_discharge_certificate_leaving_unit', 
        type: 'milestone',
        title: "전역증 수여식과 민간인 복장으로 부대 떠나기",
        description: "간단한 전역증 수여식을 마치고, 가져온 민간인 옷으로 갈아입고 부대를 나설 준비를 한다.",
        choices: [
            { text: "전역증을 받고 감격한다", fatigueChange: -20, staminaChange: 3, outcomeDescription: "드디어 전역증을 받았다! 꿈만 같다.", nextEventId: 'discharge_day_leaving_gate' },
            { text: "민간인 옷이 어색하다", fatigueChange: -15, staminaChange: 2, outcomeDescription: "오랜만에 입는 사복이 어색하게 느껴진다.", nextEventId: 'discharge_day_leaving_gate' }
        ]
    },
    {
        id: 'discharge_day_leaving_gate', 
        type: 'milestone',
        title: "전역 당일 부대 정문을 나서는 순간",
        description: "모든 절차를 마치고 마침내 부대 정문을 나선다. 시원섭섭한 기분이다.",
        choices: [
            { text: "뒤도 돌아보지 않고 간다", fatigueChange: -100, staminaChange: 10, outcomeDescription: "드디어 끝났다! 자유다!", nextEventId: 'first_day_civilian_life_adaptation' },
            { text: "정든 부대를 한번 돌아본다", fatigueChange: -90, staminaChange: 9, outcomeDescription: "힘들었지만 많은 것을 배우고 간다. 안녕히 계십시오.", nextEventId: 'first_day_civilian_life_adaptation' }
        ]
    },
    {
        id: 'first_day_civilian_life_adaptation', 
        type: 'milestone',
        title: "전역 후 첫날 민간인 생활 적응",
        description: "전역 후 맞이한 첫날. 모든 것이 낯설고 새롭다.",
        choices: [
            { text: "늦잠을 실컷 잔다", fatigueChange: -30, staminaChange: 5, outcomeDescription: "기상나팔 소리 없는 아침! 꿀잠을 잤다.", nextEventId: 'reflecting_military_life_experience' },
            { text: "하고 싶었던 것을 한다", fatigueChange: -20, staminaChange: 3, outcomeDescription: "그동안 못했던 것들을 하며 자유를 만끽한다.", nextEventId: 'reflecting_military_life_experience' }
        ]
    },
    {
        id: 'reflecting_military_life_experience', 
        type: 'milestone',
        title: "군 생활 경험 정리와 회고",
        description: "길었던 군 생활을 되돌아보며 경험을 정리하고 의미를 되새긴다.",
        choices: [
            { text: "힘들었지만, 배운 것도 많았다", fatigueChange: -5, staminaChange: 1, outcomeDescription: "돌이켜보면 힘들었지만 나를 성장시킨 시간이었다.", nextEventId: 'game_clear' },
            { text: "빨리 잊고 싶다", fatigueChange: 0, staminaChange: 0, outcomeDescription: "다시는 기억하고 싶지 않은 시간이다.", nextEventId: 'game_clear' }
        ]
    },
    {
        id: 'game_clear', 
        type: 'system',
        title: "전역",
        description: "축하합니다! 무사히 군 복무를 마치고 전역했습니다!",
        choices: [
            { text: "처음부터 다시 시작하기", nextEventId: 'enlistment_notice' },
            { text: "게임 종료하기", action: 'exitGame' }
        ]
    }
]; // 전체 events 배열의 끝

// 파일의 끝입니다.
