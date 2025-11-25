const { Product, Supplier, Ad } = require('./models');

async function seed() {
  try {
    // Clear existing data
    await Product.destroy({ where: {} });
    await Supplier.destroy({ where: {} });
    await Ad.destroy({ where: {} });

    // Create suppliers
    const s1 = await Supplier.create({
      name: "FreshMart Groceries",
      phone: "9876543210",
      address: "RR Nagar, Bengaluru",
      description: "Your trusted grocery store",
    });

    const s2 = await Supplier.create({
      name: "RR Nagar Vegetables",
      phone: "9988776655",
      address: "Ideal Homes, RR Nagar",
      description: "Fresh vegetables & fruits",
    });

    // Create products
    await Product.create({
      title: "Organic Tomatoes",
      description: "Fresh organic tomatoes from local farms.",
      price: 30,
      SupplierId: s2.id
    });

    await Product.create({
      title: "Aashirvaad Atta 5kg",
      description: "Premium quality wheat flour.",
      price: 220,
      SupplierId: s1.id
    });

    await Product.create({
      title: "Brown Bread",
      description: "Freshly baked healthy brown bread.",
      price: 45,
      SupplierId: s1.id
    });

    // Create ads
    await Ad.create({
      title: "FreshMart Offer!",
      url: "https://example.com",
      location: "top"
    });

    await Ad.create({
      title: "Veggies Discount",
      url: "https://example.com",
      location: "right"
    });

    await Ad.create({
      title: "Local Store Promo",
      url: "https://example.com",
      location: "bottom"
    });

    console.log("Sample data added successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
