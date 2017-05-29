export function preventEnterDefault(event) {
    if (event.key == 'Enter') {
        event.preventDefault();
    }
}