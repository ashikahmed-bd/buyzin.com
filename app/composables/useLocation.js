export const useLocation = () => {
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (import.meta.server) {
        reject(new Error('Geolocation is only available on client'))
        return
      }

      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => {
          reject(error)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      )
    })
  }

  return {
    getLocation
  }
}