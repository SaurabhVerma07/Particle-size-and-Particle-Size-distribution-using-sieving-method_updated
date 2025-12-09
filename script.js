let ptrdish = document.querySelector(".petridish")
let chm = document.querySelector("#chemical-in-spatulla")
let smple =document.querySelector("#sample-to-petridish")
let cap = document.querySelector("#powder-cap")
let spt = document.querySelector(".spatulla")

let Lang = document.querySelector("Language-selector")


let sieveset = document.querySelector(".Sieves")
let lid = document.querySelector(".Lid")
let Mbtn = document.querySelector(".shakerbtn")
let lght = document.querySelector("#Shakerlight")
let tltsmple = document.querySelector(".tilted-samplepowder")



// Instructions Steps
let inst = document.querySelector("#text")

// Step management system
let currentExperimentStep = 0;
const experimentSteps = [
    " 1.Click on the ON button to turn on the weight machine",
    " 2.Click on the Petridish to place it on the weight machine and click Tare button to remeasure",
    " 3.Click on the cap to put it aside",
    " 4.Click on the spatula to take sample powder",
    " 5.Click on the petridish to move it to its original position",
    " 6.Click on the petridish to put the sample into the sieves",
    " 7.Click on the lid to cover the Sieve shaker machine",
    " 8.Turn on the sieve shaker machine to sieve the sample"
];

// Function to update instruction text with smooth animation
function updateInstruction(text, delay = 0) {
    setTimeout(() => {
        // Fade out animation
        inst.style.opacity = '0';
        inst.style.transform = 'translateY(-10px)';

        // Change text and fade in after a short delay
        setTimeout(() => {
            inst.innerText = text;
            inst.style.opacity = '1';
            inst.style.transform = 'translateY(0)';
        }, 300);
    }, delay);
}

// Function to move to next step
function nextStep() {
    if (currentExperimentStep < experimentSteps.length) {
        updateInstruction(experimentSteps[currentExperimentStep]);
        currentExperimentStep++;
    }
}

// Initialize with first step
window.addEventListener('load', function() {
    setTimeout(() => {
        nextStep();
    }, 500);
});
  


// --------------------------------------------step 1-----------------------------
 // Weight machine functionality ---------------------------------------------------------------------------------------------------
    const onButton = document.querySelector('#On-button');
    const tareButton = document.querySelector('#Tare-button');
    const display = document.querySelector('#display');
    let isOn = false;
    let currentWeight = 0;
    let sampleWeight = 0;
    let stabilizing = false;
    let stabilizeTimer = null;
    let blinkTimer = null;
    let currentStep = 0
    // Function to format weight with 2 decimal places
    function formatWeight(weight) {
        // Format to 2 decimal places
        return weight.toFixed(2);
    }

    // Function to display weight with optional fluctuation
    function displayWeight(useFluctuation = false) {
        if (!isOn || !stabilizing) return;

        if (useFluctuation) {
            // Random fluctuation around the target weight
            const fluctuation = (Math.random() - 0.5) * 0.05;
            const displayWeight = sampleWeight + fluctuation;
            display.value = formatWeight(displayWeight);

            // Continue stabilizing or finish
            const stabilizationTime = 2000 + Math.random() * 1000; // 2-3 seconds
            stabilizeTimer = setTimeout(() => {
                stabilizing = false;
                currentWeight = sampleWeight;
                display.value = formatWeight(currentWeight);
                // Blink to indicate stabilization complete
                blinkDisplay();
            }, stabilizationTime);
        } else {
            // Just display the exact weight from the slider
            currentWeight = sampleWeight;
            display.value = formatWeight(currentWeight);
        }
    }
    // Function to blink the display to indicate stabilization
    function blinkDisplay() {
        let blinkCount = 0;
        const maxBlinks = 3;

        blinkTimer = setInterval(() => {
            if (blinkCount >= maxBlinks * 2) {
                clearInterval(blinkTimer);
                display.style.color = '';
                return;
            }

            display.style.color = blinkCount % 2 === 0 ? '#333' : '#00cc00';
            blinkCount++;
        }, 200);
    }
    
    // ON button functionality
    onButton.addEventListener('click', function() {
        if (currentExperimentStep !== 1) {
            alert('Please follow the steps in order!');
            return;
        }

        isOn = !isOn;

        if (isOn) {
            // Turn on the display
            onButton.textContent = 'OFF';
            onButton.style.backgroundColor = 'green';

            // Simple blinking effect with just 00.00
            let blinkCount = 0;
            let displayVisible = true;

            // Start with display on
            display.value = '00.00';

            // Create blinking effect
            const blinkTimer = setInterval(() => {
                displayVisible = !displayVisible;
                display.value = displayVisible ? '00.00' : '';

                blinkCount++;

                // Stop after 5 blinks (2.5 cycles)
                if (blinkCount >= 5) {
                    clearInterval(blinkTimer);
                    display.value = '00.00';
                    currentWeight = 0;

                    // Move to next step
                    updateInstruction("Weight machine is ON!", 500);
                    setTimeout(() => {
                        nextStep(); // Step 2
                    }, 2000);
                }
            }, 300); // Faster blink rate

        } else {
            // Turn off the display
            display.value = '';
            onButton.textContent = 'ON';
            onButton.style.backgroundColor = 'red';

            // Clear any ongoing timers
            if (stabilizeTimer) clearTimeout(stabilizeTimer);
            if (blinkTimer) clearInterval(blinkTimer);
            stabilizing = false;
        }
    });
    
    
    // Tare button functionality
    tareButton.addEventListener('click', function() {
        if (!isOn) return;

        // Step 2: Tare after placing petridish
        if (currentExperimentStep === 2 && petridishStep2Done) {
            // Visual feedback
            tareButton.style.backgroundColor = 'green';
            setTimeout(() => {
                tareButton.style.backgroundColor = 'green';
            }, 200);

            // Simulate taring process
            display.value = '----';

            setTimeout(() => {
                currentWeight = 0;
                display.value = formatWeight(currentWeight);
                updateInstruction("Weight reset to 00.00");

                setTimeout(() => {
                    nextStep(); // Step 3
                }, 1500);
            }, 800);
            return;
        }

        // Default tare functionality for other cases
        if (!isOn) {
            return;
        } else {
            // Visual feedback for other uses
            tareButton.style.backgroundColor = 'green';
            setTimeout(() => {
                tareButton.style.backgroundColor = 'green';
            }, 200);

            display.value = '----';
            setTimeout(() => {
                currentWeight = 0;
                display.value = formatWeight(currentWeight);
            }, 800);
        }
    });

//  POSITIONING OF PETRIDISH TO THE WEIGHT SCALE

let ptrdishoriginalpos = true;
let petridishStep2Done = false;
let petridishStep5Done = false;
let petridishStep8Done = false;
const originalLeft = ptrdish.style.left || "50%";   // Set correct original values here
const originalTop = ptrdish.style.top || "80%";     // Update based on your layout

ptrdish.addEventListener("click", function () {
    if (!isOn) {
        alert("Please turn on the weight machine first!");
        return;
    }

    // Step 2: Place petridish on weight machine
    if (currentExperimentStep === 2 && ptrdishoriginalpos && !petridishStep2Done) {
        // Move to weight machine
        ptrdish.style.left = "22.5%";
        ptrdish.style.top = "83%";
        ptrdish.style.transform = "none";

        display.value = '----';
        updateInstruction("Petridish placed on the weight machine");

        setTimeout(() => {
            display.value = '10.00';
            updateInstruction("Now click the Tare button to reset the weight", 1000);
        }, 2000);

        ptrdishoriginalpos = false;
        petridishStep2Done = true;
        return;
    }

    // Step 5: Return petridish to original position
    if (currentExperimentStep === 5 && !ptrdishoriginalpos && !petridishStep5Done) {
        ptrdish.style.left = "40%"
        ptrdish.style.top = "87%"
        ptrdish.style.transform = "none";

        smple.style.opacity = 1;
        smple.style.left = "41%";
        smple.style.top = "86%"

        updateInstruction("Petridish returned to original position");
        setTimeout(() => {
            nextStep(); // Step 6
        }, 2000);

        ptrdishoriginalpos = true;
        petridishStep5Done = true;
        return;
    }

    // transform: translate(285%,-645%) rotate(70deg);

    // Step 6: Pour sample into sieves
    if (currentExperimentStep === 6 && !petridishStep8Done) {


        ptrdish.style.top = "40%"
        ptrdish.style.left = "65%"
        smple.style.opacity = 1
        smple.style.top = "41%"
        smple.style.left = "67%"

        setTimeout(function(){
            ptrdish.style.rotate = "45deg"
            smple.style.rotate = "45deg"
            updateInstruction("Pouring sample into the sieves...");

            setTimeout(function(){
                tltsmple.style.opacity = 1
                smple.style.opacity = 0

                setTimeout(function(){
                    tltsmple.style.opacity = 0

                    setTimeout(function(){
                        ptrdish.style.rotate = "0deg"

                        setTimeout(function(){
                            ptrdish.style.left="40%"
                            ptrdish.style.top = "87%"
                            updateInstruction("Sample poured into sieves successfully!");

                            setTimeout(() => {
                                nextStep(); // Step 7
                            }, 2000);
                        },1000)
                    },1000)
                },1000)
            },1300)

            setTimeout(() => {
                display.value = '100.00';
            }, 3000);
        },1500)

        petridishStep8Done = true;
        return;
    }
});


// Sieves are already in the sieve shaker machine - no click needed

  
// SPATULLA TAKE THE SAMPLE IN THE CHEMICAL POWDER TO THE WEIGHT MACHINE
let spatulaUsed = false;
spt.addEventListener("click",function(){
     if (!isOn) {
            alert('Please turn on the weight machine first!');
            return;
        }

     if (currentExperimentStep !== 4) {
         alert('Please follow the steps in order!');
         return;
     }

     if (!spatulaUsed) {
        updateInstruction("Taking sample from the chemical powder using Spatula to the petridish");
        spt.style.transform = "translate(165%,-1250%) rotate(-60deg)"

       setTimeout(function(){
        spt.style.transfrom = "translate(100%,-1100%) rotate(-60deg)"
           setTimeout(function(){
        spt.style.top ="110%"
        chm.style.opacity = 1
        setTimeout(function(){
            chm.style.top= "68%"
            spt.style.top = "95%"
            setTimeout(function(){
                chm.style.left= "25%"
                spt.style.left = "2%"
                setTimeout(function(){
                    chm.style.top = "80%"
                    setTimeout(function(){
                         updateInstruction("Sample is put in the petridish");
                        chm.style.opacity = 0
                        smple.style.opacity = 1

                        // Simulate weighing process
                        updateInstruction("Weighing the sample", 500);
                        display.value = '----';

                        // After a delay, show 100g
                        setTimeout(() => {
                            display.value = '100.00';
                            updateInstruction("Sample is 100GM");

                            setTimeout(function(){
                                spt.style.top = "75%"
                                spt.style.left = "18%"
                                spt.style.rotate = "58deg"

                                setTimeout(() => {
                                    nextStep(); // Step 5
                                }, 1500);
                            },1000)
                        }, 2000);
                    },1200)
                       },1500)
                   },1000)
                 },1000)
           },1000)
       },1000)

       spatulaUsed = true;
     }
})




//  REMOVING CAP FOR TAKING SAMPLE TO PETRIDISH BY SPATULLA

let capRemoved = false;
cap.addEventListener("click",function(){
     if (!isOn) {
            alert('Please turn on the weight machine first!');
            return;
        }

     if (currentExperimentStep !== 3) {
         alert('Please follow the steps in order!');
         return;
     }

     if (!capRemoved) {
        cap.style.transform = "translate(-10%,-150%)"
        updateInstruction("Cap is removed");

        setTimeout(function(){
            cap.style.top = "93%"
            cap.style.left = "51%"

            setTimeout(() => {
                nextStep(); // Step 4
            }, 1000);
        },1000)

        capRemoved = true;
     }
})




// MOVING LID TO THE SIEVEHSAKER MACHINE TO COVER THE MACHINE

let lidPlaced = false;
lid.addEventListener("click",function(){
     if (!isOn) {
            alert('Please turn on the weight machine first!');
            return;
        }

     if (currentExperimentStep !== 7) {
         alert('Please follow the steps in order!');
         return;
     }

     if (!lidPlaced) {
        lid.style.transform = "translate(-145%,-1014%)";
        updateInstruction("Lid is placed on the sieve shaker machine");

        setTimeout(() => {
            nextStep(); // Step 8
        }, 2000);

        lidPlaced = true;
     }
})

// MACHINE BUTTON FUNCTIONALITY TO ON THE MACHINE

let flag = false

Mbtn.addEventListener("click",function(){
    if(flag=true){
        lght.style.backgroundColor = "red"
        flag = false        
    }
})

const mchn = document.querySelector(".Sieve-shaker-machine_basic")
let machineUsed = false;

mchn.addEventListener("click",function(){
     if (!isOn) {
         alert("Please turn on the weight machine first!");
         return;
     }

     if (currentExperimentStep !== 8) {
         alert('Please follow the steps in order!');
         return;
     }

     if (!machineUsed) {
         updateInstruction("Starting sieve shaker machine...");
         lght.style.backgroundColor = "red";

         let counter = 0;
         const maxShake = 50;
         const interval = setInterval(() =>{
            const offset = (counter % 2 == 0) ? 5: -5;
            mchn.style.transform = `translateX(${offset}px)`;
            counter++;

            if (counter >= maxShake){
               clearInterval(interval);
               mchn.style.transform = "translateX(0)";
               lght.style.backgroundColor = "black";

               updateInstruction("Sieving complete! Experiment finished successfully!");

               setTimeout(() => {
                   updateInstruction("Preparing results...");

                   // Show results card after 2 seconds
                   setTimeout(() => {
                       showResults();
                   }, 2000);
               }, 2000);
            }
         },50)

         machineUsed = true;
     }
})

// Results Card Functionality
const resultsOverlay = document.getElementById('resultsOverlay');
const closeResultsBtn = document.getElementById('closeResults');
const restartBtn = document.getElementById('restartExperiment');
const downloadBtn = document.getElementById('downloadResults');

let barChartInstance = null;
let lineChartInstance = null;

function showResults() {
    resultsOverlay.classList.add('show');

    // Create charts after a short delay to ensure canvas is rendered
    setTimeout(() => {
        createCharts();
    }, 300);
}

function hideResults() {
    resultsOverlay.classList.remove('show');

    // Destroy charts when closing
    if (barChartInstance) {
        barChartInstance.destroy();
        barChartInstance = null;
    }
    if (lineChartInstance) {
        lineChartInstance.destroy();
        lineChartInstance = null;
    }
}

function createCharts() {
    // Destroy existing charts if they exist
    if (barChartInstance) barChartInstance.destroy();
    if (lineChartInstance) lineChartInstance.destroy();

    // Data for particle size distribution
    const sieveSizes = ['500μm', '250μm', '125μm', '63μm', '<63μm'];
    const percentRetained = [5.2, 18.5, 35.8, 28.3, 12.2];
    const cumulativePercent = [5.2, 23.7, 59.5, 87.8, 100];

    // Bar Chart - Particle Size Distribution
    const barCtx = document.getElementById('barChart').getContext('2d');
    barChartInstance = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: sieveSizes,
            datasets: [{
                label: 'Percentage Retained (%)',
                data: percentRetained,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: {
                        color: 'white',
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 40,
                    ticks: {
                        color: 'white',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });

    // Line Chart - Cumulative Distribution
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    lineChartInstance = new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: sieveSizes,
            datasets: [{
                label: 'Cumulative Percentage (%)',
                data: cumulativePercent,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointBorderColor: 'white',
                pointBorderWidth: 2,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: {
                        color: 'white',
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: 'white',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

closeResultsBtn.addEventListener('click', hideResults);

restartBtn.addEventListener('click', function() {
    // Reload the page to restart the experiment
    location.reload();
});

downloadBtn.addEventListener('click', function() {
    // Create a simple text report
    const report = `
PARTICLE SIZE DISTRIBUTION - SIEVING METHOD
Experiment Report
==========================================

Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

EXPERIMENTAL DATA:
- Initial Sample Weight: 100.00 g
- Petridish Weight: 10.00 g
- Sample in Sieves: 100.00 g
- Sieving Duration: 2.5 seconds

PARTICLE SIZE DISTRIBUTION ANALYSIS:
┌─────────────┬──────────────────┬─────────────┬──────────────────┐
│ Sieve Size  │ Weight Retained  │ % Retained  │ % Cumulative     │
├─────────────┼──────────────────┼─────────────┼──────────────────┤
│ 500 μm      │ 5.2 g            │ 5.2%        │ 5.2%             │
│ 250 μm      │ 18.5 g           │ 18.5%       │ 23.7%            │
│ 125 μm      │ 35.8 g           │ 35.8%       │ 59.5%            │
│ 63 μm       │ 28.3 g           │ 28.3%       │ 87.8%            │
│ <63 μm (Pan)│ 12.2 g           │ 12.2%       │ 100%             │
└─────────────┴──────────────────┴─────────────┴──────────────────┘

PARTICLE QUALITY ANALYSIS:
- Median Particle Size: ~125 μm
- Dominant Size Range: 125 μm (35.8% of sample)
- Fine Particles (<63 μm): 12.2%
- Coarse Particles (>250 μm): 23.7%
- Particle Distribution: Well-distributed, suitable for pharmaceutical use

STEPS COMPLETED:
✓ Step 1: Weight machine turned on
✓ Step 2: Petridish placed and tared
✓ Step 3: Cap removed from sample container
✓ Step 4: Sample collected using spatula (100g)
✓ Step 5: Petridish returned to original position
✓ Step 6: Sample poured into sieves
✓ Step 7: Lid placed on sieve shaker machine
✓ Step 8: Sieve shaker machine operated successfully

OBSERVATIONS:
The sample powder has been successfully sieved through the sieve set.
The particles have been separated based on their size distribution.
The majority of particles (35.8%) fall within the 125μm sieve size,
indicating a medium particle size distribution. The cumulative analysis
shows that 87.8% of particles are smaller than 63μm, suggesting good
powder fineness suitable for pharmaceutical applications.

The particle size distribution shows:
- Good uniformity with the dominant fraction at 125μm
- Minimal coarse particles (5.2% at 500μm)
- Acceptable fine particle content (12.2% below 63μm)
- Smooth cumulative distribution curve indicating consistent quality

CONCLUSION:
The particle size distribution experiment using the sieving method
has been completed successfully. The analysis reveals a well-distributed
particle size range with the median particle size around 125μm. All
equipment was properly calibrated and the procedure was followed correctly.
The results indicate the powder meets pharmaceutical quality standards
for particle size distribution with optimal characteristics for drug
formulation and bioavailability.

==========================================
End of Report
    `;

    // Create a blob and download
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Sieving_Experiment_Report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
});

// Close results when clicking outside the card
resultsOverlay.addEventListener('click', function(e) {
    if (e.target === resultsOverlay) {
        hideResults();
    }
});
