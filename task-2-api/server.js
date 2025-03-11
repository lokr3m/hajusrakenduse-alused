const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");

const app = express();
const PORT = 3300;
const DATA_FILE = "LE.txt";

let spareParts = [];

// Load CSV into memory
function loadCSV() {
    spareParts = [];
    fs.createReadStream(DATA_FILE)
        .pipe(csv({ separator: '\t', headers: false, skipLines: 0, strict: true }))
        .on("data", (row) => {
            const values = Object.values(row);
            if (values.length >= 11) {
                spareParts.push({
                    name: values[1].replace(/"/g, "") || "", // Second column as name
                    serial_number: values[0].replace(/"/g, "") || "", // Last column as serial_number
                    category: values[9].replace(/"/g, "") || "Uncategorized", // Assuming category is column 10
                    price: parseFloat(values[8].replace(/"/g, "").replace(",", ".")) || 0.0, // Convert price with comma to float
                    quantity: parseInt(values[2].replace(/"/g, "")) || 0, // Quantity (assuming 3rd column)
                    location: values[7].replace(/"/g, "") || "Unknown Warehouse" // Assuming location is column 8
                });
            }
        })
        .on("end", () => {
            console.log(`✅ Loaded ${spareParts.length} spare parts into memory.`);
        })
        .on("error", (err) => {
            console.error("❌ Error reading file:", err);
        });
}

// API Endpoint: Fetch spare parts with filtering, pagination, and sorting
app.get("/spare-parts", (req, res) => {
    let { name, sn, page = 1, sort } = req.query;
    let results = [...spareParts];

    // Filtering
    if (name) {
        results = results.filter(part =>
            part.name?.toLowerCase().includes(name.toLowerCase())
        );
    }
    if (sn) {
        results = results.filter(part => part.serial_number?.toLowerCase() === sn);
    }

    // Sorting
    if (sort) {
        const order = sort.startsWith("-") ? -1 : 1;
        const sortKey = sort.replace("-", "");
        results.sort((a, b) => (a[sortKey] > b[sortKey] ? order : -order));
    }

    // Pagination
    const pageSize = 30;
    const start = (page - 1) * pageSize;
    const paginatedResults = results.slice(start, start + pageSize);
    const totalPages = Math.ceil(results.length / pageSize);

    res.json({
        metadata: {
            totalResults: results.length,
            currentPage: parseInt(page),
            pageSize,
            totalPages
        },
        pagination: {
            nextPage: page < totalPages ? page + 1 : null,
            prevPage: page > 1 ? page - 1 : null,
            sortBy: sort || null,
            filter: {
                name: name || null,
                serial_number: sn || null
            }
        },
        spareParts: paginatedResults
    });
});

// Start server
app.listen(PORT, () => {
    loadCSV();
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
