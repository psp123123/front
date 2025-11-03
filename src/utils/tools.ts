// 封装sleep函数：等待指定毫秒后resolve
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
