import { toast } from 'vue-sonner'
import { request } from '../request'

function adapter(obj: {
  result: {
    resultCode: string
    resultMessage: string
  }
  data: object
}) {
  if (obj.result.resultCode === '000000') {
    return obj.data
  } else {
    toast.error(obj?.result?.resultMessage)
    throw new Error(obj?.result?.resultMessage)
  }
}

/**
 * 1. 查询区域微型消防站
 */
export function queryQyWxxfz(params?: any) {
  return (
    request
      // .get('/rescuejcj-service/yjlddw-model/queryQyWxxfz', { params })
      .get('/rescuejcj-service/yjlddw-model/queryWxxfz', { params })
      .then((res) => adapter(res as any))
  )
}
