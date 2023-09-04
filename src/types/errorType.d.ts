interface CustomErrorType {
  data: {
    error: {
      message: string
    },
  },
  status: number
}

interface CustomAxiosErrorType {
    error: {
      message: string
    },
  status: number
}