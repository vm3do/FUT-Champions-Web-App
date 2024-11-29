const formationSelect = document.querySelector('select');
const container1 = document.querySelector('.container1');
const container2 = document.querySelector('.container2');

formationSelect.addEventListener('change', (e) => {
    const selectedFormation = e.target.value;
    if ( selectedFormation === "4-4-2") {
        container1.classList.add('hidden')
        container2.classList.remove('hidden')
    } else {
        container2.classList.add('hidden')
        container1.classList.remove('hidden')
    }
});

let button = document.querySelector("#button")

function formValidation() {
    // Declare variables first
    let stats = document.querySelector('.stats');
    let inputs = stats.querySelectorAll('input');
    let button = document.querySelector("#button");
    
    // Add event listener to the button
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission
        
        // Validation logic
        inputs.forEach((input) => {
            let value = Number(input.value); // Convert input value to a number
            if (value < 0 || value > 100) {
                alert('Values must be between 0 and 100!'); // Alert user if out of range
            }
        });
    });
}


document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission for validation

    const nameInput = document.querySelector('input[placeholder="Name"]');
    const picLinkInput = document.querySelector('input[placeholder="Pic Link"]');
    const flagLinkInput = document.querySelector('input[placeholder="Flag Link"]');
    const logoLinkInput = document.querySelector('input[placeholder="Logo Link"]');
    const numberInputs = document.querySelectorAll('input[type="number"]');

    let isValid = true;
    let errorMessage = '';

    // Name validation: Ensure only alphabetic characters
    if (!/^[a-zA-Z\s]+$/.test(nameInput.value)) {
        isValid = false;
        errorMessage += 'Name must contain only letters.\n';
    }

    // Link validation: Ensure it's a valid URL
    const urlPattern = /^(https?:\/\/)?([\w\d-]+\.)+[\w]{2,}(\/.+)?$/;
    if (!urlPattern.test(picLinkInput.value) || 
        !urlPattern.test(flagLinkInput.value) || 
        !urlPattern.test(logoLinkInput.value)) {
        isValid = false;
        errorMessage += 'One or more links are invalid.\n';
    }

    // Number validation: Ensure values are between 0 and 100
    numberInputs.forEach(input => {
        const value = Number(input.value);
        if (value < 0 || value > 100) {
            isValid = false;
            errorMessage += `The value for ${input.placeholder} must be between 0 and 100.\n`;
        }
    });

    // Show errors or submit the form
    if (!isValid) {
        alert(errorMessage);
    } else {
        alert('Form is valid!');
        // You can proceed with form submission
        this.submit();
    }
});

