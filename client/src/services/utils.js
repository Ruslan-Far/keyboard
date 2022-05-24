export function checkForSpelling(word, dictionary) {
    let i;
    for (i = 0; i < dictionary.length; i++) {
        if (word === dictionary[i].word)
            break;
    }
    if (i !== dictionary.length)
        for (i = 0; i < dictionary.length; i++) {
            if (word === dictionary[i].word && parseInt(dictionary[i].count) > 2)
                return null;
        }
    let res = new Array(3);
    let dict_copy = dictionary.slice();
    for (i = 0; i < res.length; i++)
        res[i] = getApproximateWord(word, dict_copy);
    return res;
}


function getApproximateWord(word, values)
{
    let resWord;
    let countLetters = 0;
    let indexWordFromList = 0;
    let e;
    let min = 1000000000;

    if (values.length === 0)
        return '\"';
    for (let i = 0; i < values.length; i++)
    {
        countLetters = 0;
        if (parseInt(values[i].count) < 3 || values[i].word.length === 0)
            continue ;
        let wordFromList = values[i].word.split('');
        for (let i_word = 0; i_word < word.length; i_word++)
        {
            for (let i_wordFromList = 0; i_wordFromList < wordFromList.length; i_wordFromList++)
            {
                if (word[i_word] === wordFromList[i_wordFromList])
                {
                    countLetters++;
                    wordFromList.splice(i_wordFromList, 1);
                    break ;
                }
            }
        }
        if (word.length > wordFromList.length)
        {
            e = Math.abs(countLetters - word.length);
            if (e < min)
            {
                min = e;
                indexWordFromList = i;
            }
        }
        else {
            e = Math.abs(countLetters - wordFromList.length);
            if (e < min)
            {
                min = e;
                indexWordFromList = i;
            }
        }
    }
    if (parseInt(values[indexWordFromList].count) < 3)
        return '\"';
    resWord = values[indexWordFromList];
    values.splice(indexWordFromList, 1);
    return resWord.word;
}


export function extractPenultimateWord(text)
{
    const exp = /[^а-я]/ig;
    text = text.replace(exp, " ").trim();
    text = text.split(exp);
    for (let i = text.length - 2; i >= 0; i--)
    {
        if (text[i] !== '')
            return text[i];
    }
    return '';
}


export function extractLastWord(text)
{
    const exp = /[^а-я]/ig;
    text = text.replace(exp, " ").trim();
    text = text.split(exp);
    return text[text.length - 1];
}


export function searchWordCount(word, dictionary)
{
    for (let i = 0; i < dictionary.length; i++)
    {
        if (word === dictionary[i].word)
            return dictionary[i].id + ':' + dictionary[i].count;
    }
    return null;
}


export function selectWordsToContinue(word, collocations)
{
    let res = new Array(3);
    let arr = collocations.filter(x => x.wordResources[0].word === word);
    if (arr.length === 0)
    {
        res[0] = '\"';
        res[1] = '\"';
        res[2] = '\"';
    }
    else if (arr.length === 1)
    {
        res[0] = arr[0].wordResources[1].word;
        res[1] = '\"';
        res[2] = '\"';
    }
    else if (arr.length === 2)
    {
        arr.sort((a, b) => a.count < b.count ? 1 : -1);
        res[0] = arr[0].wordResources[1].word;
        res[1] = arr[1].wordResources[1].word;
        res[2] = '\"';
    }
    else
    {
        arr.sort((a, b) => a.count < b.count ? 1 : -1);
        res[0] = arr[0].wordResources[1].word;
        res[1] = arr[1].wordResources[1].word;
        res[2] = arr[2].wordResources[1].word;
    }
    return res;
}


export function searchFirstSecondWords(firstWord, secondWord, collocations)
{
    if (firstWord === '' || secondWord === '')
        return JSON.stringify({id: 0});
    for (let i = 0; i < collocations.length; i++)
    {
        if (firstWord === collocations[i].wordResources[0].word
            && secondWord === collocations[i].wordResources[1].word)
            return JSON.stringify({
                id: parseInt(collocations[i].id),
                prevId: parseInt(collocations[i].wordResources[0].id),
                nextId: parseInt(collocations[i].wordResources[1].id),
                count: parseInt(collocations[i].count) + 1
            });
    }
    return null;
}
