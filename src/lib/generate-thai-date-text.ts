const thaiMonth = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม"
]
export function generateThaiDateText(dateString: string): string {
    const splitedDateString = dateString.split(' ');
    const date = splitedDateString[0];
    const time = splitedDateString[1];

    const splitedDate = date.split('-');
    const splitedTime = time.split(':');

    return `${splitedDate[2]} ${thaiMonth[(+splitedDate[1] - 1)]} ${(+splitedDate[0] + 543)} เวลา ${splitedTime[0]}.${splitedTime[1]} น.`;
}