const addVehicleButton = document.getElementById("addVehicleButton");
const modal = document.getElementById("vehicleModal");
const closeModal = document.getElementsByClassName("close")[0];
const vehicleForm = document.getElementById("vehicleForm");
const availableVehiclesDropdown = document.getElementById("availableVehicles");
const rentedVehiclesDropdown = document.getElementById("rentedVehicles");
const rentalList = document.getElementById("rentalList");

let vehicles = [];

// Open Add Vehicle Modal
addVehicleButton.onclick = function() {
    modal.style.display = "block";
};

// Close Modal
closeModal.onclick = function() {
    modal.style.display = "none";
};

// Close Modal on Click Outside
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Add Vehicle to List
vehicleForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const vehicleType = document.getElementById("vehicleType").value;
    const vehicleName = document.getElementById("vehicleName").value;
    const vehicleId = document.getElementById("vehicleId").value;
    const vehicleNumber = document.getElementById("vehicleNumber").value;

    const newVehicle = { type: vehicleType, name: vehicleName, id: vehicleId, number: vehicleNumber, rented: false };
    vehicles.push(newVehicle);

    const option = document.createElement("option");
    option.value = vehicleId;
    option.text = `${vehicleType} - ${vehicleName} (${vehicleNumber})`;
    availableVehiclesDropdown.appendChild(option);

    modal.style.display = "none";
    vehicleForm.reset();
});

// Handle Rent and Return Actions
document.getElementById("rentalForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const selectedVehicleId = availableVehiclesDropdown.value;
    const rentedVehicleId = rentedVehiclesDropdown.value;
    const vehicle = vehicles.find(v => v.id === selectedVehicleId || v.id === rentedVehicleId);

    if (!vehicle) return;

    const rentalItem = document.createElement("li");
    const currentDateTime = new Date().toLocaleString();

    if (selectedVehicleId && !vehicle.rented) {
        vehicle.rented = true;
        rentalItem.innerHTML = `${vehicle.type} ${vehicle.name} (${vehicle.number}) rented.<br>Rental Date: ${currentDateTime}`;
        rentedVehiclesDropdown.appendChild(availableVehiclesDropdown.querySelector(`option[value="${vehicle.id}"]`));
        availableVehiclesDropdown.value = ""; // Reset selection
    } else if (rentedVehicleId && vehicle.rented) {
        vehicle.rented = false;
        rentalItem.innerHTML = `${vehicle.type} ${vehicle.name} (${vehicle.number}) returned.<br>Return Date: ${currentDateTime}`;
        availableVehiclesDropdown.appendChild(rentedVehiclesDropdown.querySelector(`option[value="${vehicle.id}"]`));
        rentedVehiclesDropdown.value = ""; // Reset selection
    }

    rentalList.appendChild(rentalItem);
});
