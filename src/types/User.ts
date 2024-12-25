export interface User {
  firstName: string,
  lastName: string
  username: string,
  password: string,
}

export interface UserData {
  username: string,
  data: Array<{
    title: string,
    content: string,
    emotion: number
  }>
}

