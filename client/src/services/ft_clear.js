export function clearTextButtons()
{
    document.getElementById('hint1').innerText = '\"';
    document.getElementById('hint2').innerText = '\"';
    document.getElementById('hint3').innerText = '\"';
}


export function clearColorButtons()
{
    document.getElementById('hint1').style.color = null;
    document.getElementById('hint2').style.color = null;
    document.getElementById('hint3').style.color = null;
}
