export function ft_process_shift(state, row_1_keys, row_2_keys, row_3_keys)
{
    state += 1;
    if (row_1_keys[0].title === row_1_keys[0].title.toLowerCase())
    {
        for (let i = 0; i < row_1_keys.length; i++)
            row_1_keys[i].title = row_1_keys[i].title.toUpperCase();
        for (let i = 0; i < row_2_keys.length; i++)
            row_2_keys[i].title = row_2_keys[i].title.toUpperCase();
        for (let i = 0; i < row_3_keys.length; i++)
            row_3_keys[i].title = row_3_keys[i].title.toUpperCase();
    }
    else
    {
        for (let i = 0; i < row_1_keys.length; i++)
            row_1_keys[i].title = row_1_keys[i].title.toLowerCase();
        for (let i = 0; i < row_2_keys.length; i++)
            row_2_keys[i].title = row_2_keys[i].title.toLowerCase();
        for (let i = 0; i < row_3_keys.length; i++)
            row_3_keys[i].title = row_3_keys[i].title.toLowerCase();
    }
    return state;
}
