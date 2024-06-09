document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll(".category");
    const types = document.querySelectorAll(".type");
    const situations = document.querySelectorAll(".situation");
    const recommendBtn = document.getElementById("recommendBtn");
    const result = document.getElementById("result");
    const loading = document.getElementById("loading");
  
    const menuDatabase = {
      전체: ["불고기", "비빔밥", "파스타", "짜장면", "김치찌개"],
      식사: ["불고기", "비빔밥", "김치찌개", "된장찌개"],
      요리: ["파스타", "스테이크", "탕수육", "깐풍기"],
      간식: ["떡볶이", "핫도그", "붕어빵", "순대"],
      한식: ["불고기", "비빔밥", "김치찌개", "된장찌개"],
      중식: ["짜장면", "짬뽕", "탕수육", "깐풍기"],
      양식: ["파스타", "스테이크", "피자", "햄버거"],
      혼밥: ["김치찌개", "비빔밥", "짜장면", "떡볶이"],
      단체: ["탕수육", "파스타", "피자", "삼겹살"],
      데이트: ["스테이크", "파스타", "초밥", "피자"],
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
      let possibleMenus = [];
  
      if (selectedCategory !== "전체") {
        possibleMenus.push(...menuDatabase[selectedCategory]);
      }
  
      if (selectedType !== "전체") {
        possibleMenus.push(...menuDatabase[selectedType]);
      }
  
      if (selectedSituation !== "전체") {
        possibleMenus.push(...menuDatabase[selectedSituation]);
      }
  
      // 중복 제거
      possibleMenus = [...new Set(possibleMenus)];
  
      if (possibleMenus.length === 0) {
        possibleMenus.push(...menuDatabase["전체"]);
      }
  
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