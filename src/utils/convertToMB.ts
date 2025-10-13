export function convertToMB(fileSize:number):string {
    if (fileSize === 0) return `0MB`;
    return `${(fileSize / (1024 * 1024)).toFixed(2)}MB`;
    
}