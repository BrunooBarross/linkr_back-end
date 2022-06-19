export function filterHashtags(text){
    const regexText = /#+[a-zA-Z0-9A-Za-zÀ-ÖØ-öø-ʸ(_)]{1,}/g;
    const array = [...text.matchAll(regexText)];
    for (let i = 0; i < array.length; i++) {
        array[i] = array[i][0]
    }
    return array;
}