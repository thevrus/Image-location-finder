// CHECK FILE SIZE
export function validFileSize(fileSize) {
    if (!typeof number === 'number') return false;
    if (fileSize < 1048576) return true;
    return false;
}

// GET FILE SIZE
export function getFileSize(number) {
    if (!typeof number === 'number') return false;

    if (number < 1024) {
        return number + " bytes";
    } else if (number >= 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + " KB";
    } else if (number >= 1048576) {
        return (number / 1048576).toFixed(1) + " MB";
    }
}

// CONVERT TO DECIMALS
export function toDecimal(number) {
    if (!typeof number === 'number') return false;
    return (
        number[0].numerator +
        number[1].numerator / (60 * number[1].denominator) +
        number[2].numerator / (3600 * number[2].denominator)
    ).toFixed(3);
}

// CHECK GPS DATA
export function validGPS(longitude, latitude) {
    if (longitude && latitude) return true;
    return false;
}