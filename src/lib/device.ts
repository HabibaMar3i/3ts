import { v4 as uuidv4 } from 'uuid'

export const getDeviceId = (): string => {
  let id = localStorage.getItem('device_id')
  if (!id) {
    id = uuidv4()
    localStorage.setItem('device_id', id)
  }
  return id
}

export const getDeviceType = (): 'ios' | 'android' | 'web' => {
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios'
  if (/Android/i.test(ua)) return 'android'
  return 'web'
}

export const getMacAddress = (): string => {
  let mac = localStorage.getItem('mac_address')
  if (!mac) {
    mac = uuidv4()
    localStorage.setItem('mac_address', mac)
  }
  return mac
}