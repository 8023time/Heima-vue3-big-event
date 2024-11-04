import { dayjs } from "element-plus"
export const settime =(time) => {
    return dayjs(time).format('YYYY年MM月DD日')
}