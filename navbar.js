let navStates = {}; // 각 사이드 네비게이션의 상태를 저장할 객체

function toggleNav(navId) {
    const allNavs = document.querySelectorAll(".sidenav"); // 모든 사이드 네비게이션 선택

    allNavs.forEach((nav) => {
        if (nav.id !== navId) {
            closeNav(nav); // 다른 사이드 네비게이션 닫기
            navStates[nav.id] = false; // 닫힌 상태로 설정
        }
    });

    let nav = document.getElementById(navId);
    if (nav) {
        // nav가 null이 아닌 경우에만 동작
        if (navStates[navId]) {
            closeNav(nav);
            navStates[navId] = false; // 상태 변경
        } else {
            openNav(nav);
            navStates[navId] = true; // 상태 변경
        }
    } else {
        console.error(`Element with ID ${navId} not found`);
    }
}

function openNav(nav) {
    if (window.innerWidth <= 768) {
        nav.style.height = "40%";
    } else {
        nav.style.width = "400px";
    }
}

function closeNav(nav) {
    if (window.innerWidth <= 768) {
        nav.style.height = "0";
    } else {
        nav.style.width = "0";
    }
}

// Adjust sidenav behavior on window resize
window.addEventListener('resize', () => {
    const allNavs = document.querySelectorAll(".sidenav");
    allNavs.forEach((nav) => {
        if (navStates[nav.id]) {
            openNav(nav);
        } else {
            closeNav(nav);
        }
    });
});
