
//获取当前日期并转化为yyyy-MM-dd格式
export function formatDate(currentDate) {
    // 提取年、月、日
    let year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的，所以要加1
    let day = currentDate.getDate().toString().padStart(2, '0');

    // 构建 "yyyy-MM-dd" 格式的字符串
    let formateCurrentDate = `${year}-${month}-${day}`;

    return formateCurrentDate;
}