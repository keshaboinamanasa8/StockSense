/* =========================
   SMARTSTOCK INVENTORY SYSTEM
   ========================= */

let products = JSON.parse(localStorage.getItem("products")) || [];
let receipts = JSON.parse(localStorage.getItem("receipts")) || [];
let deliveries = JSON.parse(localStorage.getItem("deliveries")) || [];
let transfers = JSON.parse(localStorage.getItem("transfers")) || [];
let adjustments = JSON.parse(localStorage.getItem("adjustments")) || [];
let ledger = JSON.parse(localStorage.getItem("ledger")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];


/* =========================
   DEMO ACCOUNT
   ========================= */

if (!users.some(u => u.email === "admin@smartstock.com")) {

    users.push({
        name: "Admin",
        email: "admin@smartstock.com",
        password: "admin123",
        role: "Inventory Manager"
    });

    localStorage.setItem("users", JSON.stringify(users));
}


/* =========================
   DEMO DATA
   ========================= */

if (products.length === 0) {

    products = [
        {
            id: 1,
            name: "Steel Rods",
            sku: "STL001",
            category: "Construction",
            uom: "Kg",
            stock: 127,
            reorder: 30,
            location: "Main Warehouse"
        },
        {
            id: 2,
            name: "Cement Bags",
            sku: "CMT001",
            category: "Construction",
            uom: "Pieces",
            stock: 18,
            reorder: 25,
            location: "Main Warehouse"
        },
        {
            id: 3,
            name: "Safety Helmets",
            sku: "SH001",
            category: "Safety",
            uom: "Pieces",
            stock: 5,
            reorder: 10,
            location: "Finished Goods"
        },
        {
            id: 4,
            name: "PVC Pipes",
            sku: "PVC001",
            category: "Plumbing",
            uom: "Pieces",
            stock: 80,
            reorder: 20,
            location: "Production Rack"
        }
    ];

    saveData();
}


/* =========================
   LOGIN
   ========================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const user = users.find(
            u => u.email === email && u.password === password
        );

        if (!user) {
            alert("Invalid email or password.");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));

        window.location.href = "dashboard.html";
    });
}


/* =========================
   SIGNUP
   ========================= */

function showSignup() {
    document.getElementById("signupModal").style.display = "flex";
}

function signup() {

    const name =
        document.getElementById("signupName").value.trim();

    const email =
        document.getElementById("signupEmail").value.trim();

    const password =
        document.getElementById("signupPassword").value;

    const role =
        document.getElementById("signupRole").value;

    if (!name || !email || !password) {
        alert("Please fill all fields.");
        return;
    }

    if (users.some(u => u.email === email)) {
        alert("Email already registered.");
        return;
    }

    users.push({
        name,
        email,
        password,
        role
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");

    closeModal("signupModal");
}


/* =========================
   PASSWORD RESET
   ========================= */

let generatedOTP = "";

function showReset() {
    document.getElementById("resetModal").style.display = "flex";
}

function sendOTP() {

    const email =
        document.getElementById("resetEmail").value.trim();

    const user = users.find(u => u.email === email);

    if (!user) {
        alert("Email not registered.");
        return;
    }

    generatedOTP =
        Math.floor(100000 + Math.random() * 900000).toString();

    alert("Demo OTP: " + generatedOTP);
}

function resetPassword() {

    const email =
        document.getElementById("resetEmail").value.trim();

    const otp =
        document.getElementById("otp").value.trim();

    const newPassword =
        document.getElementById("newPassword").value;

    if (otp !== generatedOTP) {
        alert("Invalid OTP.");
        return;
    }

    const user = users.find(u => u.email === email);

    if (!user) return;

    user.password = newPassword;

    localStorage.setItem("users", JSON.stringify(users));

    alert("Password reset successfully.");

    closeModal("resetModal");
}


/* =========================
   MODALS
   ========================= */

function openModal(id) {

    updateProductDropdowns();

    document.getElementById(id).style.display = "flex";
}

function closeModal(id) {

    document.getElementById(id).style.display = "none";
}


/* =========================
   NAVIGATION
   ========================= */

function showSection(sectionId, element) {

    document.querySelectorAll(".section")
        .forEach(section => {
            section.classList.remove("active-section");
        });

    const section =
        document.getElementById(sectionId);

    if (section) {
        section.classList.add("active-section");
    }

    document.querySelectorAll(".nav-link")
        .forEach(link => {
            link.classList.remove("active");
        });

    if (element) {
        element.classList.add("active");
    }

    const titles = {
        dashboard: "Dashboard",
        products: "Products",
        receipts: "Receipts",
        deliveries: "Delivery Orders",
        transfers: "Internal Transfers",
        adjustments: "Inventory Adjustments",
        ledger: "Stock Ledger",
        warehouse: "Warehouse",
        profile: "My Profile"
    };

    document.getElementById("pageTitle").textContent =
        titles[sectionId] || "SmartStock";

    if (sectionId === "products") renderProducts();
    if (sectionId === "receipts") renderReceipts();
    if (sectionId === "deliveries") renderDeliveries();
    if (sectionId === "transfers") renderTransfers();
    if (sectionId === "adjustments") renderAdjustments();
    if (sectionId === "ledger") renderLedger();
}


/* =========================
   ADD PRODUCT
   ========================= */

function addProduct() {

    const name =
        document.getElementById("productName").value.trim();

    const sku =
        document.getElementById("productSKU").value.trim();

    const category =
        document.getElementById("productCategory").value.trim();

    const uom =
        document.getElementById("productUom").value;

    const stock =
        Number(document.getElementById("productStock").value) || 0;

    const reorder =
        Number(document.getElementById("productReorder").value) || 0;

    const location =
        document.getElementById("productLocation").value;

    if (!name || !sku || !category) {
        alert("Please fill all required fields.");
        return;
    }

    if (products.some(p => p.sku === sku)) {
        alert("SKU already exists.");
        return;
    }

    const product = {
        id: Date.now(),
        name,
        sku,
        category,
        uom,
        stock,
        reorder,
        location
    };

    products.push(product);

    addLedger(
        product,
        "Initial Stock",
        stock,
        stock,
        location
    );

    saveData();

    alert("Product added successfully!");

    closeModal("productModal");

    clearProductForm();

    updateDashboard();
    renderProducts();
}


/* =========================
   RECEIPT
   ========================= */

function addReceipt() {

    const supplier =
        document.getElementById("supplier").value.trim();

    const productId =
        Number(document.getElementById("receiptProduct").value);

    const quantity =
        Number(document.getElementById("receiptQuantity").value);

    const product =
        products.find(p => p.id === productId);

    if (!supplier || !product || quantity <= 0) {
        alert("Enter valid receipt details.");
        return;
    }

    product.stock += quantity;

    const receipt = {
        id: "REC" + Date.now(),
        supplier,
        product: product.name,
        quantity,
        status: "Done",
        date: currentDate()
    };

    receipts.unshift(receipt);

    addLedger(
        product,
        "Receipt",
        quantity,
        product.stock,
        product.location
    );

    saveData();

    alert(quantity + " " + product.uom +
        " received successfully.");

    closeModal("receiptModal");

    updateDashboard();
}


/* =========================
   DELIVERY
   ========================= */

function addDelivery() {

    const customer =
        document.getElementById("customer").value.trim();

    const productId =
        Number(document.getElementById("deliveryProduct").value);

    const quantity =
        Number(document.getElementById("deliveryQuantity").value);

    const product =
        products.find(p => p.id === productId);

    if (!customer || !product || quantity <= 0) {
        alert("Enter valid delivery details.");
        return;
    }

    if (quantity > product.stock) {
        alert("Insufficient stock.");
        return;
    }

    product.stock -= quantity;

    const delivery = {
        id: "DEL" + Date.now(),
        customer,
        product: product.name,
        quantity,
        status: "Done",
        date: currentDate()
    };

    deliveries.unshift(delivery);

    addLedger(
        product,
        "Delivery",
        -quantity,
        product.stock,
        product.location
    );

    saveData();

    alert("Delivery completed successfully.");

    closeModal("deliveryModal");

    updateDashboard();
}


/* =========================
   TRANSFER
   ========================= */

function addTransfer() {

    const productId =
        Number(document.getElementById("transferProduct").value);

    const quantity =
        Number(document.getElementById("transferQuantity").value);

    const from =
        document.getElementById("transferFrom").value;

    const to =
        document.getElementById("transferTo").value;

    const product =
        products.find(p => p.id === productId);

    if (!product || quantity <= 0) {
        alert("Enter valid transfer details.");
        return;
    }

    if (from === to) {
        alert("From and To locations must be different.");
        return;
    }

    if (quantity > product.stock) {
        alert("Insufficient stock.");
        return;
    }

    product.location = to;

    const transfer = {
        id: "TRF" + Date.now(),
        product: product.name,
        quantity,
        from,
        to,
        date: currentDate()
    };

    transfers.unshift(transfer);

    addLedger(
        product,
        "Transfer",
        0,
        product.stock,
        to
    );

    saveData();

    alert("Stock transferred successfully.");

    closeModal("transferModal");

    updateDashboard();
}


/* =========================
   ADJUSTMENT
   ========================= */

function addAdjustment() {

    const productId =
        Number(document.getElementById("adjustmentProduct").value);

    const physical =
        Number(document.getElementById("physicalStock").value);

    const product =
        products.find(p => p.id === productId);

    if (!product || physical < 0) {
        alert("Enter valid adjustment details.");
        return;
    }

    const recorded = product.stock;

    const difference = physical - recorded;

    product.stock = physical;

    const adjustment = {
        id: "ADJ" + Date.now(),
        product: product.name,
        recorded,
        physical,
        difference,
        date: currentDate()
    };

    adjustments.unshift(adjustment);

    addLedger(
        product,
        "Adjustment",
        difference,
        physical,
        product.location
    );

    saveData();

    alert("Inventory adjusted successfully.");

    closeModal("adjustmentModal");

    updateDashboard();
}


/* =========================
   LEDGER
   ========================= */

function addLedger(
    product,
    operation,
    quantity,
    balance,
    location
) {

    ledger.unshift({
        id: Date.now(),
        date: currentDate(),
        product: product.name,
        operation,
        quantity,
        balance,
        location
    });
}


/* =========================
   RENDER PRODUCTS
   ========================= */

function renderProducts() {

    const table =
        document.getElementById("productTable");

    if (!table) return;

    const search =
        document.getElementById("productSearch")?.value
        .toLowerCase() || "";

    const category =
        document.getElementById("categoryFilter")?.value || "";

    const stockFilter =
        document.getElementById("stockFilter")?.value || "";

    let filtered = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(search) ||
            product.sku.toLowerCase().includes(search);

        const matchesCategory =
            !category || product.category === category;

        let matchesStock = true;

        if (stockFilter === "available") {
            matchesStock = product.stock > product.reorder;
        }

        if (stockFilter === "low") {
            matchesStock =
                product.stock > 0 &&
                product.stock <= product.reorder;
        }

        if (stockFilter === "out") {
            matchesStock = product.stock === 0;
        }

        return matchesSearch &&
               matchesCategory &&
               matchesStock;
    });

    table.innerHTML = "";

    filtered.forEach(product => {

        let statusClass = "available";
        let statusText = "Available";

        if (product.stock === 0) {
            statusClass = "out";
            statusText = "Out of Stock";
        }
        else if (product.stock <= product.reorder) {
            statusClass = "low";
            statusText = "Low Stock";
        }

        table.innerHTML += `
            <tr>
                <td><strong>${product.name}</strong></td>
                <td>${product.sku}</td>
                <td>${product.category}</td>
                <td>${product.uom}</td>
                <td>
                    <span class="status ${statusClass}">
                        ${product.stock} ${product.uom}
                    </span>
                </td>
                <td>${product.reorder}</td>
                <td>${product.location}</td>
                <td>
                    <button class="secondary-btn"
                        onclick="deleteProduct(${product.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });

    updateCategoryFilter();
}


/* =========================
   DELETE PRODUCT
   ========================= */

function deleteProduct(id) {

    const product =
        products.find(p => p.id === id);

    if (!product) return;

    if (!confirm(
        "Delete " + product.name + "?"
    )) return;

    products =
        products.filter(p => p.id !== id);

    saveData();

    renderProducts();
    updateDashboard();
}


/* =========================
   RECEIPT TABLE
   ========================= */

function renderReceipts() {

    const table =
        document.getElementById("receiptTable");

    if (!table) return;

    table.innerHTML = "";

    receipts.forEach(r => {

        table.innerHTML += `
            <tr>
                <td>${r.id}</td>
                <td>${r.supplier}</td>
                <td>${r.product}</td>
                <td>+${r.quantity}</td>
                <td>
                    <span class="status available">
                        ${r.status}
                    </span>
                </td>
                <td>${r.date}</td>
            </tr>
        `;
    });
}


/* =========================
   DELIVERY TABLE
   ========================= */

function renderDeliveries() {

    const table =
        document.getElementById("deliveryTable");

    if (!table) return;

    table.innerHTML = "";

    deliveries.forEach(d => {

        table.innerHTML += `
            <tr>
                <td>${d.id}</td>
                <td>${d.customer}</td>
                <td>${d.product}</td>
                <td>-${d.quantity}</td>
                <td>
                    <span class="status available">
                        ${d.status}
                    </span>
                </td>
                <td>${d.date}</td>
            </tr>
        `;
    });
}


/* =========================
   TRANSFER TABLE
   ========================= */

function renderTransfers() {

    const table =
        document.getElementById("transferTable");

    if (!table) return;

    table.innerHTML = "";

    transfers.forEach(t => {

        table.innerHTML += `
            <tr>
                <td>${t.id}</td>
                <td>${t.product}</td>
                <td>${t.quantity}</td>
                <td>${t.from}</td>
                <td>${t.to}</td>
                <td>${t.date}</td>
            </tr>
        `;
    });
}


/* =========================
   ADJUSTMENT TABLE
   ========================= */

function renderAdjustments() {

    const table =
        document.getElementById("adjustmentTable");

    if (!table) return;

    table.innerHTML = "";

    adjustments.forEach(a => {

        const difference =
            a.difference > 0
            ? "+" + a.difference
            : a.difference;

        table.innerHTML += `
            <tr>
                <td>${a.id}</td>
                <td>${a.product}</td>
                <td>${a.recorded}</td>
                <td>${a.physical}</td>
                <td>${difference}</td>
                <td>${a.date}</td>
            </tr>
        `;
    });
}


/* =========================
   LEDGER TABLE
   ========================= */

function renderLedger() {

    const table =
        document.getElementById("ledgerTable");

    if (!table) return;

    const search =
        document.getElementById("ledgerSearch")
        ?.value.toLowerCase() || "";

    const type =
        document.getElementById("ledgerType")
        ?.value || "";

    const filtered =
        ledger.filter(item => {

            const matchesSearch =
                item.product.toLowerCase()
                    .includes(search) ||
                item.operation.toLowerCase()
                    .includes(search);

            const matchesType =
                !type || item.operation === type;

            return matchesSearch && matchesType;
        });

    table.innerHTML = "";

    filtered.forEach(item => {

        const quantity =
            item.quantity > 0
            ? "+" + item.quantity
            : item.quantity;

        table.innerHTML += `
            <tr>
                <td>${item.date}</td>
                <td>${item.product}</td>
                <td>${item.operation}</td>
                <td>${quantity}</td>
                <td>${item.balance}</td>
                <td>${item.location}</td>
            </tr>
        `;
    });
}


/* =========================
   DASHBOARD
   ========================= */

function updateDashboard() {

    const totalProducts =
        document.getElementById("totalProducts");

    if (!totalProducts) return;

    totalProducts.textContent =
        products.length;

    const low =
        products.filter(
            p => p.stock <= p.reorder
        ).length;

    document.getElementById("lowStock")
        .textContent = low;

    document.getElementById("pendingReceipts")
        .textContent = receipts.filter(
            r => r.status !== "Done"
        ).length;

    document.getElementById("pendingDeliveries")
        .textContent = deliveries.filter(
            d => d.status !== "Done"
        ).length;

    document.getElementById("notificationCount")
        .textContent = low;

    renderLowStock();
    renderRecentOperations();
    updateWarehouse();
}


/* =========================
   LOW STOCK
   ========================= */

function renderLowStock() {

    const container =
        document.getElementById("lowStockList");

    if (!container) return;

    const lowProducts =
        products.filter(
            p => p.stock <= p.reorder
        );

    if (lowProducts.length === 0) {

        container.innerHTML =
            "<p>✅ All products have sufficient stock.</p>";

        return;
    }

    container.innerHTML = "";

    lowProducts.forEach(product => {

        const status =
            product.stock === 0
            ? "Out of Stock"
            : "Low Stock";

        container.innerHTML += `
            <div style="
                padding:12px;
                border-bottom:1px solid #eee;
                display:flex;
                justify-content:space-between;
            ">
                <div>
                    <strong>${product.name}</strong>
                    <p style="color:#6b7280;font-size:12px">
                        ${product.sku}
                    </p>
                </div>

                <span class="status ${
                    product.stock === 0 ? "out" : "low"
                }">
                    ${status}
                </span>
            </div>
        `;
    });
}


/* =========================
   RECENT OPERATIONS
   ========================= */

function renderRecentOperations() {

    const container =
        document.getElementById("recentOperations");

    if (!container) return;

    const recent =
        ledger.slice(0, 6);

    if (recent.length === 0) {

        container.innerHTML =
            "<p>No operations yet.</p>";

        return;
    }

    container.innerHTML = "";

    recent.forEach(item => {

        container.innerHTML += `
            <div style="
                padding:12px 0;
                border-bottom:1px solid #eee;
            ">
                <strong>${item.operation}</strong>
                <p>${item.product}</p>
                <small style="color:#6b7280">
                    ${item.date}
                </small>
            </div>
        `;
    });
}


/* =========================
   WAREHOUSE
   ========================= */

function updateWarehouse() {

    const main =
        products
            .filter(p => p.location === "Main Warehouse")
            .reduce((sum, p) => sum + p.stock, 0);

    const production =
        products
            .filter(p => p.location === "Production Rack")
            .reduce((sum, p) => sum + p.stock, 0);

    const finished =
        products
            .filter(p => p.location === "Finished Goods")
            .reduce((sum, p) => sum + p.stock, 0);

    const mainEl =
        document.getElementById("mainWarehouseStock");

    if (mainEl) {
        mainEl.textContent = main + " units";
    }

    const productionEl =
        document.getElementById("productionStock");

    if (productionEl) {
        productionEl.textContent =
            production + " units";
    }

    const finishedEl =
        document.getElementById("finishedStock");

    if (finishedEl) {
        finishedEl.textContent =
            finished + " units";
    }
}


/* =========================
   DROPDOWNS
   ========================= */

function updateProductDropdowns() {

    const dropdowns = [
        "receiptProduct",
        "deliveryProduct",
        "transferProduct",
        "adjustmentProduct"
    ];

    dropdowns.forEach(id => {

        const select =
            document.getElementById(id);

        if (!select) return;

        select.innerHTML =
            '<option value="">Select Product</option>';

        products.forEach(product => {

            select.innerHTML += `
                <option value="${product.id}">
                    ${product.name} (${product.sku})
                </option>
            `;
        });
    });
}


/* =========================
   CATEGORY FILTER
   ========================= */

function updateCategoryFilter() {

    const select =
        document.getElementById("categoryFilter");

    if (!select) return;

    const current = select.value;

    const categories =
        [...new Set(products.map(p => p.category))];

    select.innerHTML =
        '<option value="">All Categories</option>';

    categories.forEach(category => {

        select.innerHTML += `
            <option value="${category}">
                ${category}
            </option>
        `;
    });

    select.value = current;
}


/* =========================
   EXPORT LEDGER
   ========================= */

function exportLedger() {

    let csv =
        "Date,Product,Operation,Quantity,Balance,Location\n";

    ledger.forEach(item => {

        csv +=
            `"${item.date}","${item.product}",` +
            `"${item.operation}","${item.quantity}",` +
            `"${item.balance}","${item.location}"\n`;
    });

    const blob =
        new Blob([csv], {
            type: "text/csv"
        });

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;
    a.download = "smartstock-ledger.csv";

    a.click();

    URL.revokeObjectURL(url);
}


/* =========================
   UTILITIES
   ========================= */

function currentDate() {

    return new Date().toLocaleString();
}

function saveData() {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    localStorage.setItem(
        "receipts",
        JSON.stringify(receipts)
    );

    localStorage.setItem(
        "deliveries",
        JSON.stringify(deliveries)
    );

    localStorage.setItem(
        "transfers",
        JSON.stringify(transfers)
    );

    localStorage.setItem(
        "adjustments",
        JSON.stringify(adjustments)
    );

    localStorage.setItem(
        "ledger",
        JSON.stringify(ledger)
    );
}

function clearProductForm() {

    [
        "productName",
        "productSKU",
        "productCategory",
        "productStock",
        "productReorder"
    ].forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.value = "";
        }
    });
}

function showNotifications() {

    const low =
        products.filter(
            p => p.stock <= p.reorder
        );

    if (low.length === 0) {
        alert("No stock alerts.");
        return;
    }

    alert(
        "Stock Alerts:\n\n" +
        low.map(
            p => `${p.name}: ${p.stock} remaining`
        ).join("\n")
    );
}


/* =========================
   LOGOUT
   ========================= */

function logout() {

    localStorage.removeItem("currentUser");

    window.location.href = "index.html";
}


/* =========================
   DASHBOARD INITIALIZATION
   ========================= */

if (document.getElementById("dashboard")) {

    const user =
        JSON.parse(
            localStorage.getItem("currentUser")
        );

    if (!user) {
        window.location.href = "index.html";
    }
    else {

        const userName =
            document.getElementById("userName");

        if (userName) {
            userName.textContent = user.name;
        }

        const profileName =
            document.getElementById("profileName");

        if (profileName) {
            profileName.textContent = user.name;
        }

        const profileEmail =
            document.getElementById("profileEmail");

        if (profileEmail) {
            profileEmail.textContent = user.email;
        }

        const dateText =
            document.getElementById("dateText");

        if (dateText) {
            dateText.textContent =
                new Date().toDateString();
        }

        updateProductDropdowns();
        updateDashboard();
        renderProducts();
        renderReceipts();
        renderDeliveries();
        renderTransfers();
        renderAdjustments();
        renderLedger();
    }
}