function convertToMB(fileSize:number):string {
    if (fileSize === 0) return `0MB`;
    return `${(fileSize / (1024 * 1024)).toFixed(2)}MB`;
    
};

function phoneMask(inputValue: string):string {

    let value = inputValue.replace(/\D/g, '');
    if (value.length > 0) {
        value = '(' + value;
        if (value.length > 3) {
            value = value.substring(0, 3) + ') ' + value.substring(3, value.length);
        }
        if (value.length > 9) {
            if (value.length <= 10) { 
                value = value.substring(0, 9) + '-' + value.substring(9, value.length);
            } else { 
                value = value.substring(0, 10) + '-' + value.substring(10, value.length);
            }
        }
    }

    return value;
};

function cpfMask(inputValue: string):string {
    let value = inputValue.replace(/\D/g, '');
    if(value.length > 0){
        if (value.length > 3 && value.length <= 6) {
        value = value.substring(0, 3) + '.' + value.substring(3, value.length);
    }if (value.length > 6 && value.length <= 9) {
        value = value.substring(0, 3) + '.' + value.substring(3, 6) + '.' + value.substring(6, value.length);
    }if (value.length > 9) {
        value = value.substring(0, 3) + '.' + value.substring(3, 6) + '.' + value.substring(6, 9) + '-' + value.substring(9, value.length);
    }}
    return value;
};

interface valueMasks {
    convertToMB: (fileSize: number) => string;
    phoneMask: (inputValue: string) => string;
    cpfMask: (inputValue: string) => string;
};

export const valueMasks: valueMasks = {
    convertToMB,
    phoneMask,
    cpfMask
};