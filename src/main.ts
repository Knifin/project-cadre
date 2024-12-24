class main {
    constructor() {

    }

    public hello(): void {
        document.querySelector<HTMLDivElement>('#app')!.innerHTML = 'Hello World';
    }
}

const app: main = new main();
app.hello();