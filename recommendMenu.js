document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll(".category");
  const types = document.querySelectorAll(".type");
  const situations = document.querySelectorAll(".situation");
  const recommendBtn = document.getElementById("recommendBtn");
  const result = document.getElementById("result");
  const loading = document.getElementById("loading");

  const menuDatabase = {
    전체: ["불고기", "비빔밥", "김치찌개", "된장찌개", "짜장면", "짬뽕", "탕수육", "깐풍기", "파스타", "스테이크", "피자", "햄버거","떡볶이", "핫도그", "붕어빵", "순대", "팔보채"],
    식사: ["불고기", "비빔밥", "김치찌개", "된장찌개", "짜장면", "짬뽕", "탕수육", "깐풍기", "파스타", "스테이크", "피자", "햄버거", "팔보채"],
    요리: ["불고기", "비빔밥", "김치찌개", "된장찌개", "짜장면", "짬뽕", "탕수육", "깐풍기", "파스타", "스테이크", "피자", "햄버거", "떡볶이", "팔보채"],
    간식: ["떡볶이", "핫도그", "붕어빵", "순대"],
    한식: ["불고기", "비빔밥", "김치찌개", "된장찌개"],
    중식: ["짜장면", "짬뽕", "탕수육", "깐풍기", "팔보채"],
    양식: ["파스타", "스테이크", "피자", "햄버거"],
    혼밥: ["불고기", "비빔밥", "김치찌개", "된장찌개", "짜장면", "짬뽕", "탕수육", "깐풍기", "파스타", "스테이크", "피자", "햄버거", "떡볶이", "팔보채"],
    단체: ["탕수육", "파스타", "피자", "삼겹살"],
    데이트: ["스테이크", "파스타", "초밥", "피자", "팔보채"],
  };

  function toggleButtonSelection(buttons, target) {
    buttons.forEach((button) => {
      if (button === target) {
        button.classList.add("selected");
      } else {
        button.classList.remove("selected");
      }
    });
  }

  function getSelected(buttons) {
    return Array.from(buttons).find((button) =>
      button.classList.contains("selected")
    ).dataset;
  }

  function getRandomMenu(selectedCategory, selectedType, selectedSituation) {
    let possibleMenus = menuDatabase["전체"].slice(); // 전체 메뉴 초기화

    // 카테고리에 따른 필터링
    if (selectedCategory !== "전체") {
      possibleMenus = possibleMenus.filter(menu => menuDatabase[selectedCategory].includes(menu));
    }

    // 타입에 따른 필터링
    if (selectedType !== "전체") {
      possibleMenus = possibleMenus.filter(menu => menuDatabase[selectedType].includes(menu));
    }

    // 상황에 따른 필터링
    if (selectedSituation !== "전체") {
      possibleMenus = possibleMenus.filter(menu => menuDatabase[selectedSituation].includes(menu));
    }

    // 중복 제거
    possibleMenus = [...new Set(possibleMenus)];

    // 가능한 메뉴가 없는 경우 에러 메시지 출력
    if (possibleMenus.length === 0) {
      return "조건에 맞는 메뉴가 없습니다.";
    }

    // 랜덤 메뉴 선택
    const randomIndex = Math.floor(Math.random() * possibleMenus.length);
    return possibleMenus[randomIndex];
  }

  categories.forEach((button) => {
    button.addEventListener("click", () => {
      toggleButtonSelection(categories, button);
    });
  });

  types.forEach((button) => {
    button.addEventListener("click", () => {
      toggleButtonSelection(types, button);
    });
  });

  situations.forEach((button) => {
    button.addEventListener("click", () => {
      toggleButtonSelection(situations, button);
    });
  });

  recommendBtn.addEventListener("click", () => {
    const selectedCategory = getSelected(categories).category;
    const selectedType = getSelected(types).type;
    const selectedSituation = getSelected(situations).situation;

    result.textContent = "";
    loading.style.display = "block";

    setTimeout(() => {
      const recommendedMenu = getRandomMenu(
        selectedCategory,
        selectedType,
        selectedSituation
      );
      loading.style.display = "none";
      result.textContent = `추천 메뉴: ${recommendedMenu}`;
    }, 1000);
  });
});
