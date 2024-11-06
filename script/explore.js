function initMap() {
    const container = document.getElementById('map');
    const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 5 
    };

    const map = new kakao.maps.Map(container, options);
    const places = new kakao.maps.services.Places();

    places.keywordSearch('세차장', (result, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
            result = result.map((carWash, index) => ({
                ...carWash,
                availableSlots: index < 4 ? 0 : Math.floor(Math.random() * 6) + 1 
            }));
            displayCarWashMarkers(result, map);
            updateRecommendedList(result, map);
        } else {
            console.error('세차장 검색에 실패했습니다.');
        }
    }, {
        location: map.getCenter(),
        radius: 5000 
    });
}

function displayCarWashMarkers(carWashList, map) {
    carWashList.forEach(carWash => {
        const markerPosition = new kakao.maps.LatLng(carWash.y, carWash.x);
        const marker = new kakao.maps.Marker({
            position: markerPosition,
            map: map,
            clickable: true
        });

        const infoClass = carWash.availableSlots > 0 ? 'available' : 'unavailable';
        const carWashInfo = `
            <div class="info-window ${infoClass}">
                <strong class="info-title">${carWash.place_name}</strong><br/>
                <span class="info-address">주소: ${carWash.road_address_name || carWash.address_name}</span><br/>
                <span class="info-phone">전화번호: ${carWash.phone || '없음'}</span><br/>
                <span class="info-slots">남은 예약 가능 수: ${carWash.availableSlots}</span>
            </div>`;
        const infowindow = new kakao.maps.InfoWindow({ content: carWashInfo });

        kakao.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });

        kakao.maps.event.addListener(map, 'click', function () {
            infowindow.close();
        });
    });
}

function updateRecommendedList(carWashList, map) {
    const recommendedList = document.getElementById("recommended-list");
    recommendedList.innerHTML = '';

    carWashList.forEach((carWash, index) => {
        const carWashCard = document.createElement("div");
        carWashCard.classList.add("recommend-item");
        
        const buttonClass = carWash.availableSlots > 0 ? 'available' : 'unavailable';
        carWashCard.innerHTML = `
            <div class="item-info">
                <h3 class="item-title">${carWash.place_name}</h3>
                <p class="item-address">${carWash.road_address_name || carWash.address_name}</p>
                <p class="item-phone">전화번호: ${carWash.phone || '없음'}</p>
                <p class="item-slots">남은 예약 가능 수: ${carWash.availableSlots}</p>
            </div>
            <button class="reserve-button ${buttonClass}" ${carWash.availableSlots === 0 ? 'disabled' : ''}>
                ${carWash.availableSlots > 0 ? '예약하기' : '예약 불가'}
            </button>
        `;

        const reserveButton = carWashCard.querySelector(".reserve-button");

        reserveButton.addEventListener('click', () => {
            if (carWash.availableSlots > 0) {
                carWash.availableSlots--;
                updateRecommendedList(carWashList, map);
                alert(`${carWash.place_name} 예약이 완료되었습니다. 남은 예약 가능 수: ${carWash.availableSlots}`);
            } else {
                alert("예약이 모두 찼습니다.");
            }
        });

        recommendedList.appendChild(carWashCard);
    });
}

document.addEventListener("DOMContentLoaded", initMap);
