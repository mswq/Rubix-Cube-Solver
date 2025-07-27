import solve from "cube-solver";

export function solveCubeFromColors(colors) {
    const faceOrder = ['U', 'R', 'F', 'D', 'L', 'B'];
    const faceString = faceOrder.map((_, i) =>
        colors.slice(i*9, i*9 + 9).map(color => colorToLetter(color)).join(''))
    .join('');
    return solve(faceString);
}

function colorToLetter(hex) {
    const map = {
    '#ff0000': 'R',
    '#27cc27': 'G',
    '#267bc5': 'B',
    '#ffa500': 'O',
    '#ffff00': 'Y',
    '#ffffff': 'W'
    };
    return map[hex.toLowerCase()] || 'X';
}