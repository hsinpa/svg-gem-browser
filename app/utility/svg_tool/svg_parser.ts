export let parse_svg = function(data: string) {
    let lookup_open_code = '<svg';
    let lookup_close_code = '</svg>';

    let start_index = data.indexOf(lookup_open_code);
    let end_index = data.indexOf(lookup_close_code);

    if (end_index >= 0) end_index += lookup_close_code.length;

    return [start_index, end_index]; 
}