import {clearColorButtons, clearTextButtons} from "@/services/ft_clear";

export function printHintsSpelling(words)
{
    document.getElementById('hint1').innerText = words[0];
    document.getElementById('hint1').style.color = 'green';
    document.getElementById('hint2').innerText = words[1];
    document.getElementById('hint2').style.color = 'green';
    document.getElementById('hint3').innerText = words[2];
    document.getElementById('hint3').style.color = 'green';
}


export function printHintsContinue(words)
{
    if (words[0] === '\"' && words[1] === '\"' && words[2] === '\"') {
        clearTextButtons();
        clearColorButtons();
        return ;
    }
    document.getElementById('hint1').innerText = words[0];
    document.getElementById('hint1').style.color = 'blue';
    document.getElementById('hint2').innerText = words[1];
    document.getElementById('hint2').style.color = 'blue';
    document.getElementById('hint3').innerText = words[2];
    document.getElementById('hint3').style.color = 'blue';
}
