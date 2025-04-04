// events.js - Part 1 of 7: 입대 및 훈련소 (초반)
// 전체 게임을 위해서는 모든 파트를 하나의 events.js 파일로 합쳐야 합니다.

// const events = [ // 실제 파일에서는 이 줄로 시작합니다. 여기서는 배열 내용만 표시합니다.

    // ====================================
    // 시스템 이벤트 (기존)
    // ====================================
    {
        id: 'start_day_1', type: 'system', // 실제 게임 시작 시 이 이벤트 대신 아래 'enlistment_notice' 부터 시작하도록 로직 수정 필요
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
        // 선택지는 메인 스크립트의 displayEvent 함수에서 동적으로 생성 ('잠자리에 든다')
    },
    {
         id: 'finalize_day', type: 'system',
         action: 'finalizeDay' // 메인 스크립트의 finalizeDay 함수 호출 (문자열로!)
    },
    {
        id: 'personal_time', // 이 ID는 메인 스크립트에서 동적으로 처리됨 (endDaySequence 함수)
        type: 'system', // 시스템 처리로 분류
        title: "개인 정비 시간",
        description: "개인 정비 시간입니다. 무엇을 하시겠습니까?",
        // 선택지는 메인 스크립트의 endDaySequence 함수에서 동적으로 생성
    },

    // ====================================
    // 입대 및 훈련소 단계 (상세화된 이벤트 예시)
    // ====================================
    {
        id: 'enlistment_notice', type: 'milestone',
        title: "입영통지서 수령",
        description: "우편함에 국방부에서 보낸 입영통지서가 도착했다. 드디어 올 것이 왔구나...",
        choices: [
            { text: "담담하게 받아들인다", fatigueChange: 2, outcomeDescription: "마음의 준비는 하고 있었다. 입대 날짜를 확인한다.", nextEventId: 'last_meal_family' },
            { text: "부모님께 보여드린다", fatigueChange: 3, outcomeDescription: "부모님께 통지서를 보여드리니 걱정스러운 표정을 지으신다.", nextEventId: 'last_meal_family' },
            { text: "친구들에게 알린다", fatigueChange: 1, outcomeDescription: "친구들에게 입대 날짜를 알리니 놀라면서도 격려해준다.", nextEventId: 'last_meal_family' }
        ]
    },
    {
        id: 'last_meal_family', type: 'milestone',
        title: "가족과의 마지막 식사",
        description: "입대 전날, 가족들과 함께 마지막 저녁 식사를 한다. 어색한 침묵과 걱정이 오간다.",
        choices: [
            { text: "씩씩한 척하며 농담한다", fatigueChange: -5, outcomeDescription: "걱정하시는 부모님을 안심시켜 드리려 애써 밝게 행동했다.", nextEventId: 'enlistment_bus' },
            { text: "솔직하게 걱정을 나눈다", fatigueChange: 0, outcomeDescription: "가족들과 군 생활에 대한 걱정과 당부를 나누었다. 마음이 조금 무겁다.", nextEventId: 'enlistment_bus' },
            { text: "묵묵히 식사만 한다", fatigueChange: 5, outcomeDescription: "무슨 말을 해야 할지 몰라 밥만 먹었다. 분위기가 가라앉는다.", nextEventId: 'enlistment_bus' }
        ]
    },
    {
        id: 'enlistment_bus', type: 'milestone',
        title: "입영 버스 탑승",
        description: "가족, 친구들과의 짧은 작별 인사를 마치고 입영 장정들을 태운 버스에 오른다. 창밖 풍경이 낯설게 느껴진다.",
        choices: [
            { text: "창밖을 보며 생각에 잠긴다", fatigueChange: 3, outcomeDescription: "앞으로 펼쳐질 군 생활에 대한 막연한 불안감이 밀려온다.", nextEventId: 'haircut_uniform' },
            { text: "옆자리 동기에게 말을 건다", fatigueChange: 1, outcomeDescription: "어색함을 깨고 옆자리 동기와 간단한 이야기를 나누었다.", nextEventId: 'haircut_uniform' },
            { text: "애써 잠을 청한다", fatigueChange: -2, outcomeDescription: "불안한 마음을 달래려 눈을 감았지만 잠이 오지 않는다.", nextEventId: 'haircut_uniform' }
        ]
    },
    {
        id: 'haircut_uniform', type: 'training',
        title: "삭발 및 군복 지급",
        description: "훈련소에 도착하자마자 삭발을 하고, 몸에 맞는지 안 맞는지 모를 군복과 군화를 지급받았다. 거울 속 내 모습이 어색하다.",
        choices: [
            { text: "어색하지만 받아들인다", fatigueChange: 5, outcomeDescription: "짧은 머리와 군복이 아직은 영 어색하다. 이게 군인이구나.", nextEventId: 'barracks_assignment' },
            { text: "동기들과 서로 놀린다", fatigueChange: 2, outcomeDescription: "동기들과 서로의 머리 스타일을 보며 웃었다. 조금이나마 긴장이 풀린다.", nextEventId: 'barracks_assignment' },
            { text: "불편한 군복에 대해 불평한다", fatigueChange: 7, outcomeDescription: "몸에 맞지 않는 군복과 군화가 벌써부터 불편하게 느껴진다.", nextEventId: 'barracks_assignment' }
        ]
    },
    {
        id: 'barracks_assignment', type: 'training',
        title: "내무반(생활관) 배정",
        description: "앞으로 생활하게 될 내무반에 배정받았다. 수십 개의 관물대와 침상이 줄지어 있다. 여기서 어떻게 지내야 할까.",
        choices: [
            { text: "지정된 자리를 확인하고 짐을 푼다", fatigueChange: 3, outcomeDescription: "내 관물대와 침상을 확인하고 지급받은 물품을 정리하기 시작했다.", nextEventId: 'meeting_peers' },
            { text: "먼저 와 있는 동기들에게 인사한다", fatigueChange: 2, outcomeDescription: "어색하지만 먼저 와 있는 동기들에게 다가가 인사를 건넸다.", nextEventId: 'meeting_peers' },
            { text: "멍하니 서서 주변을 둘러본다", fatigueChange: 4, outcomeDescription: "낯선 환경에 아직 적응이 되지 않아 멍하니 서 있었다.", nextEventId: 'meeting_peers' }
        ]
    },
    {
        id: 'meeting_peers', type: 'relationship',
        title: "동기들과 첫 인사",
        description: "내무반에서 동기들과 정식으로 통성명을 하고 자기소개를 하는 시간을 가졌다. 다들 긴장한 표정이다.",
        choices: [
            { text: "간단하고 솔직하게 나를 소개한다", fatigueChange: 1, outcomeDescription: "내 이름과 사는 곳 등 기본적인 정보를 이야기했다.", nextEventId: 'meeting_instructor' },
            { text: "분위기를 띄우려 농담을 섞는다", fatigueChange: -1, outcomeDescription: "어색한 분위기를 풀어보려 가벼운 농담을 던졌는데, 반응은 그저 그렇다.", nextEventId: 'meeting_instructor' },
            { text: "다른 동기들의 소개를 경청한다", fatigueChange: 2, outcomeDescription: "앞으로 함께 지낼 동기들의 이름과 특징을 기억하려 애썼다.", nextEventId: 'meeting_instructor' }
        ]
    },
    {
        id: 'meeting_instructor', type: 'training',
        title: "훈련소 교관과의 첫 만남",
        description: "드디어 훈련소 교관이 내무반에 들어섰다. 날카로운 눈빛과 목소리에서 강한 카리스마가 느껴진다.",
        choices: [
            { text: "긴장해서 부동자세를 취한다", fatigueChange: 5, outcomeDescription: "교관의 포스에 압도되어 숨쉬기조차 힘들었다.", nextEventId: 'learning_etiquette' },
            { text: "눈을 마주치지 않으려 노력한다", fatigueChange: 4, outcomeDescription: "괜히 눈에 띄면 안 될 것 같아 시선을 피했다.", nextEventId: 'learning_etiquette' },
            { text: "교관의 지시에 집중한다", fatigueChange: 3, outcomeDescription: "앞으로의 훈련 생활이 순탄치 않을 것 같다. 정신 바짝 차려야겠다.", nextEventId: 'learning_etiquette' }
        ]
    },
     {
        id: 'learning_etiquette', type: 'training',
        title: "군대 예절 및 경례 배우기",
        description: "군대에서의 말투, 행동 요령, 그리고 가장 기본인 경례 방법을 배웠다. 생각보다 어렵다.",
        choices: [
            { text: "열심히 따라하며 익힌다", fatigueChange: 4, staminaChange: 1, outcomeDescription: "몇 번의 지적 끝에 경례 자세가 조금은 자연스러워졌다.", nextEventId: 'first_inspection_fail' },
            { text: "자꾸 틀려서 지적받는다", fatigueChange: 7, outcomeDescription: "마음처럼 몸이 따라주지 않아 계속 지적을 받았다. 벌써부터 힘들다.", nextEventId: 'first_inspection_fail' },
            { text: "동기에게 도움을 청한다", fatigueChange: 3, outcomeDescription: "잘하는 동기에게 물어보며 자세를 교정했다.", nextEventId: 'first_inspection_fail' }
        ]
    },
    {
        id: 'first_inspection_fail', type: 'training',
        title: "첫 내무검사 실패와 단체 기합",
        description: "정리 상태 불량으로 첫 내무검사에서 지적을 받고 말았다. 결국 동기들과 함께 단체 기합을 받았다.",
        choices: [
            { text: "묵묵히 기합을 받는다", fatigueChange: 15, outcomeDescription: "내 잘못 때문에 동기들까지 고생하는 것 같아 미안한 마음이 들었다.", nextEventId: 'physical_test' },
            { text: "억울함을 느낀다", fatigueChange: 12, outcomeDescription: "나름 열심히 정리했는데 지적받으니 억울한 생각이 든다.", nextEventId: 'physical_test' },
            { text: "다음엔 잘하겠다고 다짐한다", fatigueChange: 10, outcomeDescription: "군대에서는 정리정돈이 정말 중요하다는 것을 깨달았다.", nextEventId: 'physical_test' }
        ]
    },
    {
        id: 'physical_test', type: 'training',
        title: "기초 체력 검사",
        description: "팔굽혀펴기, 윗몸일으키기, 3km 달리기 등 기초 체력 검사를 실시했다.",
        choices: [
            { text: "최선을 다해 좋은 기록을 낸다", fatigueChange: 12, staminaChange: 2, outcomeDescription: "힘들었지만 좋은 기록을 받아 뿌듯하다.", nextEventId: 'noticed_by_drill_sergeant' },
            { text: "평균적인 기록을 낸다", fatigueChange: 10, staminaChange: 1, outcomeDescription: "딱 중간 정도의 기록을 냈다. 더 노력해야겠다.", nextEventId: 'noticed_by_drill_sergeant' },
            { text: "체력이 부족해 낮은 기록을 낸다", fatigueChange: 15, outcomeDescription: "체력 부족을 절감했다. 앞으로 운동을 열심히 해야겠다.", nextEventId: 'noticed_by_drill_sergeant' }
        ]
    },
    {
        id: 'noticed_by_drill_sergeant', type: 'relationship',
        title: "조교에게 눈에 띄다",
        description: "훈련 중 무언가 잘못했는지, 아니면 잘했는지 조교가 나를 유심히 지켜보는 것 같다.",
        choices: [
            { text: "더욱 열심히 훈련에 임한다", fatigueChange: 8, outcomeDescription: "조교의 시선을 의식하며 더 열심히 했다.", nextEventId: 'rifle_safety_training' },
            { text: "실수하지 않으려 조심한다", fatigueChange: 6, outcomeDescription: "괜히 밉보이지 않도록 행동 하나하나에 신경 썼다.", nextEventId: 'rifle_safety_training' },
            { text: "왜 쳐다보는지 궁금해한다", fatigueChange: 5, outcomeDescription: "조교가 왜 나를 주목하는지 이유를 알 수 없어 불안하다.", nextEventId: 'rifle_safety_training' }
        ]
    },
    {
        id: 'rifle_safety_training', type: 'training',
        title: "총기 안전수칙 교육 및 소총 수령",
        description: "총기 안전수칙에 대한 교육을 받고 드디어 개인 소총을 지급받았다. 묵직한 무게에서 책임감이 느껴진다.",
        choices: [
            { text: "교육 내용을 숙지하고 총기를 소중히 다룬다", fatigueChange: 4, outcomeDescription: "총기는 내 생명과 같다는 말을 되새기며 조심스럽게 다루었다.", nextEventId: 'marksmanship_practice_competition' },
            { text: "무거운 소총 때문에 벌써 피곤하다", fatigueChange: 7, outcomeDescription: "생각보다 무거운 소총 때문에 어깨가 아파온다.", nextEventId: 'marksmanship_practice_competition' },
            { text: "동기들과 소총을 비교해본다", fatigueChange: 3, outcomeDescription: "지급받은 소총의 상태에 대해 동기들과 이야기를 나누었다.", nextEventId: 'marksmanship_practice_competition' }
        ]
    },
     {
        id: 'marksmanship_practice_competition', type: 'training',
        title: "사격 훈련과 명사수 경쟁",
        description: "드디어 실탄 사격 훈련이다. 동기들 사이에서 누가 더 잘 쏘는지 은근한 경쟁이 벌어진다.",
        choices: [
            { text: "숨을 참고 격발에 집중한다 (사격술)", fatigueChange: 8, outcomeDescription: "집중해서 쏜 덕분에 좋은 성적을 거뒀다. '특등사수' 소리를 들었다!", nextEventId: 'gas_chamber_training' },
            { text: "긴장해서 손이 떨린다", fatigueChange: 10, outcomeDescription: "총소리와 긴장감 때문에 제대로 조준하기 어려웠다. 결과는 좋지 않다.", nextEventId: 'gas_chamber_training' },
            { text: "빨리 쏘고 끝내고 싶다", fatigueChange: 7, outcomeDescription: "대충 쏘고 빨리 끝냈다. 탄착군이 형편없다.", nextEventId: 'gas_chamber_training' }
        ]
    },
    {
        id: 'gas_chamber_training', type: 'training',
        title: "화생방 훈련",
        description: "화생방 훈련장에 들어섰다. 방독면을 벗는 순간, 지옥이 시작되었다. 눈물, 콧물이 멈추지 않는다.",
        choices: [
            { text: "정화통 교체까지 버틴다", fatigueChange: 25, staminaChange: -5, outcomeDescription: "정말 죽을 것 같았지만, 간신히 버텨냈다. 다시는 하고 싶지 않다.", nextEventId: 'grenade_training_mistake' },
            { text: "너무 고통스러워 뛰쳐나간다", fatigueChange: 15, outcomeDescription: "고통을 참지 못하고 결국 뛰쳐나왔다. 교관에게 크게 혼났다.", nextEventId: 'grenade_training_mistake' },
            { text: "동기를 붙잡고 겨우 버틴다", fatigueChange: 20, outcomeDescription: "옆 동기와 서로 의지하며 간신히 훈련을 마쳤다.", nextEventId: 'grenade_training_mistake' }
        ]
    },
    {
        id: 'grenade_training_mistake', type: 'training',
        title: "수류탄 투척 훈련 중 실수",
        description: "수류탄 투척 훈련 중 너무 긴장한 나머지 실수를 하고 말았다. 교관의 불호령이 떨어진다.",
        choices: [
            { text: "즉시 잘못을 인정하고 사과한다", fatigueChange: 10, outcomeDescription: "크게 혼났지만, 솔직하게 잘못을 인정했다.", nextEventId: 'hell_week_march_accident' },
            { text: "변명하려다 더 혼난다", fatigueChange: 15, outcomeDescription: "긴장해서 그랬다고 변명했지만, 교관은 더 크게 화를 냈다.", nextEventId: 'hell_week_march_accident' },
            { text: "다음 투척은 제대로 하겠다고 다짐한다", fatigueChange: 8, outcomeDescription: "실수를 만회하기 위해 다음 투척에 더욱 집중했다.", nextEventId: 'hell_week_march_accident' }
        ]
    },
    {
        id: 'hell_week_march_accident', type: 'training',
        title: "극기주 훈련과 행군 중 사고",
        description: "가장 힘들다는 극기주 훈련. 야간 행군 중 발을 헛디뎌 넘어지고 말았다.",
        choices: [
            { text: "이를 악물고 일어나 다시 걷는다", fatigueChange: 30, staminaChange: -5, outcomeDescription: "아픈 것을 참고 동기들의 도움을 받아 겨우 완주했다.", nextEventId: 'first_night_watch_fear' },
            { text: "의무병의 도움을 받는다", fatigueChange: 20, outcomeDescription: "통증이 심해 결국 의무병의 응급처치를 받고 잠시 뒤처졌다.", nextEventId: 'first_night_watch_fear' },
            { text: "포기하고 싶다는 생각이 든다", fatigueChange: 25, outcomeDescription: "몸과 마음이 너무 지쳐 포기하고 싶은 생각이 간절했다.", nextEventId: 'first_night_watch_fear' }
        ]
    },
    {
        id: 'first_night_watch_fear', type: 'training',
        title: "첫 야간 보초 근무와 공포 체험",
        description: "태어나서 처음으로 야간 보초 근무를 선다. 칠흑 같은 어둠 속에서 작은 소리에도 깜짝 놀란다.",
        choices: [
            { text: "정신을 바짝 차리고 경계한다", fatigueChange: 18, outcomeDescription: "무서웠지만 책임감을 갖고 근무 시간을 무사히 마쳤다.", nextEventId: 'px_snack_time' },
            { text: "함께 근무서는 동기와 계속 이야기한다", fatigueChange: 15, outcomeDescription: "동기와 계속 떠들며 무서움을 달랬다. 시간이 잘 갔다.", nextEventId: 'px_snack_time' },
            { text: "꾸벅꾸벅 존다", fatigueChange: 10, outcomeDescription: "피곤함을 이기지 못하고 잠시 졸았다. 다행히 걸리지는 않았다.", nextEventId: 'px_snack_time' }
        ]
    },
    {
        id: 'px_snack_time', type: 'daily',
        title: "훈련소 PX 이용",
        description: "드디어 PX에 갈 수 있는 시간이 주어졌다! 천국이 따로 없다. 무엇을 살까?",
        choices: [
            { text: "평소 먹고 싶었던 과자를 잔뜩 산다", fatigueChange: -10, outcomeDescription: "과자와 음료수를 양껏 사서 동기들과 나눠 먹었다. 행복하다.", nextEventId: 'letter_writing_homesick' },
            { text: "필요한 생필품 위주로 구매한다", fatigueChange: -5, outcomeDescription: "면도기, 세면도구 등 필요한 물품을 구매했다.", nextEventId: 'letter_writing_homesick' },
            { text: "돈을 아끼기 위해 구경만 한다", fatigueChange: -2, outcomeDescription: "아직 월급 전이라 돈을 아꼈다. 다음 기회를 노려야지.", nextEventId: 'letter_writing_homesick' }
        ]
    },
     {
        id: 'letter_writing_homesick', type: 'relationship',
        title: "편지 쓰는 시간과 가족 그리움",
        description: "개인정비 시간에 가족과 친구들에게 편지를 쓴다. 글자 하나하나에 그리움이 묻어난다.",
        choices: [
            { text: "꾹꾹 눌러 진심을 담아 편지를 쓴다", fatigueChange: -8, outcomeDescription: "가족들에게 사랑과 감사의 마음을 전했다. 답장이 기다려진다.", nextEventId: 'peer_desertion_attempt' },
            { text: "힘든 내색 없이 밝은 내용만 쓴다", fatigueChange: -5, outcomeDescription: "걱정하실까 봐 힘든 얘기는 빼고 즐거운 이야기만 적었다.", nextEventId: 'peer_desertion_attempt' },
            { text: "쓸 말이 없어 짧게 마무리한다", fatigueChange: -3, outcomeDescription: "막상 쓰려니 무슨 말을 해야 할지 몰라 짧게 안부만 전했다.", nextEventId: 'peer_desertion_attempt' }
        ]
    },
    {
        id: 'peer_desertion_attempt', type: 'special',
        title: "동기의 탈영 시도와 전체 기합",
        description: "한 동기가 군 생활에 적응하지 못하고 탈영을 시도하다 붙잡혔다. 그 때문에 우리 분대 전체가 기합을 받았다.",
        choices: [
            { text: "동기를 원망하며 기합을 받는다", fatigueChange: 20, outcomeDescription: "나까지 피해를 보는 것 같아 동기가 원망스러웠다.", nextEventId: 'training_completion_ceremony' },
            { text: "동기를 걱정하며 기합을 받는다", fatigueChange: 18, outcomeDescription: "오죽 힘들었으면 그랬을까. 동기가 안쓰럽게 느껴졌다.", nextEventId: 'training_completion_ceremony' },
            { text: "아무 생각 없이 기합만 받는다", fatigueChange: 15, outcomeDescription: "힘들지만 어쩔 수 없다. 그저 시키는 대로 할 뿐이다.", nextEventId: 'training_completion_ceremony' }
        ]
    },
    {
        id: 'training_completion_ceremony', type: 'milestone',
        title: "훈련소 수료식과 자대 배정 발표",
        description: "드디어 길고 길었던 훈련소 생활이 끝났다! 수료식 후, 앞으로 내가 복무할 자대가 발표되었다.",
        choices: [
            { text: "기대했던 부대에 배정되어 기뻐한다", fatigueChange: -15, outcomeDescription: "원하던 곳은 아니지만, 그래도 나쁘지 않은 곳 같다. 새로운 시작이다!", nextEventId: 'transfer_to_unit_bus' },
            { text: "낯선 이름의 부대에 배정되어 불안하다", fatigueChange: 5, outcomeDescription: "처음 들어보는 이름의 부대다. 어떤 곳일지 걱정이 앞선다.", nextEventId: 'transfer_to_unit_bus' },
            { text: "동기들과 헤어지는 것이 아쉽다", fatigueChange: 0, outcomeDescription: "정들었던 동기들과 헤어져 각자 다른 부대로 가야 한다니 아쉽다.", nextEventId: 'transfer_to_unit_bus' }
        ]
    },
    { id: 'first_day_unpacking', type: 'training', title: "훈련소 첫날 짐 정리하기", description: "지급받은 물품과 개인 짐을 관물대에 정리한다.", choices: [{ text: "각 잡아서 정리한다", fatigueChange: 5, outcomeDescription:"깔끔하게 정리했다.", nextEventId:'group_shower_experience'}, { text: "대충 정리한다", fatigueChange: 3, outcomeDescription:"일단 되는대로 정리했다.", nextEventId:'group_shower_experience' }] },
    { id: 'group_shower_experience', type: 'training', title: "단체 샤워 경험", description: "처음으로 겪는 단체 샤워. 사생활은 없다.", choices: [{ text: "빠르게 씻고 나온다", fatigueChange: 3, outcomeDescription:"필요한 부분만 후딱 씻었다.", nextEventId:'first_mess_hall_meal'}, { text: "동기들과 장난치며 씻는다", fatigueChange: 1, outcomeDescription:"동기들과 물장난을 치며 긴장을 풀었다.", nextEventId:'first_mess_hall_meal' }] },
    { id: 'first_mess_hall_meal', type: 'training', title: "첫 군대 급식 체험", description: "식판에 배식된 음식을 받았다. 맛은...", choices: [{ text: "맛있게 먹는다", fatigueChange: -2, outcomeDescription:"생각보다 먹을 만하다. 배고파서 그런가?", nextEventId:'manual_memorization_test'}, { text: "억지로 먹는다", fatigueChange: 4, outcomeDescription:"맛이 없지만 살기 위해 먹는다.", nextEventId:'manual_memorization_test' }] },
    { id: 'manual_memorization_test', type: 'training', title: "훈련소 교범 암기 테스트", description: "두꺼운 교범 내용을 암기해야 한다. 머리가 아프다.", choices: [{ text: "밤새 외운다", fatigueChange: 10, outcomeDescription:"밤새 노력한 덕분에 테스트를 잘 통과했다.", nextEventId:'learning_military_songs'}, { text: "대충 보고 찍는다", fatigueChange: 3, outcomeDescription:"역시나 결과는 좋지 않다. 혼났다.", nextEventId:'learning_military_songs' }] },
    { id: 'learning_military_songs', type: 'training', title: "군가 배우기와 단체 합창", description: "힘찬 군가를 배우고 목청껏 부른다. 군인이 된 기분이다.", choices: [{ text: "열정적으로 부른다", fatigueChange: 2, outcomeDescription:"목이 쉬도록 불렀다. 스트레스가 풀리는 것 같다.", nextEventId:'adapting_military_jargon'}, { text: "입만 벙긋거린다", fatigueChange: 1, outcomeDescription:"가사를 잘 몰라서 눈치껏 따라 불렀다.", nextEventId:'adapting_military_jargon' }] },
    { id: 'adapting_military_jargon', type: 'training', title: "처음 쓰는 군대 용어에 적응하기", description: "'관등성명', '다나까' 등 낯선 군대 용어에 적응해야 한다.", choices: [{ text: "의식적으로 사용하며 익숙해진다", fatigueChange: 3, outcomeDescription:"자꾸 쓰다 보니 조금씩 입에 붙는다.", nextEventId:'violating_forbidden_actions'}, { text: "자꾸 실수해서 지적받는다", fatigueChange: 5, outcomeDescription:"사회 말투가 튀어나와 지적을 받았다.", nextEventId:'violating_forbidden_actions' }] },
    { id: 'violating_forbidden_actions', type: 'training', title: "훈련소 내 금지된 행동 위반과 처벌", description: "모르고 금지된 행동(취식 등)을 하다가 걸렸다.", choices: [{ text: "즉시 반성하고 처벌을 받는다", fatigueChange: 8, outcomeDescription:"규칙 위반으로 얼차려를 받았다. 조심해야겠다.", nextEventId:'teamwork_training_mission'}, { text: "억울하다고 항변한다", fatigueChange: 10, outcomeDescription:"몰랐다고 항변했지만 소용없었다. 더 혼났다.", nextEventId:'teamwork_training_mission' }] },
    { id: 'teamwork_training_mission', type: 'training', title: "팀워크 훈련과 단체 미션 수행", description: "분대원들과 협력하여 주어진 미션을 수행해야 한다.", choices: [{ text: "적극적으로 의견을 내고 협력한다", fatigueChange: 6, outcomeDescription:"분대원들과 힘을 합쳐 미션을 성공적으로 완수했다.", nextEventId:'squad_activity_belonging'}, { text: "다른 분대원의 지시에 따른다", fatigueChange: 4, outcomeDescription:"주도적으로 나서진 않았지만, 맡은 역할은 해냈다.", nextEventId:'squad_activity_belonging' }] },
    { id: 'squad_activity_belonging', type: 'training', title: "소속감 형성을 위한 분대 활동", description: "분대별로 단합 활동 시간을 가졌다.", choices: [{ text: "즐겁게 참여하며 친목을 다진다", fatigueChange: -3, outcomeDescription:"분대원들과 운동도 하고 이야기도 나누며 가까워졌다.", nextEventId:'physical_examination_health_check'}, { text: "혼자 조용히 시간을 보낸다", fatigueChange: 1, outcomeDescription:"아직 어색해서 혼자 있었다.", nextEventId:'physical_examination_health_check' }] },
    { id: 'physical_examination_health_check', type: 'training', title: "신체검사와 건강 상태 점검", description: "훈련소 내에서 간단한 신체검사를 받았다.", choices: [{ text: "건강 상태 양호 판정을 받는다", fatigueChange: 0, outcomeDescription:"다행히 별다른 이상은 없다고 한다.", nextEventId:'learning_bed_making'}, { text: "불편한 곳을 이야기하고 진료받는다", fatigueChange: 2, outcomeDescription:"아픈 곳이 있어 군의관에게 진료를 받았다.", nextEventId:'learning_bed_making' }] },
    { id: 'learning_bed_making', type: 'training', title: "처음 배우는 군대식 침상 정리법", description: "각 잡힌 모포와 베개 정리. 생각보다 어렵다.", choices: [{ text: "조교 시범을 보고 열심히 따라 한다", fatigueChange: 4, outcomeDescription:"몇 번의 시도 끝에 그럴듯하게 모양이 잡혔다.", nextEventId:'understanding_training_schedule'}, { text: "자꾸 흐트러져서 다시 한다", fatigueChange: 6, outcomeDescription:"아무리 해도 각이 살지 않는다. 쉽지 않다.", nextEventId:'understanding_training_schedule' }] },
    { id: 'understanding_training_schedule', type: 'training', title: "훈련소 훈련 일정표 숙지하기", description: "앞으로 받을 훈련 일정이 빼곡히 적힌 표를 받았다.", choices: [{ text: "꼼꼼히 읽어보고 일정을 파악한다", fatigueChange: 1, outcomeDescription:"앞으로 어떤 훈련들이 기다리고 있는지 대략 알겠다.", nextEventId:'receiving_military_id'}, { text: "봐도 잘 모르겠다", fatigueChange: 2, outcomeDescription:"복잡한 일정표가 눈에 잘 들어오지 않는다.", nextEventId:'receiving_military_id' }] },
    { id: 'receiving_military_id', type: 'training', title: "군인 신분증 발급 받기", description: "군인 신분증이 나왔다. 사진 속 내 모습이 낯설다.", choices: [{ text: "신기해서 계속 들여다본다", fatigueChange: 0, outcomeDescription:"이제 정말 군인이 된 기분이다.", nextEventId:'learning_rank_system'}, { text: "잃어버리지 않게 잘 챙긴다", fatigueChange: 0, outcomeDescription:"분실하면 큰일 난다고 하니 잘 보관해야겠다.", nextEventId:'learning_rank_system' }] },
    { id: 'learning_rank_system', type: 'training', title: "군대 계급 체계 배우기", description: "이등병부터 병장, 간부까지 복잡한 계급 체계를 배운다.", choices: [{ text: "집중해서 듣고 외운다", fatigueChange: 3, outcomeDescription:"계급과 상징을 외우려고 노력했다.", nextEventId:'rifle_assembly_disassembly'}, { text: "너무 많아서 헷갈린다", fatigueChange: 4, outcomeDescription:"계급이 너무 많아서 누가 누구인지 헷갈린다.", nextEventId:'rifle_assembly_disassembly' }] },
    { id: 'rifle_assembly_disassembly', type: 'training', title: "소총 분해결합 훈련", description: "개인 소총을 분해하고 다시 결합하는 방법을 배운다.", choices: [{ text: "설명을 잘 듣고 침착하게 따라 한다", fatigueChange: 5, outcomeDescription:"몇 번의 연습 끝에 성공적으로 분해결합을 마쳤다.", nextEventId:'first_aid_basic_training'}, { text: "부품을 잃어버릴까 봐 조심한다", fatigueChange: 6, outcomeDescription:"작은 부품들이 많아 잃어버리지 않도록 신경 썼다.", nextEventId:'first_aid_basic_training' }] },
    { id: 'first_aid_basic_training', type: 'training', title: "응급처치 기본 교육", description: "전장에서 필요한 기본적인 응급처치 방법을 배운다.", choices: [{ text: "실습에 적극적으로 참여한다", fatigueChange: 4, outcomeDescription:"심폐소생술과 지혈법 등을 직접 해보며 익혔다.", nextEventId:'military_law_discipline_education'}, { text: "이론 교육에 집중한다", fatigueChange: 3, outcomeDescription:"응급 상황 시 대처 요령을 머릿속으로 숙지했다.", nextEventId:'military_law_discipline_education' }] },
    { id: 'military_law_discipline_education', type: 'training', title: "군법 및 군인복무규율 교육", description: "군인으로서 지켜야 할 법규와 규율에 대해 교육받는다.", choices: [{ text: "중요 내용을 필기하며 듣는다", fatigueChange: 2, outcomeDescription:"처벌 규정 등을 들으니 정신이 번쩍 든다.", nextEventId:'adapting_communal_life'}, { text: "지루해서 졸음이 온다", fatigueChange: 1, outcomeDescription:"딱딱한 내용이라 조금 지루하게 느껴졌다.", nextEventId:'adapting_communal_life' }] },
    { id: 'adapting_communal_life', type: 'training', title: "사생활이 없는 공동생활 적응", description: "모든 것을 동기들과 함께하는 공동생활. 사생활 보장이 어렵다.", choices: [{ text: "불편하지만 점차 적응해나간다", fatigueChange: 4, outcomeDescription:"불편함 속에서도 공동체 생활의 규칙을 배워간다.", nextEventId:'competing_popular_positions'}, { text: "혼자만의 시간을 가지려 노력한다", fatigueChange: 2, outcomeDescription:"잠깐이라도 혼자 있을 수 있는 시간을 찾으려 애쓴다.", nextEventId:'competing_popular_positions' }] },
    { id: 'competing_popular_positions', type: 'training', title: "훈련소 내 인기 있는 보직 경쟁", description: "훈련소 내에서 비교적 편하다고 알려진 보직(예: 행정)에 대한 경쟁이 있다.", choices: [{ text: "경쟁에 참여하여 좋은 인상을 주려 노력한다", fatigueChange: 5, outcomeDescription:"조교에게 잘 보이기 위해 훈련에 더 열심히 참여했다."}, { text: "어떤 보직이든 상관없다고 생각한다", fatigueChange: 1, outcomeDescription:"어차피 다 힘들 텐데 보직은 크게 신경 쓰지 않는다."}] },
    { id: 'first_full_gear_march', type: 'training', title: "첫 군장 배낭 메고 행군하기", description: "무거운 군장을 메고 처음으로 행군에 나선다. 어깨가 빠질 것 같다.", choices: [{ text: "이를 악물고 뒤처지지 않으려 노력한다", fatigueChange: 20, staminaChange: -3, outcomeDescription:"정말 힘들었지만, 동기들과 함께 완주했다."}, { text: "너무 힘들어 중간에 잠시 뒤처진다", fatigueChange: 25, staminaChange: -5, outcomeDescription:"군장의 무게를 이기지 못하고 잠시 뒤처졌지만, 다시 따라잡았다."}] },
    { id: 'caught_talking_after_lights_out', type: 'training', title: "취침 소등 후 몰래 대화하다 걸리기", description: "소등 후 동기와 몰래 이야기하다 순찰 중인 조교에게 걸렸다.", choices: [{ text: "잘못했다고 즉시 사과한다", fatigueChange: 8, outcomeDescription:"변명 없이 잘못을 인정하고 얼차려를 받았다."}, { text: "동기 탓으로 돌린다", fatigueChange: 10, outcomeDescription:"동기가 먼저 말을 걸었다고 했지만, 결국 같이 벌 받았다."}] },
    { id: 'realizing_importance_personal_time', type: 'training', title: "개인정비 시간의 중요성 깨닫기", description: "짧은 개인정비 시간이 얼마나 소중한지 깨닫게 된다.", choices: [{ text: "시간을 쪼개 필요한 일을 한다", fatigueChange: -5, outcomeDescription:"전화하고, 편지 쓰고, 전투화 닦고... 시간이 부족하다."}, { text: "멍하니 쉬면서 에너지를 충전한다", fatigueChange: -8, outcomeDescription:"아무것도 안 하고 쉬는 것만으로도 회복이 된다."}] },
    { id: 'chaotic_morning_wake_up', type: 'training', title: "처음 겪는 단체 기상과 혼란", description: "기상나팔 소리와 함께 모두가 동시에 일어나 준비하는 아침. 정신이 하나도 없다.", choices: [{ text: "허둥대지만 최대한 빨리 준비한다", fatigueChange: 5, outcomeDescription:"정신없는 와중에도 늦지 않으려 서둘렀다."}, { text: "느긋하게 준비하다 지적받는다", fatigueChange: 7, outcomeDescription:"여유 부리다가 결국 지적을 받고 말았다."}] },
    { id: 'peer_injured_response', type: 'training', title: "훈련소 동기 중 부상자 발생과 대처", description: "훈련 중 한 동기가 부상을 당했다. 어떻게 대처해야 할까?", choices: [{ text: "즉시 조교에게 보고한다", fatigueChange: 3, outcomeDescription:"빠르게 상황을 보고하여 동기가 조치를 받을 수 있게 했다."}, { text: "부상당한 동기를 부축한다", fatigueChange: 5, outcomeDescription:"동기를 도와 의무실로 함께 이동했다."}] },
    { id: 'adapting_military_greetings_titles', type: 'training', title: "군대식 인사와 호칭 적응하기", description: "간부와 선임에게 맞는 인사법과 호칭을 사용해야 한다.", choices: [{ text: "의식적으로 정확히 사용하려 노력한다", fatigueChange: 2, outcomeDescription:"헷갈리지만 계속 사용하며 익숙해지고 있다."}, { text: "실수할까 봐 말을 아낀다", fatigueChange: 3, outcomeDescription:"틀릴까 봐 차라리 말을 덜 하게 된다."}] },
    { id: 'enduring_blisters_during_march', type: 'training', title: "행군 중 물집 생기고 참기", description: "행군 중 발에 물집이 잡혔다. 통증이 상당하다.", choices: [{ text: "아프지만 참고 계속 걷는다", fatigueChange: 18, staminaChange: -2, outcomeDescription:"물집이 터질 것 같았지만, 뒤처지지 않기 위해 참았다."}, { text: "쉬는 시간에 응급처치를 한다", fatigueChange: 15, outcomeDescription:"쉬는 시간을 이용해 물집에 반창고를 붙였다."}] },
    { id: 'instructor_touching_advice', type: 'relationship', title: "훈련소 교관의 감동적인 조언", description: "힘들어하는 나에게 교관이 다가와 의외로 따뜻한 조언을 건넸다.", choices: [{ text: "진심으로 감사하다고 말한다", fatigueChange: -5, outcomeDescription:"교관의 말에 위로를 받고 다시 힘을 낼 수 있었다."}, { text: "어색해서 대답만 한다", fatigueChange: 0, outcomeDescription:"갑작스러운 격려에 조금 어색했지만, 나쁘지 않았다."}] },
    { id: 'first_bathhouse_time_limit', type: 'training', title: "첫 목욕탕 이용과 시간 제한 경험", description: "훈련소 목욕탕을 처음 이용한다. 짧은 시간 안에 씻어야 한다.", choices: [{ text: "최대한 빠르게 씻는다", fatigueChange: -3, outcomeDescription:"시간 안에 씻기 위해 서둘렀다. 개운하다."}, { text: "느긋하게 씻다가 쫓겨난다", fatigueChange: 2, outcomeDescription:"시간 가는 줄 모르고 씻다가 결국 쫓겨나듯 나왔다."}] },
    { id: 'first_sunday_religious_activity', type: 'training', title: "훈련소 첫 일요일 종교 활동", description: "첫 일요일, 종교 활동에 참여할 기회가 주어졌다.", choices: [{ text: "원하는 종교 활동에 참여한다", fatigueChange: -5, outcomeDescription:"종교 활동에 참여해 간식을 먹고 잠시나마 위안을 얻었다."}, { text: "생활관에 남아 휴식을 취한다", fatigueChange: -8, outcomeDescription:"종교는 없어서 생활관에서 조용히 쉬었다."}] },
    { id: 'first_conflict_resolution_peer', type: 'relationship', title: "훈련소 동기와의 첫 갈등과 화해", description: "사소한 오해로 동기와 다툼이 생겼다.", choices: [{ text: "먼저 다가가 사과하고 화해한다", fatigueChange: -2, outcomeDescription:"어색했지만 먼저 사과했고, 동기도 받아주어 관계를 회복했다."}, { text: "갈등을 무시하고 거리를 둔다", fatigueChange: 3, outcomeDescription:"껄끄러워서 그 동기와는 당분간 거리를 두기로 했다."}] },

    // ... (Part 1 끝, Part 2에서 계속) ...
// ]; // 실제 파일에서는 이 줄로 끝납니다.
    // events.js - Part 2 of 7: 훈련소 (후반) + 자대 배치/적응기 (초반)
// 전체 게임을 위해서는 모든 파트를 하나의 events.js 파일로 합쳐야 합니다.

// ... (Part 1에서 이어짐) ...

    // ====================================
    // 자대 배치 및 적응기 (임시 구조 예시)
    // ====================================
    {
        id: 'transfer_to_unit_bus', type: 'milestone',
        title: "자대로 이동하는 버스 안",
        description: "훈련소를 떠나 자대로 향하는 버스 안. 긴장감이 감돈다.",
        choices: [ // 임시 선택지
            { text: "긴장된다", fatigueChange: 5, outcomeDescription: "앞으로 어떤 일이 벌어질지 몰라 긴장된다.", nextEventId: 'arrival_new_unit_seniors' },
            { text: "기대된다", fatigueChange: 2, outcomeDescription: "새로운 환경에 대한 약간의 기대감도 있다.", nextEventId: 'arrival_new_unit_seniors' }
        ]
    },
    {
        id: 'arrival_new_unit_seniors', type: 'milestone',
        title: "새로운 부대 도착과 선임들과의 첫 만남",
        description: "드디어 자대에 도착. 선임들의 날카로운 눈빛이 느껴진다.",
        choices: [ // 임시 선택지
            { text: "씩씩하게 인사한다", fatigueChange: 3, outcomeDescription: "최대한 예의 바르고 씩씩하게 첫인사를 했다.", nextEventId: 'job_assignment_training' },
            { text: "주눅 든 모습을 보인다", fatigueChange: 6, outcomeDescription: "선임들의 포스에 눌려 자신감 없는 모습을 보였다.", nextEventId: 'job_assignment_training' }
        ]
    },
    {
        id: 'job_assignment_training', type: 'milestone',
        title: "보직 배정 및 업무 교육",
        description: "나의 보직이 정해지고 관련 업무 교육을 받기 시작했다.",
        choices: [ // 임시 선택지
            { text: "열심히 배운다", fatigueChange: 5, outcomeDescription: "하나라도 놓치지 않으려 열심히 배우고 있다.", nextEventId: 'dealing_with_senior_hazing' },
            { text: "어렵다고 느낀다", fatigueChange: 7, outcomeDescription: "처음 해보는 일이라 그런지 어렵게 느껴진다.", nextEventId: 'dealing_with_senior_hazing' }
        ]
    },
    {
        id: 'dealing_with_senior_hazing', type: 'relationship',
        title: "선임의 갑질에 대한 대처",
        description: "한 선임이 유독 나에게 부당한 요구나 장난을 친다.",
        choices: [ // 임시 선택지
            { text: "참고 넘어간다", fatigueChange: 8, outcomeDescription: "신병이라 어쩔 수 없다고 생각하며 참았다.", nextEventId: 'first_barracks_cleaning_inspection' },
            { text: "다른 선임에게 도움을 구한다", fatigueChange: 5, outcomeDescription: "친절해 보이는 다른 선임에게 조심스럽게 이야기했다.", nextEventId: 'first_barracks_cleaning_inspection' },
            { text: "정식으로 문제를 제기한다", fatigueChange: 10, outcomeDescription: "용기를 내어 간부에게 보고했지만, 상황이 더 복잡해질까 걱정된다.", nextEventId: 'first_barracks_cleaning_inspection' }
        ]
    },
    { id: 'first_barracks_cleaning_inspection', type: 'daily', title: "첫 병영 생활관 정리 및 내무검사", description: "자대에서의 첫 내무검사. 훈련소보다 더 엄격한 것 같다.", choices: [{ text: "선임들 눈치 보며 정리한다", fatigueChange: 6 }, { text: "내 방식대로 정리하다 혼난다", fatigueChange: 8 }] },
    { id: 'designated_special_attention_soldier', type: 'special', title: "자대 적응 실패와 관심병사 지정", description: "자대 생활에 적응하지 못하는 모습을 보여 관심병사로 지정될 위기에 처했다.", choices: [{ text: "간부 상담에 솔직하게 임한다", fatigueChange: 5 }, { text: "괜찮은 척 연기한다", fatigueChange: 7 }] },
    { id: 'learning_unit_surroundings', type: 'daily', title: "부대 주변 지리 익히기", description: "부대 내 시설 위치와 주변 지리를 파악해야 한다.", choices: [{ text: "선임에게 물어보며 익힌다", fatigueChange: 3 }, { text: "혼자 돌아다니며 익힌다", fatigueChange: 4 }] },
    { id: 'first_leave_request_denied', type: 'leave', title: "처음으로 받은 휴가 신청 거부", description: "기대했던 첫 휴가 신청이 거부되었다. 실망감이 크다.", choices: [{ text: "이유를 묻고 납득한다", fatigueChange: 5 }, { text: "크게 실망하고 의욕을 잃는다", fatigueChange: 10 }] },
    { id: 'learning_unspoken_rules', type: 'daily', title: "선임들의 암묵적인 규칙 배우기", description: "명문화되지 않았지만 지켜야 하는 부대 내 규칙들을 눈치껏 배워야 한다.", choices: [{ text: "눈치껏 보고 따라 한다", fatigueChange: 4 }, { text: "모르고 어겼다가 혼난다", fatigueChange: 7 }] },
    { id: 'finding_place_in_unit', type: 'relationship', title: "부대 내 자신만의 위치 찾기", description: "선임과 동기들 사이에서 나만의 역할과 위치를 만들어가야 한다.", choices: [{ text: "맡은 일을 묵묵히 한다", fatigueChange: 3 }, { text: "적극적으로 나서서 관계를 만든다", fatigueChange: 2 }] },
    { id: 'first_unit_morning_roll_call', type: 'daily', title: "자대 첫 아침점호와 긴장감", description: "자대에서의 첫 아침 점호. 훈련소와는 다른 분위기에 긴장된다.", choices: [{ text: "긴장해서 실수한다", fatigueChange: 6 }, { text: "침착하게 점호에 임한다", fatigueChange: 4 }] },
    { id: 'seniors_newbie_test', type: 'relationship', title: "선임들의 신병 테스트와 대응", description: "선임들이 짓궂은 질문이나 장난으로 신병을 떠본다.", choices: [{ text: "재치있게 받아넘긴다", fatigueChange: 3 }, { text: "어쩔 줄 몰라 당황한다", fatigueChange: 5 }] },
    { id: 'witnessing_bullying_dilemma', type: 'relationship', title: "부대 내 약자 괴롭힘 목격과 고민", description: "한 선임이 동기나 후임을 괴롭히는 것을 목격했다. 어떻게 해야 할까?", choices: [{ text: "못 본 척한다", fatigueChange: 6 }, { text: "용기를 내 말린다", fatigueChange: 8 }, { text: "간부에게 익명으로 보고한다", fatigueChange: 5 }] },
    { id: 'first_duty_assignment_unit', type: 'daily', title: "자대 배치 후 첫 당직 근무", description: "처음으로 당직 근무(불침번 등)에 투입되었다.", choices: [{ text: "선임의 지시에 따라 근무한다", fatigueChange: 12 }, { text: "긴장해서 실수를 연발한다", fatigueChange: 15 }] },
    { id: 'learning_unit_daily_schedule', type: 'daily', title: "부대 내 일과표 숙지하기", description: "자대의 일과표는 훈련소와 다르다. 빨리 숙지해야 한다.", choices: [{ text: "일과표를 보고 외운다", fatigueChange: 2 }, { text: "선임에게 물어본다", fatigueChange: 1 }] },
    { id: 'assigned_cleaning_area', type: 'daily', title: "생활관 청소 구역 배정받기", description: "내가 담당할 청소 구역이 정해졌다.", choices: [{ text: "책임감을 갖고 깨끗이 청소한다", fatigueChange: 5 }, { text: "대충 눈치껏 청소한다", fatigueChange: 3 }] },
    { id: 'exploring_unit_facilities', type: 'daily', title: "부대 주변 편의시설 탐색", description: "PX, 사이버지식정보방 등 부대 내 편의시설 위치를 알아둔다.", choices: [{ text: "직접 돌아다니며 확인한다", fatigueChange: 2 }, { text: "선임에게 물어본다", fatigueChange: 1 }] },
    { id: 'deciding_first_weekend_plan', type: 'daily', title: "자대 배치 후 첫 주말 어떻게 보낼지 결정", description: "자대에서의 첫 주말. 무엇을 하며 보낼까?", choices: [{ text: "밀린 잠을 잔다", fatigueChange: -10 }, { text: "동기들과 시간을 보낸다", fatigueChange: -5 }, { text: "개인정비 및 공부를 한다", fatigueChange: 2 }] },
    { id: 'understanding_informal_hierarchy', type: 'relationship', title: "자대 내 비공식 서열 파악하기", description: "계급 외에 선임들 간의 비공식적인 서열이 존재하는 것 같다.", choices: [{ text: "눈치껏 행동하며 파악한다", fatigueChange: 3 }, { text: "크게 신경 쓰지 않는다", fatigueChange: 1 }] },
    { id: 'first_conversation_with_senior', type: 'relationship', title: "선임과의 첫 대화와 인상", description: "선임 중 한 명과 처음으로 개인적인 대화를 나누었다.", choices: [{ text: "좋은 인상을 주려 노력한다", fatigueChange: 2 }, { text: "솔직하게 내 생각을 말한다", fatigueChange: 3 }] },
    { id: 'learning_unit_taboos', type: 'daily', title: "부대 내 금기사항 배우기", description: "부대 내에서 절대 해서는 안 되는 행동이나 말들을 배운다.", choices: [{ text: "주의 깊게 듣고 기억한다", fatigueChange: 1 }, { text: "실수하며 배운다", fatigueChange: 5 }] },
    { id: 'receiving_military_life_tips', type: 'relationship', title: "군 생활 노하우 전수받기", description: "선임이 군 생활을 잘하는 요령이나 팁을 알려준다.", choices: [{ text: "감사히 듣고 참고한다", fatigueChange: -2 }, { text: "한 귀로 듣고 흘린다", fatigueChange: 1 }] },
    { id: 'discovering_secret_snack_spot', type: 'daily', title: "자대 내 비밀 간식 장소 발견", description: "선임들만 아는 비밀스러운 간식 보관 장소를 우연히 발견했다.", choices: [{ text: "못 본 척한다", fatigueChange: 1 }, { text: "나중에 몰래 이용한다", fatigueChange: -5 }] },
    { id: 'understanding_commander_personality', type: 'relationship', title: "부대 지휘관 성향 파악하기", description: "부대 지휘관(대대장 등)의 성격이나 중요하게 생각하는 점을 파악하는 것이 중요하다.", choices: [{ text: "선임들의 이야기를 참고한다", fatigueChange: 1 }, { text: "직접 겪어보며 파악한다", fatigueChange: 2 }] },
    { id: 'overcoming_loneliness_without_peers', type: 'relationship', title: "동기 없는 부대에서 외로움 극복하기", description: "자대에 동기가 없어 외로움을 느낀다.", choices: [{ text: "선임/후임과 친해지려 노력한다", fatigueChange: 3 }, { text: "혼자만의 시간을 즐긴다", fatigueChange: 1 }] },
    { id: 'first_weekend_leave_return', type: 'leave', title: "첫 주말 출타와 복귀", description: "짧은 첫 주말 출타(외출/외박)를 다녀왔다. 복귀하니 현실이다.", choices: [{ text: "아쉬움을 뒤로하고 복귀한다", fatigueChange: 5 }, { text: "복귀 시간을 아슬아슬하게 맞춘다", fatigueChange: 8 }] },
    { id: 'learning_military_slang', type: 'daily', title: "군대 특유의 은어와 속어 배우기", description: "선임들이 사용하는 알아들을 수 없는 은어와 속어들을 배운다.", choices: [{ text: "따라 하며 익숙해진다", fatigueChange: 1 }, { text: "무슨 뜻인지 물어본다", fatigueChange: 0 }] },
    { id: 'adapting_phone_usage_rules', type: 'daily', title: "군대 내 핸드폰 사용 규정 적응", description: "정해진 시간에만 사용할 수 있는 핸드폰. 사용 규칙을 지켜야 한다.", choices: [{ text: "규칙을 철저히 지킨다", fatigueChange: 0 }, { text: "몰래 사용하다 걸릴까 봐 불안하다", fatigueChange: 3 }] },
    { id: 'buying_additional_necessities', type: 'daily', title: "군 생활 필수품 추가 구매하기", description: "PX나 인터넷 쇼핑으로 필요한 물품(깔창, 보호대 등)을 구매한다.", choices: [{ text: "선임 추천 물품을 산다", fatigueChange: -1 }, { text: "내게 필요한 것을 직접 고른다", fatigueChange: -1 }] },
    { id: 'learning_unit_specific_behaviors', type: 'daily', title: "자대 특성에 맞는 행동 방식 배우기", description: "부대마다 분위기와 특성이 다르다. 그에 맞는 행동 방식을 익혀야 한다.", choices: [{ text: "선임들 행동을 보고 배운다", fatigueChange: 2 }, { text: "시행착오를 겪으며 배운다", fatigueChange: 4 }] },
    { id: 'meeting_diverse_personalities', type: 'relationship', title: "부대 내 다양한 성격의 사람들 만나기", description: "정말 다양한 배경과 성격을 가진 사람들을 만난다.", choices: [{ text: "열린 마음으로 대한다", fatigueChange: 1 }, { text: "나와 맞는 사람 위주로 어울린다", fatigueChange: 0 }] },
    { id: 'inter_department_collaboration', type: 'daily', title: "자대 내 부서 간 협업 경험", description: "다른 부서(과)와 협력하여 업무를 처리할 일이 생겼다.", choices: [{ text: "원활한 소통을 위해 노력한다", fatigueChange: 4 }, { text: "업무 협조가 잘 안되어 힘들다", fatigueChange: 6 }] },
    { id: 'learning_guard_post_duties', type: 'daily', title: "초소별 특성과 근무 방법 배우기", description: "각 초소마다 근무 환경과 방식이 다르다.", choices: [{ text: "선임에게 자세히 배운다", fatigueChange: 3 }, { text: "직접 근무하며 익힌다", fatigueChange: 5 }] },
    { id: 'assigned_special_task', type: 'special', title: "부대 내 특별 임무 부여받기", description: "갑자기 특별한 임무(작업)가 주어졌다.", choices: [{ text: "책임감을 갖고 수행한다", fatigueChange: 8 }, { text: "부담감을 느낀다", fatigueChange: 6 }] },
    { id: 'learning_newbie_etiquette', type: 'daily', title: "신병으로서 해야 할 예절 배우기", description: "신병으로서 지켜야 할 예절과 행동들이 있다.", choices: [{ text: "선임들 말 잘 듣고 따른다", fatigueChange: 2 }, { text: "눈치껏 행동한다", fatigueChange: 3 }] },
    { id: 'first_trench_duty_tension', type: 'daily', title: "첫 진지 근무와 긴장감", description: "처음으로 진지(GOP/GP 등) 근무에 투입되었다. 실탄을 지급받으니 긴장된다.", choices: [{ text: "긴장하지만 침착하게 근무한다", fatigueChange: 15 }, { text: "실수할까 봐 계속 불안하다", fatigueChange: 18 }] },
    { id: 'building_rapport_unit', type: 'relationship', title: "자대 내 유대감 형성 방법 찾기", description: "부대원들과 좋은 관계를 맺고 유대감을 형성해야 한다.", choices: [{ text: "먼저 다가가고 돕는다", fatigueChange: 1 }, { text: "시간이 해결해주길 기다린다", fatigueChange: 2 }] },
    { id: 'getting_outside_news', type: 'daily', title: "군 생활 속 외부 소식 접하는 방법", description: "TV 뉴스, 인터넷, 전화 통화 등으로 바깥 소식을 접한다.", choices: [{ text: "세상 돌아가는 소식에 귀 기울인다", fatigueChange: 0 }, { text: "군 생활에 집중하느라 신경 안 쓴다", fatigueChange: 0 }] },
    { id: 'building_network_unit', type: 'relationship', title: "부대 내 인맥 형성하기", description: "다양한 부서의 사람들과 인맥을 쌓아두면 도움이 될 수 있다.", choices: [{ text: "여러 사람과 두루 친하게 지낸다", fatigueChange: 1 }, { text: "소수의 사람과 깊게 사귄다", fatigueChange: 0 }] },
    { id: 'life_as_lowest_rank', type: 'daily', title: "후임이 들어오기 전까지의 최후임 생활", description: "막내로서 온갖 잡무와 궂은일을 도맡아 해야 한다.", choices: [{ text: "묵묵히 참고 견딘다", fatigueChange: 10 }, { text: "빨리 후임이 들어오길 기다린다", fatigueChange: 8 }] },
    { id: 'sense_of_achievement_specialty', type: 'daily', title: "자신의 군 특기에 대한 성취감", description: "맡은 특기(보직) 업무를 능숙하게 처리하며 성취감을 느낀다.", choices: [{ text: "자부심을 느낀다", fatigueChange: -5 }, { text: "더 발전하기 위해 노력한다", fatigueChange: 2 }] },
    { id: 'planning_salary_usage', type: 'daily', title: "부대 내 월급 사용 계획 세우기", description: "적은 월급이지만 어떻게 사용할지 계획을 세운다.", choices: [{ text: "저축한다", fatigueChange: 0 }, { text: "PX에서 사용한다", fatigueChange: -3 }, { text: "휴가 때 사용한다", fatigueChange: -1 }] },
    { id: 'finding_new_hobby_unit', type: 'daily', title: "자대 배치 후 새로운 취미 찾기", description: "무료한 시간을 달래기 위해 새로운 취미를 찾아본다.", choices: [{ text: "운동을 시작한다", fatigueChange: -2, staminaChange: 1 }, { text: "독서를 시작한다", fatigueChange: -1 }] },
    { id: 'learning_coping_mechanisms', type: 'daily', title: "부대 상황에 따른 대처법 익히기", description: "검열, 훈련 등 부대 상황에 따라 유연하게 대처하는 법을 배운다.", choices: [{ text: "선임들 하는 것을 보고 배운다", fatigueChange: 2 }, { text: "직접 겪으며 터득한다", fatigueChange: 4 }] },
    { id: 'first_holiday_duty_experience', type: 'daily', title: "자대에서 처음 경험하는 휴일 근무", description: "남들 쉴 때 근무하니 기분이 묘하다.", choices: [{ text: "어쩔 수 없다고 생각한다", fatigueChange: 8 }, { text: "빨리 끝나기를 바란다", fatigueChange: 6 }] },
    { id: 'learning_health_management_military', type: 'daily', title: "군 생활 속 건강 관리법 습득", description: "아프면 나만 손해. 건강 관리의 중요성을 깨닫는다.", choices: [{ text: "규칙적으로 운동한다", fatigueChange: -3, staminaChange: 2 }, { text: "아프면 즉시 의무실에 간다", fatigueChange: 1 }] },
    { id: 'adapting_unit_atmosphere', type: 'relationship', title: "자대 분위기에 적응하는 과정", description: "부대마다 다른 분위기에 점차 적응해 나간다.", choices: [{ text: "긍정적으로 생각하며 적응한다", fatigueChange: 1 }, { text: "힘들지만 맞춰가려 노력한다", fatigueChange: 3 }] },
    { id: 'newbie_mistakes_lessons', type: 'daily', title: "신병 시절 실수와 교훈", description: "신병 때 했던 어처구니없는 실수들을 떠올린다.", choices: [{ text: "이불킥하며 반성한다", fatigueChange: 1 }, { text: "웃어넘긴다", fatigueChange: -1 }] },
    { id: 'first_inspection_preparation_tension', type: 'special', title: "첫 검열 준비와 긴장감", description: "상급 부대에서 검열을 나온다는 소식에 부대 전체가 바쁘고 긴장된다.", choices: [{ text: "밤새 쓸고 닦고 준비한다", fatigueChange: 15 }, { text: "지적받지 않기 위해 최선을 다한다", fatigueChange: 12 }] },
    { id: 'improving_relationship_with_senior', type: 'relationship', title: "선임과의 관계 개선 노력", description: "껄끄러웠던 선임과의 관계를 개선하기 위해 노력한다.", choices: [{ text: "먼저 다가가 말을 건다", fatigueChange: 1 }, { text: "업무를 적극적으로 돕는다", fatigueChange: 3 }] },

    // ... (Part 2 끝, Part 3에서 계속) ...

    // events.js - Part 3 of 7: 일상 생활과 근무 (중반)
// 전체 게임을 위해서는 모든 파트를 하나의 events.js 파일로 합쳐야 합니다.

// ... (Part 2에서 이어짐) ...

    // ====================================
    // 일상 생활과 근무 (임시 구조 예시)
    // ====================================
    { id: 'morning_roll_call_exercise', type: 'daily', title: "아침 점호와 체조 시간", description: "매일 아침 반복되는 점호와 체조. 졸리고 피곤하다.", choices: [{ text: "정신 차리고 참여한다", fatigueChange: 5 }, { text: "비몽사몽으로 따라 한다", fatigueChange: 7 }] },
    { id: 'nco_briefing_before_work', type: 'daily', title: "일과 시작 전 간부 브리핑", description: "간부가 오늘 해야 할 일과 주의사항을 전달한다.", choices: [{ text: "집중해서 듣는다", fatigueChange: 2 }, { text: "딴생각을 한다", fatigueChange: 1 }] },
    { id: 'kitchen_duty_cook', type: 'daily', title: "취사병으로 주방 근무 투입", description: "오늘은 내가 취사 지원 근무자. 새벽부터 일어나 식사 준비를 돕는다.", choices: [{ text: "열심히 돕는다", fatigueChange: 15 }, { text: "요령껏 일한다", fatigueChange: 10 }] },
    { id: 'doing_chores_as_junior', type: 'daily', title: "부대 막내로 온갖 잡일 도맡기", description: "막내는 부대의 모든 잡일을 도맡아 하는 경우가 많다.", choices: [{ text: "군말 없이 한다", fatigueChange: 8 }, { text: "힘들다고 투덜댄다", fatigueChange: 10 }] },
    { id: 'fighting_sleep_night_watch', type: 'daily', title: "야간 불침번 근무 중 졸음과의 싸움", description: "새벽 근무는 졸음과의 싸움이다.", choices: [{ text: "찬물로 세수하며 잠을 쫓는다", fatigueChange: 12 }, { text: "몰래 기대어 존다", fatigueChange: 8 }] },
    { id: 'reporting_unusual_activity_guard_post', type: 'daily', title: "초소 근무 중 특이사항 발견", description: "근무 중 평소와 다른 움직임이나 소리를 감지했다.", choices: [{ text: "즉시 상황실에 보고한다", fatigueChange: 5 }, { text: "잘못 본 것이라 생각하고 넘어간다", fatigueChange: 3 }] },
    { id: 'weekend_duty_tv_remote_fight', type: 'daily', title: "주말 근무와 TV 시청 다툼", description: "주말 근무 후 TV 채널 선택 문제로 선임/동기와 다툼이 생겼다.", choices: [{ text: "양보한다", fatigueChange: 3 }, { text: "내가 보고 싶은 채널을 고집한다", fatigueChange: 5 }] },
    { id: 'cleaning_area_duty_inspection', type: 'daily', title: "부대 내 청소 구역 담당과 검사", description: "담당 청소 구역을 깨끗하게 청소하고 검사를 받는다.", choices: [{ text: "꼼꼼하게 청소해서 칭찬받는다", fatigueChange: 3 }, { text: "대충 해서 지적받는다", fatigueChange: 6 }] },
    { id: 'promoted_squad_leader_responsibility', type: 'milestone', title: "분대장으로 승격과 책임감", description: "분대장으로 임명되었다. 책임감이 무겁게 느껴진다.", choices: [{ text: "분대원들을 잘 이끌겠다고 다짐한다", fatigueChange: 2 }, { text: "부담감을 느낀다", fatigueChange: 5 }] },
    { id: 'participating_religious_activities', type: 'daily', title: "부대 내 종교 활동 참여", description: "주말 종교 활동에 참여하여 마음의 위안을 얻는다.", choices: [{ text: "경건한 마음으로 참여한다", fatigueChange: -5 }, { text: "간식 때문에 참여한다", fatigueChange: -3 }] },
    { id: 'participating_military_contest', type: 'special', title: "군대 내 공모전 참가", description: "부대 내에서 열리는 글짓기, 포스터 등 공모전에 참가해본다.", choices: [{ text: "최선을 다해 준비한다", fatigueChange: 5 }, { text: "참가에 의의를 둔다", fatigueChange: 2 }] },
    { id: 'mistake_following_orders_consequences', type: 'special', title: "상급자 지시 실수로 인한 문제 발생", description: "상급자의 지시를 잘못 이해하고 처리하여 문제가 발생했다.", choices: [{ text: "즉시 보고하고 해결책을 찾는다", fatigueChange: 10 }, { text: "실수를 덮으려 한다", fatigueChange: 15 }] },
    { id: 'handling_classified_info_security_training', type: 'training', title: "군사기밀 취급과 보안 교육", description: "군사기밀의 중요성과 보안 규정에 대해 교육받는다.", choices: [{ text: "보안의 중요성을 인지한다", fatigueChange: 1 }, { text: "나와는 상관없는 일이라 생각한다", fatigueChange: 0 }] },
    { id: 'counseling_session_with_officer', type: 'relationship', title: "간부와의 면담 시간", description: "정기적인 간부와의 면담 시간. 무슨 이야기를 할까?", choices: [{ text: "솔직하게 고충을 이야기한다", fatigueChange: -3 }, { text: "별 문제 없다고 이야기한다", fatigueChange: 1 }] },
    { id: 'unit_physical_fitness_test', type: 'training', title: "부대 내 체력 측정 및 평가", description: "정기적으로 체력 측정을 실시하고 평가를 받는다.", choices: [{ text: "좋은 기록을 위해 노력한다", fatigueChange: 10, staminaChange: 1 }, { text: "현상 유지에 만족한다", fatigueChange: 8 }] },
    { id: 'assigned_mentor_new_recruit', type: 'relationship', title: "전입신병 케어 담당자 지정", description: "새로 들어온 신병의 적응을 돕는 역할을 맡게 되었다.", choices: [{ text: "책임감을 갖고 잘 챙겨준다", fatigueChange: 3 }, { text: "귀찮다고 생각한다", fatigueChange: 5 }] },
    { id: 'participating_unit_beautification', type: 'daily', title: "부대 환경미화 작업에 투입", description: "부대 내 화단 정리, 페인트칠 등 환경미화 작업에 참여한다.", choices: [{ text: "즐겁게 참여한다", fatigueChange: 6 }, { text: "힘들다고 느낀다", fatigueChange: 8 }] },
    { id: 'armory_management_weapon_check', type: 'daily', title: "무기고 관리 및 총기 점검", description: "무기고 관리 담당으로 총기 및 탄약 상태를 점검한다.", choices: [{ text: "꼼꼼하게 확인하고 기록한다", fatigueChange: 4 }, { text: "대충 확인한다", fatigueChange: 2 }] },
    { id: 'going_on_first_leave', type: 'leave', title: "군 생활 중 첫 휴가 나가기", description: "드디어 기다리고 기다리던 첫 휴가다!", choices: [{ text: "설레는 마음으로 부대를 나선다", fatigueChange: -30 }, { text: "휴가 계획을 다시 점검한다", fatigueChange: -25 }] },
    { id: 'adjusting_after_leave_return', type: 'leave', title: "휴가 복귀 후 적응하기", description: "달콤했던 휴가가 끝나고 부대로 복귀했다. 다시 군 생활 모드.", choices: [{ text: "빠르게 다시 적응한다", fatigueChange: 10 }, { text: "휴가 후유증을 겪는다", fatigueChange: 15 }] },
    { id: 'internet_usage_time_limit', type: 'daily', title: "부대 내 인터넷 사용 시간 제한", description: "사이버지식정보방 이용 시간이 제한되어 있다.", choices: [{ text: "정해진 시간만 이용한다", fatigueChange: 0 }, { text: "시간이 부족하다고 느낀다", fatigueChange: 2 }] },
    { id: 'using_off_duty_time_self_improvement', type: 'daily', title: "일과 후 자기계발 시간 활용", description: "일과 후 개인 시간을 활용하여 자기계발을 한다.", choices: [{ text: "자격증 공부를 한다", fatigueChange: 3 }, { text: "운동을 한다", fatigueChange: -2, staminaChange: 1 }, { text: "휴식을 취한다", fatigueChange: -5 }] },
    { id: 'using_unit_library', type: 'daily', title: "군대 내 도서관 이용", description: "부대 내 도서관에서 책을 빌려 읽는다.", choices: [{ text: "다양한 책을 읽는다", fatigueChange: -3 }, { text: "만화책 위주로 본다", fatigueChange: -2 }] },
    { id: 'using_unit_gym_facilities', type: 'daily', title: "부대 내 운동 시설 이용", description: "체력 단련실에서 운동하며 체력을 관리한다.", choices: [{ text: "꾸준히 운동한다", fatigueChange: -5, staminaChange: 2 }, { text: "가끔 이용한다", fatigueChange: -1, staminaChange: 1 }] },
    { id: 'adhering_to_lights_out_sleep_disturbances', type: 'daily', title: "취침 시간 엄수와 취침 방해 요소", description: "정해진 시간에 잠자리에 들어야 하지만, 코골이 등 방해 요소가 있다.", choices: [{ text: "최대한 잠을 청하려 노력한다", fatigueChange: 5 }, { text: "잠을 설친다", fatigueChange: 8 }] },
    { id: 'waking_up_late_peer', type: 'daily', title: "아침 기상 시간에 늦은 동료 깨우기", description: "옆자리 동료가 기상 시간에 일어나지 못하고 있다.", choices: [{ text: "흔들어 깨운다", fatigueChange: 1 }, { text: "못 본 척한다", fatigueChange: 0 }] },
    { id: 'writing_reporting_weekly_work_plan', type: 'daily', title: "주간 업무 계획 작성과 보고", description: "자신의 주간 업무 계획을 작성하여 보고해야 한다.", choices: [{ text: "꼼꼼하게 작성하여 보고한다", fatigueChange: 3 }, { text: "대충 작성한다", fatigueChange: 1 }] },
    { id: 'participating_weekly_unit_cleanup', type: 'daily', title: "매주 부대 미화의 날 참여", description: "매주 정해진 시간에 부대 전체 대청소를 실시한다.", choices: [{ text: "열심히 청소한다", fatigueChange: 6 }, { text: "요령껏 참여한다", fatigueChange: 4 }] },
    { id: 'maintaining_shaving_haircut_rules', type: 'daily', title: "면도 및 두발 규정 준수", description: "용모 단정 규정에 따라 면도와 두발 상태를 유지해야 한다.", choices: [{ text: "매일 깔끔하게 관리한다", fatigueChange: 1 }, { text: "가끔 지적받는다", fatigueChange: 3 }] },
    { id: 'participating_no_smoking_drinking_campaign', type: 'special', title: "금연/금주 캠페인 참여", description: "부대 내에서 진행하는 금연/금주 캠페인에 참여한다.", choices: [{ text: "적극 동참한다", fatigueChange: 0 }, { text: "형식적으로 참여한다", fatigueChange: 0 }] },
    { id: 'military_diet_nutrition_management', type: 'daily', title: "군대 내 식단과 영양 관리", description: "정해진 식단이지만, 건강을 위해 영양을 신경 써서 섭취한다.", choices: [{ text: "골고루 먹으려 노력한다", fatigueChange: -1 }, { text: "편식한다", fatigueChange: 2 }] },
    { id: 'organizing_personal_items_barracks', type: 'daily', title: "생활관 내 개인물품 정리 방법", description: "관물대와 침상 주변을 항상 깔끔하게 정리해야 한다.", choices: [{ text: "항상 정리정돈한다", fatigueChange: 1 }, { text: "검사 전에만 정리한다", fatigueChange: 3 }] },
    { id: 'handling_unit_recycling', type: 'daily', title: "부대 내 분리수거 담당", description: "분리수거 담당으로 지정되어 쓰레기를 분리 배출한다.", choices: [{ text: "꼼꼼하게 분리수거한다", fatigueChange: 4 }, { text: "대충 처리한다", fatigueChange: 2 }] },
    { id: 'utilizing_break_time', type: 'daily', title: "휴식 시간 활용법", description: "짧은 휴식 시간을 어떻게 활용할까?", choices: [{ text: "잠깐 눈을 붙인다", fatigueChange: -5 }, { text: "동기와 잡담한다", fatigueChange: -2 }] },
    { id: 'joy_receiving_letters_parcels', type: 'relationship', title: "편지와 소포 받는 날의 기쁨", description: "가족이나 친구에게서 온 편지나 소포를 받았다. 정말 기쁘다.", choices: [{ text: "답장을 바로 쓴다", fatigueChange: -8 }, { text: "동기들에게 자랑한다", fatigueChange: -5 }] },
    { id: 'hearing_strange_noises_night_watch', type: 'daily', title: "야간 경계 근무 중 이상한 소리 듣기", description: "근무 중 정적 속에서 이상한 소리가 들려온다.", choices: [{ text: "긴장하며 주변을 살핀다", fatigueChange: 8 }, { text: "잘못 들은 것이라 생각한다", fatigueChange: 5 }] },
    { id: 'discovering_hidden_rest_area', type: 'daily', title: "부대 내 숨겨진 휴식 공간 발견", description: "우연히 간부나 선임들 눈에 잘 띄지 않는 조용한 휴식 공간을 발견했다.", choices: [{ text: "혼자 조용히 이용한다", fatigueChange: -4 }, { text: "친한 동기에게만 알려준다", fatigueChange: -3 }] },
    { id: 'meditation_stress_management_military', type: 'daily', title: "군대 내 명상과 스트레스 관리", description: "스트레스 해소를 위해 명상이나 다른 방법을 시도해본다.", choices: [{ text: "조용히 명상 시간을 갖는다", fatigueChange: -5 }, { text: "운동으로 스트레스를 푼다", fatigueChange: -3, staminaChange: 1 }] },
    { id: 'asking_senior_questions_technique', type: 'relationship', title: "선임에게 업무 질문하는 기술", description: "업무 중 모르는 것을 선임에게 물어봐야 한다. 어떻게 물어볼까?", choices: [{ text: "최대한 예의를 갖춰 질문한다", fatigueChange: 1 }, { text: "눈치껏 타이밍을 봐서 질문한다", fatigueChange: 2 }] },
    { id: 'spending_time_with_peers_after_work', type: 'relationship', title: "동기와 함께하는 일과 후 시간", description: "일과 후 동기들과 모여 이야기를 나누거나 함께 시간을 보낸다.", choices: [{ text: "즐겁게 어울린다", fatigueChange: -4 }, { text: "피곤해서 먼저 쉰다", fatigueChange: -2 }] },
    { id: 'using_communal_washing_machine_rules', type: 'daily', title: "부대 내 공용 세탁기 사용 규칙", description: "공용 세탁기 사용 순서와 규칙을 지켜야 한다.", choices: [{ text: "규칙에 따라 사용한다", fatigueChange: 1 }, { text: "규칙을 어겨 눈총을 받는다", fatigueChange: 3 }] },
    { id: 'maintaining_contact_outside_world', type: 'relationship', title: "군 복무 중 외부 연락 유지 방법", description: "전화, 편지, 인터넷 등을 통해 가족, 친구, 연인과 연락을 유지한다.", choices: [{ text: "자주 연락하려 노력한다", fatigueChange: -2 }, { text: "가끔 연락한다", fatigueChange: 0 }] },
    { id: 'health_checkups_disease_prevention', type: 'daily', title: "건강 검진과 질병 예방", description: "정기적인 건강 검진을 받고, 개인 위생을 철저히 하여 질병을 예방한다.", choices: [{ text: "건강 관리에 신경 쓴다", fatigueChange: 0 }, { text: "크게 신경 쓰지 않는다", fatigueChange: 2 }] },
    { id: 'seasonal_changes_unit_life', type: 'daily', title: "계절에 따른 부대 생활 변화", description: "계절(여름/겨울)에 따라 복장, 일과, 훈련 등이 달라진다.", choices: [{ text: "계절 변화에 맞춰 대비한다", fatigueChange: 1 }, { text: "변화에 적응하기 힘들어한다", fatigueChange: 4 }] },
    { id: 'utilizing_work_break_time', type: 'daily', title: "일과 중 휴식 시간 활용법", description: "일과 중 주어지는 짧은 휴식 시간을 활용한다.", choices: [{ text: "스트레칭을 한다", fatigueChange: -2 }, { text: "잠시 멍하니 있는다", fatigueChange: -3 }] },
    { id: 'cleaning_surroundings_environment', type: 'daily', title: "주변 청소와 환경 정리", description: "자신의 주변 환경을 깨끗하게 유지하는 것은 기본이다.", choices: [{ text: "항상 깨끗하게 유지한다", fatigueChange: 1 }, { text: "지저분해지면 청소한다", fatigueChange: 2 }] },
    { id: 'writing_daily_work_report', type: 'daily', title: "일일 업무 보고서 작성", description: "하루 동안 수행한 업무 내용을 정리하여 보고서를 작성한다.", choices: [{ text: "상세하게 작성한다", fatigueChange: 3 }, { text: "간단하게 요점만 작성한다", fatigueChange: 2 }] },
    { id: 'managing_maintaining_personal_equipment', type: 'daily', title: "개인 장비 관리와 점검", description: "지급받은 개인 장비(총기, 방탄모 등)를 최상의 상태로 유지해야 한다.", choices: [{ text: "정기적으로 손질하고 점검한다", fatigueChange: 3 }, { text: "필요할 때만 점검한다", fatigueChange: 1 }] },
    { id: 'etiquette_using_communal_items', type: 'daily', title: "공용 물품 사용 예절", description: "다른 사람들과 함께 사용하는 물품은 아껴 쓰고 제자리에 둔다.", choices: [{ text: "솔선수범하여 예절을 지킨다", fatigueChange: 0 }, { text: "다른 사람들 하는 만큼만 한다", fatigueChange: 1 }] },
    { id: 'mealtime_rules_manners', type: 'daily', title: "식사 시간 규칙과 매너", description: "정해진 시간에, 정해진 장소에서, 올바른 자세로 식사한다.", choices: [{ text: "규칙과 매너를 잘 지킨다", fatigueChange: 0 }, { text: "가끔 흐트러진 모습을 보인다", fatigueChange: 2 }] },
    { id: 'preparation_before_sleep', type: 'daily', title: "취침 전 준비 과정", description: "내일 일과를 위해 취침 전에 미리 준비해 둘 것들이 있다.", choices: [{ text: "다음 날 입을 옷과 장비를 준비한다", fatigueChange: 1 }, { text: "세면만 하고 바로 잠자리에 든다", fatigueChange: 0 }] },
    { id: 'managing_free_time_after_work', type: 'daily', title: "일과 후 자유 시간 관리", description: "일과 후 주어지는 자유 시간을 어떻게 보낼지 계획한다.", choices: [{ text: "계획적으로 시간을 활용한다", fatigueChange: -1 }, { text: "특별한 계획 없이 보낸다", fatigueChange: -3 }] },
    { id: 'checking_planning_weekend_schedule', type: 'daily', title: "주말 일과표 확인과 계획", description: "주말 일과표를 확인하고 어떻게 시간을 보낼지 계획한다.", choices: [{ text: "특별한 계획을 세운다", fatigueChange: -1 }, { text: "평소처럼 보낸다", fatigueChange: 0 }] },
    { id: 'duty_differences_early_mid_late', type: 'daily', title: "초번-중번-말번에 따른 근무 차이", description: "근무 시간대(초번/중번/말번)에 따라 피로도와 근무 강도가 다르다.", choices: [{ text: "어떤 시간대든 최선을 다한다", fatigueChange: 8 }, { text: "힘든 시간대를 피하고 싶어 한다", fatigueChange: 6 }] },
    { id: 'spending_special_days_military', type: 'special', title: "군 생활 중 특별한 날 보내기", description: "생일, 기념일 등을 군대에서 맞이하게 되었다.", choices: [{ text: "동기/선임들의 축하를 받는다", fatigueChange: -5 }, { text: "조용히 보낸다", fatigueChange: 0 }] },
    { id: 'understanding_rank_responsibilities_authorities', type: 'daily', title: "계급별 책임과 권한 이해", description: "계급이 올라감에 따라 책임과 권한도 커진다.", choices: [{ text: "자신의 역할과 책임을 다한다", fatigueChange: 2 }, { text: "계급에 맞는 대우를 기대한다", fatigueChange: 1 }] },
    { id: 'information_sharing_methods_unit', type: 'daily', title: "부대 내 정보 공유 방법", description: "업무나 전달 사항을 효과적으로 공유하는 방법을 익힌다.", choices: [{ text: "메모나 인트라넷을 활용한다", fatigueChange: 1 }, { text: "구두로 전달한다", fatigueChange: 0 }] },
    { id: 'work_transfer_methods_seniors_juniors', type: 'relationship', title: "선후임 간 업무 전달 방식", description: "선임에게 업무를 보고하고 후임에게 지시하는 방식을 배운다.", choices: [{ text: "명확하고 간결하게 전달한다", fatigueChange: 1 }, { text: "애매하게 전달하여 오해를 산다", fatigueChange: 3 }] },
    { id: 'budget_management_military_life', type: 'daily', title: "군 생활 중 예산 관리", description: "월급과 휴가비 등 예산을 관리하는 방법을 배운다.", choices: [{ text: "계획적으로 소비한다", fatigueChange: 0 }, { text: "씀씀이가 헤프다", fatigueChange: 1 }] },
    { id: 'self_development_plan_practice', type: 'daily', title: "자기계발 계획 수립과 실천", description: "군 생활 중 이루고 싶은 자기계발 목표를 세우고 실천한다.", choices: [{ text: "꾸준히 실천한다", fatigueChange: 1 }, { text: "계획만 세우고 실천하지 못한다", fatigueChange: 3 }] },
    { id: 'using_unit_intranet', type: 'daily', title: "부대 내 인트라넷 사용법", description: "부대 내 인트라넷을 통해 공지사항 확인, 업무 처리 등을 한다.", choices: [{ text: "능숙하게 활용한다", fatigueChange: 0 }, { text: "사용법이 익숙하지 않다", fatigueChange: 1 }] },
    { id: 'maintaining_barracks_cleanliness', type: 'daily', title: "생활관 청결 유지 방법", description: "자신이 생활하는 공간을 항상 깨끗하게 유지한다.", choices: [{ text: "스스로 청결을 유지한다", fatigueChange: 1 }, { text: "다른 사람에게 미룬다", fatigueChange: 2 }] },
    { id: 'hygiene_management_military', type: 'daily', title: "군대 내 위생 관리", description: "개인 위생을 철저히 하여 질병을 예방한다.", choices: [{ text: "청결을 중요하게 생각한다", fatigueChange: 0 }, { text: "대수롭지 않게 여긴다", fatigueChange: 3 }] },
    { id: 'personal_equipment_maintenance_time', type: 'daily', title: "개인 장비 정비 시간", description: "정기적으로 개인 장비를 손질하고 정비하는 시간을 갖는다.", choices: [{ text: "꼼꼼하게 정비한다", fatigueChange: 3 }, { text: "형식적으로 정비한다", fatigueChange: 1 }] },
    { id: 'attitude_demeanor_as_soldier', type: 'daily', title: "군인으로서의 자세와 태도", description: "군인으로서 가져야 할 올바른 자세와 태도를 유지한다.", choices: [{ text: "항상 모범을 보이려 노력한다", fatigueChange: 1 }, { text: "가끔 흐트러진 모습을 보인다", fatigueChange: 3 }] },
    { id: 'coping_with_unexpected_situations_work', type: 'special', title: "일과 중 돌발 상황 대처", description: "예상치 못한 돌발 상황이 발생했다. 어떻게 대처할까?", choices: [{ text: "침착하게 상황을 파악하고 보고한다", fatigueChange: 5 }, { text: "당황해서 우왕좌왕한다", fatigueChange: 8 }] },
    { id: 'understanding_adhering_internal_rules', type: 'daily', title: "내부 규정 숙지와 준수", description: "부대 내 세부 규정을 숙지하고 철저히 준수한다.", choices: [{ text: "규정을 잘 지킨다", fatigueChange: 0 }, { text: "규정을 어겨 불이익을 받는다", fatigueChange: 5 }] },
    { id: 'accepting_advice_from_seniors', type: 'relationship', title: "선임의 조언 수용하기", description: "선임이 경험에서 우러나온 조언을 해준다.", choices: [{ text: "경청하고 받아들인다", fatigueChange: -2 }, { text: "잔소리로 생각하고 무시한다", fatigueChange: 3 }] },
    { id: 'resolving_conflicts_barracks', type: 'relationship', title: "병영 생활관 내 갈등 해결", description: "생활관 내에서 동기나 선후임과 갈등이 발생했다.", choices: [{ text: "대화로 풀어나간다", fatigueChange: 4 }, { text: "갈등을 회피한다", fatigueChange: 6 }] },
    { id: 'knowing_unit_emergency_contact_list', type: 'daily', title: "부대 내 비상연락망 숙지", description: "비상 상황 발생 시 필요한 연락망을 숙지하고 있어야 한다.", choices: [{ text: "정확히 숙지하고 있다", fatigueChange: 0 }, { text: "잘 모르고 있다", fatigueChange: 1 }] },
    { id: 'following_duty_commander_orders', type: 'daily', title: "당직사령 지시 이행", description: "당직 근무 중 당직사령의 지시를 받았다.", choices: [{ text: "신속하고 정확하게 이행한다", fatigueChange: 3 }, { text: "이행 과정에서 실수가 발생한다", fatigueChange: 5 }] },
    { id: 'knowing_various_reporting_procedures', type: 'daily', title: "각종 신고 절차 숙지", description: "보안, 안전 등 각종 문제 발생 시 신고 절차를 알아야 한다.", choices: [{ text: "절차를 정확히 알고 있다", fatigueChange: 0 }, { text: "필요할 때 찾아본다", fatigueChange: 1 }] },
    { id: 'adhering_unit_security_regulations', type: 'daily', title: "부대 내 보안규정 준수", description: "보안 규정을 철저히 준수하여 사고를 예방한다.", choices: [{ text: "항상 보안을 의식한다", fatigueChange: 1 }, { text: "가끔 보안 규정을 잊는다", fatigueChange: 4 }] },
    { id: 'reading_military_regulations_book', type: 'daily', title: "군 규정집 숙독", description: "군 규정집을 읽으며 군인으로서의 의무와 권리를 이해한다.", choices: [{ text: "시간 날 때마다 읽어본다", fatigueChange: 1 }, { text: "필요할 때만 찾아본다", fatigueChange: 0 }] },
    { id: 'collaborating_with_colleagues_method', type: 'relationship', title: "동료와의 협업 방법", description: "동료와 함께 업무를 처리할 때 효과적으로 협업하는 방법을 배운다.", choices: [{ text: "서로 소통하며 협력한다", fatigueChange: 2 }, { text: "각자 맡은 일만 한다", fatigueChange: 3 }] },
    { id: 'determining_work_priority', type: 'daily', title: "업무 처리 우선순위 결정", description: "여러 가지 업무가 주어졌을 때 우선순위를 정해 처리한다.", choices: [{ text: "중요도와 긴급성을 고려하여 결정한다", fatigueChange: 2 }, { text: "손에 잡히는 대로 처리한다", fatigueChange: 4 }] },
    { id: 'efficient_organization_military_life', type: 'daily', title: "군 생활 효율적인 정리법", description: "개인 물품, 업무 등을 효율적으로 정리하는 방법을 찾는다.", choices: [{ text: "체계적으로 정리한다", fatigueChange: 1 }, { text: "정리가 잘 안 된다", fatigueChange: 3 }] },
    { id: 'maintaining_regular_life_pattern', type: 'daily', title: "규칙적인 생활패턴 유지", description: "정해진 시간에 자고 일어나는 규칙적인 생활을 유지한다.", choices: [{ text: "규칙적인 생활을 한다", fatigueChange: -2 }, { text: "생활 패턴이 불규칙하다", fatigueChange: 4 }] },
    { id: 'stress_relief_through_hobbies', type: 'daily', title: "취미 생활을 통한 스트레스 해소", description: "취미 활동을 통해 군 생활 스트레스를 해소한다.", choices: [{ text: "취미에 몰두한다", fatigueChange: -5 }, { text: "특별한 취미가 없다", fatigueChange: 2 }] },
    { id: 'efficient_use_of_work_hours', type: 'daily', title: "일과 시간 효율적 활용법", description: "주어진 일과 시간 안에 업무를 효율적으로 처리하는 방법을 익힌다.", choices: [{ text: "집중해서 빠르게 처리한다", fatigueChange: 3 }, { text: "시간에 쫓기며 일한다", fatigueChange: 5 }] },

    // ... (Part 3 끝, Part 4에서 계속) ...
    // events.js - Part 4 of 7: 훈련 및 작전
// 전체 게임을 위해서는 모든 파트를 하나의 events.js 파일로 합쳐야 합니다.

// ... (Part 3에서 이어짐) ...

    // ====================================
    // 훈련 및 작전 (임시 구조 예시)
    // ====================================
    { id: 'night_march_injury', type: 'training', title: "야간 행군 훈련 중 부상", description: "야간 행군 중 발목을 접질렸다. 통증이 심하다.", choices: [{ text: "참고 계속 걷는다", fatigueChange: 25 }, { text: "의무병에게 보고한다", fatigueChange: 15 }] },
    { id: 'winter_training_cold_adapt', type: 'training', title: "동계 훈련과 혹한기 적응", description: "혹한기 훈련이 시작되었다. 살을 에는 추위와의 싸움이다.", choices: [{ text: "추위를 이겨낸다", fatigueChange: 20 }, { text: "방한에 신경 쓴다", fatigueChange: 15 }] },
    { id: 'live_fire_exercise_record_compete', type: 'training', title: "실전 사격 훈련과 기록 경쟁", description: "실제 전투 상황을 가정한 사격 훈련. 기록 경쟁이 치열하다.", choices: [{ text: "높은 명중률을 기록한다", fatigueChange: 8 }, { text: "평균적인 기록을 낸다", fatigueChange: 6 }] },
    { id: 'participating_recon_operation_training', type: 'training', title: "수색 작전 훈련 참여", description: "적진이나 특정 지역을 수색하는 훈련에 참여한다.", choices: [{ text: "지형을 주의 깊게 살피며 수색한다", fatigueChange: 12 }, { text: "피로 때문에 집중력이 떨어진다", fatigueChange: 15 }] },
    { id: 'tactical_training_mistake_retraining', type: 'training', title: "전술 훈련 중 실수와 재교육", description: "전술 훈련 중 중요한 실수를 하여 재교육을 받게 되었다.", choices: [{ text: "실수를 인정하고 열심히 재교육받는다", fatigueChange: 10 }, { text: "자존심이 상한다", fatigueChange: 8 }] },
    { id: 'participating_regiment_large_scale_training', type: 'training', title: "연대급 대규모 훈련 참가", description: "여러 부대가 함께 참여하는 대규모 훈련에 참가했다.", choices: [{ text: "긴장되지만 제 역할을 다한다", fatigueChange: 18 }, { text: "혼란스러운 상황에 정신이 없다", fatigueChange: 20 }] },
    { id: 'enemy_infiltration_scenario_training', type: 'training', title: "적 침투 상황 가정 훈련", description: "부대에 적이 침투한 상황을 가정한 훈련을 실시한다.", choices: [{ text: "훈련 절차에 따라 침착하게 대응한다", fatigueChange: 10 }, { text: "실제 상황처럼 긴장한다", fatigueChange: 12 }] },
    { id: 'reconnaissance_mission_operational_area', type: 'training', title: "작전 지역 정찰 임무", description: "작전 투입 전, 해당 지역을 정찰하는 임무를 맡았다.", choices: [{ text: "위험 요소를 꼼꼼히 파악한다", fatigueChange: 12 }, { text: "정해진 경로만 따라 정찰한다", fatigueChange: 10 }] },
    { id: 'evacuation_drill_emergency', type: 'training', title: "유사시 대피 훈련", description: "비상 상황 발생 시 신속하게 대피하는 훈련을 한다.", choices: [{ text: "대피 경로와 절차를 숙지한다", fatigueChange: 3 }, { text: "훈련이지만 귀찮게 느껴진다", fatigueChange: 5 }] },
    { id: 'fire_response_training_firefighting_education', type: 'training', title: "화재 대응 훈련 및 소방 교육", description: "부대 내 화재 발생 시 대처 요령과 소화기 사용법을 배운다.", choices: [{ text: "실습에 적극 참여한다", fatigueChange: 4 }, { text: "이론 교육에만 집중한다", fatigueChange: 2 }] },
    { id: 'wartime_emergency_recall', type: 'training', title: "전시 상황 대비 비상 소집", description: "전시 상황을 가정하여 예고 없이 비상 소집 훈련을 실시한다.", choices: [{ text: "신속하게 집결 장소로 이동한다", fatigueChange: 8 }, { text: "늑장 부리다 혼난다", fatigueChange: 10 }] },
    { id: 'cbrn_alert_response', type: 'training', title: "화생방 경보 발령과 대응", description: "화생방 경보가 발령되었다. 신속하게 방독면을 착용하고 대응해야 한다.", choices: [{ text: "숙달된 대로 신속하게 대응한다", fatigueChange: 10 }, { text: "허둥대며 방독면을 찾는다", fatigueChange: 12 }] },
    { id: 'communication_equipment_failure_alternative', type: 'training', title: "통신 장비 고장과 대체 통신 수단 활용", description: "작전 중 통신 장비가 고장 났다. 대체 수단을 활용해야 한다.", choices: [{ text: "수신호 등 대체 수단을 활용한다", fatigueChange: 8 }, { text: "통신 두절로 당황한다", fatigueChange: 10 }] },
    { id: 'teamwork_improvement_group_training', type: 'training', title: "팀워크 향상을 위한 단체 훈련", description: "분대원 또는 팀원 간의 협동심과 팀워크를 기르는 훈련이다.", choices: [{ text: "동료들과 호흡을 맞추려 노력한다", fatigueChange: 6 }, { text: "개인 플레이 위주로 한다", fatigueChange: 8 }] },
    { id: 'assigned_special_mission_success', type: 'special', title: "특수 임무 부여 및 성공적 수행", description: "중요하고 어려운 특수 임무를 부여받아 성공적으로 완수했다.", choices: [{ text: "뿌듯함과 성취감을 느낀다", fatigueChange: -10 }, { text: "포상을 기대한다", fatigueChange: -5 }] },
    { id: 'camouflage_training_using_terrain', type: 'training', title: "지형지물을 이용한 위장 훈련", description: "주변 환경을 이용하여 자신의 몸을 숨기는 위장술을 배운다.", choices: [{ text: "효과적으로 위장한다", fatigueChange: 5 }, { text: "위장이 어설퍼 지적받는다", fatigueChange: 7 }] },
    { id: 'night_tactical_movement_training', type: 'training', title: "야간 전술 이동 훈련", description: "야간에 소리 없이 은밀하게 이동하는 방법을 훈련한다.", choices: [{ text: "조용하고 신속하게 이동한다", fatigueChange: 12 }, { text: "소리를 내거나 넘어져 들킨다", fatigueChange: 15 }] },
    { id: 'survival_training_various_climates', type: 'training', title: "다양한 기후 조건에서의 생존 훈련", description: "악천후 등 다양한 기후 속에서 생존하는 방법을 배운다.", choices: [{ text: "생존 기술을 습득한다", fatigueChange: 18 }, { text: "극한 환경에 힘들어한다", fatigueChange: 22 }] },
    { id: 'enemy_rear_infiltration_operation_practice', type: 'training', title: "적진 후방 침투 작전 연습", description: "적진 깊숙이 침투하여 특정 임무를 수행하는 작전을 연습한다.", choices: [{ text: "긴장감 속에서 임무를 수행한다", fatigueChange: 20 }, { text: "실수하여 작전이 실패할 뻔한다", fatigueChange: 25 }] },
    { id: 'rescue_escape_training', type: 'training', title: "구조 및 탈출 훈련", description: "고립되거나 위험한 상황에서 구조되거나 탈출하는 방법을 훈련한다.", choices: [{ text: "탈출 경로를 확보한다", fatigueChange: 12 }, { text: "구조를 기다린다", fatigueChange: 10 }] },
    { id: 'hill_capture_training', type: 'training', title: "고지 점령 훈련", description: "중요한 고지를 점령하기 위한 공격 및 방어 훈련을 한다.", choices: [{ text: "맹렬하게 공격하여 고지를 점령한다", fatigueChange: 22, staminaChange: -3 }, { text: "방어선을 구축하고 고지를 사수한다", fatigueChange: 18 }] },
    { id: 'water_survival_river_crossing_training', type: 'training', title: "수중 생존 및 도하 훈련", description: "물 속에서 생존하고 강을 건너는 훈련을 받는다.", choices: [{ text: "수영 실력을 발휘한다", fatigueChange: 15 }, { text: "물을 무서워한다", fatigueChange: 18 }] },
    { id: 'enemy_surprise_attack_response_training', type: 'training', title: "적의 기습 공격 대응 훈련", description: "예상치 못한 적의 기습 공격에 대응하는 훈련이다.", choices: [{ text: "즉각적으로 엄폐하고 응사한다", fatigueChange: 15 }, { text: "당황하여 제대로 대응하지 못한다", fatigueChange: 18 }] },
    { id: 'ambush_raid_tactics_practice', type: 'training', title: "매복 및 기습 전술 연습", description: "적을 효과적으로 공격하기 위한 매복 및 기습 전술을 연습한다.", choices: [{ text: "유리한 지형을 선점한다", fatigueChange: 10 }, { text: "기습 타이밍을 잡는다", fatigueChange: 12 }] },
    { id: 'urban_warfare_building_clearing_operation', type: 'training', title: "도시전 훈련과 건물 소탕 작전", description: "시가지 전투 상황을 가정한 건물 내부 소탕 작전을 훈련한다.", choices: [{ text: "동료와 협력하여 건물을 확보한다", fatigueChange: 18 }, { text: "좁은 공간에서의 전투에 어려움을 느낀다", fatigueChange: 20 }] },
    { id: 'precision_shooting_sniper_training', type: 'training', title: "정밀 사격 및 저격 훈련", description: "먼 거리의 목표물을 정확히 맞추는 정밀 사격 훈련을 받는다.", choices: [{ text: "뛰어난 사격 실력을 보인다", fatigueChange: 10 }, { text: "집중력 유지가 어렵다", fatigueChange: 12 }] },
    { id: 'long_distance_march_stamina_limit_challenge', type: 'training', title: "장거리 행군과 체력 한계 도전", description: "수십 km에 달하는 장거리 행군에 참여하여 체력의 한계를 시험한다.", choices: [{ text: "포기하지 않고 완주한다", fatigueChange: 40, staminaChange: -10 }, { text: "결국 낙오한다", fatigueChange: 35, staminaChange: -8 }] },
    { id: 'enemy_pow_handling_interrogation_procedure_training', type: 'training', title: "적 포로 처리 및 심문 절차 훈련", description: "적 포로를 안전하게 관리하고 필요한 정보를 얻는 절차를 배운다.", choices: [{ text: "규정에 따라 처리한다", fatigueChange: 5 }, { text: "포로에게 위압적으로 대한다", fatigueChange: 7 }] },
    { id: 'building_maintaining_defensive_positions', type: 'training', title: "방어진지 구축 및 유지", description: "적의 공격에 대비하여 방어 진지를 구축하고 관리한다.", choices: [{ text: "튼튼하게 진지를 구축한다", fatigueChange: 15 }, { text: "진지 보수 작업을 한다", fatigueChange: 12 }] },
    { id: 'participating_operation_planning', type: 'training', title: "작전 계획 수립 참여", description: "작전 계획을 세우는 회의에 참여하여 의견을 제시한다.", choices: [{ text: "적극적으로 아이디어를 낸다", fatigueChange: 4 }, { text: "상급자의 의견을 따른다", fatigueChange: 2 }] },
    { id: 'reading_tactical_map_navigation', type: 'training', title: "전술 지도 읽기와 방향 찾기", description: "지도를 보고 자신의 위치와 목표 지점을 파악하는 방법을 배운다.", choices: [{ text: "지도를 능숙하게 읽는다", fatigueChange: 3 }, { text: "길을 잃고 헤맨다", fatigueChange: 8 }] },
    { id: 'communication_security_encryption_training', type: 'training', title: "통신 보안 및 암호 사용 훈련", description: "적에게 통신 내용이 노출되지 않도록 보안 및 암호 사용법을 배운다.", choices: [{ text: "암호 체계를 정확히 사용한다", fatigueChange: 4 }, { text: "암호 사용에 실수가 잦다", fatigueChange: 6 }] },
    { id: 'emergency_medical_support_evacuation_training', type: 'training', title: "긴급 의료 지원 및 후송 훈련", description: "전투 중 발생한 부상자를 응급처치하고 안전하게 후송하는 훈련이다.", choices: [{ text: "신속하고 정확하게 응급처치를 한다", fatigueChange: 10 }, { text: "부상자를 안전하게 후송한다", fatigueChange: 12 }] },
    { id: 'participating_coastal_defense_operation', type: 'training', title: "해안 방어 작전 참여", description: "해안으로 침투하는 적을 막기 위한 방어 작전에 참여한다.", choices: [{ text: "해안 경계를 철저히 한다", fatigueChange: 15 }, { text: "적 상륙 저지 훈련을 한다", fatigueChange: 18 }] },
    { id: 'movement_techniques_rough_terrain', type: 'training', title: "험준한 지형에서의 이동 기술", description: "산악 등 험준한 지형에서 안전하고 빠르게 이동하는 기술을 익힌다.", choices: [{ text: "숙련된 기술로 이동한다", fatigueChange: 15 }, { text: "이동 중 자주 넘어진다", fatigueChange: 18 }] },
    { id: 'learning_mountain_combat_skills', type: 'training', title: "산악 전투 기술 습득", description: "산악 지형에서의 전투에 필요한 기술들을 배운다.", choices: [{ text: "고지대 전투 기술을 익힌다", fatigueChange: 16 }, { text: "체력 소모가 크다", fatigueChange: 20 }] },
    { id: 'jungle_environment_adaptation_training', type: 'training', title: "정글 환경 적응 훈련", description: "고온다습한 정글 환경에서의 생존 및 작전 수행 능력을 기른다.", choices: [{ text: "더위와 벌레와의 싸움이다", fatigueChange: 22 }, { text: "독충 및 독사에 주의한다", fatigueChange: 18 }] },
    { id: 'securing_preparing_survival_food', type: 'training', title: "생존 식량 확보 및 조리법", description: "자연에서 식량을 구하고 안전하게 조리하는 방법을 배운다.", choices: [{ text: "먹을 수 있는 식물을 구별한다", fatigueChange: 10 }, { text: "사냥이나 낚시를 시도한다", fatigueChange: 15 }] },
    { id: 'ied_detection_disposal', type: 'training', title: "급조 폭발물 탐지 및 처리", description: "위험한 급조 폭발물(IED)을 탐지하고 안전하게 처리하는 방법을 배운다.", choices: [{ text: "탐지 장비를 능숙하게 사용한다", fatigueChange: 12 }, { text: "처리 과정에서 극도의 긴장감을 느낀다", fatigueChange: 15 }] },
    { id: 'using_special_mission_equipment', type: 'training', title: "특수 임무 장비 사용법", description: "야간 투시경, 특수 통신 장비 등 특수 임무에 필요한 장비 사용법을 익힌다.", choices: [{ text: "장비 사용법을 완벽히 숙지한다", fatigueChange: 8 }, { text: "장비 고장 시 대처법을 배운다", fatigueChange: 6 }] },
    { id: 'civilian_evacuation_protection_training', type: 'training', title: "민간인 대피 및 보호 훈련", description: "전쟁 또는 재난 상황에서 민간인을 안전하게 대피시키고 보호하는 절차를 훈련한다.", choices: [{ text: "민간인 통제 및 유도를 연습한다", fatigueChange: 10 }, { text: "구호 물품 분배를 돕는다", fatigueChange: 8 }] },
    { id: 'participating_search_rescue_operation', type: 'special', title: "수색 및 구조 작전 참여", description: "실종자나 조난자를 찾기 위한 수색 및 구조 작전에 투입된다.", choices: [{ text: "험한 지형을 수색한다", fatigueChange: 25 }, { text: "구조 대상자를 발견하고 안도한다", fatigueChange: -10 }] },
    { id: 'counter_terrorism_suppression_training', type: 'training', title: "대테러 진압 훈련", description: "테러 상황 발생 시 인질 구출 및 테러범 진압 훈련을 받는다.", choices: [{ text: "신속하고 정확하게 목표를 제압한다", fatigueChange: 20 }, { text: "인질의 안전을 최우선으로 생각한다", fatigueChange: 18 }] },
    { id: 'joint_operation_cooperation_other_units', type: 'training', title: "합동 작전 수행과 타 부대와의 협력", description: "다른 부대와 함께 합동 작전을 수행하며 협력하는 방법을 배운다.", choices: [{ text: "원활한 의사소통을 위해 노력한다", fatigueChange: 12 }, { text: "부대 간 경쟁심을 느낀다", fatigueChange: 10 }] },
    { id: 'participating_operation_briefing_debriefing', type: 'training', title: "작전 브리핑 및 디브리핑 참여", description: "작전 전후 브리핑과 디브리핑에 참여하여 정보를 공유하고 평가한다.", choices: [{ text: "작전 내용을 명확히 이해한다", fatigueChange: 3 }, { text: "작전 결과를 분석하고 교훈을 얻는다", fatigueChange: 4 }] },
    { id: 'battlefield_situational_awareness_training', type: 'training', title: "전장 상황 인식 훈련", description: "복잡한 전장 상황 속에서 주변 환경과 적의 움직임을 빠르게 파악하는 훈련이다.", choices: [{ text: "주변 경계를 철저히 한다", fatigueChange: 8 }, { text: "다양한 정보를 종합하여 판단한다", fatigueChange: 10 }] },
    { id: 'handling_casualties_first_aid_battle', type: 'training', title: "전투 중 부상자 발생과 응급처치", description: "치열한 전투 중 부상당한 동료를 발견했다. 신속한 응급처치가 필요하다.", choices: [{ text: "위험을 무릅쓰고 동료를 구한다", fatigueChange: 18 }, { text: "배운 대로 응급처치를 실시한다", fatigueChange: 15 }] },
    { id: 'requesting_guiding_air_support_training', type: 'training', title: "항공 지원 요청 및 유도 훈련", description: "필요시 항공 지원을 요청하고 아군 항공기를 목표 지점까지 유도하는 방법을 배운다.", choices: [{ text: "정확한 좌표와 정보를 전달한다", fatigueChange: 8 }, { text: "항공기 유도 절차를 숙달한다", fatigueChange: 10 }] },
    { id: 'strongpoint_defense_maintenance', type: 'training', title: "거점 방어 및 유지", description: "중요 거점을 점령하고 적의 공격으로부터 방어하는 훈련이다.", choices: [{ text: "방어 시설을 강화한다", fatigueChange: 12 }, { text: "적의 공격을 성공적으로 격퇴한다", fatigueChange: 18 }] },
    { id: 'operating_satellite_communication_equipment', type: 'training', title: "위성 통신 장비 운용", description: "원거리 통신을 위한 위성 통신 장비 사용법을 배운다.", choices: [{ text: "장비 설치 및 운용법을 익힌다", fatigueChange: 6 }, { text: "통신 상태를 주기적으로 점검한다", fatigueChange: 4 }] },
    { id: 'operating_in_stormy_weather', type: 'training', title: "폭풍우 속 작전 수행", description: "악천후 속에서 작전을 수행해야 한다. 시야 확보도 어렵고 이동도 힘들다.", choices: [{ text: "악조건 속에서도 임무를 완수한다", fatigueChange: 25 }, { text: "안전을 최우선으로 고려하며 행동한다", fatigueChange: 20 }] },
    { id: 'forest_fire_fighting_support_operation', type: 'special', title: "산불 진화 지원 작전", description: "인근 지역에 큰 산불이 발생하여 진화 작업 지원에 투입되었다.", choices: [{ text: "위험을 무릅쓰고 불길과 싸운다", fatigueChange: 30 }, { text: "잔불 정리를 돕는다", fatigueChange: 20 }] },
    { id: 'disaster_relief_operation_participation', type: 'special', title: "재난 구호 작전 참여", description: "태풍, 홍수 등 재난 발생 지역에 파견되어 구호 활동을 벌인다.", choices: [{ text: "이재민을 돕고 복구 작업을 지원한다", fatigueChange: 25 }, { text: "참혹한 현장을 보고 안타까움을 느낀다", fatigueChange: 15 }] },
    { id: 'civilian_support_operation_experience', type: 'special', title: "대민 지원 작전 경험", description: "농번기 일손 돕기 등 지역 주민을 위한 대민 지원 활동에 참여한다.", choices: [{ text: "주민들과 함께 땀 흘려 일한다", fatigueChange: 15 }, { text: "감사 인사를 받고 보람을 느낀다", fatigueChange: -5 }] },
    { id: 'advanced_equipment_operation_training', type: 'training', title: "첨단 장비 운용 교육", description: "새롭게 도입된 첨단 장비의 운용법에 대한 교육을 받는다.", choices: [{ text: "흥미를 갖고 열심히 배운다", fatigueChange: 5 }, { text: "복잡한 기능에 어려움을 느낀다", fatigueChange: 8 }] },
    { id: 'drone_response_defense_training', type: 'training', title: "드론 대응 및 방어 훈련", description: "적의 드론 공격이나 정찰에 대응하는 방법을 훈련한다.", choices: [{ text: "드론 탐지 및 식별 훈련을 한다", fatigueChange: 8 }, { text: "드론 무력화 방법을 배운다", fatigueChange: 10 }] },
    { id: 'passing_through_cbr_contaminated_area_training', type: 'training', title: "생화학 오염 지역 통과 훈련", description: "화학 작용제 등으로 오염된 지역을 안전하게 통과하는 훈련이다.", choices: [{ text: "보호 장비를 완벽하게 착용한다", fatigueChange: 15 }, { text: "오염 물질에 노출되지 않도록 주의한다", fatigueChange: 18 }] },
    { id: 'nuclear_attack_evacuation_training', type: 'training', title: "핵 공격 대비 대피 훈련", description: "핵 공격 상황을 가정한 대피 및 방호 훈련을 실시한다.", choices: [{ text: "지정된 대피소로 신속히 이동한다", fatigueChange: 10 }, { text: "핵 공격의 위험성에 대해 생각한다", fatigueChange: 8 }] },
    { id: 'supporting_special_forces_operation', type: 'special', title: "특수 부대 작전 지원", description: "특수 부대의 작전을 지원하는 임무를 맡게 되었다.", choices: [{ text: "작전이 성공하도록 최선을 다해 지원한다", fatigueChange: 15 }, { text: "특수 부대원들의 능력에 감탄한다", fatigueChange: 5 }] },
    { id: 'participating_international_joint_training', type: 'training', title: "국제 연합 훈련 참여", description: "다른 나라 군대와 함께 연합 훈련에 참여할 기회가 생겼다.", choices: [{ text: "다른 나라 군인들과 교류한다", fatigueChange: 8 }, { text: "언어와 문화의 차이를 느낀다", fatigueChange: 6 }] },

    // ... (Part 4 끝, Part 5에서 계속) ...
    // events.js - Part 5 of 7: 특수 상황 및 위기 관리
// 전체 게임을 위해서는 모든 파트를 하나의 events.js 파일로 합쳐야 합니다.

// ... (Part 4에서 이어짐, events 배열 내부에 추가) ...

    // ====================================
    // 특수 상황 및 위기 관리 (임시 구조 예시)
    // ====================================
    {
        id: 'infectious_disease_outbreak', type: 'special', // 이전 파트에서 이미 추가됨 (참고용)
        title: "부대 내 감염병 발생과 격리",
        description: "부대 내 감염병이 돌아 일부 인원이 격리되었다. 불안감이 퍼진다.",
        choices: [ // 임시 선택지
            { text: "위생 수칙을 철저히 지킨다", fatigueChange: 5, outcomeDescription: "개인 위생에 더욱 신경썼다.", nextEventId: 'personal_time' },
            { text: "불안감을 느낀다", fatigueChange: 8, outcomeDescription: "나도 감염될까 봐 불안하다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'natural_disaster_response', type: 'special',
        title: "자연재해 발생 시 대응",
        description: "부대 인근에 태풍, 홍수 등 자연재해가 발생하여 지원에 투입되었다.",
        choices: [ // 임시 선택지
            { text: "피해 복구 작업에 힘쓴다", fatigueChange: 25, outcomeDescription: "힘들지만 복구 작업을 도왔다.", nextEventId: 'personal_time' },
            { text: "안전한 곳에서 대기한다", fatigueChange: 10, outcomeDescription: "안전 확보 후 지시에 따랐다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'witnessing_violence_in_military', type: 'special',
        title: "군대 내 폭력 사건 목격",
        description: "선임이 후임을 폭행하는 장면을 목격했다. 충격적이다.",
        choices: [ // 임시 선택지
            { text: "즉시 보고한다", fatigueChange: 8, outcomeDescription: "고민 끝에 간부에게 사실대로 보고했다.", nextEventId: 'personal_time' },
            { text: "못 본 척 외면한다", fatigueChange: 12, outcomeDescription: "엮이고 싶지 않아 못 본 척했다. 마음이 불편하다.", nextEventId: 'personal_time' },
            { text: "피해자를 위로한다", fatigueChange: 5, outcomeDescription: "나중에 피해 후임을 찾아가 위로의 말을 건넸다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'military_secret_leak_incident', type: 'special',
        title: "군사 기밀 유출 사고",
        description: "부대 내에서 군사 기밀이 유출되는 사고가 발생했다. 보안 검사가 강화되었다.",
        choices: [ // 임시 선택지
            { text: "보안 규정을 더욱 철저히 지킨다", fatigueChange: 5, outcomeDescription: "보안의 중요성을 다시 한번 깨닫고 조심한다.", nextEventId: 'personal_time' },
            { text: "누가 유출했는지 궁금해한다", fatigueChange: 3, outcomeDescription: "동기들과 누가 그랬을지 수군거렸다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'accidental_firearm_discharge_response', type: 'special',
        title: "총기 오발 사고 대응",
        description: "훈련 또는 근무 중 총기 오발 사고가 발생했다. 다행히 인명 피해는 없었다.",
        choices: [ // 임시 선택지
            { text: "사고 경위를 정확히 보고한다", fatigueChange: 10, outcomeDescription: "목격한 대로 정확하게 진술했다.", nextEventId: 'personal_time' },
            { text: "크게 놀라 정신이 없다", fatigueChange: 15, outcomeDescription: "총소리에 너무 놀라 아무 생각도 나지 않았다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'deserter_occurrence_search', type: 'special',
        title: "탈영병 발생과 수색",
        description: "부대에서 탈영병이 발생하여 수색 작전에 투입되었다.",
        choices: [ // 임시 선택지
            { text: "수색에 적극적으로 참여한다", fatigueChange: 20, outcomeDescription: "지시받은 구역을 꼼꼼히 수색했다.", nextEventId: 'personal_time' },
            { text: "왜 탈영했는지 생각한다", fatigueChange: 15, outcomeDescription: "오죽 힘들었으면 탈영했을까 하는 생각이 든다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'intruder_detection_military_facility', type: 'special',
        title: "군사 시설 침입자 발견",
        description: "경계 근무 중 군사 시설에 무단으로 침입하려는 사람을 발견했다.",
        choices: [ // 임시 선택지
            { text: "절차에 따라 즉시 보고 및 대응한다", fatigueChange: 10, outcomeDescription: "배운 대로 신속하게 보고하고 대응하여 침입자를 제압했다.", nextEventId: 'personal_time' },
            { text: "당황하여 어쩔 줄 모른다", fatigueChange: 15, outcomeDescription: "갑작스러운 상황에 당황하여 제대로 대처하지 못했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'fire_outbreak_response_unit', type: 'special',
        title: "부대 내 화재 발생과 대처",
        description: "부대 내 건물에서 화재가 발생했다!",
        choices: [ // 임시 선택지
            { text: "초기 진화를 시도한다", fatigueChange: 12, outcomeDescription: "소화기를 들고 초기 진화를 시도했다.", nextEventId: 'personal_time' },
            { text: "신속하게 대피하고 보고한다", fatigueChange: 8, outcomeDescription: "안전하게 대피한 후 상황을 보고했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'emergency_patient_transport', type: 'special',
        title: "응급 환자 발생과 후송",
        description: "부대 내 응급 환자가 발생하여 긴급 후송을 도와야 한다.",
        choices: [ // 임시 선택지
            { text: "환자 이송을 돕는다", fatigueChange: 10, outcomeDescription: "들것을 이용해 환자를 앰뷸런스까지 옮겼다.", nextEventId: 'personal_time' },
            { text: "필요한 물품을 챙긴다", fatigueChange: 8, outcomeDescription: "군의관의 지시에 따라 필요한 물품을 챙겼다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'major_accident_during_military_training', type: 'special',
        title: "군사 훈련 중 중대 사고",
        description: "훈련 도중 예상치 못한 큰 사고가 발생했다.",
        choices: [ // 임시 선택지
            { text: "사고 수습을 돕는다", fatigueChange: 20, outcomeDescription: "통제에 따라 사고 현장 수습을 도왔다.", nextEventId: 'personal_time' },
            { text: "충격적인 장면에 정신을 차리기 힘들다", fatigueChange: 18, outcomeDescription: "사고 현장의 모습이 머릿속에서 떠나지 않는다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'witnessing_reporting_hostile_act', type: 'special',
        title: "적대 행위 목격과 보고",
        description: "경계 근무 중 명백한 적대 행위(총격 등)를 목격했다.",
        choices: [ // 임시 선택지
            { text: "즉시 대응 및 보고한다", fatigueChange: 15, outcomeDescription: "교전 수칙에 따라 즉각 대응하고 상황을 보고했다.", nextEventId: 'personal_time' },
            { text: "두려움을 느낀다", fatigueChange: 18, outcomeDescription: "실제 상황이라는 생각에 극도의 긴장과 두려움을 느꼈다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'local_conflict_situation', type: 'special',
        title: "국지적 충돌 상황 발생",
        description: "부대 인근에서 아군과 적군 간의 국지적 충돌이 발생했다.",
        choices: [ // 임시 선택지
            { text: "명령에 따라 전투 준비를 한다", fatigueChange: 20, outcomeDescription: "긴장감 속에서 전투 준비 태세를 갖추었다.", nextEventId: 'personal_time' },
            { text: "무슨 상황인지 파악하려 애쓴다", fatigueChange: 15, outcomeDescription: "정확한 상황을 알 수 없어 답답하고 불안하다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'military_equipment_damage_report', type: 'special',
        title: "군 장비 파손 사고와 보고",
        description: "자신의 실수 또는 관리 소홀로 군 장비가 파손되었다.",
        choices: [ // 임시 선택지
            { text: "즉시 사실대로 보고한다", fatigueChange: 10, outcomeDescription: "혼날 것을 각오하고 사실대로 보고했다.", nextEventId: 'personal_time' },
            { text: "숨기려다 들킨다", fatigueChange: 15, outcomeDescription: "숨기려 했지만 결국 들켜서 더 큰 처벌을 받게 될 것 같다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'mishandling_classified_material', type: 'special',
        title: "군사 기밀 취급 실수",
        description: "군사 기밀 문서를 잘못 취급하여 문제가 발생할 뻔했다.",
        choices: [ // 임시 선택지
            { text: "실수를 깨닫고 즉시 바로잡는다", fatigueChange: 8, outcomeDescription: "다행히 큰 문제로 번지기 전에 실수를 바로잡았다.", nextEventId: 'personal_time' },
            { text: "상급자에게 보고하고 지시를 따른다", fatigueChange: 6, outcomeDescription: "상급자에게 보고하고 질책을 받았다. 보안의 중요성을 다시 느낀다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'communication_blackout_during_operation', type: 'special',
        title: "작전 중 통신 두절 상황",
        description: "중요한 작전 수행 중 갑자기 통신이 두절되었다.",
        choices: [ // 임시 선택지
            { text: "예비 통신 수단을 확보한다", fatigueChange: 10, outcomeDescription: "미리 준비된 예비 통신 수단으로 연락을 시도한다.", nextEventId: 'personal_time' },
            { text: "불안하지만 침착하게 대기한다", fatigueChange: 12, outcomeDescription: "통신이 복구되기를 기다리며 상황을 주시한다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'spotting_suspicious_person_guard_duty', type: 'special',
        title: "경계 근무 중 수상한 인물 발견",
        description: "경계 근무 중 부대 주변을 서성이는 수상한 인물을 발견했다.",
        choices: [ // 임시 선택지
            { text: "수하 및 보고 절차를 따른다", fatigueChange: 8, outcomeDescription: "배운 대로 수하를 하고 상부에 보고했다.", nextEventId: 'personal_time' },
            { text: "별일 아니라고 생각하고 넘어간다", fatigueChange: 5, outcomeDescription: "대수롭지 않게 생각하고 넘어갔다. 찝찝하다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'live_ammo_mistake_training', type: 'special',
        title: "훈련 중 실탄 오인 사고",
        description: "공포탄을 사용해야 하는 훈련에서 누군가 실수로 실탄을 장전했다는 소문이 돈다.",
        choices: [ // 임시 선택지
            { text: "사실 여부를 확인하려 한다", fatigueChange: 5, outcomeDescription: "소문의 진위를 파악하려 했지만 알 수 없었다.", nextEventId: 'personal_time' },
            { text: "불안감에 훈련에 집중하기 어렵다", fatigueChange: 10, outcomeDescription: "혹시 모를 사고에 대한 불안감 때문에 훈련에 집중할 수 없다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'catching_unauthorized_photography_military_area', type: 'special',
        title: "군사 지역 무단 촬영 적발",
        description: "민간인이 군사 보호 구역 내에서 사진을 찍는 것을 발견했다.",
        choices: [ // 임시 선택지
            { text: "즉시 제지하고 보고한다", fatigueChange: 5, outcomeDescription: "촬영을 제지하고 규정에 따라 상부에 보고했다.", nextEventId: 'personal_time' },
            { text: "못 본 척한다", fatigueChange: 3, outcomeDescription: "괜히 엮이기 싫어서 못 본 척했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'handling_serious_discipline_violation_unit', type: 'special',
        title: "부대 내 중대한 규율 위반 처리",
        description: "동료가 심각한 규율 위반(구타, 가혹행위 등)을 저지른 것을 알게 되었다.",
        choices: [ // 임시 선택지
            { text: "양심에 따라 신고한다", fatigueChange: 10, outcomeDescription: "고민 끝에 마음에 걸려 신고했다. 후폭풍이 걱정된다.", nextEventId: 'personal_time' },
            { text: "모른 척 덮어준다", fatigueChange: 12, outcomeDescription: "동료와의 관계 때문에 모른 척했지만, 마음이 불편하다.", nextEventId: 'personal_time' },
            { text: "당사자에게 직접 경고한다", fatigueChange: 8, outcomeDescription: "직접 찾아가 다시는 그러지 말라고 경고했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'losing_military_map_incident', type: 'special',
        title: "군사 지도 분실 사고",
        description: "중요한 군사 지도를 분실했다. 큰일이다.",
        choices: [ // 임시 선택지
            { text: "즉시 보고하고 함께 찾는다", fatigueChange: 20, outcomeDescription: "바로 보고하고 필사적으로 찾아다녔다. 다행히 찾았다.", nextEventId: 'personal_time' },
            { text: "혼자 몰래 찾으려 한다", fatigueChange: 25, outcomeDescription: "혼자 찾으려 했지만 결국 찾지 못하고 보고했다. 크게 문책당했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'vip_visit_heightened_security', type: 'special',
        title: "부대 내 중요 인사 방문과 경계 강화",
        description: "높은 분이 부대를 방문하여 경계 태세가 강화되고 분위기가 삼엄하다.",
        choices: [ // 임시 선택지
            { text: "평소보다 더 긴장하고 근무한다", fatigueChange: 10, outcomeDescription: "실수하지 않기 위해 평소보다 더 긴장하며 근무했다.", nextEventId: 'personal_time' },
            { text: "별다른 감흥 없이 근무한다", fatigueChange: 5, outcomeDescription: "높은 사람이 오든 말든 내 할 일만 한다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'personnel_missing_night_training', type: 'special',
        title: "야간 훈련 중 인원 실종",
        description: "야간 훈련 도중 한 명의 인원이 보이지 않는다. 실종된 것 같다.",
        choices: [ // 임시 선택지
            { text: "즉시 보고하고 수색에 참여한다", fatigueChange: 18, outcomeDescription: "상황을 보고하고 동료들과 함께 실종된 인원을 찾아 나섰다.", nextEventId: 'personal_time' },
            { text: "무사하기를 기도한다", fatigueChange: 12, outcomeDescription: "걱정되는 마음으로 실종된 인원이 무사히 발견되기를 바랐다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'serious_injury_during_military_life', type: 'special',
        title: "군 생활 중 심각한 부상 발생",
        description: "훈련이나 작업 중 크게 다쳐 병원에 입원하게 되었다.",
        choices: [ // 임시 선택지
            { text: "치료에 전념한다", fatigueChange: 15, outcomeDescription: "당분간 병원에서 치료를 받으며 회복에 집중해야 한다.", nextEventId: 'personal_time' }, // 상태 변화 필요 (예: 입원 상태)
            { text: "동료들에게 미안함을 느낀다", fatigueChange: 10, outcomeDescription: "나 때문에 다른 동료들이 더 힘들어진 것 같아 미안하다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'operation_halted_due_bad_weather', type: 'special',
        title: "악천후로 인한 작전 중단",
        description: "갑작스러운 악천후(폭우, 폭설 등)로 인해 진행 중이던 작전이 중단되었다.",
        choices: [ // 임시 선택지
            { text: "안전한 곳에서 대기한다", fatigueChange: 5, outcomeDescription: "날씨가 좋아질 때까지 안전한 곳에서 대기하라는 지시를 받았다.", nextEventId: 'personal_time' },
            { text: "장비를 점검하며 대기한다", fatigueChange: 3, outcomeDescription: "대기하는 동안 장비 상태를 점검했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'military_equipment_malfunction_emergency_repair', type: 'special',
        title: "군사 장비 고장과 긴급 수리",
        description: "중요한 군사 장비가 갑자기 고장 났다. 긴급 수리가 필요하다.",
        choices: [ // 임시 선택지
            { text: "수리 작업을 돕는다", fatigueChange: 12, outcomeDescription: "정비병을 도와 장비 수리 작업을 보조했다.", nextEventId: 'personal_time' },
            { text: "대체 장비를 준비한다", fatigueChange: 8, outcomeDescription: "수리가 불가능할 경우를 대비해 대체 장비를 준비했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'enemy_spy_detection_operation', type: 'special',
        title: "적대 세력 간첩 색출 작전",
        description: "부대 내에 간첩이 있다는 첩보가 있어 색출 작전이 비밀리에 진행된다.",
        choices: [ // 임시 선택지
            { text: "주변 사람들을 유심히 관찰한다", fatigueChange: 8, outcomeDescription: "평소와 다른 행동을 하는 사람이 있는지 주의 깊게 살폈다.", nextEventId: 'personal_time' },
            { text: "작전에 대해 함구한다", fatigueChange: 5, outcomeDescription: "비밀 작전이므로 절대 외부에 누설하지 않았다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'suicide_attempt_incident_unit', type: 'special',
        title: "부대 내 자살 시도자 발생",
        description: "한 병사가 자살을 시도했다는 충격적인 소식을 들었다.",
        choices: [ // 임시 선택지
            { text: "해당 병사를 위로하고 돕는다", fatigueChange: 5, outcomeDescription: "힘들어하는 병사에게 다가가 이야기를 들어주고 위로했다.", nextEventId: 'personal_time' },
            { text: "충격과 안타까움을 느낀다", fatigueChange: 10, outcomeDescription: "군 생활이 얼마나 힘들면 그런 선택을 했을까 하는 생각에 마음이 무겁다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'participating_life_saving_operation', type: 'special',
        title: "인명 구조 작전 참여",
        description: "사고 현장에서 인명 구조 작전에 참여하게 되었다.",
        choices: [ // 임시 선택지
            { text: "위험을 무릅쓰고 구조 활동을 한다", fatigueChange: 25, outcomeDescription: "힘들고 위험했지만, 생명을 구하는 보람된 일이었다.", nextEventId: 'personal_time' },
            { text: "구조된 사람들을 보고 안도한다", fatigueChange: -5, outcomeDescription: "무사히 구조된 사람들을 보니 마음이 놓인다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'deployed_riot_control_operation', type: 'special',
        title: "시위 진압 작전 투입",
        description: "부대 인근에서 대규모 시위가 발생하여 진압 작전에 투입되었다.",
        choices: [ // 임시 선택지
            { text: "명령에 따라 질서 유지에 힘쓴다", fatigueChange: 18, outcomeDescription: "시위대와 직접적인 충돌은 피하며 질서 유지에 집중했다.", nextEventId: 'personal_time' },
            { text: "험악한 분위기에 긴장한다", fatigueChange: 15, outcomeDescription: "험악한 시위 현장 분위기에 위압감을 느꼈다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'terror_threat_near_military_base', type: 'special',
        title: "군사 기지 주변 테러 위협",
        description: "군사 기지를 대상으로 한 테러 위협 첩보가 입수되어 경계 태세가 최고조에 달했다.",
        choices: [ // 임시 선택지
            { text: "한 치의 빈틈없이 경계 근무를 선다", fatigueChange: 20, outcomeDescription: "테러 위협에 대비하여 평소보다 훨씬 철저하게 경계 근무를 섰다.", nextEventId: 'personal_time' },
            { text: "실제 상황 발생에 대비한다", fatigueChange: 15, outcomeDescription: "만일의 사태에 대비하여 개인 장비와 행동 절차를 점검했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'border_area_military_clash', type: 'special',
        title: "국경 지역 군사 충돌",
        description: "국경 지역에서 아군과 적군 간의 군사적 충돌이 발생했다는 소식이 들려온다.",
        choices: [ // 임시 선택지
            { text: "전쟁 발발 가능성에 불안해한다", fatigueChange: 18, outcomeDescription: "상황이 악화되어 전쟁으로 번지지 않을까 불안하다.", nextEventId: 'personal_time' },
            { text: "명령 하달 시 즉각 투입될 준비를 한다", fatigueChange: 12, outcomeDescription: "언제든 출동 명령이 내려올 수 있으므로 대비 태세를 갖춘다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'handling_civilian_casualties_support', type: 'special',
        title: "민간인 피해 발생과 지원",
        description: "작전 또는 재난 상황 중 민간인 피해가 발생하여 지원 활동을 해야 한다.",
        choices: [ // 임시 선택지
            { text: "피해 민간인을 위로하고 돕는다", fatigueChange: 15, outcomeDescription: "피해를 입은 민간인들에게 구호품을 전달하고 위로했다.", nextEventId: 'personal_time' },
            { text: "참혹한 모습에 마음이 아프다", fatigueChange: 12, outcomeDescription: "전쟁이나 재난의 참혹함을 느끼며 마음 아파했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'dispatched_major_accident_site_support', type: 'special',
        title: "대형 사고 현장 지원 출동",
        description: "대형 사고(건물 붕괴, 열차 탈선 등) 현장에 지원 인력으로 파견되었다.",
        choices: [ // 임시 선택지
            { text: "구조 및 복구 작업을 돕는다", fatigueChange: 28, outcomeDescription: "사고 현장에서 구조대원들을 도와 인명 구조 및 복구 작업을 지원했다.", nextEventId: 'personal_time' },
            { text: "사고 현장의 비극에 침통해한다", fatigueChange: 15, outcomeDescription: "사고로 희생된 사람들을 보며 깊은 슬픔을 느꼈다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'explosive_accident_military_training_ground', type: 'special',
        title: "군사 훈련장 폭발물 사고",
        description: "훈련장에서 불발탄이나 폭발물 관련 사고가 발생했다.",
        choices: [ // 임시 선택지
            { text: "사고 현장 접근을 통제한다", fatigueChange: 10, outcomeDescription: "추가 사고를 막기 위해 사고 현장 주변 접근을 통제했다.", nextEventId: 'personal_time' },
            { text: "안전 불감증에 대해 경각심을 갖는다", fatigueChange: 8, outcomeDescription: "안전 수칙 준수의 중요성을 다시 한번 깨달았다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'family_emergency_during_military_service', type: 'special',
        title: "군 생활 중 가족 위급상황 발생",
        description: "군 복무 중 집에 계신 가족에게 위급한 일이 생겼다는 연락을 받았다.",
        choices: [ // 임시 선택지
            { text: "간부에게 보고하고 청원휴가를 신청한다", fatigueChange: 15, outcomeDescription: "상황을 보고하고 급히 청원휴가를 신청했다. 걱정이 태산 같다.", nextEventId: 'personal_time' }, // 상태 변화 필요 (휴가)
            { text: "걱정되지만 군 복무에 집중하려 노력한다", fatigueChange: 20, outcomeDescription: "가족 걱정에 일이 손에 잡히지 않지만, 맡은 바 임무를 다하려 애쓴다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'identity_exposed_during_intelligence_activity', type: 'special',
        title: "첩보 활동 중 정체 노출",
        description: "비밀리에 수행하던 첩보 활동 중 신분이 노출될 위기에 처했다.",
        choices: [ // 임시 선택지
            { text: "신속하게 현장을 벗어난다", fatigueChange: 15, outcomeDescription: "위험을 감지하고 신속하게 현장을 이탈하여 위기를 모면했다.", nextEventId: 'personal_time' },
            { text: "침착하게 위장 신분을 유지한다", fatigueChange: 12, outcomeDescription: "들키지 않은 척 침착하게 행동하여 의심을 피했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'surrounded_by_enemy_forces_during_operation', type: 'special',
        title: "작전 중 적대 세력 포위",
        description: "작전 수행 중 적에게 포위되어 고립되었다. 절체절명의 위기다.",
        choices: [ // 임시 선택지
            { text: "동료들과 함께 항전한다", fatigueChange: 35, outcomeDescription: "살아남기 위해 동료들과 함께 필사적으로 저항했다.", nextEventId: 'personal_time' },
            { text: "탈출로를 확보하기 위해 노력한다", fatigueChange: 30, outcomeDescription: "포위망을 뚫고 탈출하기 위해 가능한 모든 방법을 시도했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'declaration_of_war_response', type: 'special',
        title: "전시 상황 선포와 대응",
        description: "국가 비상사태가 선포되고 전시 상황에 돌입했다. 모든 것이 달라진다.",
        choices: [ // 임시 선택지
            { text: "명령에 따라 전투 준비에 만전을 기한다", fatigueChange: 25, outcomeDescription: "실제 전쟁 상황에 대비하여 모든 준비를 마쳤다.", nextEventId: 'personal_time' }, // 게임 상태 변경 필요
            { text: "가족과 국가를 지키겠다고 다짐한다", fatigueChange: 10, outcomeDescription: "비장한 각오로 전투에 임할 준비를 한다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'vip_protection_duty', type: 'special',
        title: "중요 인물 경호 임무 수행",
        description: "매우 중요한 인물의 경호를 맡게 되었다. 한 치의 실수도 용납되지 않는다.",
        choices: [ // 임시 선택지
            { text: "철저한 경호 계획을 수립하고 실행한다", fatigueChange: 18, outcomeDescription: "빈틈없는 경호 작전으로 임무를 성공적으로 완수했다.", nextEventId: 'personal_time' },
            { text: "극도의 긴장감 속에서 임무를 수행한다", fatigueChange: 22, outcomeDescription: "임무 수행 내내 극도의 긴장 상태를 유지했다.", nextEventId: 'personal_time' }
        ]
    },
    {
        id: 'awol_soldier_occurrence_search', type: 'special',
        title: "부대 이탈자 발생과 수색",
        description: "휴가 미복귀 등 부대 이탈자가 발생하여 수색에 나서야 한다.",
        choices: [ // 임시 선택지
            { text: "이탈 경로를 추적하며 수색한다", fatigueChange: 15, outcomeDescription: "가능한 모든 단서를 활용하여 이탈자를 추적했다.", nextEventId: 'personal_time' },
            { text: "무사히 복귀하기를 바란다", fatigueChange: 10, outcomeDescription: "이탈자가 별 탈 없이 복귀하기를 바라는 마음이다.", nextEventId: 'personal_time' }
        ]
    },

// ... (Part 5 끝, Part 6에서 계속) ...


    
