// Array untuk menyimpan item to-do, diambil dari localStorage jika tersedia, atau diinisialisasi sebagai array kosong
const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

// Event listener untuk tombol "Add"
document.querySelector("#enter").addEventListener("click", () => {
  // Dapatkan nilai dari input field dan tambahkan item baru
  const item = document.querySelector("#item");
  createItem(item);
});

// Event listener untuk penekanan tombol "Enter" pada input field
document.querySelector("#item").addEventListener("keypress", (e) => {
  // Jika tombol yang ditekan adalah "Enter," dapatkan nilai dari input field dan tambahkan item baru
  if (e.key === "Enter") {
    const item = document.querySelector("#item");
    createItem(item);
  }
});

// Fungsi untuk menampilkan item-item to-do list di halaman web
function displayItems() {
  let items = "";
  // Iterasi melalui itemsArray dan hasilkan HTML untuk setiap item
  for (let i = 0; i < itemsArray.length; i++) {
    items += `<div class="item">
      <div class="input-controller">
        <div class="button-container">
          <i class="fa-solid fa-check deleteBtn"></i>
          <i class="fa-solid fa-pencil editBtn"></i>
        </div>
        <textarea disabled>${itemsArray[i]}</textarea>
      </div>
      <div class="update-controller">
        <button class="cancelBtn">Cancel</button>
        <button class="saveBtn">Save</button>
      </div>
    </div>`;
  }
  // Atur innerHTML dari kontainer to-do list dengan HTML yang dihasilkan
  document.querySelector(".to-do-list").innerHTML = items;
  // Aktifkan event listener untuk aksi hapus, edit, simpan, dan batal
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
}

// Fungsi untuk mengaktifkan event listener hapus item
function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((dB, i) => {
    // Tambahkan event listener klik pada setiap tombol hapus
    dB.addEventListener("click", () => {
      deleteItem(i);
    });
  });
}

// Fungsi untuk mengaktifkan event listener edit item
function activateEditListeners() {
  const editBtn = document.querySelectorAll(".editBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  editBtn.forEach((eB, i) => {
    // Tambahkan event listener klik pada setiap tombol edit
    eB.addEventListener("click", () => {
      updateController[i].style.display = "block";
      inputs[i].disabled = false;
    });
  });
}

// Fungsi untuk mengaktifkan event listener simpan item
function activateSaveListeners() {
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  saveBtn.forEach((sB, i) => {
    // Tambahkan event listener klik pada setiap tombol simpan
    sB.addEventListener("click", () => {
      updateItem(inputs[i].value, i);
    });
  });
}

// Fungsi untuk mengaktifkan event listener batal item
function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  cancelBtn.forEach((cB, i) => {
    // Tambahkan event listener klik pada setiap tombol batal
    cB.addEventListener("click", () => {
      updateController[i].style.display = "none";
      inputs[i].disabled = true;
      inputs[i].style.border = "none";
    });
  });
}

// Fungsi untuk menambahkan item baru ke dalam itemsArray, menyimpannya di localStorage, dan me-reload halaman
function createItem(item) {
  itemsArray.push(item.value);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  location.reload();
}

// Fungsi untuk menghapus item dari itemsArray, menyimpan perubahan di localStorage, dan me-reload halaman
function deleteItem(i) {
  itemsArray.splice(i, 1);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  location.reload(); 
}

// Fungsi untuk memperbarui item dalam itemsArray, menyimpan perubahan di localStorage, dan me-reload halaman
function updateItem(text, i) {
  itemsArray[i] = text;
  localStorage.setItem('items', JSON.stringify(itemsArray));
  location.reload();
}

// Event handler yang dipanggil ketika halaman telah selesai dimuat, untuk menampilkan item-item pada awalnya
window.onload = function() {
  displayItems();
};
