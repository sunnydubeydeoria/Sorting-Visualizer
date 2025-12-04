
let container     = document.querySelector("#visualizer");
let generateArray = document.querySelector("#newArray");
let start         = document.querySelector("#start");
let reset         = document.querySelector("#reset");
let algo          = document.querySelector("#algorithm");
let arrSize       = document.querySelector("#arraySize");

let array = [];

let speed = 50;
let speedLocked = false; // lock flag
let speedControl = document.querySelector("#speed");

speedControl.addEventListener("input", function() {
    if (speedLocked) return;    // ignore changes during sorting
    // Map slider value (1–5) to delay (e.g., 200 → 100 → 50 → 20 → 5 ms)
    let level = parseInt(speedControl.value);
    if (level === 1) speed = 200;
    else if (level === 2) speed = 100;
    else if (level === 3) speed = 50;
    else if (level === 4) speed = 20;
    else if (level === 5) speed = 5;

    console.log("Speed set to:", speed, "ms");
});

// Utility function for delay (animation)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Generate a new array and display bars
generateArray.addEventListener("click", function () {
    if (array.length > 0) return;  //  prevent generating again if already generated
    container.innerHTML = "";  // clear old bars
    array = [];                // reset array

    let arraySize = arrSize.value;

    for (let i = 0; i < arraySize; i++) {  // use 50 for better visualization
        array.push(Math.floor(Math.random() * 100) + 1);
    }

    array.forEach((value, idx) => {
        let box = document.createElement("div");
        box.classList.add("bar");
        box.style.height = value * 5 + "px";
        box.style.width = "30px";
        // box.style.backgroundColor = "pink";
        // box.style.backgroundColor = "#9b97c6ff";
        box.style.backgroundColor = "#B87C4C";
        // box.style.border = "1px solid black";
        box.style.display = "inline-block";
        box.style.margin = "0 1px";
        // Add black shadow (light effect)
        // box.style.boxShadow = "2px 2px 5px rgba(165, 165, 165, 0.5)";

        container.appendChild(box);
    });
});




// Bubble Sort with animation
async function bubbleSort() {
    let bars = document.querySelectorAll(".bar");
    let size = array.length;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Swap in the array
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                // Swap visually (bar heights)
                let bar1 = bars[j];
                let bar2 = bars[j + 1];

                let tempHeight = bar1.style.height;
                bar1.style.height = bar2.style.height;
                bar2.style.height = tempHeight;

                // Optional: change color during swap
                bar1.style.backgroundColor = "#0B1D51";
                bar2.style.backgroundColor = "#0B1D51";
                // bar1.style.border = "1px solid black";
                // bar2.style.border = "1px solid black";

                await sleep(speed); // pause for animation

                // Reset color
                // bar1.style.backgroundColor = "#9b97c6ff";
                // bar2.style.backgroundColor = "#9b97c6ff";

                bar1.style.backgroundColor = "#0056b3";
                bar2.style.backgroundColor = "#0056b3";

            }
        }
    }

}




// Selection Sort with animation
async function selectionSort() {
    let bars = document.querySelectorAll(".bar");
    let size = array.length;

    let min = 0;

    for (let i = 0; i < size - 1; i++) {
        // min = nums[i];
        min = i;
        for (let j = i; j < size; j++) {
            if (array[j] < array[min]) {
                min = j;
            }
        }

        if (i !== min) {
            // swap(nums[min], nums[i]);
            // Swap in the array
            let temp = array[min];
            array[min] = array[i];
            array[i] = temp;

            // Swap visually (bar heights)
            let bar1 = bars[min];
            let bar2 = bars[i];

            let tempHeight = bar1.style.height;
            bar1.style.height = bar2.style.height;
            bar2.style.height = tempHeight;

            // Optional: change color during swap
            // bar1.style.backgroundColor = "blue";
            // bar2.style.backgroundColor = "blue";
            bar1.style.backgroundColor = "#0B1D51";
            bar2.style.backgroundColor = "#0B1D51";
            // bar1.style.border = "1px solid black";
            // bar2.style.border = "1px solid black";

            await sleep(speed); // pause for animation

            // Reset color
            // bar1.style.backgroundColor = "#9b97c6ff";
            // bar2.style.backgroundColor = "#9b97c6ff";
            bar1.style.backgroundColor = "#0056b3";
            bar2.style.backgroundColor = "#0056b3";
        }

    }
}

// Insertion Sort with animation
async function insertionSort() {
    let bars = document.querySelectorAll(".bar");
    let size = array.length;

    for (let i = 1; i < size; i++) {
        let temp = array[i];
        let j = i - 1;

        // Highlight the current bar being inserted
        bars[i].style.backgroundColor = "blue";

        await sleep(speed);

        while (j >= 0 && array[j] > temp) {
            // Move the bar one step right
            array[j + 1] = array[j];
            bars[j + 1].style.height = bars[j].style.height;

            // Highlight bars being compared
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";

            await sleep(speed);

            // Reset color
            // bars[j].style.backgroundColor = "#9b97c6ff";
            // bars[j + 1].style.backgroundColor = "#9b97c6ff";
            bars[j].style.backgroundColor = "#0056b3";
            bars[j + 1].style.backgroundColor = "#0056b3";
            j--;
        }

        // Place temp at correct position
        array[j + 1] = temp;
        bars[j + 1].style.height = temp * 5 + "px";

        // Reset current bar color
        // bars[i].style.backgroundColor = "#9b97c6ff";
        bars[i].style.backgroundColor = "#0056b3";
    }
}

// Merge sort with animation
async function mergeSort() {
    let bars = document.querySelectorAll(".bar");
    let size = array.length;

    await mgeSort(array, 0, size - 1);

    async function mgeSort(array, low, high) {
        if (low >= high) return;
        let mid = Math.floor((low + high) / 2);
        await mgeSort(array, low, mid);  // left half
        await mgeSort(array, mid + 1, high); // right half
        await merge(array, low, mid, high);  // merging sorted halves
    }

    async function merge(array, low, mid, high) {
        let temp = []; // temporary array
        let left = low;      // starting index of left half of arr
        let right = mid + 1;   // starting index of right half of arr

        //storing elements in the temporary array in a sorted manner//

        while (left <= mid && right <= high) {
            if (array[left] <= array[right]) {
                temp.push(array[left]);
                left++;
            }
            else {
                temp.push(array[right]);
                right++;
            }
        }

        // if elements on the left half are still left
        while (left <= mid) {
            temp.push(array[left]);
            left++;
        }

        //  if elements on the right half are still left //
        while (right <= high) {
            temp.push(array[right]);
            right++;
        }

        // transfering all elements from temporary to arr //
        for (let i = low; i <= high; i++) {
            array[i] = temp[i - low];

            // visualization
            bars[i].style.height = array[i] * 5 + "px";
            bars[i].style.backgroundColor = "brown";

            await sleep(speed); // pause for animation
            // bars[i].style.backgroundColor = "#9b97c6ff"; // reset 
            bars[i].style.backgroundColor = "#0056b3";   
        }
    }

}

// Quick sort with animation
async function quickSort() {
    let bars = document.querySelectorAll(".bar");
    let size = array.length;

    await qs(array, 0, size - 1);

    async function qs(array, low, high) {
        if (low < high) {
            let pIndex = await partition(array, low, high);
            await qs(array, low, pIndex - 1);   // left half
            await qs(array, pIndex + 1, high);  // right half
        }
    }

    async function partition(array, low, high) {
        let pivot = array[low];
        let i = low;
        let j = high;

        while (i < j) {
            // find the first element greater then pivot
            while (array[i] <= pivot && i <= high - 1) {
                i++;
            }
            // find the first element smaller then pivot
            while (array[j] > pivot && j >= low + 1) {
                j--;
            }

            if (i < j) {
                // swap(array[i], array[j]);

                // visualization
                // Swap in the array
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;

                // Swap visually (bar heights)
                let bar1 = bars[i];
                let bar2 = bars[j];

                let tempHeight = bar1.style.height;
                bar1.style.height = bar2.style.height;
                bar2.style.height = tempHeight;

                // Optional: change color during swap
                bar1.style.backgroundColor = "red";
                bar2.style.backgroundColor = "red";

                await sleep(speed); // pause for animation

                // Reset color
                // bar1.style.backgroundColor = "#9b97c6ff";
                // bar2.style.backgroundColor = "#9b97c6ff";
                bar1.style.backgroundColor = "#0056b3";
                bar2.style.backgroundColor = "#0056b3";
            }



        }
        // low is pivot
        // j tell us the correct position for the pivot so swap them
        // swap(array[low], array[j]);

        // visualization
        let temp = array[low];
        array[low] = array[j];
        array[j] = temp;

        // Swap visually (bar heights)
        let bar1 = bars[low];
        let bar2 = bars[j];

        let tempHeight = bar1.style.height;
        bar1.style.height = bar2.style.height;
        bar2.style.height = tempHeight;

        // Optional: change color during swap
        bar1.style.backgroundColor = "orange";
        bar2.style.backgroundColor = "orange";

        await sleep(speed); // pause for animation

        // Reset color
        // bar1.style.backgroundColor = "#9b97c6ff";
        // bar2.style.backgroundColor = "#9b97c6ff";
        bar1.style.backgroundColor = "#0056b3";
        bar2.style.backgroundColor = "#0056b3";

        return j;
    }

}


// Highlight sorted array in green
async function highlightSorted(bars) {
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "#A72703";
        await sleep(10); // small delay for animation
    }
}


let sorted = false;
// Start sorting when start button clicked
start.addEventListener("click", async function () {
    if (sorted) return; // do nothing if already sorted
    
    start.disabled = true;  // disable start button while sorting is running
    // speedControl.disabled = true; // disable Speed slider
    speedLocked = true;

    let algoName = algo.value;

    if (algoName === "Bubble Sort") {
        console.log("Bubble Sort selected");
        await bubbleSort(); // must await async function
    }
    else if (algoName == "Selection Sort") {
        console.log("Selection Sort selected");
        await selectionSort(); // must await async function
    }
    else if (algoName == "Insertion Sort") {
        console.log("Insertion Sort selected");
        await insertionSort(); // must await async function
    }
    else if (algoName == "Merge Sort") {
        console.log("Merge Sort selected");
        await mergeSort(); // must await async function
    }
    else if (algoName == "Quick Sort") {
        console.log("Quick Sort selected");
        await quickSort(); // must await async function
    }
    else {
        console.log(algoName + " selected (not implemented yet)");
    }

    if (algoName != "Select Algorithm") {
        let bars = document.querySelectorAll(".bar");
        await highlightSorted(bars);
    }

    sorted = true; // mark as sorted
    speedControl.disabled = false; // re-enable Speed slider
});

generateArray.addEventListener("click", function () {
    start.disabled = false; // allow sorting again
    sorted = false; // reset flag when new array is generated
});


// Reset button clears everything
reset.addEventListener("click", function () {
    container.innerHTML = "";
    array.length = 0;
    algo.value = "Select Algorithm";
    arrSize.value = "Select Size";
    start.disabled = false;   // allow sorting again
    speedControl.disabled = false; //  re-enable speed slider
    sorted = false; // reset state
    speedLocked = false;
    // reseting the sorting speed and slider
    speed = 50;
    speedControl.value = 3;   // slider back to middle 50  speed
    console.log("Reset done, array cleared:", array.length);
});
