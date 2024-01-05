export const formatDateTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);

    // Lấy ngày, tháng và năm từ đối tượng Date
    const ngay = dateTime.getDate();
    const thang = dateTime.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
    const nam = dateTime.getFullYear();

    // Định dạng lại ngày và tháng để thêm số 0 vào đầu nếu cần
    const ngayDaDinhDang = ngay < 10 ? '0' + ngay : ngay;
    const thangDaDinhDang = thang < 10 ? '0' + thang : thang;

    // Định dạng chuỗi kết quả
    const ketQua = `${ngayDaDinhDang} - ${thangDaDinhDang} - ${nam}`;

    return ketQua;
}