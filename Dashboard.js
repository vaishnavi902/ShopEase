import React from "react";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate(); // ✅ initialize
  const categories = [
    {
      name: "Grocery",
      desc: "Daily essentials and pantry staples for your home.",
      img: "https://media.istockphoto.com/id/1301675046/photo/variety-kinds-of-natural-cereal-and-grain-seed-in-sack-and-dark-tone-for-clean-food-raw.jpg?s=612x612&w=0&k=20&c=99rJqzUdDPHr0N7USGYrxnAN3RRXaXQrkJbxcM4v8-w=",
      path: "/grocery"
    },
    {
      name: "Vegetables",
      desc: "Fresh, healthy produce directly from local farms.",
      img: "https://exat8rt6fi5.exactdn.com/wp-content/uploads/2013/03/vegetables-1024x680.jpg?strip=all&lossy=1&ssl=1",
    },
    {
      name: "Fruits",
      desc: "Sweet and juicy fruits, perfect for a healthy lifestyle.",
      img: "https://static.vecteezy.com/ti/gratis-fotos/p1/22452980-panoramisch-verzameling-vers-fruit-en-groenten-achtergrond-kant-visie-generatief-ai-foto.jpg",
    },
    {
      name: "Dry Fruits",
      desc: "Premium quality nuts and dried fruits for nutrition.",
      img: "https://static.vecteezy.com/system/resources/thumbnails/028/672/537/small_2x/composition-with-dried-fruits-and-assorted-nuts-ai-generated-photo.jpg",
    },
  ];

  const reviews = [
    {
      name: "Alice Johnson",
      text: "Shopease has revolutionized my shopping! It’s so intuitive and fast.",
      rating: 5,
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Bob Martin",
      text: "A fantastic platform with clear categories and smooth interface.",
      rating: 4,
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  const topPicks = [
    {
      name: "Organic Mangoes",
      img: "https://img.freepik.com/free-photo/delicious-mango-still-life_23-2151542234.jpg?semt=ais_incoming&w=740&q=80",
    },
    {
      name: "Almonds",
      img: "https://www.shutterstock.com/image-photo/prunus-dulcis-raw-organic-almond-600nw-2616117115.jpg",
    },
    {
      name: "Pan Cakes",
      img: "https://media.istockphoto.com/id/161170090/photo/pancakes-with-berries-and-maple-syrup.jpg?s=612x612&w=0&k=20&c=8EctScsN7q5UmxeXPNBnYN1eFmJmgmp2bE0OIq_czwM=",
    },
    {
      name: "Aloo Bhuja",
      img: "https://media.istockphoto.com/id/1176467377/photo/aloo-bhujia.jpg?s=612x612&w=0&k=20&c=O1T6QwKR5vM55lvFGWG1Nv0ogpAqD4oXZcYsHNgrqj4=",
    },

  ];

  // Menu items (from earlier snippet)
  const menuItems = [
    {
      name: "All",
      img: "https://as1.ftcdn.net/jpg/05/60/17/66/1000_F_560176615_cUua21qgzxDiLiiyiVGYjUnLSGnVLIi6.jpg",
    },
    {
      name: "Home",
      img: "https://png.pngtree.com/element_our/sm/20180515/sm_5afb10369fc59.jpg",
    },
    {
      name: "Grocery",
      img: "https://www.creativefabrica.com/wp-content/uploads/2019/11/14/1573722642/Rice-bag-black-580x386.jpg",
    },
    {
      name: "Electronics",
      img: "https://st2.depositphotos.com/1432405/11828/v/450/depositphotos_118286010-stock-illustration-headphones-icon-outline-style.jpg",
    },
    {
      name: "Cafe",
      img: "https://www.shutterstock.com/image-vector/cup-coffee-icon-flat-thin-600nw-1936141648.jpg",
    },
    {
      name: "Fashion",
      img: "https://c8.alamy.com/comp/R0NBD0/tailor-dummy-fashion-icon-on-white-background-atelier-designer-constructor-dressmaker-object-black-couture-symbol-silhouette-white-background-v-R0NBD0.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Navbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-violet-600">ShopEase</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 mx-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
        />
        <div className="flex items-center space-x-6">
          <button onClick={() => navigate("/")} 
          className="flex items-center text-gray-700 hover:text-violet-600">
            <UserIcon className="h-6 w-6 mr-1" />
            Login
          </button>
          <button className="flex items-center text-gray-700 hover:text-violet-600">
            <ShoppingCartIcon className="h-6 w-6 mr-1" />
            Cart
          </button>
        </div>
      </header>

      {/* 🔹 Menu List (new) */}
      <section className="px-6 py-4 bg-white shadow-sm overflow-x-auto">
        <div className="flex space-x-6">
          {menuItems.map((item, i) => (
            <button
              key={i}
              className="flex flex-col items-center shrink-0 pb-2 hover:scale-105 transition"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-12 w-12 object-contain mb-2"
              />
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </div>
      </section>
    

      {/* 🔹 Hero Section */}
      <section
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/welcome.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "600px",
        }}
      ></section>

      {/* 🔹 Categories */}
      <section className="px-6 py-10">
        <h2 className="text-xl font-semibold mb-6">Explore Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => navigate(cat.path)}
              className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer p-4"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="h-28 w-full object-contain mb-3"
              />
              <h3 className="text-lg font-medium">{cat.name}</h3>
              <p className="text-sm text-gray-600">{cat.desc}</p>
            </div>
          ))}
        </div>
        {/* 🔹 Active Tab Indicator */}
        <div
          className="absolute bottom-0 h-[3px] transition-transform duration-300 bg-[#9A16CA]"
          style={{
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
          width: "57.7812px",
          transform: "translateX(0px)", // You can change this dynamically
         }}
        ></div>

        {/* 🔹 Bottom Line */}
        <div className="relative bottom-0 h-[2px] w-full bg-[#EBECEF]"></div>
      </section>

      {/* 🔹 Reviews */}
      <section className="px-6 py-10 bg-gray-100">
        <h2 className="text-xl font-semibold mb-6">Community Favorites</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((rev, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-3">
                <img
                  src={rev.img}
                  alt={rev.name}
                  className="h-12 w-12 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-bold">{rev.name}</h4>
                  <p className="text-yellow-500">{"⭐".repeat(rev.rating)}</p>
                </div>
              </div>
              <p className="text-gray-600">{rev.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Top Picks */}
      <section className="px-6 py-10">
        <h2 className="text-xl font-semibold mb-6">Top Picks</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {topPicks.map((item, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md text-center"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-24 mx-auto mb-3"
              />
              <h3 className="text-lg font-medium">{item.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Footer */}
      <footer className="bg-violet-700 text-white py-4 text-center mt-10">
        <h3 className="text-xl font-bold">ShopEase Grocery Store</h3>
        <p className="text-sm mt-2 text-grey">
          Your trusted partner for everyday essentials. Freshness guaranteed.
        </p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:underline">
            About Us
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
        <p className="text-xs text-grey-700 mt-4">© 2025 ShopEase. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard;
