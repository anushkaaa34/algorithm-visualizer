const arrayContainer = document.getElementById('array-container');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const toggleCodeButton = document.getElementById('toggle-code-button');
const generateArrayButton = document.getElementById('generate-array-button');
const sortTypeSelect = document.getElementById('sort-type');
const speedInput = document.getElementById('speed');
const cppCodeContainer = document.getElementById('cpp-code-container');
const jsCodeContainer = document.getElementById('js-code');
const cppCodeDisplay = document.getElementById('cpp-code-display');

let array = generateRandomArray(10); // Generate initial random array
let speed = parseInt(speedInput.value); // Initial speed
let isPaused = false;
let isReset = false;

function createBars(array) {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`; // Scale height for better visualization
        bar.style.width = `${100 / array.length - 2}%`; // Width adjusted for spacing
        arrayContainer.appendChild(bar);
    });
}

function generateRandomArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    return array;
}

function swap(el1, el2) {
    const temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;
}

function highlightLine(lineNumber, codeType) {
    const lines = document.querySelectorAll(`#${codeType}-code-display span`);
    lines.forEach(line => line.classList.remove('highlight-line'));
    document.getElementById(`${codeType}-line${lineNumber}`).classList.add('highlight-line');
}

function getCppCodeSnippet(sortType) {
    if (sortType === 'bubble') {
        return `
<span id="cpp-line1">void bubbleSort(int arr[], int n) {</span>

<span id="cpp-line2">    for (int i = 0; i < n-1; i++) {</span>
<span id="cpp-line3">        for (int j = 0; j < n-i-1; j++) {</span>

<span id="cpp-line4">            if (arr[j] > arr[j+1]) {</span>
<span id="cpp-line5">                int temp = arr[j];</span>
<span id="cpp-line6">                arr[j] = arr[j+1];</span>
<span id="cpp-line7">                arr[j+1] = temp;</span>
<span id="cpp-line8">            }</span>
<span id="cpp-line9">        }</span>
<span id="cpp-line10">    }</span>
<span id="cpp-line11">}</span>`;
    } else if (sortType === 'selection') {
        return `
<span id="cpp-line1">void selectionSort(int arr[], int n) {</span>

<span id="cpp-line2">    for (int i = 0; i < n-1; i++) {</span>
<span id="cpp-line3">        int minIdx = i;</span>
<span id="cpp-line4">        for (int j = i+1; j < n; j++) {</span>
<span id="cpp-line5">            if (arr[j] < arr[minIdx]) {</span>
<span id="cpp-line6">                minIdx = j;</span>
<span id="cpp-line7">            }</span>
<span id="cpp-line8">        }</span>
<span id="cpp-line9">        int temp = arr[minIdx];</span>
<span id="cpp-line10">        arr[minIdx] = arr[i];</span>
<span id="cpp-line11">        arr[i] = temp;</span>
<span id="cpp-line12">    }</span>
<span id="cpp-line13">}</span>`;
    } else if (sortType === 'insertion') {
        return `
<span id="cpp-line1">void insertionSort(int arr[], int n) {</span>

<span id="cpp-line2">    for (int i = 1; i < n; i++) {</span>
<span id="cpp-line3">        int key = arr[i];</span>
<span id="cpp-line4">        int j = i - 1;</span>
<span id="cpp-line5">        while (j >= 0 && arr[j] > key) {</span>
<span id="cpp-line6">            arr[j + 1] = arr[j];</span>
<span id="cpp-line7">            j = j - 1;</span>
<span id="cpp-line8">        }</span>
<span id="cpp-line9">        arr[j + 1] = key;</span>
<span id="cpp-line10">    }</span>
<span id="cpp-line11">}</span>`;
    }
}

async function bubbleSort(array) {
    const bars = document.querySelectorAll('.bar');
    for (let i = 0; i < array.length - 1; i++) {
        highlightLine(2, 'cpp');
        for (let j = 0; j < array.length - i - 1; j++) {
            if (isReset) return;
            while (isPaused) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            bars[j].classList.add('highlight');
            bars[j + 1].classList.add('highlight');
            //highlightLine(3, 'js');
            highlightLine(3, 'cpp');
            highlightLine(4, 'cpp');
            await new Promise(resolve => setTimeout(resolve, speed));
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                swap(bars[j], bars[j + 1]);
                //highlightLine(4, 'js');
                highlightLine(5, 'cpp');
                await new Promise(resolve => setTimeout(resolve, speed));
            }
            bars[j].classList.remove('highlight');
            bars[j + 1].classList.remove('highlight');
            //highlightLine(7, 'js');
            highlightLine(8, 'cpp');
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    }
}

async function selectionSort(array) {
    const bars = document.querySelectorAll('.bar');
    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        bars[i].classList.add('highlight');
        //highlightLine(3, 'js');
        highlightLine(2, 'cpp');
        for (let j = i + 1; j < array.length; j++) {
            if (isReset) return;
            while (isPaused) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            bars[j].classList.add('highlight');
            //highlightLine(4, 'js');
            highlightLine(5, 'cpp');
            await new Promise(resolve => setTimeout(resolve, speed));
            if (array[j] < array[minIdx]) {
                minIdx = j;
               // highlightLine(5, 'js');
                highlightLine(6, 'cpp');
            }
            bars[j].classList.remove('highlight');
        }
        if (minIdx !== i) {
            let temp = array[i];
            array[i] = array[minIdx];
            array[minIdx] = temp;
            swap(bars[i], bars[minIdx]);
            //highlightLine(7, 'js');
            highlightLine(9, 'cpp');
        }
        bars[i].classList.remove('highlight');
        //highlightLine(9, 'js');
        highlightLine(12, 'cpp');
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

async function insertionSort(array) {
    const bars = document.querySelectorAll('.bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        bars[i].classList.add('highlight');
        //highlightLine(2, 'js');
        highlightLine(3, 'cpp');
        await new Promise(resolve => setTimeout(resolve, speed));
        while (j >= 0 && array[j] > key) {
            if (isReset) return;
            while (isPaused) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            bars[j].classList.add('highlight');
            //highlightLine(4, 'js');
            highlightLine(5, 'cpp');
            await new Promise(resolve => setTimeout(resolve, speed));
            array[j + 1] = array[j];
            swap(bars[j + 1], bars[j]);
            //highlightLine(5, 'js');
            highlightLine(6, 'cpp');
            bars[j].classList.remove('highlight');
            j--;
        }
        array[j + 1] = key;
        bars[i].classList.remove('highlight');
        //highlightLine(7, 'js');
        highlightLine(9, 'cpp');
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

async function performSort(array, sortType) {
    cppCodeDisplay.innerHTML = getCppCodeSnippet(sortType);
    if (sortType === 'bubble') {
        await bubbleSort(array);
    } else if (sortType === 'selection') {
        await selectionSort(array);
    } else if (sortType === 'insertion') {
        await insertionSort(array);
    }
}

function toggleCppCode() {
    if (cppCodeContainer.style.display === 'none') {
        cppCodeContainer.style.display = 'block';
    } else {
        cppCodeContainer.style.display = 'none';
    }
}

startButton.addEventListener('click', () => {
    isPaused = false;
    isReset = false;
    performSort(array, sortTypeSelect.value);
});

pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
});

resetButton.addEventListener('click', () => {
    isPaused = true;
    isReset = true;
    array = generateRandomArray(10);
    createBars(array);
    cppCodeContainer.style.display = 'none';
});

toggleCodeButton.addEventListener('click', toggleCppCode);

generateArrayButton.addEventListener('click', () => {
    array = generateRandomArray(10);
    createBars(array);
});

speedInput.addEventListener('input', () => {
    speed = parseInt(speedInput.value);
});

// Initial bars creation
createBars(array);
