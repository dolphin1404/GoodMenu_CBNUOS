document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.category');
    const types = document.querySelectorAll('.type');
    const situations = document.querySelectorAll('.situation');
    const recommendButton = document.getElementById('recommendButton');
    const result = document.getElementById('result');
    const loading = document.getElementById('loading');
    
    const menuOptions = {
        '식사': {
            '한식': {
                '혼밥': ['김치찌개', '비빔밥'],
                '친구': ['불고기', '삼겹살'],
                '연인': ['불고기', '비빔밥'],
                '가족': ['된장찌개', '삼겹살'],
                '모임': ['된장찌개', '불고기']
            },
            '중식': {
                '혼밥': ['짜장면', '짬뽕'],
                '친구': ['탕수육', '마파두부'],
                '연인': ['마파두부', '탕수육'],
                '가족': ['탕수육', '마라탕'],
                '모임': ['마라탕', '탕수육']
            },
            '일식': {
                '혼밥': ['초밥', '라멘'],
                '친구': ['돈부리', '텐동'],
                '연인': ['초밥', '라멘'],
                '가족': ['텐동', '돈부리'],
                '모임': ['우동', '라멘']
            },
            '양식': {
                '혼밥': ['햄버거', '샐러드'],
                '친구': ['피자', '스테이크'],
                '연인': ['스테이크', '파스타'],
                '가족': ['피자', '스파게티'],
                '모임': ['스파게티', '스테이크']
            },
            '분식': {
                '혼밥': ['떡볶이', '순대'],
                '친구': ['김밥', '튀김'],
                '연인': ['순대', '떡볶이'],
                '가족': ['김밥', '튀김'],
                '모임': ['떡볶이', '김밥']
            }
        },
        '요리': {
            '한식': {
                '혼밥': ['파전', '김밥'],
                '친구': ['갈비찜', '닭볶음탕'],
                '연인': ['잡채', '갈비찜'],
                '가족': ['닭볶음탕', '갈비찜'],
                '모임': ['김밥', '잡채']
            },
            '중식': {
                '혼밥': ['토마토 계란 볶음', '깐풍기'],
                '친구': ['양장피', '꿔바로우'],
                '연인': ['깐풍기', '마라샹궈'],
                '가족': ['마라샹궈', '양장피'],
                '모임': ['꿔바로우', '마라샹궈']
            },
            '일식': {
                '혼밥': ['오코노미야키', '낫토'],
                '친구': ['타코야키', '카레라이스'],
                '연인': ['카레라이스', '오코노미야키'],
                '가족': ['낫토', '타코야키'],
                '모임': ['고로케', '타코야키']
            },
            '양식': {
                '혼밥': ['크로켓', '타르트'],
                '친구': ['퀘사디아', '리조또'],
                '연인': ['라자냐', '리조또'],
                '가족': ['타르트', '라자냐'],
                '모임': ['크로켓', '라자냐']
            },
            '분식': {
                '혼밥': ['오뎅', '김말이'],
                '친구': ['라면', '튀김'],
                '연인': ['떡볶이', '순대'],
                '가족': ['김밥', '라면'],
                '모임': ['튀김', '김밥']
            }
        },
        '간식': {
            '한식': {
                '혼밥': ['호떡', '붕어빵'],
                '친구': ['떡볶이', '군고구마'],
                '연인': ['경단', '호떡'],
                '가족': ['붕어빵', '군고구마'],
                '모임': ['떡볶이', '경단']
            },
            '중식': {
                '혼밥': ['화과자', '딤섬'],
                '친구': ['탕후루', '월병'],
                '연인': ['바나나 튀김', '화과자'],
                '가족': ['월병', '딤섬'],
                '모임': ['탕후루', '바나나 튀김']
            },
            '일식': {
                '혼밥': ['도라야끼', '가스테라'],
                '친구': ['센베이', '모찌'],
                '연인': ['다이후쿠', '센베이'],
                '가족': ['모찌', '다이후쿠'],
                '모임': ['가스테라', '도라야끼']
            },
            '양식': {
                '혼밥': ['머핀', '크루아상'],
                '친구': ['스콘', '마카롱'],
                '연인': ['마카롱', '크루아상'],
                '가족': ['머핀', '스콘'],
                '모임': ['스콘', '마카롱']
            },
            '아시아': {
                '혼밥': ['첸돌', '나시 레막'],
                '친구': ['로띠', '망고 스티키 라이스'],
                '연인': ['바나나 팬케이크', '첸돌'],
                '가족': ['망고 스티키 라이스', '로띠'],
                '모임': ['바나나 팬케이크', '나시 레막']
            }
        }
    };

   
    function getRandomMenu(selectedCategory, selectedType, selectedSituation) {
        const options = menuOptions[selectedCategory][selectedType][selectedSituation];
        return options[Math.floor(Math.random() * options.length)];
    }

    recommendButton.addEventListener('click', () => {
        const selectedCategory = document.querySelector('.category.selected')?.dataset.category || '전체';
        const selectedType = document.querySelector('.type.selected')?.dataset.type || '전체';
        const selectedSituation = document.querySelector('.situation.selected')?.dataset.situation || '전체';

        loading.style.display = 'block';
        foodImage.style.display = 'none';
        result.textContent = '';

        setTimeout(() => {
            loading.style.display = 'none';

            let selectedMenu;
            if (selectedCategory === '전체' || selectedType === '전체' || selectedSituation === '전체') {
                const allOptions = Object.values(menuOptions).flatMap(category => 
                    Object.values(category).flatMap(type => 
                        Object.values(type).flat()
                    )
                );
                selectedMenu = allOptions[Math.floor(Math.random() * allOptions.length)];
            } else {
                selectedMenu = getRandomMenu(selectedCategory, selectedType, selectedSituation);
            }

            result.textContent = selectedMenu;
            if (menuImages[selectedMenu]) {
                foodImage.src = menuImages[selectedMenu];
                foodImage.alt = selectedMenu;
                foodImage.style.display = 'block';
            }
        }, 2000);
    });

    categories.forEach(button => {
        button.addEventListener('click', () => {
            categories.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    types.forEach(button => {
        button.addEventListener('click', () => {
            types.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    situations.forEach(button => {
        button.addEventListener('click', () => {
            situations.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    window.toggleNav = function(navId) {
        const nav = document.getElementById(navId);
        if (nav.style.width === '250px') {
            nav.style.width = '0';
        } else {
            nav.style.width = '250px';
        }
    };
});
