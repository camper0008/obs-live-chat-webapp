const container = document.getElementById('container');

const updateText = (data) => {
    container.innerHTML = '';
    for (let i in data) {
        const element = document.createElement('p');
        element.textContent = `${data[i].time} [${data[i].username}]: ${data[i].message}`
        container.appendChild(element);
    }
}

const refresh = async () => {
    const res = await (await fetch('/api/chat')).json();
    updateText(res);
}

const main = () => {
    refresh();
    setInterval(() => refresh(), 500);
}
main();
