import axios, { type AxiosRequestHeaders } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

// des加解密公钥
const KEY = '12345678'
function decryptByDES(ciphertext: any) {
  const decrypted = window.CryptoJS.DES.decrypt(
    { ciphertext: window.CryptoJS.enc.Hex.parse(ciphertext) },
    window.CryptoJS.enc.Utf8.parse(KEY),
    {
      mode: window.CryptoJS.mode.ECB,
      padding: window.CryptoJS.pad.Pkcs7,
    },
  )
  // 将解密结果转换为字符串
  const plaintext = decrypted.toString(window.CryptoJS.enc.Utf8)
  return plaintext
}

/**
 * 创建请求
 * @param axiosConfig - axios配置，后续可继续优化
 */
export function createRequest(axiosConfig: any) {
  const instance = axios.create(axiosConfig)
  instance.interceptors.request.use(
    (config) => {
      ;(config.headers as AxiosRequestHeaders).SERVICE_TOKEN = 'web_cj'
      ;(config.headers as AxiosRequestHeaders).User_token =
        appStorage.value.token

      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )
  instance.interceptors.response.use(
    (response) => {
      let responseData = response.data // 原始数据
      if (response?.headers['is-encrypted'] === 'true') {
        responseData = JSON.parse(decryptByDES(response.data)) // 解密数据
      }
      //token超时处理
      if (responseData?.message === 'EXPIRED') {
        ElMessageBox.confirm('登录信息已失效，请重新登录', {
          closeOnClickModal: false,
          closeOnPressEscape: false,
          confirmButtonText: '确认',
          showCancelButton: false,
          showClose: false,
          type: 'warning',
        })
          .then(() => {
            const router = useRouter()
            router.replace('/')
          })
          .catch(() => {
            // catch error
            const router = useRouter()
            router.replace('/')
          })
      }
      return responseData
    },
    (error) => {
      let errorData = ''
      if (
        error?.response?.data &&
        error?.response?.headers['is-encrypted'] === 'true'
      ) {
        try {
          errorData = JSON.parse(decryptByDES(error?.response?.data))
        } catch (error) {
          errorData = (error as any).response?.data
        }
      }

      ElMessage.error('响应错误')
      return Promise.reject(errorData)
    },
  )

  return instance
}
