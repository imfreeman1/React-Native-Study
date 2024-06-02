type LatLonType = {
  latitude: number;
  longitude: number;
};

type GetDistanceFromLatLonInKmType = (
  userLocation: LatLonType,
  centerLocation: LatLonType,
) => number;

const getDistanceFromLatLonInKm: GetDistanceFromLatLonInKmType = (
  userLocation,
  centerLocation,
) => {
  const R = 6371; // 지구의 반지름 (km 단위)
  const dLat = deg2rad(centerLocation.latitude - userLocation.latitude); // 두 위도 차이를 라디안으로 변환
  const dLon = deg2rad(centerLocation.longitude - userLocation.longitude); // 두 경도 차이를 라디안으로 변환
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(userLocation.latitude)) *
      Math.cos(deg2rad(centerLocation.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // 거리 (km 단위)
  return distance * 1000; // 미터 단위로 변환
};

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

export default getDistanceFromLatLonInKm;
