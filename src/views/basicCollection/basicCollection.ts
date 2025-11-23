// {
//     id: 1,
//     date: '2016-05-03',
//     url: 'xxx.example.com',
//     injection: ['/admin&id=12', '/admin&id=12', '/admin&id=12 '],
//     tag: "url",

// }
// 引入请求工具request
export type UrlItem = {
  id: number
  date: string
  url: string
  injectionType: string
  injection: string[]
  directories: string[]
  tag: string
  domains: string[]
  ports: number[]
  managerUrl: string
  managerUser: string
  managerPass: string
}
